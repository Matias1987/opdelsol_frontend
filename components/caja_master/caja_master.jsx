import { get } from "@/src/urls";
import { Button, Card, Col, Row, Table, Modal } from "antd";
import { useEffect, useState } from "react";
import Egreso from "./egreso";

const CajaMaster = (props) => {
  const [data, setData] = useState([]);
  const [popupAddOpen, setPopupAddOpen] = useState(false);
  const columns = [
    { width: "100px", title: "Nro.", dataIndex: "id", key: "id" },
    { width: "100px", title: "Fecha", dataIndex: "fecha_f", key: "fecha" },
    {
      width: "100px",
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
    { width: "100px", title: "Detalle", dataIndex: "detalle", key: "detalle" },
    {
      width: "100px",
      title: <div style={{ textAlign: "right" }}>Monto</div>,
      dataIndex: "monto",
      render: (_, obj) => (
        <>
          {obj.tipo === "INGRESO" ? (
            <div style={{ color: "green", textAlign: "right" }}>
              $&nbsp;{obj.monto}
            </div>
          ) : (
            <div style={{ color: "red", textAlign: "right" }}>
              $&nbsp;-{obj.monto}
            </div>
          )}
        </>
      ),
    },
  ];

  const load = () => {
    //llamar api
    fetch(get.caja_m_balance)
      .then((res) => res.json())
      .then((data) => {
        if(data.error)
        {
          return;
        }
        //alert(JSON.stringify(data));
        setData(data);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = () => {
    setPopupAddOpen(true);
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
                <Button type="primary" onClick={handleAdd} size="small">
                  Agregar Egreso
                </Button>
              </>
            }
          >
            <Table
              pagination={false}
              scroll={{ y: "400px" }}
              size="small"
              dataSource={data}
              columns={columns}
              summary={(pageData) => {
                const total = pageData.reduce(
                  (sum, item) => sum + item.monto,
                  0
                );
                return (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell colSpan={4}>Saldo</Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <span
                          style={{
                            color: total >= 0 ? "green" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          $&nbsp;{total}
                        </span>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                );
              }}
            />
          </Card>
        </Col>
      </Row>
      <Modal
        open={popupAddOpen}
        onCancel={() => setPopupAddOpen(false)}
        footer={null}
        title="Agregar Egreso"
      >
        <Egreso aCajaMaster={true} callback={_=>{
          setPopupAddOpen(false);
          load();
        }}/>
      </Modal>
    </>
  );
};

export default CajaMaster;
