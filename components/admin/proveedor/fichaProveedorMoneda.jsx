import { Button, Card, Col, Modal, Row, Spin, Table, Tabs, Tag } from "antd";
import { useEffect, useState } from "react";
import AgregarPagoProveedor from "./AgregarPagoProveedor";
import AgregarCMProveedor from "./AregarCMProveedor";
import { get, post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";

import DetalleFactura from "@/components/forms/deposito/DetalleFactura";
import ExportToCSV from "@/components/ExportToCSV";
import AgregarFacturaV3 from "../factura/agregarFacturaV3";
import { formatFloat } from "@/src/helpers/formatters";
import ExportToExcel2 from "@/components/etc/ExportToExcel2";
const { TabPane } = Tabs;
const FichaProveedorMoneda = ({
  idproveedor,
  moneda,
  datosProveedor,
  callback,
}) => {
  const [reload, setReload] = useState(false);
  const [operacionesF, setOperacionesF] = useState([]);
  const [operacionesR, setOperacionesR] = useState([]);
  const [operacionesGeneral, setOperacionesGeneral] = useState([]);
  const [popupPagoOpen, setPopupPagoOpen] = useState(false);
  const [popupCMOpen, setPopupCMOpen] = useState(false);
  const [popupAddFacturaOpen, setPopupAddFacturaOpen] = useState(false);
  const [popupAddRemitoOpen, setPopupAddRemitoOpen] = useState(false);
  const [modo, setModo] = useState(1);
  const [selectedFactura, setSelectedFactura] = useState(-1);
  const [popupDetalleFacturaOpen, setPopupDetalleFacturaOpen] = useState(false);
  const [totalesFactura, setTotalesFactura] = useState({
    debe: 0,
    haber: 0,
  });
  const [totales, setTotales] = useState({
    debe: 0,
    haber: 0,
  });
  const [totalesRemito, setTotalesRemito] = useState({
    debe: 0,
    haber: 0,
  });

  const columns = [
    { title: "ID.", dataIndex: "id" },
    { title: "Fecha", dataIndex: "fecha_f" },
    {
      title: "Detalle",
      render: (_, { tipo, detalle, id }) => {
        switch (tipo) {
          case "PREV":
            return <>{detalle}</>;
            break;
          case "FACTURA":
            return (
              <>
                <Tag
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedFactura(id);
                    setPopupDetalleFacturaOpen(true);
                  }}
                >
                  {detalle}
                </Tag>
              </>
            );
          case "PAGO":
            return <>{detalle}</>;
          case "CM":
            return <>{detalle}</>;
        }
      },
    },
    {
      title: <div style={{ textAlign: "right" }}>Debe</div>,
      render: (_, { debe }) => (
        <div style={{ color: "darkblue", textAlign: "right" }}>
          $&nbsp;{formatFloat(debe||"0")}
        </div>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>Haber</div>,
      render: (_, { haber }) => (
        <div style={{ color: "darkblue", textAlign: "right" }}>
          $&nbsp;{formatFloat(haber||"0")}
        </div>
      ),
    },
  ];

  const load = () => {
    post_method(
      post.ficha_proveedor,
      { idproveedor: idproveedor, modo: 1, moneda: moneda },
      (response) => {
        let total_d = 0;
        let total_h = 0;
        response.data.forEach((r) => {
          total_d += parseFloat(r.debe||"0");
          total_h += parseFloat(r.haber||"0");
        });
        setTotalesFactura((_) => ({
          debe: total_d,
          haber: total_h,
        }));
        setOperacionesF(response.data);
      },
    );
    post_method(
      post.ficha_proveedor,
      { idproveedor: idproveedor, modo: 0, moneda: moneda },
      (response) => {
        let total_d = 0;
        let total_h = 0;
        response.data.forEach((r) => {
          total_d += parseFloat(r.debe||"0");
          total_h += parseFloat(r.haber||"0");
        });
        setTotalesRemito((_) => ({
          debe: total_d,
          haber: total_h,
        }));
        setOperacionesR(response.data);
      },
    );
    post_method(
      post.ficha_proveedor,
      { idproveedor: idproveedor, modo: -1, moneda: moneda },
      (response) => {
        let total_d = 0;
        let total_h = 0;
        response.data.forEach((r) => {
          total_d += parseFloat(r.debe||"0");
          total_h += parseFloat(r.haber||"0");
        });
        setTotales((_) => ({
          debe: total_d,
          haber: total_h,
        }));
        setOperacionesGeneral(response.data);
      },
    );
  };

  useEffect(() => {
    load();
  }, [reload]);

  const onAgregarPago = (mp) => {
    setModo(mp);
    setPopupPagoOpen(true);
  };

  const onAgregarCargaManual = (mp) => {
    setModo(mp);
    setPopupCMOpen(true);
  };

  const _remitos = (_) => (
    <>
      <Row style={{ backgroundColor: "#E7E7E7" }}>
        <Col span={24} style={{ padding: "0em" }}>
          <Table
            title={() => table_header("Remitos", operacionesR)}
            size="small"
            dataSource={operacionesR}
            columns={columns}
            scroll={{ y: "600px" }}
            pagination={false}
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row style={{ backgroundColor: "lightgreen" }}>
                  <Table.Summary.Cell colSpan={3}>Totales</Table.Summary.Cell>

                  <Table.Summary.Cell>
                    <div
                      style={{
                        textAlign: "right",
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "1.1em",
                      }}
                    >
                      $&nbsp;{formatFloat(totalesRemito.debe)}
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <div
                      style={{
                        textAlign: "right",
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "1.1em",
                      }}
                    >
                      $&nbsp;{formatFloat(totalesRemito.haber)}
                    </div>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={5}>
                    <div
                      style={{
                        textAlign: "left",
                        fontWeight: "bolder",
                        fontSize: "1.3em",
                      }}
                    >
                      Saldo: ${" "}
                      {formatFloat(
                        parseFloat(totalesRemito.debe) -
                          parseFloat(totalesRemito.haber),
                      )}&nbsp;
                      {moneda}
                    </div>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              onAgregarPago(0);
            }}
          >
            Agregar Pago
          </Button>
          &nbsp;
          <Button
            type="primary"
            onClick={() => {
              onAgregarCargaManual(0);
            }}
          >
            Agregar Carga Manual
          </Button>
          &nbsp;
          <Button
            type="primary"
            onClick={() => {
              setPopupAddRemitoOpen(true);
            }}
          >
            Agregar Remito
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}></Col>
      </Row>
    </>
  );
  const _facturas = (_) => (
    <>
      <Row style={{ backgroundColor: "#E7E7E7" }}>
        <Col span={24} style={{ padding: "1em" }}>
          <Table
            title={() => table_header("Lista de Operaciones", operacionesF)}
            size="small"
            dataSource={operacionesF}
            columns={columns}
            scroll={{ y: "400px" }}
            pagination={false}
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row style={{ backgroundColor: "lightblue" }}>
                  <Table.Summary.Cell colSpan={3}>Totales</Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <div
                      style={{
                        textAlign: "right",
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "1.1em",
                      }}
                    >
                      $&nbsp;{formatFloat(totalesFactura.debe)}
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <div
                      style={{
                        textAlign: "right",
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "1.1em",
                      }}
                    >
                      $&nbsp;{formatFloat(totalesFactura.haber)}
                    </div>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={5}>
                    <div
                      style={{
                        textAlign: "left",
                        fontWeight: "bolder",
                        fontSize: "1.3em",
                      }}
                    >
                      Saldo: ${" "}
                      {formatFloat(
                        parseFloat(totalesFactura.debe) -
                          parseFloat(totalesFactura.haber),
                      )}&nbsp;
                      {moneda}
                    </div>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              onAgregarPago(1);
            }}
          >
            Agregar Pago
          </Button>
          &nbsp;
          <Button
            type="primary"
            onClick={() => {
              onAgregarCargaManual(1);
            }}
          >
            Agregar Carga Manual
          </Button>
          &nbsp;
          <Button
            type="primary"
            onClick={() => {
              setPopupAddFacturaOpen(true);
            }}
          >
            Agregar Factura
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}></Col>
      </Row>
    </>
  );

  const _general = (_) => (
    <>
      <Row>
        <Col span={24}>
          <Table
            size="small"
            dataSource={operacionesGeneral}
            columns={columns}
            scroll={{ y: "400px" }}
            pagination={false}
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row style={{ backgroundColor: "lightpink" }}>
                  <Table.Summary.Cell colSpan={3}>Totales</Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <div
                      style={{
                        textAlign: "right",
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "1.1em",
                      }}
                    >
                      $&nbsp;{formatFloat(totales.debe)}
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <div
                      style={{
                        textAlign: "right",
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "1.1em",
                      }}
                    >
                      $&nbsp;{formatFloat(totales.haber)}
                    </div>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={5}>
                    <div
                      style={{
                        textAlign: "left",
                        fontWeight: "bolder",
                        fontSize: "1.3em",
                      }}
                    >
                      Saldo: ${" "}
                      {formatFloat(
                        parseFloat(totales.debe) - parseFloat(totales.haber),
                      )}&nbsp;
                      {moneda}
                    </div>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
        </Col>
      </Row>
    </>
  );

  const table_header = (title, csv_src) => (
    <>
      <span style={{ fontWeight: "bold" }}>
        {title || "Lista de Operaciones"}
      </span>{" "}
      &nbsp;&nbsp;&nbsp;{" "}
      <ExportToCSV
        parseFnt={() => {
          if (datosProveedor == null || csv_src == null) {
            return;
          }
          let str = `PROVEEDOR: ,${datosProveedor.nombre},,,,\r\nID, FECHA, DETALLE, DEBE, HABER\r\n`;
          csv_src.forEach((o) => {
            str += `${o.id},${o.fecha_f},${o.detalle},${o.debe},${o.haber}\r\n`;
          });
          return str;
        }}
      />
    </>
  );

  const onTabChange = (key) => {
    console.log("Tab changed to:", key);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Tabs defaultActiveKey="1" onChange={onTabChange} direction="ltr">
            <TabPane tab="Facturas" key="1">
              {_facturas()}
            </TabPane>
            <TabPane tab="Remitos" key="2">
              {_remitos()}
            </TabPane>
            <TabPane tab="General" key="3">
              {_general()}
            </TabPane>
          </Tabs>
        </Col>
      </Row>
      <Row style={{padding:"8px"}}>
        <Col span={24}>
        <ExportToExcel2
        buttonSize="small"
        />
        </Col>
      </Row>

      {/* agregar pago popup */}
      <Modal
        destroyOnClose
        width={"70%"}
        title={`Cargar Pago - ${moneda}`}
        footer={null}
        open={popupPagoOpen}
        onCancel={() => {
          setPopupPagoOpen(false);
          setReload(!reload);
        }}
      >
        <AgregarPagoProveedor
          idproveedor={idproveedor}
          modo={modo}
          moneda={moneda}
          callback={() => {
            setPopupPagoOpen(false);
            setReload(!reload);
          }}
        />
      </Modal>

      {/* agregar carga manual */}
      <Modal
        destroyOnClose
        width={"700px"}
        title={`Carga Manual - ${moneda}`}
        footer={null}
        open={popupCMOpen}
        onCancel={() => {
          setPopupCMOpen(false);
          setReload(!reload);
        }}
      >
        <AgregarCMProveedor
          idproveedor={idproveedor}
          modo={modo}
          moneda={moneda}
          callback={() => {
            setPopupCMOpen(false);
            setReload(!reload);
          }}
        />
      </Modal>
      <Modal
        destroyOnClose
        width={"70%"}
        open={popupAddFacturaOpen}
        title={`Agregar Factura - ${moneda}`}
        footer={null}
        onCancel={() => {
          setPopupAddFacturaOpen(false);
        }}
      >
        <AgregarFacturaV3
          idproveedor={idproveedor}
          moneda={moneda}
          callback={() => {
            setReload(!reload);
            setPopupAddFacturaOpen(false);
          }}
        />
      </Modal>
      <Modal
        destroyOnClose
        width={"70%"}
        open={popupAddRemitoOpen}
        title={`Agregar Remito - ${moneda}`}
        footer={null}
        onCancel={() => {
          setPopupAddRemitoOpen(false);
        }}
      >
        <AgregarFacturaV3
          idproveedor={idproveedor}
          esremito={true}
          moneda={moneda}
          callback={() => {
            setReload(!reload);
            setPopupAddRemitoOpen(false);
          }}
        />
      </Modal>
      <Modal
        open={popupDetalleFacturaOpen}
        onCancel={() => {
          setPopupDetalleFacturaOpen(false);
        }}
        footer={null}
        title=" "
        destroyOnClose
        width={"900px"}
      >
        <DetalleFactura idFactura={selectedFactura} />
      </Modal>
    </>
  );
};

export default FichaProveedorMoneda;
