import globals from "@/src/globals";
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { CloseOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import SelectMedico from "../forms/ventas/SelectMedico";
import SelectCliente from "../forms/ventas/SelectCliente";
import SelectObraSocial from "../forms/ventas/SelectObraSocial";
import { cobro_inmediato } from "@/src/config";
import SelectCodigoVenta from "../forms/ventas/SelectCodigoVenta";
import { InputNumber } from "antd/lib";
import { formatFloat } from "@/src/helpers/formatters";
import { get, post } from "@/src/urls";
import dayjs from "dayjs";
import esES from "antd/locale/es_ES";
import { post_method } from "@/src/helpers/post_helper";

const EdicionVentas = (props) => {
  const [loading, setLoading] = useState(true);
  const [modalItemOpen, setModalItemOpen] = useState(false);
  const [tipos, setTipos] = useState([]);
  const [familiasIds, setFamiliasIds] = useState([]);
  const [idLocal, setIdLocal] = useState(0);
  const [modificarFechaRetiro, setModificarFechaRetiro] = useState(false);
  const [formEnabled, setFormEnabled] = useState(true);
  const [ventaTieneCantidadEditable, setVentaTieneCantidadEditable] =
    useState(false);
  const [esVentaDirecta, setEsVentaDirecta] = useState(false);
  const [productToAdd, setProductToAdd] = useState({
    tipo: "",
    codigoRecord: null,
    precio: 0,
    cantidad: 1,
    total: 0,
  });
  const [items, setItems] = useState([]);
  const [venta, setVenta] = useState({
    idventa: -1,
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
    validarCristalesModo2: true,
    tipo: 0,
  });
  const columns = [
    {
      fixed: "left",
      width: "100px",
      dataIndex: "tipo",
      title: "Tipo",
      render: (_, record) => (
        <span style={{ fontWeight: "600", color: "#1100f8" }}>
          {record.tipo.replace("_", " ")}
        </span>
      ),
    },
    { fixed: "left", width: "150px", dataIndex: "codigo", title: "Codigo" },
    { width: "150px", dataIndex: "descripcion", title: "Descripción" },
    { width: "100px", dataIndex: "esf", title: "Esf" },
    { width: "100px", dataIndex: "cil", title: "Cil" },
    { width: "100px", dataIndex: "eje", title: "Eje" },
    {
      width: "150px",
      dataIndex: "precio",
      title: <div style={{ textAlign: "right" }}>Precio</div>,
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>$ {formatFloat(record.precio)}</div>
      ),
    },
    {
      width: "150px",
      dataIndex: "cantidad",
      title: <div style={{ textAlign: "right" }}>Cantidad</div>,
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>{record.cantidad}</div>
      ),
    },
    {
      fixed: "right",
      width: "150px",
      dataIndex: "total",
      title: <div style={{ textAlign: "right" }}>Total</div>,
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          $ {formatFloat(+record.precio * +record.cantidad)}
        </div>
      ),
    },
    {
      fixed: "right",
      width: "50px",
      title: "",
      render: (_, record) => (
        <>
          <Button
            disabled={!formEnabled}
            size="small"
            danger
            onClick={(_) => {
              const __items = items.filter((r) => r.key !== record.key);
              setItems((_) => __items);
              calcular_totales(__items);
            }}
          >
            <CloseOutlined />
          </Button>
        </>
      ),
    },
  ];

  const url = get.venta;
  const url_venta_items = get.obtener_venta_items;

  const parse_date1 = (pData) => {
    if (!pData) {
      alert("returning null for fecha retiro")
      return null;
    }
    //input format 2026-03-10T06:00:00.000Z
    try {
      const parts = pData.split("-");
      const year = parts[0];
      const month = parts[1];
      const day = parts[2].substring(0, 2);
      return `${day}-${month}-${year}`;
    } catch (e) {
      alert("error trying to parse date");
      return null;
    }
  };

  const validar = () => {
    if (venta.fkcaja == null) {
      return false;
    }

    if (venta.fkcliente == null) {
      alert("Seleccione Cliente");
      return false;
    }

    if (venta.fksucursal == null) {
      return false;
    }

    if (items.length < 1) {
      alert("No hay Productos");
      return false;
    }

    if (venta.total < 0) {
      alert("Saldo negativo");
      return false;
    }

    return true;
  };

  const onSave = () => {
    if (!validar()) {
      return;
    }

    if (!confirm("Confirmar cambios")) {
      return;
    }

    let _productos = {};

    items.forEach((item) => {
      _productos[item.tipo] = {
        codigo: item.codigo,
        descripcion: item.descripcion,
        esf: item.esf,
        cil: item.cil,
        eje: item.eje,
        precio: item.precio,
        cantidad: item.cantidad,
        idcodigo: item.idcodigo,
        tipo: item.tipo,
        total: item.total,
      };
    });

    const _venta = { ...venta, productos: _productos };
    //alert("Venta a guardar: " + JSON.stringify(_venta));
    setFormEnabled(false);
    post_method(post.update.update_venta, _venta, (response) => {
      alert("Venta actualizada correctamente");
      load();
      setFormEnabled(true);
    });
  };

  const load_venta = (callback) => {
    fetch(url + props.idventa)
      .then((response) => response.json())
      .then((response) => {
        //alert("Venta cargada: " + JSON.stringify(response.data[0]));

        const ventaData = response.data[0];
        if (!ventaData) {
          alert("error");
          return;
        }
        set_tipos(+ventaData.tipo);
        if (ventaData.tipo === globals.tiposVenta.LCSTOCK) {
          setVentaTieneCantidadEditable(true);
        }
        if (ventaData.tipo === globals.tiposVenta.DIRECTA) {
          setFamiliasIds(get_familias_id(null));
          setEsVentaDirecta(true);
          setFormEnabled(false);
        }
        setVenta((v) => ({
          ...v,
          idventa: ventaData.idventa,
          fkcliente: ventaData.cliente_idcliente,
          fkdestinatario: ventaData.fk_destinatario,
          fkmedico: ventaData.medico_idmedico,
          fkos: ventaData.fk_os,
          fkusuario: ventaData.usuario_idusuario,
          mp: null,
          subtotal: ventaData.subtotal,
          descuento: ventaData.descuento,
          total: ventaData.monto_total,
          fechaRetiro: parse_date1(ventaData.fecha_retiro),
          horaRetiro: null,
          comentarios: ventaData.comentarios,
          productos: null,
          fksucursal: ventaData.sucursal_idsucursal,
          fkcaja: ventaData.caja_idcaja,
          json_items: "",
          tk: globals.getToken(),
          uid: "",
          entrega: false,
          cobrar: cobro_inmediato,
          validarCristalesModo2: true,
          tipo: ventaData.tipo,
          estado: ventaData.estado,
        }));
        callback();
      });
  };

  const load_venta_items = (callback) => {
    let _localId = 0;
    fetch(url_venta_items + props.idventa)
      .then((response) => response.json())
      .then((response) => {
        // alert(JSON.stringify(response));
        const data = response.data;

        if (!data) {
          alert("error 2");
          return;
        }
        setItems(
          data.map((record) => ({
            key: _localId++,
            tipo: record.tipo,
            esf: record.esf,
            cil: record.cil,
            eje: record.eje,
            precio: parseFloat(record.precio),
            cantidad: +record.cantidad,
            codigo: record.codigo,
            descripcion: record.descripcion,
            idcodigo: record.stock_codigo_idcodigo,
            total: record.total,
          })),
        );
        setIdLocal(_localId + 1);
        callback();
      });
  };

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    setModificarFechaRetiro(false);
    setLoading(true);
    load_venta((_) => {
      load_venta_items((_) => {
        setLoading(false);
      });
    });
  };

  const calcular_totales = (_items) => {
    const total = _items.reduce(
      (a, b) => parseFloat(a) + parseFloat(b.precio) * parseFloat(b.cantidad),
      0,
    );
    setVenta((v) => ({
      ...v,
      subtotal: total,
      total: parseFloat(total) - (parseFloat(v.descuento) || 0),
    }));
  };

  const onchange_descuento = (d) => {
    setVenta((v) => ({
      ...v,
      descuento: parseFloat(d),
      total: parseFloat(v.subtotal) - (parseFloat(d) || 0),
    }));
  };

  const t1 = [
    { value: "lejos_od", label: "LEJOS OD" },
    { value: "lejos_oi", label: "LEJOS OI" },
    { value: "lejos_armazon", label: "LEJOS ARMAZON" },
    { value: "lejos_tratamiento", label: "LEJOS TRATAMIENTO" },
    { value: "cerca_od", label: "CERCA OD" },
    { value: "cerca_oi", label: "CERCA OI" },
    { value: "cerca_armazon", label: "CERCA ARMAZON" },
    { value: "cerca_tratamiento", label: "CERCA TRATAMIENTO" },
  ];
  const t2 = [
    { value: "od", label: "OD" },
    { value: "oi", label: "OI" },
    { value: "armazon", label: "ARMAZON" },
    { value: "tratamiento", label: "TRATAMIENTO" },
  ];

  const t3 = [
    { value: "od", label: "OD" },
    { value: "oi", label: "OI" },
    { value: "insumo", label: "INSUMO" },
  ];

  const set_tipos = (tipo) => {
    switch (tipo.toString()) {
      case globals.tiposVenta.RECSTOCK:
        setTipos(t1);
        break;
      case globals.tiposVenta.MONOFLAB:
        setTipos(t1);
        break;
      case globals.tiposVenta.MULTILAB:
        setTipos(t2);
        break;
      case globals.tiposVenta.LCLAB:
        setTipos(t3);
        break;
      case globals.tiposVenta.LCSTOCK:
        setTipos(t3);
        break;
      case globals.tiposVenta.DIRECTA:
        break;
    }
  };

  const get_familias_id = (tipo) => {
    if (tipo == null) {
      return [
        globals.familiaIDs.ARMAZON,
        globals.familiaIDs.TRATAMIENTO,
        globals.familiaIDs.INSUMO,
        globals.familiaIDs.LC,
      ];
    }

    if (tipo.includes("armazon")) {
      return [globals.familiaIDs.ARMAZON];
    }
    if (tipo.includes("tratamiento")) {
      return [globals.familiaIDs.TRATAMIENTO];
    }
    if (tipo.includes("insumo")) {
      return [globals.familiaIDs.INSUMO];
    }

    //CRISTALES
    if (
      venta.tipo == globals.tiposVenta.RECSTOCK ||
      venta.tipo == globals.tiposVenta.MONOFLAB
    ) {
      return [globals.familiaIDs.CRISTALES];
    }
    //LC
    return [globals.familiaIDs.LC];
  };

  const onchange_codigo = (cod) => {
    if (cod == null)
      setProductToAdd((p) => ({
        ...p,
        codigoRecord: null,
        precio: 0,
        idcodigo: -1,
      }));
    else
      setProductToAdd((p) => {
        const _p = {
          ...p,
          codigoRecord: cod,
          precio: cod.precio,
          idcodigo: cod.idcodigo,
        };
        return _p;
      });
  };

  const onAddItem = () => {
    if (productToAdd.codigoRecord == null) {
      return;
    }

    if (!esVentaDirecta) {
      if (items.find((i) => i.tipo == productToAdd.tipo)) {
        alert("Ya hay un item de tipo " + productToAdd.tipo);
        return;
      }
    }

    const __items = [
      ...items,
      {
        codigo: productToAdd.codigoRecord.codigo,
        descripcion: productToAdd.codigoRecord.descripcion,
        precio: productToAdd.precio,
        cantidad: productToAdd.cantidad,
        total:
          parseFloat(productToAdd.precio) * parseFloat(productToAdd.cantidad),
        key: idLocal,
        idcodigo: productToAdd.codigoRecord.idcodigo,
        tipo: esVentaDirecta ? "vdir" : productToAdd.tipo,
      },
    ];

    setItems((_) => __items);

    setIdLocal(idLocal + 1);

    calcular_totales(__items);

    setModalItemOpen(false);

    setProductToAdd({
      tipo: "",
      codigoRecord: null,
      precio: 0,
      cantidad: 1,
      total: 0,
    });
  };

  const row_style = {
    padding: "4px",
    border: "1px dotted #d6d6d5",
    borderRadius: "5px",
    margin: "2px",
    background: "#fcfcfc",
    background:
      "radial-gradient(circle,rgba(253, 253, 253, 1) 80%, rgba(248, 248, 248,1) 100%)",
  };

  return loading ? (
    <>
      <Spin /> Cargando...
    </>
  ) : (
    <div>
      <Card
        styles={{
          header: {
            background: "#b0d0ff",
            background:
              "radial-gradient(circle,rgb(230, 237, 252) 80%, rgba(248, 248, 248,1) 100%)",
          },
        }}
        title={
          <div>
            Editando Venta Nro.: {venta.idventa}&nbsp;&nbsp;&nbsp;
            <Button
              type="dashed"
              size="small"
              disabled={!formEnabled}
              style={{ color: "#1d0dff" }}
              onClick={(_) => {
                if (
                  !window.confirm(
                    "¿Confirma que desea recargar la venta? Se perderán los cambios no guardados.",
                  )
                ) {
                  return;
                }
                load();
              }}
            >
              <ReloadOutlined />
            </Button>
          </div>
        }
        size="small"
        style={{ border: "1px solid #e2e2e2", boxShadow: "2px 2px 3px grey" }}
      >
        <Row style={row_style}>
          <Col span={24}>
            <SelectCliente
              pIdcliente={venta.fkcliente}
              key={`cliente-${venta.fkcliente}`}
              callback={(id) => {
                setVenta((v) => ({ ...v, fkcliente: id }));
              }}
            />
          </Col>
        </Row>
        <Row style={row_style}>
          <Col span={24}>
            <SelectCliente
              destinatario
              pIdcliente={venta.fkdestinatario}
              key={`destinatario-${venta.fkdestinatario}`}
              callback={(id) => {
                setVenta((v) => ({ ...v, fkdestinatario: id }));
              }}
            />
          </Col>
        </Row>
        <Row style={row_style}>
          <Col span={12}>
            <SelectMedico
              pIdMedico={venta.fkmedico}
              callback={(id) => {
                setVenta((v) => ({ ...v, fkmedico: id }));
              }}
            />
          </Col>

          <Col span={12}>
            <SelectObraSocial
              pIdOS={venta.fkos}
              callback={(id) => {
                setVenta((v) => ({ ...v, fkos: id }));
              }}
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: "12px" }}>
          <Col span={24}>
            <Card
              style={{
                border: "1px solid #dae3ff",
                boxShadow: "2px 2px 3px grey",
              }}
              styles={{
                header: {
                  background: "#fcfcfc",
                  background:
                    "radial-gradient(circle,rgba(253, 253, 253, 1) 80%, rgba(248, 248, 248,1) 100%)",
                },
              }}
              title="Productos"
              size="small"
              extra={
                <>
                  <Button
                    disabled={!formEnabled}
                    size="small"
                    style={{ borderRadius: "50%" }}
                    type="primary"
                    onClick={(_) => {
                      setModalItemOpen(true);
                    }}
                  >
                    <PlusOutlined />
                  </Button>
                </>
              }
            >
              <Table
                scroll={{ y: 200 }}
                dataSource={items}
                columns={columns}
                pagination={false}
                size="small"
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "table-row-light" : "table-row-dark"
                }
              />
            </Card>
          </Col>
        </Row>
        <Divider />
        <Row style={row_style}>
          <Col span={12}>
            <Input
              prefix="Subtotal: "
              style={{ width: "100%" }}
              readOnly
              value={formatFloat(venta.subtotal)}
            />
          </Col>
        </Row>
        <Row style={row_style}>
          <Col span={12}>
            <InputNumber
              disabled={!formEnabled}
              prefix={<span style={{ fontWeight: "bold" }}>Descuento:</span>}
              style={{ width: "100%" }}
              value={venta.descuento}
              onChange={(v) => onchange_descuento(parseFloat(v || "0"))}
            />
          </Col>
        </Row>

        <Row style={row_style}>
          <Col span={12}>
            <Input
              readOnly
              prefix="Total: "
              style={{ width: "100%" }}
              value={formatFloat(venta.total)}
            />
          </Col>
        </Row>
        <Row style={row_style}>
          <Col span={12}>
                <Input prefix="Fecha Retiro: " readOnly value={venta.fechaRetiro||"-"} />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={row_style}>
          <Col style={{ paddingTop: "4px" }}>
            <Checkbox
              disabled={!formEnabled}
              checked={modificarFechaRetiro}
              onChange={(e) => setModificarFechaRetiro(e.target.checked)}
            >
              <span style={{ fontWeight: "500" }}>Modificar Fecha Retiro</span>
            </Checkbox>
          </Col>
          <Col>
            <DatePicker
              disabled={!modificarFechaRetiro}
              defaultValue={props.ignore_fecha_retiro ? dayjs() : null}
              locale={esES}
              format={"DD-MM-YYYY"}
              onChange={(value) => {
                let _value = value ? value.format("DD-MM-YYYY") : null;
                setVenta((v) => ({
                  ...v,
                  fechaRetiro: _value,
                }));
              }}
            />
          </Col>
        </Row>
        <Divider />
        <Row style={row_style}>
          <Col span={24}>
            <Button type="primary" onClick={onSave} disabled={!formEnabled}>
              Guardar Cambios
            </Button>
          </Col>
        </Row>
      </Card>
      <Modal
        width={"400px"}
        onCancel={(_) => {
          setModalItemOpen(false);
        }}
        open={modalItemOpen}
        destroyOnClose
        title="Agregar Elemento"
        footer={null}
        afterOpenChange={(_) => {
          if (modalItemOpen) {
          }
        }}
      >
        <Row style={{ paddingTop: "8px" }}>
          <Col style={{ fontWeight: "600" }}>Tipo</Col>
        </Row>
        <Row>
          <Col span={24}>
            <Select
              value={productToAdd.tipo}
              options={tipos}
              style={{ width: "100%" }}
              disabled={productToAdd.codigo != null || esVentaDirecta}
              onChange={(v) => {
                setFamiliasIds(get_familias_id(v));
                setProductToAdd((p) => ({
                  ...p,
                  tipo: v,
                  codigo: null,
                  precio: 0,
                  idcodigo: -1,
                }));
              }}
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: "8px" }}>
          <Col style={{ fontWeight: "600" }}>C&oacute;digo</Col>
        </Row>
        <Row>
          <Col style={{ minWidth: "300px" }}>
            {productToAdd.tipo == "" && !esVentaDirecta ? (
              <>Seleccione tipo</>
            ) : (
              <SelectCodigoVenta
                idfamilias={familiasIds}
                key={productToAdd.tipo}
                callback={onchange_codigo}
                hideExtOpt={"0"}
              />
            )}
          </Col>
        </Row>
        <Row style={{ paddingTop: "8px" }}>
          <Col style={{ fontWeight: "600" }}>Precio</Col>
        </Row>
        <Row>
          <Col>
            <InputNumber
              style={{ width: "200px" }}
              value={productToAdd.precio}
              onChange={(v) => {
                setProductToAdd((pta) => ({
                  ...pta,
                  precio: parseFloat(v || "0"),
                }));
              }}
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: "8px" }}>
          <Col style={{ fontWeight: "600" }}>Cantidad</Col>
        </Row>
        <Row>
          <Col>
            <Input
              disabled={!ventaTieneCantidadEditable}
              value={productToAdd.cantidad}
              type="number"
              step={1}
              min={1}
              onChange={(e) => {
                setProductToAdd((_p) => ({
                  ..._p,
                  cantidad: parseInt(e.target.value || "0"),
                }));
              }}
              style={{ width: "200px" }}
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: "8px" }}>
          <Col style={{ fontWeight: "600" }}>Total</Col>
        </Row>
        <Row>
          <Col>
            <Input
              readOnly
              style={{ width: "200px" }}
              value={
                parseFloat(productToAdd.cantidad) *
                parseFloat(productToAdd.precio)
              }
            />
          </Col>
        </Row>

        <Divider />
        <Row style={{ padding: "2px" }}>
          <Col span={24}>
            <Button size="small" type="primary" block onClick={onAddItem}>
              Agregar
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default EdicionVentas;
