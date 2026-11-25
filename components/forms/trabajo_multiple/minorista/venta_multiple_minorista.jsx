import globals from "@/src/globals";
import { cambiar_vendedor, cobro_inmediato } from "@/src/config";
import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Divider,
  Dropdown,
  Grid,
  Input,
  Modal,
  Row,
  Tabs,
  TimePicker,
} from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import SelectVendedor from "@/components/usuario/vendedor/SelectVendedor";
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import PlusCircleOutlined from "@ant-design/icons/PlusCircleOutlined";
import SaveFilled from "@ant-design/icons/SaveFilled";
import SelectTrabajo from "./select_trabajo";
import ModoPagoV4 from "../../modo_pago/ModoPagoV4";
import dayjs from "dayjs";
import esES from "antd/locale/es_ES";
import {
  obtenerObjetoLCLaboratorio,
  obtenerObjetoLCStock,
  obtenerObjetoMonofocalLaboratorio,
  obtenerObjetoMultifocalLaboratorio,
  obtenerObjetoRecetaStock,
  parse_for_backcmp,
} from "@/src/helpers/venta_multiple_helper";
import RecipeScanner from "@/components/etc/RecipeScanner";
import ProcessIAResponse from "./common/processIAResponse";
import SelectClienteV3 from "../../../cliente/SelectClienteV3";
import { setItem } from "localforage";
import SelectMedicoV2 from "../../ventas/common/SelectMedicoV2";
import SelectObraSocialV2 from "../../ventas/common/SelectObraSocialV2";
import {
  ClockCircleOutlined,
  PlusOutlined,
  ScanOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useDniLookup } from "@/src/hooks/useDniLookup";
import ClienteFormV3 from "@/components/cliente/ClienteFormV3";

const { useBreakpoint } = Grid;
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
  draft,
}) => {
  const date = new Date();
  const [btnEnabled, setBtnEnabled] = useState(true);
  const [activeKey, setActiveKey] = useState("1");
  const [defaultValues, setDefaultValues] = useState("");

  const [modalScanOpen, setModalScanOpen] = useState(false);
  const [scanningTrabajo, setScanningTrabajo] = useState({
    localId: 0,
    serverResponse: null,
  }); //for test only
  const [modalEditarRespuestaOpen, setModalEditarRespuestaOpen] =
    useState(false);

  const [venta, setVenta] = useState({
    fkcliente: null,
    fkdestinatario: null,
    fkmedico: null,
    fkos: null,
    fkusuario: globals.obtenerUID(),
    mp: null,
    subtotal: 0,
    descuento: 0,
    descuentoMutual: 0,
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
    fkcaja: 0,
    json_items: "",
    tk: "",
    uid: "",
    entrega: false,
    cobrar: cobro_inmediato,
    validarCristalesModo2: false,
    trabajos: [],
    tipo: globals.tiposVenta.MULTIPLE_MIN,
  });
  const [trabajos, setTrabajos] = useState([]);
  const trabajosRef = useRef(trabajos);
  const [idCliente, setIdCliente] = useState(0);
  const [finalV, setFinalV] = useState({});
  const newTabIndex = useRef(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [pendingClienteData, setPendingClienteData] = useState(null);
  const [popupAddClienteOpen, setPopupAddClienteOpen] = useState(false);
  const screens = useBreakpoint();

  const { processScannedDni, isSearching } = useDniLookup({
    onClientFound: (client) => {
      //setPendingClienteData(null);
      setVenta((v) => ({ ...v, fkcliente: client.idcliente }));
    },
    onClientNotFound: (scannedData) => {
      setPopupAddClienteOpen(true);
    },
  });

  useEffect(() => {
    if (draft && firstLoad) {
      setFirstLoad(false);
      if (draft.datosDni) {
        setPendingClienteData({
          dni: draft.datosDni.numeroDocumento,
          fechaNacimiento: "11/10/1990",
          sexo: "M",
          apellido: draft.datosDni.apellido,
          nombre: draft.datosDni.nombre,
        });
      }
      if (draft.datosReceta) {
        setScanningTrabajo((_) => ({
          serverResponse: draft.datosReceta,
          localId: -1,
          tipo_venta: "",
        }));
        setModalEditarRespuestaOpen(true);
      }
    }
    trabajosRef.current = trabajos;
  }, [trabajos]);

  const updateNestedValue = (prev, path, keys, values) => {
    // 1. Deep clone or shallow copy the structure to avoid mutating state
    const cloned = { ...prev };
    let current = cloned;

    // 2. Traverse down to the second-to-last key
    for (let i = 0; i < path.length; i++) {
      const key = path[i];
      current[key] = { ...current[key] }; // Copy the nested object
      current = current[key];
    }

    keys.forEach((key, index) => {
      console.log(
        "updateNestedValue: setting key=" + key + " to value=" + values[index],
      );
      current[key] = values[index];
    });


    return cloned;
  };

  const obtenerTrabajoObject = (tipo) => {
    switch (tipo) {
      case "rec_st":
        return obtenerObjetoRecetaStock();
      case "monof_lab":
        return obtenerObjetoMonofocalLaboratorio();
      case "multi_lab":
        return obtenerObjetoMultifocalLaboratorio();
      case "lc_st":
        return obtenerObjetoLCStock();
      case "lc_lab":
        return obtenerObjetoLCLaboratorio();
      default:
        console.log("Tipo de trabajo no reconocido: " + tipo);
        break;
    }
  };

  const onTipoTrabajoSelected = (tabKey, newName, val) => {
    const _trabajos = trabajosRef.current;

    const trabajo = _trabajos.find((t) => +t.localId == +tabKey);
    if (!trabajo) {
      console.log("Error: No se encontró el trabajo con localId: " + tabKey);
      return;
    }

    const newObject = _trabajos.map((t) =>
      +t.localId == +tabKey
        ? { ...t, tipo: val, items: obtenerTrabajoObject(val) }
        : t,
    );

    setTrabajos((_) => newObject);
  };

  const onTabValuesChange = (data) => {
    const { path, keys, values } = data;
    //find the trabajo with localId == data.localId
    const _trabajos = trabajosRef.current;
    const index = _trabajos.findIndex((t) => +t.localId == +data.localId);
    const trabajo = _trabajos[index];

    if (!trabajo) {
      alert("Error: No se encontró el trabajo con localId: " + data.localId);
      return;
    }

    const newTrabajo = updateNestedValue(trabajo, path, keys, values);

    const newTrabajos = [...trabajos];

    newTrabajos[index] = newTrabajo;

    const _subtotal = calcularTotal(newTrabajos);

    setVenta((v) => ({
      ...v,
      subtotal: _subtotal,
      total:
        parseFloat(_subtotal) -
        parseFloat(v.descuento) -
        parseFloat(v.descuentoMutual),
    }));

    setTrabajos(newTrabajos);
  };

  const onValuesScanned = (data, pTipoTrabajo) => {
    /**
     * es posible que el tipo de venta no este definido en el objeto local y que ademas el localId del trabajo sea negativo
     * en el primer caso se debe obtener el objeto segun el tipo de ventas
     * en el segundo caso ademas se debe agregar el trabajo al array
     */
    const _tt = [...trabajos];

    //trabajo a agregar
    if (scanningTrabajo.localId < 0) {
      //logic here...
      const newActiveKey = newTabIndex.current++;

      const trabajoObject = {
        localId: newActiveKey,
        nro: newActiveKey,
        tipo: pTipoTrabajo,
        monto_total: 0,
        comentarios: "",
        items: data,
      };
      //alert(JSON.stringify(trabajoObject))
      setTrabajos((t) => [...t, trabajoObject]);
      setActiveKey(newActiveKey.toString());
      return;
    }

    const index = _tt.findIndex(
      (t) => +t.localId == +scanningTrabajo.localId ?? 0,
    );

    _tt[index].items = data;

    setTrabajos(_tt);
  };

  const onScanValues = (data, localId, tipo_venta, usarDistancia = true) => {
    setScanningTrabajo({
      localId: localId,
      usarDistancia: usarDistancia,
      serverResponse: data,
      tipo_venta: tipo_venta,
    });
    setModalScanOpen(true);
  };

  const getItems = useMemo(() => {
    return trabajos.map((t) => ({
      label: t.tipo || "Nuevo Trabajo", // Dynamically changes tab name if type updates
      key: t.localId.toString(), // ✅ Keeps keys as strings
      children: (
        <SelectTrabajo
          localId={t.localId}
          callback={onTabValuesChange}
          idCliente={idCliente}
          onTipoTrabajoSelected={onTipoTrabajoSelected}
          trabajoObject={t}
          path={[]}
          onScanValues={onScanValues}
        />
      ),
    }));
  }, [trabajos, idCliente]);

  const calcularTotal = (trabajos) => {
    let _subtotal = 0;

    trabajos.forEach((t) => {
      if (!t.items.lejos && !t.items.cerca) {
        _subtotal += parseFloat(t.items.od_precio ?? "0");
        _subtotal += parseFloat(t.items.oi_precio ?? "0");
        //_subtotal += parseFloat(t.items.armazon_precio ?? "0");
        //_subtotal += parseFloat(t.items.tratamiento_precio ?? "0");
        //_subtotal += parseFloat(t.items.insumo_precio ?? "0");
        return;
      }
      //alert(JSON.stringify(t));
      if (t.items.lejos) {
        _subtotal += parseFloat(t.items.lejos.od_precio ?? "0");
        _subtotal += parseFloat(t.items.lejos.oi_precio ?? "0");
        //_subtotal += parseFloat(t.items.lejos.armazon_precio ?? "0");
        //_subtotal += parseFloat(t.items.lejos.tratamiento_precio ?? "0");
        //_subtotal += parseFloat(t.items.lejos.insumo_precio ?? "0");
      }
      if (t.items.cerca) {
        _subtotal += parseFloat(t.items.cerca.od_precio ?? "0");
        _subtotal += parseFloat(t.items.cerca.oi_precio ?? "0");
        //_subtotal += parseFloat(t.items.cerca.armazon_precio ?? "0");
        //_subtotal += parseFloat(t.items.cerca.tratamiento_precio ?? "0");
        //_subtotal += parseFloat(t.items.cerca.insumo_precio ?? "0");
      }
    });
    //alert(_subtotal);
    return _subtotal;
    // setSubTotal(_subtotal);
    /*
    setVenta((_v) => {
      const __v = {
        ..._v,
        subtotal: parseFloat(_subtotal ?? "0"),
        total:
          parseFloat(_subtotal) -
          parseFloat(_v.descuento) -
          parseFloat(_v.descuentoMutual),
      };
      setVentaLStorage(__v);
      return __v;
    });*/
  };

  const add = () => {
    const newActiveKey = newTabIndex.current++;

    const trabajoObject = {
      localId: newActiveKey,
      nro: newActiveKey,
      tipo: "",
      monto_total: 0,
      comentarios: "",
    };

    setTrabajos((t) => [...t, trabajoObject]);

    setActiveKey(newActiveKey.toString());
  };

  const remove = (targetKey) => {
    const modTrabajos = [...trabajosRef.current];
    const index = modTrabajos.findIndex((t) => +t.localId == +targetKey);
    if (index !== -1) {
      modTrabajos.splice(index, 1);
    }
    calcularTotal(modTrabajos);

    setTrabajos((t) => {
      return modTrabajos;
    });

    on_change_done?.(modTrabajos.length > 0);
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  const onChange = (field, value) => {
    const __venta = { ...venta, [field]: value };
    setVentaLStorage(__venta);
    setVenta((venta) => {
      return __venta;
    });
  };

  const format_venta = () => {
    if (trabajos.length < 2) {
      //get tipo
      const _tipo = trabajos[0].tipo;

      let _tipo_id = "";

      switch (_tipo) {
        case "dir":
          _tipo_id = globals.tiposVenta.DIRECTA;
          break;
        case "rec_st":
          _tipo_id = globals.tiposVenta.RECSTOCK;
          break;
        case "monof_lab":
          _tipo_id = globals.tiposVenta.MONOFLAB;
          break;
        case "multi_lab":
          _tipo_id = globals.tiposVenta.MULTILAB;
          break;
        case "lc_st":
          _tipo_id = globals.tiposVenta.LCSTOCK;
          break;
        case "lc_lab":
          _tipo_id = globals.tiposVenta.LCLAB;
          break;
      }

      return {
        ...venta,
        trabajos: parse_for_backcmp(trabajos[0]),
        tipo: _tipo_id,
      };
    }

    const procesar_items = (tr, has_dist) => {
      if (!tr) {
        return [];
      }
      const _items = [];
      if (has_dist) {
        return [
          ...procesar_items(tr.lejos, false),
          ...procesar_items(tr.cerca, false),
        ];
      }
      if (tr.od_idcodigo && +tr.od_idcodigo > 0) {
        _items.push({
          idcodigo: tr.od_idcodigo,
          idtrabajo: 0,
          iddescuento: tr.od_iddescuento || null,
          descuento: tr.od_descuento ?? "0",
          tipo: (tr.distancia ? tr.distancia + "_" : "") + "od",
          cantidad: "1",
          precio: tr.od_precio,
          esf: "0",
          cil: "0",
          eje: tr.od_eje || "0",
          distancia: tr.distancia ?? "",
        });
      }
      if (tr.oi_idcodigo && +tr.oi_idcodigo > 0) {
        _items.push({
          idcodigo: tr.oi_idcodigo,
          idtrabajo: 0,
          iddescuento: tr.oi_iddescuento || null,
          descuento: tr.oi_descuento ?? "0",
          tipo: (tr.distancia ? tr.distancia + "_" : "") + "oi",
          cantidad: "1",
          precio: tr.oi_precio,
          esf: "0",
          cil: "0",
          eje: tr.oi_eje || "0",
          distancia: tr.distancia ?? "",
        });
      }
      if (tr.armazon_idcodigo && +tr.armazon_idcodigo > 0) {
        _items.push({
          idcodigo: tr.armazon_idcodigo,
          idtrabajo: 0,
          iddescuento: tr.armazon_iddescuento || null,
          descuento: tr.armazon_descuento ?? "0",
          tipo: (tr.distancia ? tr.distancia + "_" : "") + "armazon",
          cantidad: "1",
          precio: tr.armazon_precio,
          esf: "0",
          cil: "0",
          eje: "0",
          distancia: tr.distancia ?? "",
        });
      }
      if (tr.tratamiento_idcodigo && +tr.tratamiento_idcodigo > 0) {
        _items.push({
          idcodigo: tr.tratamiento_idcodigo,
          idtrabajo: 0,
          iddescuento: tr.tratamiento_iddescuento || null,
          descuento: tr.tratamiento_descuento ?? "0",
          tipo: (tr.distancia ? tr.distancia + "_" : "") + "tratamiento",
          cantidad: "1",
          precio: tr.tratamiento_precio,
          esf: "0",
          cil: "0",
          eje: "0",
          distancia: tr.distancia ?? "",
        });
      }
      if (tr.insumo_idcodigo && +tr.insumo_idcodigo > 0) {
        _items.push({
          idcodigo: tr.insumo_idcodigo,
          idtrabajo: 0,
          iddescuento: tr.insumo_iddescuento || null,
          descuento: tr.insumo_descuento ?? "0",
          tipo: (tr.distancia ? tr.distancia + "_" : "") + "insumo",
          cantidad: "1",
          precio: tr.insumo_precio,
          esf: "0",
          cil: "0",
          eje: tr.insumo_eje || "0",
          distancia: tr.distancia ?? "",
        });
      }
      return _items;
    };

    const tt = trabajos.map((t) => ({
      tipo: t.tipo,
      nro: t.nro,
      comentarios: t.comentarios,
      items: procesar_items(
        t.items,
        t.tipo == "rec_st" || t.tipo == "monof_lab",
      ),
    }));

    return { ...venta, trabajos: tt };
  };

  const finalizar_venta = (e) => {
    alert(JSON.stringify(trabajos));

    const __v = format_venta();
    alert(JSON.stringify(__v));
    //return;
    /*
    const msgs = validar(__v);

    if (msgs.length > 0) {
      alert(msgs[0]);
      return;
    }
    */
    setFinalV(__v);
    return;
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

  const row_style = {
    padding: "8px",
  };

  const c_items = [
    {
      key: "1",
      label: "Cliente, Médico y OS",
      children: (
        <Card>
          <Row style={row_style}>
            <Col style={{ minWidth: "250px", width: "100%" }}>
              <SelectClienteV3
                pIdcliente={venta.fkcliente}
                callback={(id) => {
                  onChange("fkcliente", id);
                }}
              />
            </Col>
          </Row>
          <Row style={row_style}>
            <Col style={{ minWidth: "250px", width: "100%" }}>
              <SelectClienteV3
                destinatario
                callback={(id) => {
                  onChange("fkdestinatario", id);
                }}
              />
            </Col>
          </Row>
          <Row style={row_style}>
            <Col style={{ minWidth: "250px", width: "100%" }}>
              <SelectMedicoV2
                callback={(id) => {
                  onChange("fkmedico", id);
                }}
              />
            </Col>
          </Row>
          <Row style={row_style}>
            <Col style={{ minWidth: "250px", width: "100%" }}>
              <SelectObraSocialV2
                callback={(id) => {
                  onChange("fkos", id);
                }}
              />
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      key: "2",
      label: "Detalle",
      children: (
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
                  <PlusCircleOutlined />
                </span>
              }
              hideAdd={true}
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
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: "1",
                            label: (
                              <a
                                style={{
                                  color: "#da4035",
                                  fontWeight: "600",
                                  borderRadius: "16px",
                                  backgroundColor: "#f8f8f8",
                                  fontSize: "24px",
                                }}
                                onClick={(_) => {
                                  onScanValues?.(null, -1, "", true);
                                }}
                              >
                                <ScanOutlined />
                                &nbsp; Leer Receta...
                              </a>
                            ),
                          },
                          {
                            key: "1",
                            label: (
                              <a
                                style={{
                                  color: "#028b02",
                                  fontWeight: "600",
                                  borderRadius: "16px",
                                  backgroundColor: "#f8f8f8",
                                  fontSize: "24px",
                                }}
                                onClick={(_) => {
                                  add();
                                }}
                              >
                                <PlusOutlined /> &nbsp; Agregar Manualmente
                              </a>
                            ),
                          },
                          {
                            key: "1",
                            disabled: true,
                            label: (
                              <a
                                style={{
                                  color: "#3543da",
                                  fontWeight: "600",
                                  borderRadius: "16px",
                                  backgroundColor: "#f8f8f8",
                                  fontSize: "24px",
                                }}
                                onClick={(_) => {
                                  add();
                                }}
                              >
                                <ClockCircleOutlined /> &nbsp; Utilizar
                                &uacute;ltima graduaci&oacute;n
                              </a>
                            ),
                          },
                        ],
                      }}
                      placement="bottom"
                    >
                      <Button
                        size="large"
                        style={{
                          color: "#da4035",
                          fontWeight: "600",
                          boxShadow: "0 4px 4px 0 rgba(0,0,0,0.2)",
                          borderRadius: "16px",
                          backgroundColor: "#f8f8f8",
                        }}
                      >
                        Agregar Trabajo
                      </Button>
                    </Dropdown>
                  </div>
                ),
              }}
              tabPosition="top"
              activeKey={activeKey}
              onChange={setActiveKey}
              onEdit={onEdit}
              items={getItems}
            />
          </Col>
        </Row>
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
          <Row
            style={{
              marginBottom: "12px",
              backgroundColor: "#ebeaea",
              padding: "2px",
              borderRadius: "4px",
            }}
            gutter={[12, 12]}
          >
            <Col>
              <Input
                readOnly
                addonBefore="Subtotal"
                style={{ width: "300px" }}
                value={venta.subtotal}
              />
            </Col>

            <Col>
              <Input
                value={venta.descuento}
                addonBefore={
                  <span style={{ fontWeight: "600" }}>Descuento</span>
                }
                style={{ width: "300px" }}
                onChange={(e) =>
                  onChange("descuento", parseFloat(e.target.value) || 0)
                }
              />
            </Col>
            <Col>
              <Input
                value={venta.descuentoMutual}
                addonBefore={
                  <span style={{ fontWeight: "600" }}>Descuento Mutual</span>
                }
                style={{ width: "300px" }}
                onChange={(e) =>
                  onChange("descuentoMutual", parseFloat(e.target.value) || 0)
                }
              />
            </Col>

            <Col>
              <Input
                readOnly
                addonBefore="Total"
                style={{ width: "300px" }}
                value={
                  parseFloat(venta.subtotal) -
                  parseFloat(venta.descuento) -
                  parseFloat(venta.descuentoMutual)
                }
              />
            </Col>
          </Row>

          <Row style={{ padding: "6px" }}>
            <Col span="24">
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
              Comentarios:
              <Input.TextArea
                rows={2}
                onChange={(e) => {
                  onChange("comentarios", e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row style={{ padding: "6px" }}>
            {ignore_fecha_retiro ? (
              <></>
            ) : (
              <>
                <Col span={12}>
                  <DatePicker
                    prefix="Fecha Retiro"
                    defaultValue={ignore_fecha_retiro ? dayjs() : null}
                    locale={esES}
                    format={"DD-MM-YYYY"}
                    onChange={(value) => {
                      let _value = value ? value.format("DD-MM-YYYY") : null;
                      onChange("fechaRetiro", _value);
                    }}
                  />
                </Col>
                <Col span={12}>
                  <TimePicker
                    prefix="Hora"
                    format={"HH:mm"}
                    onChange={(value, timeString) => {
                      onChange("horaRetiro", timeString);
                    }}
                  />
                </Col>
              </>
            )}
          </Row>
          <Divider />
          <Row style={{ padding: "6px" }}>
            <Col span={24}>
              <Button
                block
                type="default"
                size="middle"
                onClick={finalizar_venta}
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 4px 4px 0 rgba(0,0,0,0.2)",
                }}
              >
                <SaveFilled />
                Guardar
              </Button>
            </Col>
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
            <Button
              type="default"
              size="middle"
              onClick={finalizar_venta}
              style={{
                borderRadius: "16px",
                boxShadow: "0 4px 4px 0 rgba(0,0,0,0.2)",
              }}
            >
              <SaveFilled />
              Guardar
            </Button>
          </>
        }
        size="small"
        styles={{
          header: {
            backgroundColor: "#ffffed",

            borderBottom: "1px solid #eee",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
          },
        }}
      >
        <Row>
          <Col span={24}>
            {!screens.md ? (
              <Collapse
                accordion
                items={c_items}
                defaultActiveKey={["1"]}
                onChange={onChangeCollapse}
              />
            ) : (
              <Tabs
                type="card"
                items={c_items}
                defaultActiveKey={["1"]}
                tabPosition="top"
                size="large"
              />
            )}
          </Col>
          {/*<Col span={12}>
            <div
              style={{
                height: "600px",
                overflowY: "scroll",
                width: "100%",
                border: "1px dotted #999999",
                padding: "4px",
                borderRadius: "6px",
                fontWeight: "600",
                color: "#51ff00",
                backgroundColor: "black",
                fontSize: "18px",
              }}
            >
              <pre>{JSON.stringify({ trabajos: trabajos }, null, 2)}</pre>
            </div>
          </Col>*/}
        </Row>
        {/*<Row>
          <Col span={24}>
            <Input.TextArea
              value={defaultValues}
              onChange={(e) => {
                setDefaultValues(e.target.value);
              }}
            />

            <Button
              onClick={(_) => {
                try {
                  const data = JSON.parse(defaultValues);
                  setTrabajos(data);
                  newTabIndex.current = 0;
                  setActiveKey(0);
                } catch (error) {
                  console.error("Failed to parse JSON string:", error.message);
                }
              }}
            >
              Aplicar
            </Button>
          </Col>
        </Row>*/}
      </Card>
      <Modal
        footer={null}
        open={modalScanOpen}
        onCancel={(_) => {
          setModalScanOpen(false);
        }}
        width={"100%"}
        destroyOnClose
      >
        <RecipeScanner
          callback={(response) => {
            setScanningTrabajo((s) => ({
              ...s,
              serverResponse: response,
            }));
            setModalScanOpen(false);
            setModalEditarRespuestaOpen(true);
          }}
        />
      </Modal>
      <Modal
        open={modalEditarRespuestaOpen}
        onCancel={(_) => setModalEditarRespuestaOpen(false)}
        destroyOnClose
        width={"100%"}
        footer={null}
      >
        <ProcessIAResponse
          usarDistancia={scanningTrabajo?.usarDistancia ?? true}
          jsonServer={scanningTrabajo?.serverResponse}
          tipo_venta={scanningTrabajo?.tipo_venta}
          callback={(final, pTipoTrabajo) => {
            setModalEditarRespuestaOpen(false);
            onValuesScanned(final, pTipoTrabajo);
            if (pendingClienteData) {
              processScannedDni(pendingClienteData);
            }
          }}
        />
      </Modal>
      <Modal
        open={popupAddClienteOpen}
        onCancel={(_) => {
          setPendingClienteData(null);
          setPopupAddClienteOpen(false);
        }}
        title="Agregar Cliente"
        destroyOnClose
        width={"900px"}
        footer={null}
      >
        <ClienteFormV3
          callback={(id) => {
            setPendingClienteData(null);
            setVenta((v) => ({ ...v, fkcliente: id }));
            setPopupAddClienteOpen(false);
          }}
          data={pendingClienteData}
        />
      </Modal>
    </>
  );
};
export default VentaMultipleMinorista;
