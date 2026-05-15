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
  Select,
  Tabs,
  TimePicker,
} from "antd";
import esES from "antd/locale/es_ES";
import { useRef, useState } from "react";
import SelectVendedor from "@/components/usuario/vendedor/SelectVendedor";
import { post, public_urls } from "@/src/urls";
import { CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import VMTrabajo from "./vm_trabajo";
import Informe from "./informe/informe";
import { post_method } from "@/src/helpers/post_helper";

/* leer: https://refine.dev/blog/common-usestate-mistakes-and-how-to-avoid/ */
/**
 *
 * @param ocultarFechaRetiro
 * @returns
 */
const TrabajoMultiple = ({
  ignore_fecha_retiro,
  onfinish,
  callback,
  title,
}) => {
  const date = new Date();
  const [localId, setLocalId] = useState(0);
  const [btnEnabled, setBtnEnabled] = useState(true);
  const [activeKey, setActiveKey] = useState("1");
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
    fechaRetiro:
      ignore_fecha_retiro || false
        ? date.getDate() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getFullYear()
        : null,
    horaRetiro: null,
    comentarios: "",
    fksucursal: globals.obtenerSucursal(),
    fkcaja: 4165,//globals.obtenerCajaID(),
    json_items: "",
    tk: globals.getToken(),
    uid: "",
    entrega: false,
    cobrar: cobro_inmediato,
    validarCristalesModo2: false,
    trabajos: [],
  });
  const [subTotal, setSubTotal] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [trabajos, setTrabajos] = useState([]);
  const [items, setItems] = useState([]);
  const [idCliente, setIdCliente] = useState(-1)
  const [finalV, setFinalV] = useState({});

  const tab_content = (id) => (
    <>
      <VMTrabajo localId={id} callback={onTabValuesChange} idCliente={idCliente} />
    </>
  );

  const newTabIndex = useRef(0);

  const onTabValuesChange = (data) => {
    setTrabajos((t) => {
      const mod = [...t];
      const index = mod.findIndex((t) => +t.localId == +data.localId);
      if (index !== -1) {
        mod[index] = { ...mod[index], ...data };
      } else {
        mod.push(data);
      }
      calcularTotal(mod);
      return mod;
    });
  };

  const calcularTotal = (trabajos) => {
    setSubTotal(
      trabajos.reduce(
        (acc, trabajo) => acc + parseFloat(trabajo?.monto_total || "0"),
        0,
      ),
    );
  };

  const add = () => {
    const newActiveKey = newTabIndex.current++;
    setItems([
      ...(items || []),
      {
        label: "Trabajo #" + items.length,
        key: newActiveKey,
        children: <>{tab_content(newActiveKey)}</>,
      },
    ]);
    setActiveKey(newActiveKey);
  };
  const remove = (targetKey) => {
    if (!items) {
      return;
    }
    const targetIndex = items.findIndex((item) => item.key === targetKey);
    const newItems = items.filter((item) => item.key !== targetKey);
    if (newItems.length && targetKey === activeKey) {
      const newActiveKey =
        newItems[
          targetIndex === newItems.length ? targetIndex - 1 : targetIndex
        ].key;
      setActiveKey(newActiveKey);
    }

    setTrabajos((t) => {
      const mod = [...t];
      const index = mod.findIndex((t) => +t.localId == +targetKey);
      if (index !== -1) {
        mod.splice(index, 1);
      }
      calcularTotal(mod);
      return mod;
    });
    setItems(newItems);
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  const onChange = (field, value) => {
    setVenta((venta) => {
      const __venta = { ...venta, [field]: value };
      callback?.(__venta);
      return __venta;
    });
  };

  const format_venta = () => {
    const procesar_items_laboratorio = (tr) => {
      const _items = [];
      if (tr.od_fkDisenio && tr?.od_fkDisenio > 0) {
        _items.push({
          idcodigo: tr.od_fkBase,
          idtrabajo: tr.od_fkDisenio,
          iddescuento: tr.od_iddescuento,
          tipo: "od",
          cantidad: "1",
          descuento: tr.od_descuento,
          precio: tr.od_precio,
          esf: tr.od_esf,
          cil: tr.od_cil,
          eje: tr.od_eje,
        });
      }
      if (tr.oi_fkDisenio && tr?.oi_fkDisenio > 0) {
        _items.push({
          idcodigo: tr.oi_fkBase,
          idtrabajo: tr.oi_fkDisenio,
          iddescuento: tr.oi_iddescuento,
          descuento: tr.oi_descuento,
          tipo: "oi",
          cantidad: "1",
          precio: tr.oi_precio,
          esf: tr.oi_esf,
          cil: tr.oi_cil,
          eje: tr.oi_eje,
        });
      }
      return _items;
    };
    const procesar_items_stock = (tr) => {
      const _items = [];
      if (tr.od_idcodigo && +tr.od_idcodigo > 0) {
        _items.push({
          idcodigo: tr.od_idcodigo,
          idtrabajo: 0,
          iddescuento: 0,
          tipo: "od",
          cantidad: "1",
          precio: "0",
          esf: "0",
          cil: "0",
          eje: "0",
        });
      }
      if (tr.oi_idcodigo && +tr.oi_idcodigo > 0) {
        _items.push({
          idcodigo: tr.oi_idcodigo,
          idtrabajo: 0,
          iddescuento: 0,
          tipo: "oi",
          cantidad: "1",
          precio: "0",
          esf: "0",
          cil: "0",
          eje: "0",
        });
      }
      return _items;
    };

    const tt = trabajos.map((t) => ({
      tipo: t.tipo,
      nro: t.nro,
      items:
        t.tipo != "stock"
          ? procesar_items_laboratorio(t.items)
          : procesar_items_stock(t.items),
    }));

    return { ...venta, trabajos: tt };
  };

  const finalizar_venta = (e) => {
    //alert(JSON.stringify({ ...venta, trabajos }));
    const __v = format_venta();
    //alert(JSON.stringify());
    setFinalV(__v);
    return;
    const idvendedor =
      cambiar_vendedor == 0 ? +globals.obtenerUID() : venta.fkusuario;

    if (idvendedor < 1) {
      alert("Seleccione Vendedor");
      return;
    }
    //setBtnEnabled(false);
    /*setVenta((venta) => {
      
      onfinish?.(venta, (resp) => {
        setBtnEnabled(true);
        alert("OK")
      });
      return { ...venta, fkusuario: idvendedor };
    });*/
    post_method(post.insert.insert_venta_multiple,__v,(response)=>{
      alert(JSON.stringify(response))
    })
  };

  const modo_formulario_unico = (_) => (
    <>
      <Row style={{ padding: ".9em" }}>
        <Col style={{ minWidth: "250px" }}>
          <SelectCliente
            openButtonText={
              <span style={{ color: "#3300CC" }}>
                Cliente: &nbsp;*Seleccione...
              </span>
            }
            callback={(value) => {
              onChange("fkcliente", value);
              setIdCliente(value);
            }}
          />
        </Col>
      </Row>
      <Divider />

      <Card
        
        size="small"
        style={{ boxShadow: "-1px 1px 1px 0px #9e9c9c" }}
      >
        <Row>
          <Col span={24}>
            <Tabs
              type="editable-card"
              size={"small"}
              tabBarExtraContent={{left:<span style={{fontWeight:"600", fontSize:"1.1em", paddingRight:"16px", color:"#00000f"}}> Trabajos: </span>}}
              tabPosition="top"
              tab
              activeKey={activeKey}
              onChange={setActiveKey}
              onEdit={onEdit}
              items={items}
            />
          </Col>
          
        </Row>
      </Card>
      <Divider />
      <Card size="small" style={{ boxShadow: "-1px 3px 3px 2px #9e9c9c" }}>
        <Row style={{ marginBottom: "12px" }}>
          <Col span={24}>
            <Input
              readOnly
              prefix="Subtotal"
              style={{ width: "300px" }}
              value={subTotal}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "12px" }}>
          <Col span={24}>
            <Input
              prefix="Descuento"
              style={{ width: "300px" }}
              onChange={(e) => setDescuento(parseFloat(e.target.value) || 0)}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "12px" }}>
          <Col span={24}>
            <Input
              readOnly
              prefix="Total"
              style={{ width: "300px" }}
              value={subTotal - descuento}
            />
          </Col>
        </Row>
        <Row gutter={24} style={{ padding: "6px" }}>
          <Col>
            <Form.Item label={"Fecha de Retiro"}>
              <DatePicker
                defaultValue={ignore_fecha_retiro ? dayjs() : null}
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
              disabled={false}
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
        title={<>{title || "Venta"}</>}
        extra={
          cambiar_vendedor == 10 ? (
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
      {
            <Col span={8}>
              <div
                style={{
                  backgroundColor: "#000000",
                  color: "#00ff00",
                  fontFamily: "Consolas",
                  height: "400px",
                  overflowY: "scroll",
                  overflowX: "scroll",
                }}
              >
                <pre style={{ font: "Consolas" }}>
                  {JSON.stringify(finalV, null, 2)}
                </pre>
              </div>
            </Col>
          }
      <Informe idventa={69747} />
    </>
  );
};
export default TrabajoMultiple;
