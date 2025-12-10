import { Button, Card, Col, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import ModifIngresoCaja from "./modificacion_ingreso_caja";
import { get } from "@/src/urls";
import { ReloadOutlined } from "@ant-design/icons";
import InformeCajaV2 from "../informes/caja/InformeCajaV3";
import { formatFloat } from "@/src/helpers/formatters";

const ListadoCajaSucursales = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupModifMontoOpen, setPopupModifMontoOpen] = useState(false);
  const [popupDetalleOpen, setPopupDetalleOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const load = () => {
    //alert(get.cajas_ls)
    setLoading(true);
    fetch(get.cajas_ls)
      .then((response) => response.json())
      .then((response) => {
       // alert(JSON.stringify(response))
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Card
            size="small"
            title={<b>Pendientes&nbsp;</b>}
            extra={
              <>
                <Button size="small" type="primary" onClick={load}>
                  <ReloadOutlined />
                </Button>
              </>
            }
          >
            <Table
              scroll={{ y: "300px" }}
              size="small"
              
              dataSource={data}
              columns={[
                { dataIndex: "fecha", title: "Fecha" },
                { dataIndex: "sucursal", title: "Sucursal" },
                { dataIndex: "monto_efectivo", title: <div style={{textAlign:"right"}}>Monto</div>, render:(_,{s})=><div style={{textAlign:"right"}}>$&nbsp;{formatFloat(s)}</div> },
                {
                  title: "Acciones",
                  render: (_, row) => (
                    <>
                      <Button
                        type="link"
                        size="small"
                        onClick={(_) => {
                          setSelectedRow(row);
                          setPopupModifMontoOpen(true);
                        }}
                      >
                        Ingresar Dinero
                      </Button>
                      <Button
                        type="link"
                        size="small"
                        onClick={(_) => {
                          setSelectedRow(row);
                          setPopupDetalleOpen(true);
                        }}
                      >
                        Ver Detalle
                      </Button>
                    </>
                  ),
                },
              ]}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
      <Modal
        destroyOnClose
        open={popupModifMontoOpen}
        title="Modificar Monto"
        footer={null}
        onCancel={(_) => {
          setPopupModifMontoOpen(false);
        }}
      >
        <ModifIngresoCaja
          callback={(_) => {
            setPopupModifMontoOpen(false);
            load();
          }}
          selectedRow={selectedRow}
        />
      </Modal>
      <Modal
        width={"1200px"}
        destroyOnClose
        open={popupDetalleOpen}
        title="Detalle de Caja"
        footer={null}
        onCancel={(_) => {
          setPopupDetalleOpen(false);
        }}
      >
        <InformeCajaV2 idcaja={selectedRow?.idcaja} />
      </Modal>
    </>
  );
};

export default ListadoCajaSucursales;
