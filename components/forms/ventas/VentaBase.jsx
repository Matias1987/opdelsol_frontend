import SelectCliente from "@/components/forms/ventas/SelectCliente";
import SelectMedico from "@/components/forms/ventas/SelectMedico";
import SelectObraSocial from "@/components/forms/ventas/SelectObraSocial";
import TotalesVenta from "@/components/forms/ventas/TotalVenta";
import globals from "@/src/globals";
import { cambiar_vendedor, use_owner_id } from "@/src/config";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Tabs,
  TimePicker,
} from "antd";
import esES from "antd/locale/es_ES";
import { useState } from "react";
import ModoPagoV4 from "../modo_pago/ModoPagoV4";
import SelectVendedor from "@/components/usuario/vendedor/SelectVendedor";
import { public_urls } from "@/src/urls";
import { CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

/* leer: https://refine.dev/blog/common-usestate-mistakes-and-how-to-avoid/ */
/**
 *
 * @param ocultarFechaRetiro
 * @returns
 */
export default function VentaBase(props) {
  const date = new Date();
  const [btnEnabled, setBtnEnabled] = useState(true);
  const [venta, setVenta] = useState({
    fkcliente: null,
    fkdestinatario: null,
    fkmedico: null,
    fkos: null,
    fkusuario: -1,
    mp: null,
    subtotal: 0,
    descuento: 0,
    total: 0,
    fechaRetiro: props.ignore_fecha_retiro
      ? date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
      : null,
    horaRetiro: null,
    comentarios: "",
    productos: null,
    fksucursal: globals.obtenerSucursal(),
    fkcaja: globals.obtenerCajaID(),
    json_items: "",
    tk: globals.getToken(),
    uid:"",
  });

  const onChange = (field, value) => {
    setVenta((venta) => {
      const __venta = { ...venta, [field]: value };
      props?.callback?.(__venta);
      return __venta;
    });
  };

  const finalizar_venta = (e) => {
    const idvendedor =
      cambiar_vendedor == 0 ? +globals.obtenerUID() : venta.fkusuario;

    if (idvendedor < 1) {
      alert("Seleccione Vendedor");
      return;
    }
    setBtnEnabled(false);
    setVenta((venta) => {
      props?.onfinish?.({ ...venta, fkusuario: idvendedor }, (_) => {
        setBtnEnabled(true);
      });
      return { ...venta, fkusuario: idvendedor };
    });
  };

  const onFinish = (values) => {};

  const onFinishFailed = (error) => {};

  const tabs_items = [
    {
      key: "paso1",
      label: <span style={{ fontWeight: "600" }}>Cliente y M&eacute;dico</span>,
      children: (
        <>
          <Row className="table-row-dark" style={{ padding: ".9em" }}>
            <Col span={24}>
              <SelectCliente
                openButtonText={
                  <span style={{ color: "#3300CC" }}>
                    &nbsp;*Seleccione Cliente
                  </span>
                }
                callback={(value) => {
                  onChange("fkcliente", value);
                }}
              />
            </Col>
          </Row>
          <Row className="table-row-light" style={{ padding: ".9em" }}>
            <Col span={24}>
              <SelectCliente
                destinatario
                callback={(value) => {
                  onChange("fkdestinatario", value);
                }}
              />
            </Col>
          </Row>
          <Row className="table-row-dark" style={{ padding: ".9em" }}>
            <Col span={24}>
              <SelectMedico
                medicoRequired={props.medicoRequired}
                openButtonText={
                  <span
                    style={{
                      color: props.medicoRequired ? "#3300CC" : "inherit",
                    }}
                  >
                    &nbsp;{props.medicoRequired ? "*" : ""}Seleccione
                    M&eacute;dico
                  </span>
                }
                callback={(value) => {
                  onChange("fkmedico", value);
                }}
              />
            </Col>
          </Row>

          <Row className="table-row-light" style={{ padding: ".9em" }}>
            <Col span={24}>
              <SelectObraSocial
                callback={(value) => {
                  onChange("fkos", value);
                }}
              />
            </Col>
          </Row>
        </>
      ),
    },
    {
      key: "paso2",
      label: <span style={{ fontWeight: "600" }}>Productos</span>,
      children: (
        <Row>
          <Col span={24}>
            <Form.Item>{props.children}</Form.Item>
          </Col>
        </Row>
      ),
    },
    {
      key: "paso3",
      label: <span style={{ fontWeight: "600" }}>Modo de Pago</span>,
      children: (
        <Row>
          <Col span={24}>
            <Form.Item>
              <TotalesVenta
                subtotal={typeof props !== "undefined" ? props.subTotal : "0"}
                total={typeof props !== "undefined" ? props.total : "0"}
                callback={(value) => {
                  onChange("descuento", value);
                }}
              />
              {
                <ModoPagoV4
                  total={typeof props !== "undefined" ? props.total : "0"}
                  callback={(value) => {
                    onChange("mp", value);
                  }}
                  tarjetaHidden={false}
                  ctacteHidden={false}
                  chequeHidden={false}
                  mutualHidden={false}
                />
              }
              {/*<ModoPagoV2 />*/}
            </Form.Item>
          </Col>
        </Row>
      ),
    },
    {
      /* fecha y hora de entrega opcional */
      key: "paso4",
      label: <span style={{ fontWeight: "600" }}>Finalizar Sobre</span>,
      children: (
        <>
        <Row gutter={24}>
          {props.ocultarFechaRetiro ? (
            <></>
          ) : (
            <>
              <Col>
                <Form.Item label={"Fecha de Retiro"}>
                  <DatePicker
                    defaultValue={props.ignore_fecha_retiro ? dayjs() : null}
                    locale={esES}
                    format={"DD-MM-YYYY"}
                    onChange={(value) => {
                      onChange("fechaRetiro", value.format("DD-MM-YYYY"));
                    }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label={"Hora de Retiro"}>
                  <TimePicker
                    format={"HH:mm"}
                    onChange={(value, timeString) => {
                      onChange("horaRetiro", timeString);
                    }}
                  />
                </Form.Item>
              </Col>
            </>
          )}
          </Row>

          {!use_owner_id  ? <></>:
          <Row style={{paddingTop:"6px", paddingBottom:"6px"}}>
            <Col span="24">
              <Input prefix="Nro. Sobre:" style={{maxWidth:"350px"}} allowClear onChange={e=>{
                onChange("uid",e.target.value)
              }} />
            </Col>
          </Row>
          }

          <Row>
            <Col span="24">
              <Form.Item label={"Comentarios"}>
                <Input.TextArea
                  rows={2}
                  onChange={(e) => {
                    onChange("comentarios", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              <Form.Item>
                <Button
                  style={{ borderRadius: "16px" }}
                  size="large"
                  disabled={!btnEnabled}
                  type="primary"
                  block
                  onClick={finalizar_venta}
                >
                  Imprimir Sobre
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
  ];

  return (
    <>
      <Card
        title={<>{props.title || "Venta"}</>}
        extra={
          cambiar_vendedor == 0 ? (
            <> </>
          ) : (
            <SelectVendedor
              onChange={(value) => {
                setVenta((_v) => ({ ..._v, fkusuario: value }));
              }}
            />
          )
        }
        size="small"
        style={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          borderRadius: "16px",
        }}
        styles={{
          header: {
            backgroundColor: "##ffffed",
            background:
              "linear-gradient(281deg,rgba(248,248,234, 1) 32%, rgba(231,233,235, 1) 75%)",
            borderBottom: "1px solid #eee",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          },
        }}
      >
        {
          <Row>
            <Col span={24}></Col>
          </Row>
        }
        <Row>
          <Col span={24}>
            <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <Tabs
                defaultActiveKey="paso1"
                items={tabs_items}
                size="large"
                type="line"
                tabPosition="top"
              />
            </Form>
          </Col>
        </Row>
        <Divider />
        {
          <Row>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                type="link"
                danger
                onClick={(_) => {
                  if (confirm("Cancelar Operación?")) {
                    window.location.replace(public_urls.dashboard_venta);
                  }
                }}
              >
                <CloseOutlined /> Cancelar
              </Button>
            </Col>
          </Row>
        }
      </Card>
    </>
  );
}
