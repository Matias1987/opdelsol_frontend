import CustomModal from "@/components/CustomModal";
import ExportToCSV from "@/components/ExportToCSV";
import PrinterWrapper from "@/components/PrinterWrapper";
import SearchCodigo from "@/components/SearchCodigo";
import MyLayout from "@/components/layout/layout";
import { get_barcode_from_id2 } from "@/src/helpers/barcode_helper";
import { get } from "@/src/urls";
import { CloseCircleOutlined, PrinterTwoTone } from "@ant-design/icons";
import { Modal, Button, Card, Col, Row, Table } from "antd";

import { useState } from "react";
import Barcode from "react-barcode";

export default function ImprimirCodigos() {
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [ids, setIds] = useState(0);
  var _elements = [];
  const cols = 5;
  var prev = -1;

  for (let i = 0; i < tableData.length; i++) {
    var _t = parseInt(i / cols);
    if (prev != _t) {
      _elements.push([]);
      prev = _t;
    }
    _elements[_t].push(tableData[i]);
  }

  const remove_row = (key) => {
    setTableData(tableData.filter((r) => r.key != key));
  };

  const add_new_row = (data) => {
    const new_row = {
      ruta: "-",
      key: ids,
      codigo: data[0].codigo,
      codigo_ref: data[0].idcodigo,
      ref_id: ids,
    };
    setTableLoading(false);
    setTableData([...tableData, new_row]);
    setIds(ids + 1);
  };

  const load_details_for_selected_id = (idcodigo) => {
    setTableLoading(true);
    /* get stock data for the column */
    fetch(get.detalle_codigo + "/" + idcodigo)
      .then((response) => response.json())
      .then((response) => {
        add_new_row(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Card
        size="small"
        title="Imprimir C&oacute;digos de Barras"
        style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}
      >
        <Row>
          <Col span={8} style={{ padding: "1em" }}>
            <Card
              size="small"
              title={<>Agregar C&oacute;digos</>}
              style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}
            >
              <SearchCodigo
                callback={(idcodigo) => {
                  load_details_for_selected_id(idcodigo);
                }}
              />
            </Card>
          </Col>
          <Col span={16} style={{ padding: "1em", fontWeight: "bold" }}>
            <Card
              size="small"
              title={<>Lista de c&oacute;digos a imprimir</>}
              style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}
            >
              <Table
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "table-row-light" : "table-row-dark"
                }
                size="small"
                scroll={{ y: "400px" }}
                pagination={false}
                loading={tableLoading}
                columns={[
                  { title: "codigo", dataIndex: "codigo", width: "200px" },
                  {
                    title: "Acciones",
                    dataIndex: "ref_id",
                    render: (_, { ref_id }) => (
                      <Button
                        onClick={() => {
                          remove_row(ref_id);
                        }}
                        danger={true}
                      >
                        <CloseCircleOutlined />
                      </Button>
                    ),
                  },
                ]}
                dataSource={tableData}
                summary={(_) => (
                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={2}>
                    <Button onClick={_=>{setModalOpen(true)}}>Imprimir C&oacute;digos</Button>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Card>
      <br />
      <Modal
        open={modalOpen}
        onCancel={(_) => {
          setModalOpen(false);
        }}
        title="Imprimir"
        width={"950px"}
      >
        <ExportToCSV
          parseFnt={() => {
            /* codigo;cantidad; */
            let _csv = "";
            _elements.forEach((e) => {
              _csv += `${get_barcode_from_id2(e.codigo_ref)};${e.codigo};${1}`;
            });

            return _csv;
          }}
        />
        <PrinterWrapper>
          <table style={{ width: "auto" }}>
            <tbody>
              {_elements.map((e) => (
                <tr>
                  {e.map((r) => (
                    <td style={{ textAlign: "center", fontSize: ".85em" }}>
                      {r.codigo}
                      <br />
                      <Barcode
                        value={get_barcode_from_id2(r.codigo_ref)}
                        displayValue={false}
                        width={1.5}
                        height={20}
                      />
                      &nbsp;
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </PrinterWrapper>
      </Modal>
    </>
  );
}

ImprimirCodigos.PageLayout = MyLayout;
