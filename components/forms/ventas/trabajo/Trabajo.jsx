import SelectCliente from "@/components/forms/ventas/SelectCliente";
import globals from "@/src/globals";
import { cambiar_vendedor, cobro_inmediato, use_owner_id } from "@/src/config";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  TimePicker,
} from "antd";
import esES from "antd/locale/es_ES";
import { useState } from "react";
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
export default function Trabajo(props) {
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
    uid: "",
    entrega: false,
    cobrar: cobro_inmediato,
    validarCristalesModo2: false,
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

  const modo_formulario_unico = (_) => (
    <>
      <Row className="table-row-dark" style={{ padding: ".9em" }}>
        <Col style={{ minWidth: "250px" }}>
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
      <Divider />

      <Card
        title="Productos"
        size="small"
        style={{ boxShadow: "-1px 3px 3px 2px #9e9c9c" }}
      >
        <Row>
          <Col span={24}>
            <Form.Item>{props.children}</Form.Item>
          </Col>
        </Row>
      </Card>
      <Divider />
      <Card size="small" style={{ boxShadow: "-1px 3px 3px 2px #9e9c9c" }}>
        <Row gutter={24} style={{ padding: "6px" }}>
          <Col>
            <Form.Item label={"Fecha de Retiro"}>
              <DatePicker
                defaultValue={props.ignore_fecha_retiro ? dayjs() : null}
                locale={esES}
                format={"DD-MM-YYYY"}
                onChange={(value) => {
                  let _value = value ? value.format("DD-MM-YYYY") : null;
                  onChange("fechaRetiro", _value);
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
        </Row>
        <Row style={{ padding: "6px" }}>
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
        <Row style={{ padding: "6px" }}>
          <Col span={24}>
            <Button
                style={{ borderRadius: "16px" }}
                size="large"
                disabled={!btnEnabled}
                type="primary"
                block
                onClick={finalizar_venta}
              >
                Imprimir Trabajo
              </Button>
          </Col>
        </Row>
      </Card>
    </>
  );

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
        <Row>
          <Col span={24}>{modo_formulario_unico()}</Col>
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
