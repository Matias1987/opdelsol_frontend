import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import DonutIngresoCategoria from "../../charts/donutIngresoCategoria";
import DonutEgresoCategoria from "../../charts/donutEgresoCategoria";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import globals from "@/src/globals";
import { formatFloat } from "@/src/helpers/formatters";
import GastoForm from "./GastoForm";
import InicioCaja from "./InicioCaja";
import ListaCaja from "./ListaCajas";
import InformeCajaV2 from "../../informes/caja/InformeCajaV3";
import FoodLoader from "@/components/etc/loader/foodLoader";

//const movimientos = [
//  { fecha: "25-08-2026", tipo: "Ingreso", categoria: "Venta", monto: 5000 },
//  { fecha: "25-08-2026", tipo: "Egreso", categoria: "Proveedor", monto: 2000 },
//];

export default function DashboardCajaV2() {
  const [visible, setVisible] = useState(false);
  const [idsucural, setIdsucursal] = useState(-1);
  const [movimientos, setMovimientos] = useState([]);
  const [reload, setReload] = useState(false);
  const [totalesIngresos, setTotalesIngresos] = useState(0);
  const [totalesEgresos, setTotalesEgresos] = useState(0);
  const [cajaActual, setCajaActual] = useState(null);
  const [listOpen, setListOpen] = useState(false);
  const [informeOpen, setInformeOpen] = useState(false);
  useEffect(() => {
    globals.obtenerCajaAsync((resp) => {
      setCajaActual(resp);
      setIdsucursal(globals.obtenerSucursal());
      load(resp?.idcaja);
    });
  }, [reload]);

  const columns = [
    { title: "Nro.", dataIndex: "id" },
    { title: "Fecha", dataIndex: "fecha" },
    {
      title: "Tipo",
      dataIndex: "tipo_d",
      render: (_, { tipo, tipo_d }) => (
        <div
          style={{
            color: "i" === tipo ? "#03990f" : "#bd0000",
            fontWeight: "600",
          }}
        >
          {tipo_d}
        </div>
      ),
    },
    //{ title: "Categoría", dataIndex: "categoria" },
    {
      title: <div style={{ textAlign: "right" }}>Monto</div>,
      dataIndex: "monto",
      render: (_, { monto }) => (
        <div style={{ textAlign: "right" }}>$ {formatFloat(monto)}</div>
      ),
    },
  ];

  const cerrar_caja = () => {
    if (!confirm("Confirmar Cerrar Caja")) {
      return;
    }
    fetch(get.cerrar_caja + cajaActual?.idcaja)
      .then((response) => response.json())
      .then((response) => {
        setReload(!reload);
        globals.obtenerCajaAsync(() => {});
        globals.setCajaOpen(false);
        setReload(!reload);
      });
  };

  const detalle_caja = (_) =>
    cajaActual == null ? (
      <></>
    ) : (
      <span
        style={{ fontStyle: "italic", color: "#141f19", fontWeight: "600" }}
      >
        Caja Abierta. Fecha: {cajaActual?.fecha_f}{" "}
      </span>
    );

  const button_style = {
    border: "1px dotted #e2e2e2",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
  };

  const load = (idcaja) => {
    post_method(post.inf_ls_eg_ig, { idcaja: idcaja }, (response) => {
      if (response?.data) {
        let total_i = 0;
        let total_e = 0;
        response.data.forEach((r) => {
          total_i += "i" === r.tipo ? parseFloat(r.monto) : 0;
          total_e += "e" === r.tipo ? parseFloat(r.monto) : 0;
        });

        setMovimientos(
          response.data.map((r) => ({
            fecha: r.f_fecha,
            id: r.id,
            monto: r.monto,
            tipo_d: "i" === r.tipo ? "Ingreso" : "Egreso",
            tipo: r.tipo,
          })),
        );

        setTotalesEgresos(total_e);
        setTotalesIngresos(total_i);
      }
    });
  };

  // Datos para gráficos

  return (
    <div>
      <Card
        title={<>Resumen de Caja</>}
        size="small"
        style={{ boxShadow: "4px 4px 6px 0px rgba(0, 0, 0, 0.5)" }}
      >
        <Row
          gutter={[8, 8]}
          style={{
            border: "1px dotted #e2e2e2",
            backgroundColor: "rgb(250, 248, 248)",
            margin: "2px",
            borderRadius: "4px",
          }}
        >
          {cajaActual ? (
            <>
              <Col>
                <div style={{ padding: "4px" }}>{detalle_caja()}</div>
              </Col>
              <Col>
                <Button
                  style={button_style}
                  type="link"
                  onClick={(_) => {
                    setReload(!reload);
                    setVisible(true);
                  }}
                >
                  Registrar Egreso
                </Button>
              </Col>
              <Col>
                <Button
                  style={button_style}
                  type="link"
                  onClick={(_) => {
                    setInformeOpen(true);
                  }}
                >
                  Informe
                </Button>
              </Col>

              <Col>
                <Button
                  danger  
                  style={button_style}
                  type="link"
                  onClick={(_) => {
                    cerrar_caja();
                  }}
                >
                  Cerrar Caja
                </Button>
              </Col>

              <Col style={{ padding: "4px", color: "#858484" }}>|</Col>
            </>
          ) : (
            <>
              <Col>
                <InicioCaja
                  callback={() => {
                    setReload(!reload);
                  }}
                />
              </Col>
            </>
          )}

          <Col>
            <Button
              style={button_style}
              type="link"
              onClick={(_) => {
                setListOpen(true);
              }}
            >
              Cajas Anteriores
            </Button>
          </Col>
        </Row>
        &nbsp;
        <Card
          size="small"
          style={{ boxShadow: "2px 2px 3px 0px rgba(0, 0, 0, 0.5)" }}
          title="Movimientos"
          extra={<></>}
        >
          <Row>
            <Col span={24}>
              <Table
                dataSource={cajaActual ? movimientos : null}
                columns={columns}
                rowKey="fecha"
                scroll={{ y: 280 }}
                pagination={false}
                size="small"
              />
            </Col>
          </Row>
          {/*<Row>
            <Col span={24}>
              <Input
                readOnly
                addonBefore={"Balance: "}
                value={formatFloat(saldo)}
              />
            </Col>
          </Row>*/}
          &nbsp;
          <Row gutter={[16, 16]}>
            <Col>
              <DonutIngresoCategoria
                idsucursal={globals.obtenerSucursal()}
                reload={reload}
              />
            </Col>
            <Col>
              <DonutEgresoCategoria
                idsucursal={globals.obtenerSucursal()}
                reload={reload}
              />
            </Col>
            <Col>
              <Card
                title="Progreso Objetivo Mes"
                size="small"
                style={{
                  borderRadius: "8px",
                  boxShadow: "2px 2px 3px 0px rgba(0, 0, 0, 0.5)",
                }}
              >
                <FoodLoader />
              </Card>
            </Col>
          </Row>
        </Card>
      </Card>
      <Modal
        destroyOnClose
        open={visible}
        onCancel={() => setVisible(false)}
        title="Nuevo Egreso"
        footer={null}
      >
        <GastoForm
          callback={(_) => {
            setReload(!reload);
            setVisible(false);
          }}
        />
      </Modal>
      <Modal
        open={listOpen}
        onCancel={(_) => {
          setListOpen(false);
        }}
        title="Listado"
        destroyOnClose
        width={"900px"}
        footer={null}
      >
        <ListaCaja idsucursal={globals.obtenerSucursal()} />
      </Modal>
      <Modal
        open={informeOpen}
        onCancel={(_) => {
          setInformeOpen(false);
        }}
        title="Detalle"
        destroyOnClose
        width={"1000px"}
        footer={null}
      >
        <InformeCajaV2
          idcaja={cajaActual?.idcaja}
          idsucursal={globals.obtenerSucursal()}
        />
      </Modal>
    </div>
  );
}
