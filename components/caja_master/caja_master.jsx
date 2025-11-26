import { get } from "@/src/urls";
import { Button, Card, Col, Row, Table, Modal, Checkbox } from "antd";
import { useEffect, useState } from "react";
import Egreso from "./egreso";
import InformeCajaV2 from "@/components/informes/caja/InformeCajaV3";
import { InfoCircleTwoTone, InfoOutlined, ReloadOutlined } from "@ant-design/icons";
import Ingreso from "./ingreso";

const CajaMaster = (props) => {
  const [data, setData] = useState([]);
  const [popupAddOpen, setPopupAddOpen] = useState(false);
  const [popupAddIngresoOpen, setPopupAddIngresoOpen] = useState(false)
  const [detalleCajaOpen, setDetalleCajaOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [verTodo, setVerTodo] = useState(false)
  const [reload, setReload] = useState(false)
  const columns = [
    { width: "30px", title: "Nro.", dataIndex: "id", key: "id" },
    { width: "60px", title: "Fecha", dataIndex: "fecha_f", key: "fecha" },
    {
      width: "50px",
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
      render: (_, obj) => (
        <span
          style={{
            fontWeight: "600",
            color: obj.tipo === "INGRESO" ? "green" : "red",
          }}
        >
          {obj.tipo}
        </span>
      ),
    },
    { width: "100px", title: "Detalle", dataIndex: "detalle", key: "detalle", render:(_,record)=><>
    <b>{record.detalle}</b>&nbsp;&nbsp;{+record.ref_id==0?<></> : <Button type="link" size="small" onClick={_=>{setSelectedRow(record); setDetalleCajaOpen(true)}}><InfoCircleTwoTone /></Button>}
    </> },
    {
      width: "100px",
      title: <div style={{ textAlign: "right" }}>Monto</div>,
      dataIndex: "monto",
      render: (_, obj) => (
        <>
          {
          obj.tipo != "EGRESO" ? (
            <div style={{ color: obj.tipo == "SALDO" ? "blue" : "green", textAlign: "right" }}>
              $&nbsp;{parseFloat(obj.monto||"0").toLocaleString(2)}
            </div>
          ) : (
            <div style={{ color: "red", textAlign: "right" }}>
              $&nbsp;-{parseFloat(obj.monto||"0").toLocaleString(2)}
            </div>
          )}
        </>
      ),
    },

  ];

  const load = () => {
    const q = get.caja_m_balance + (verTodo ? '1':'0')
    //alert(q)
    //llamar api
    fetch(q)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return;
        }
        //alert(JSON.stringify(data));
        setData(data);
      });
  };

  useEffect(() => {
    load();
  }, [reload]);

  const handleAddEgreso = () => {
    setPopupAddOpen(true);
  };

  const handleAgregarIngreso = () => {
    setPopupAddIngresoOpen(true);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Card
            size="small"
            title={<b>Lista de operaciones</b>}
            extra={
              <>
                <Checkbox onChange={_=>{setVerTodo(!verTodo); setReload(!reload)} } checked={verTodo}>Ver Todo</Checkbox>
                &nbsp;&nbsp;
                <Button type="primary" onClick={handleAddEgreso} size="small">
                  Agregar Egreso
                </Button>
                &nbsp;&nbsp;
                <Button
                  type="primary"
                  onClick={handleAgregarIngreso}
                  size="small"
                >
                  Agregar Ingreso
                </Button>
                &nbsp;&nbsp;
                <Button onClick={_=>{load()}} size="small" type="primary">
                  <ReloadOutlined size={"small"} />
                </Button>
              </>
            }
          >
            <Row>
              <Col span={24}>
                <Table
                  pagination={false}
                  scroll={{ y: "400px" }}
                  size="small"
                  dataSource={data}
                  columns={columns}
                  summary={(pageData) => {
                    const total = pageData.reduce(
                      (sum, item) => sum += item.tipo != "EGRESO" ? parseFloat(item.monto||"0") : -parseFloat(item.monto||"0"),
                      0
                    );
                    return (
                      <Table.Summary fixed>
                        <Table.Summary.Row>
                          <Table.Summary.Cell colSpan={4}>
                            Saldo
                          </Table.Summary.Cell>
                          <Table.Summary.Cell>
                            <span
                              style={{
                                color: total >= 0 ? "green" : "red",
                                fontWeight: "bold",
                              }}
                            >
                              $&nbsp;{parseFloat(total).toLocaleString(2)}
                            </span>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </Table.Summary>
                    );
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}></Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Modal
        open={popupAddOpen}
        onCancel={() => setPopupAddOpen(false)}
        footer={null}
        title="Agregar Egreso"
      >
        <Egreso
          aCajaMaster={true}
          callback={(_) => {
            setPopupAddOpen(false);
            load();
          }}
        />
      </Modal>
      <Modal
        destroyOnClose
        open={detalleCajaOpen}
        title="Detalle de Caja"
        footer={null}
        onCancel={(_) => {
          setDetalleCajaOpen(false);
        }}
        width={"100%"}
      >
        <InformeCajaV2 idcaja={selectedRow?.ref_id} />
      </Modal>
      <Modal
        destroyOnClose
        open={popupAddIngresoOpen}
        title="Agregar Ingreso"
        footer={null}
        onCancel={_=>{setPopupAddIngresoOpen(false)}}
      >
          <Ingreso cm={1} callback={_=>{
            setPopupAddIngresoOpen(false)
            load();
            
          }}
          />
      </Modal>
    </>
  );
};

export default CajaMaster;
