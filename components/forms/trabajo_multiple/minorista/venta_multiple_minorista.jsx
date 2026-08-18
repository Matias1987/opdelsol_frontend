import globals from "@/src/globals";
import { cambiar_vendedor, cobro_inmediato } from "@/src/config";
import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Row,
  Tabs,
  TimePicker,
} from "antd";
import { useRef, useState } from "react";
import SelectVendedor from "@/components/usuario/vendedor/SelectVendedor";
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import { PlusCircleOutlined, SaveFilled } from "@ant-design/icons";
import SelectTrabajo from "./select_trabajo";
import SelectMedico from "../../ventas/SelectMedico";
import SelectObraSocial from "../../ventas/SelectObraSocial";
import SelectCliente from "../../ventas/SelectCliente";
import ModoPagoV4 from "../../modo_pago/ModoPagoV4";
import dayjs from "dayjs";
import esES from "antd/locale/es_ES";
//import useStorage from "@/useStorage";

/* leer: https://refine.dev/blog/common-usestate-mistakes-and-how-to-avoid/ */
/**
 *
 * @param ocultarFechaRetiro
 * @returns
 */
const VentaMultipleMinorista = ({
  ignore_fecha_retiro,
  onfinish,
  callback,
  title,
  on_change_done,
}) => {
  const date = new Date();
  const [localId, setLocalId] = useState(0);
  const [btnEnabled, setBtnEnabled] = useState(true);
  const [activeKey, setActiveKey] = useState("1");
  //const { setItem } = useStorage();
  const [venta, setVenta] = useState({
    fkcliente: null,
    fkdestinatario: null,
    fkmedico: null,
    fkos: null,
    fkusuario: globals.obtenerUID(),
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
    fkcaja: 0, //globals.obtenerCajaID(),
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
  const [idCliente, setIdCliente] = useState(0);
  const [finalV, setFinalV] = useState({});

  const updateTabName = (tabKey, newName) => {
    setItems((prevTabs) =>
      prevTabs.map((tab) =>
        +tab.key == +tabKey
          ? {
              ...tab,
              label: (
                <span
                  style={{
                    color: newName != "STOCK" ? "#262D42" : "#151a29",
                    fontWeight: "600",
                  }}
                >
                  {newName}
                </span>
              ),
            }
          : tab,
      ),
    );
  };

  const tab_content = (id) => (
    <>
      <SelectTrabajo
        localId={id}
        callback={onTabValuesChange}
        idCliente={idCliente}
        onRename={updateTabName}
      />
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
      on_change_done?.(mod.length > 0);
      return mod;
    });
  };

  const calcularTotal = (trabajos) => {
    const _subtotal = trabajos.reduce(
      (acc, trabajo) => acc + parseFloat(trabajo?.monto_total || "0"),
      0,
    );
    setSubTotal(_subtotal);

    setVenta((_v) => {
      const __v = {
        ..._v,
        subtotal: parseFloat(_subtotal ?? "0"),
        total: parseFloat(_subtotal) - parseFloat(_v.descuento),
      };
      setVentaLStorage(__v);
      return __v;
    });
  };

  const add = () => {
    const newActiveKey = newTabIndex.current++;
    setItems([
      ...(items || []),
      {
        label: "Nuevo Trabajo",
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
      on_change_done?.(mod.length > 0);
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
      setVentaLStorage(__venta);
      return __venta;
    });
  };

  const format_venta = () => {
    const procesar_items_laboratorio = (tr) => {
      const _items = [];
      if (tr.od_fkDisenio && tr?.od_fkDisenio > 0) {
        _items.push({
          idcodigo: tr.od_fkBase,
          iddisenio: tr.od_fkDisenio,
          iddescuento: tr.od_iddescuento,
          tipo: "od",
          cantidad: "1",
          descuento: tr.od_descuento,
          precio: tr.od_precio,
          esf: tr.od_esf,
          cil: tr.od_cil,
          eje: tr.od_eje,
          add: tr?.od_add ?? "",
        });
      }
      if (tr.oi_fkDisenio && tr?.oi_fkDisenio > 0) {
        _items.push({
          idcodigo: tr.oi_fkBase,
          iddisenio: tr.oi_fkDisenio,
          iddescuento: tr.oi_iddescuento,
          descuento: tr.oi_descuento,
          tipo: "oi",
          cantidad: "1",
          precio: tr.oi_precio,
          esf: tr.oi_esf,
          cil: tr.oi_cil,
          eje: tr.oi_eje,
          add: tr?.oi_add ?? "",
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
          iddescuento: tr.od_iddescuento || null,
          descuento: tr.od_descuento ?? "0",
          tipo: "od",
          cantidad: "1",
          precio: tr.od_precio,
          esf: "0",
          cil: "0",
          eje: tr.od_eje || "0",
        });
      }
      if (tr.oi_idcodigo && +tr.oi_idcodigo > 0) {
        _items.push({
          idcodigo: tr.oi_idcodigo,
          idtrabajo: 0,
          iddescuento: tr.oi_iddescuento || null,
          descuento: tr.oi_descuento ?? "0",
          tipo: "oi",
          cantidad: "1",
          precio: tr.oi_precio,
          esf: "0",
          cil: "0",
          eje: tr.oi_eje || "0",
        });
      }
      return _items;
    };

    const tt = trabajos.map((t) => ({
      tipo: t.tipo,
      nro: t.nro,
      comentarios: t.comentarios,
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
    //alert(JSON.stringify(__v));

    const msgs = validar(__v);

    if (msgs.length > 0) {
      alert(msgs[0]);
      return;
    }

    setFinalV(__v);

    const idvendedor =
      cambiar_vendedor == 0 ? +globals.obtenerUID() : venta.fkusuario;

    if (idvendedor < 1) {
      alert("Seleccione Vendedor");
      return;
    }
    setBtnEnabled(false);

    post_method(post.insert.insert_venta_multiple, __v, (response) => {
      alert("Datos guardados.");
      window.location.href = "";
    });
  };

  const c_items = [
    {
      key: "1",
      label: "Cliente, Médico y OS",
      children: (
        <Card>
          <Row
            style={{
              padding: "4px",
              border: "1px dotted #999999",
              borderRadius: "6px ",
            }}
          >
            <Col style={{ minWidth: "250px", width: "100%" }}>
              <SelectCliente callback={(id) => {onChange("fkcliente",id)}} />
            </Col>
          </Row>
          <Row
            style={{
              padding: "4px",
              border: "1px dotted #999999",
              borderRadius: "6px ",
            }}
          >
            <Col style={{ minWidth: "250px", width: "100%" }}>
              <SelectCliente destinatario callback={(id) => {onChange("fkdestinatario",id)}} />
            </Col>
          </Row>
          <Row
            style={{
              padding: "4px",
              border: "1px dotted #999999",
              borderRadius: "6px ",
            }}
          >
            <Col style={{ minWidth: "250px" }}>
              <SelectMedico callback={(id) => {onChange("fkmedico",id)}} />
            </Col>
          </Row>
          <Row
            style={{
              padding: "4px",
              border: "1px dotted #999999",
              borderRadius: "6px ",
            }}
          >
            <Col style={{ minWidth: "250px" }}>
              <SelectObraSocial callback={(id) => {onChange("fkos",id)}} />
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      key: "2",
      label: "Detalle",
      children: (
        <Card size="small" style={{ boxShadow: "-1px 1px 1px 0px #9e9c9c" }}>
          <Row>
            <Col span={24}>
              <Tabs
                addIcon={
                  <span
                    style={{
                      color: "#ff1818",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    <PlusCircleOutlined /> Agregar Trabajo
                  </span>
                }
                className="custom-body-tabs"
                type="editable-card"
                size={"small"}
                tabBarExtraContent={{
                  left: (
                    <div
                      style={{
                        display: "inline-block",
                        fontWeight: "bolder",
                        fontSize: "1.1em",
                        padding: "8px 16px",
                        color: "#262D42",
                      }}
                    >
                      &nbsp;&nbsp;&nbsp;Trabajos:&nbsp;&nbsp;&nbsp;
                    </div>
                  ),
                }}
                tabPosition="top"
                activeKey={activeKey}
                onChange={setActiveKey}
                onEdit={onEdit}
                items={items}
              />
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      key: "3",
      label: "Modo de Pago",
      children: (
        <Card
          size="small"
          style={{ boxShadow: "-1px 1px 1px 0px #9e9c9c" }}
          className="custom-body-tabs"
        >
          <Row style={{ marginBottom: "12px" }} gutter={[16,16]}>
            <Col>
              <Input
                readOnly
                addonBefore="Subtotal"
                style={{ width: "300px" }}
                value={subTotal}
              />
            </Col>
        
            <Col>
              <Input
                addonBefore="Descuento"
                style={{ width: "300px" }}
                onChange={(e) => setDescuento(parseFloat(e.target.value) || 0)}
              />
            </Col>
          
            <Col>
              <Input
                readOnly
                addonBefore="Total"
                style={{ width: "300px" }}
                value={subTotal - descuento}
              />
            </Col>
          </Row>

          <Row style={{ padding: "6px" }}>
            <Col span="24">
              <ModoPagoV4
                total={typeof props !== "undefined" ? props.total : "0"}
                callback={(value) => {onChange("mp",value)}}
                tarjetaHidden={false}
                ctacteHidden={false}
                chequeHidden={false}
                mutualHidden={false}
              />
            </Col>
          </Row>

          <Row style={{ padding: "6px" }}>
            <Col span={24}></Col>
          </Row>
        </Card>
      ),
    },
    {
      key: "4",
      label: "Fecha de Entrega y Comentarios",
      children: (
        <Card>
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
          <Row gutter={24}>
            {ignore_fecha_retiro ? (
              <></>
            ) : (
              <>
                <Col>
                  <Form.Item label={"Fecha de Retiro"}>
                    <DatePicker
                      defaultValue={ignore_fecha_retiro ? dayjs() : null}
                      locale={esES}
                      format={"DD-MM-YYYY"}
                      onChange={(value) => {
                       // let _value = value ? value.format("DD-MM-YYYY") : null;
                       // onChange("fechaRetiro", _value);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label={"Hora de Retiro"}>
                    <TimePicker
                      format={"HH:mm"}
                      onChange={(value, timeString) => {
                        //onChange("horaRetiro", timeString);
                      }}
                    />
                  </Form.Item>
                </Col>
              </>
            )}
          </Row>
        </Card>
      ),
    },
  ];

  const onChangeCollapse = (key) => {};

  const validar = (v) => {
    const messages = [];

    const validar_stock = (op) => {
      if (+op.idcodigo < 0) {
        messages.push("Seleccione codigo");
        return;
      }
    };

    const validar_lab = (op) => {
      if (+op.idcodigo < 0) {
        messages.push("Seleccione base");
        return;
      }
      if (+op.iddisenio < 0) {
        messages.push("Seleccione diseño");
        return;
      }

      if ("" == op.esf.toString()) {
        messages.push("Indique valor esf");
      }
      if ("" == op.cil.toString()) {
        messages.push("Indique valor cil");
      }
      if ("" == op.eje.toString()) {
        messages.push("Indique valor eje");
      }
    };

    if ((v?.trabajos?.length ?? 0) < 1) {
      messages.push("No se encontraron trabajos.");
      return;
    }

    for (let i = 0; i < v.trabajos.length; i++) {
      const t = v.trabajos[i];
      if (t.items.length < 1) {
        messages.push(
          "No se encontraron elementos en el trabajo " +
            (+i + 1) +
            "  " +
            t.tipo,
        );
        break;
      }

      if (t.tipo == "stock") {
        t.items.forEach((i) => validar_stock(i));
      } else {
        t.items.forEach((i) => validar_lab(i));
      }
    }

    return messages;
  };

  const setVentaLStorage = (_v) => {
    //setItem("last_op", JSON.stringify(_v));
  };

  return (
    <>
      <Card
        title={<>{title || "Nueva Operación"}</>}
        extra={
          <>
            {cambiar_vendedor == 0 ? (
              <> </>
            ) : (
              <SelectVendedor
                onChange={(value) => {
                  setVenta((_v) => {
                    const __v = { ..._v, fkusuario: value };
                    setVentaLStorage(__v);
                    return __v;
                  });
                }}
              />
            )}
            <Button type="primary" size="large">
              <SaveFilled /> Guardar Venta
            </Button>
          </>
        }
        size="small"
        style={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          borderRadius: "0px",
        }}
        styles={{
          header: {
            backgroundColor: "#ffffed",
            background: "linear-gradient(281deg,#DDDDDD 32%, #DDDDDD 75%)",
            borderBottom: "1px solid #eee",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
          },
        }}
      >
        <Row>
          <Col span={24}>
            <Collapse
              accordion
              items={c_items}
              defaultActiveKey={["1"]}
              onChange={onChangeCollapse}
            />
          </Col>
        </Row>
      </Card>
      <Input.TextArea value={JSON.stringify({...venta, trabajos:trabajos})} />
  
    </>
  );
};
export default VentaMultipleMinorista;
