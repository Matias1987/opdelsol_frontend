import globals from "@/src/globals";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import SelectMedico from "../forms/ventas/SelectMedico";
import SelectCliente from "../forms/ventas/SelectCliente";
import SelectObraSocial from "../forms/ventas/SelectObraSocial";
import { cobro_inmediato } from "@/src/config";
import SelectCodigoVenta from "../forms/ventas/SelectCodigoVenta";
import { InputNumber } from "antd/lib";

const EdicionVentas = (props) => {
  const [loading, setLoading] = useState(true);
  const [modalItemOpen, setModalItemOpen] = useState(false);
  const [tipos, setTipos] = useState([]);
  const [familiasIds, setFamiliasIds] = useState([]);
  const [idLocal, setIdLocal] = useState(0);
  const [productToAdd, setProductToAdd] = useState({
    tipo: "",
    codigoRecord: null,
    precio: 0,
    cantidad: 0,
    total: 0,
  });
  const [items, setItems] = useState([]);
  const [venta, setVenta] = useState({
    idventa:-1,
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
    { width: "150px", dataIndex: "tipo", title: "tipo" },
    { width: "150px", dataIndex: "codigo", title: "codigo" },
    { width: "150px", dataIndex: "descripcion", title: "desc." },
    { width: "150px", dataIndex: "precio", title: "precio" },
    { width: "150px", dataIndex: "cantidad", title: "cantidad" },
    { width: "150px", dataIndex: "total", title: "total" },
    {
      width: "50px",
      title: "acciones",
      render: (_, record) => (
        <>
          <Button
            size="small"
            danger
            onClick={(_) => {
              setItems((_) => items.filter((r) => r.key !== record.key));
            }}
          >
            <CloseOutlined />
          </Button>
        </>
      ),
    },
  ];
  const load_venta = (callback) => {};
  const load_medico = (callback) => {};
  const load_os = (callback) => {};

  useEffect(() => {
    set_tipos(globals.tiposVenta.RECSTOCK);
    load_venta((_) => {
      load_venta_items((_) => {
        setLoading(false);
      });
    });
  }, []);

  const load_venta_items = (callback) => {};

  const t1 = [
    { value: "LEJOS_OD", label: "LEJOS OD" },
    { value: "LEJOS_OI", label: "LEJOS OI" },
    { value: "LEJOS_ARMAZON", label: "LEJOS ARMAZON" },
    { value: "LEJOS_TRATAMIENTO", label: "LEJOS TRATAMIENTO" },
    { value: "CERCA_OD", label: "CERCA OD" },
    { value: "CERCA_OI", label: "CERCA OI" },
    { value: "CERCA_ARMAZON", label: "CERCA ARMAZON" },
    { value: "CERCA_TRATAMIENTO", label: "CERCA TRATAMIENTO" },
  ];
  const t2 = [
    { value: "OD", label: "OD" },
    { value: "OI", label: "OI" },
    { value: "ARMAZON", label: "ARMAZON" },
    { value: "TRATAMIENTO", label: "TRATAMIENTO" },
  ];

  const t3 = [
    { value: "OD", label: "OD" },
    { value: "OI", label: "OI" },
    { value: "INSUMO", label: "INSUMO" },
  ];

  const set_tipos = (tipo) => {
    switch (tipo) {
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
    if (tipo.includes("ARMAZON")) {
      return [globals.familiaIDs.ARMAZON];
    }
    if (tipo.includes("TRATAMIENTO")) {
      return [globals.familiaIDs.TRATAMIENTO];
    }
    if (tipo.includes("INSUMO")) {
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

    if (items.find((i) => i.tipo == productToAdd.tipo)) {
      alert("Ya hay un item de tipo " + productToAdd.tipo);
      return;
    }

    setItems((i) => [
      ...i,
      {
        codigo: productToAdd.codigoRecord.codigo,
        descripcion: productToAdd.codigoRecord.descripcion,
        precio: productToAdd.precio,
        cantidad: productToAdd.cantidad,
        total: 0,
        key: idLocal,
        idcodigo: productToAdd.codigoRecord.idcodigo,
        tipo: productToAdd.tipo,
      },
    ]);
    setIdLocal(idLocal + 1);

    setModalItemOpen(false);

    setProductToAdd({
      tipo: "",
      codigoRecord: null,
      precio: 0,
      cantidad: 0,
      total: 0,
    });
  };

  const row_style = {
    padding: "4px",
    border: "1px dotted #dddddd",
    borderRadius: "5px",
    margin:"2px",
  };

  return (
    <div>
      <Card
        title="Editar Venta"
        size="small"
        style={{ border: "1px solid #e2e2e2", boxShadow: "2px 2px 3px grey" }}
      >
        <Row style={row_style}>
          <Col span={24}>
            <SelectCliente />
          </Col>
        </Row>
        <Row style={row_style}>
          <Col span={24}>
            <SelectCliente />
          </Col>
        </Row>
        <Row style={row_style}>
          <Col span={12}>
            <SelectMedico />
          </Col>

          <Col span={12}>
            <SelectObraSocial />
          </Col>
        </Row>
        <Row style={{paddingTop:"12px"}} >
          <Col span={24}>
            <Card
              style={{
                border: "1px solid #dae3ff",
                boxShadow: "2px 2px 3px grey",
              }}
              title="Items"
              size="small"
              extra={
                <>
                  <Button
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
              <Table dataSource={items} columns={columns} pagination={false} />
            </Card>
          </Col>
        </Row>
        <Divider />
        <Row style={row_style}>
              <Col span={24}>
                <Button type="primary">Guardar Cambios</Button>
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
              disabled={productToAdd.codigo != null}
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
            <SelectCodigoVenta
              idfamilias={familiasIds}
              key={productToAdd.tipo}
              callback={onchange_codigo}
              hideExtOpt={"0"}
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: "8px" }}>
          <Col style={{ fontWeight: "600" }}>Precio</Col>
        </Row>
        <Row>
          <Col>
            <InputNumber style={{ width: "200px" }} />
          </Col>
        </Row>
        <Row style={{ paddingTop: "8px" }}>
          <Col style={{ fontWeight: "600" }}>Cantidad</Col>
        </Row>
        <Row>
          <Col>
            <Input
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
            <Input readOnly style={{ width: "200px" }} />
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
