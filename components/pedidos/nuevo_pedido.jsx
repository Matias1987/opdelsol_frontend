import { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Table,
  InputNumber,
  Select,
  Modal,
  Row,
  Col,
  Flex,
  Card,
} from "antd";
import globals from "@/src/globals";
import PedidoItem from "./pedido_item";
import SelectProveedor from "../admin/proveedor/SelectProveedor";
import { CloseCircleOutlined, CloseOutlined, EditFilled, PlusOutlined } from "@ant-design/icons";

const PedidoProveedor = () => {
  const [modalAddItemOpen, setModalAddItemOpen] = useState(false);
  const [modalSelectProveedor, setModalSelectProveedor] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  const [pedido, setPedido] = useState({
    //idpedido: 5,
    sucursal_origen: globals.obtenerSucursal(),
    usuario_idusuario: globals.obtenerUID(),
    tipo: "PROVEEDOR", //INTERNO | PROVEEDOR
    proveedor_idproveedor: 3,
    sucursal_pedido: null,
    fecha: "2026-08-31T08:46:00Z",
    cant_total_pedida: 0,
    cant_total_recibida: 0,
    comentarios: "",
    estado: "GENERADO", //ENVIADO, RECIBIDO, ANULADO,
  });

  const columns = [
    {
      title: "Producto",
      dataIndex: "codigo",
      key: "codigo",
      render: (value, record, index) => <span style={{fontWeight:"600"}}>{record.codigo}</span>,
    },
    {
      width:"100px",
      title: "Cantidad",
      dataIndex: "cant_pedida",
      key: "cant_pedida",
      render: (value, record, index) => (
        <InputNumber
          min={1}
          value={value}
          onChange={(val) => {
            const newItems = [...items];
            newItems[index].cant_pedida = val;
            setItems(newItems);
          }}
        />
      ),
    },
    {
      width:"50px",
      title: "",
      key: "acciones",
      render: (_, record, index) => (
        <Button
          size="small"
          danger
          onClick={() => {
            const newItems = items.filter((_, i) => i !== index);
            setItems(newItems);
          }}
        >
          <CloseCircleOutlined />
        </Button>
      ),
    },
  ];

  const agregarItem = (_item) => {
    setItems((ii) => {
      const new_arr = [...ii, _item];
      //calcular total ...
      actualizar_total(new_arr);
      return new_arr;
    });
  };

  const actualizar_total = (_arr) => {
    let _total = 0;
    _arr.reduce((_total, cval) => _total + cval.cant_pedida, 0);
    onChange("cant_total_pedida", _total);
  };

  const onChange = (key, value) => {
    setPedido((_p) => {
      const _updated = { ..._p, [key]: value };
      //callback?.(_updated);
      return _updated;
    });
  };

  const detalle_proveedor = () =>
    selectedProveedor ? (<>Proveedor:&nbsp;
      <span style={{ fontWeight: "600", color: "#11005e", fontSize: "1.1em" }}>
        {selectedProveedor.nombre}
      </span></>
    ) : (
      <>Seleccione...</>
    );

  const row_style = {
    padding: "6px",
  };

  return (
    <>
      <Row style={row_style}>
        <Col span={24}>
          {detalle_proveedor()}{" "}
          <Button onClick={(_) => setModalSelectProveedor(true)}>
            <EditFilled />
          </Button>
        </Col>
      </Row>
      <Row style={row_style}>
        <Col span={24}>
          Fecha: <DatePicker />
        </Col>
      </Row>
      {/*<Row style={row_style}>
        <Col span={24}>
          <Input addonBefore="Nro." />
        </Col>
      </Row>*/}
      <Row style={row_style}>
        <Col span={24}>
          <Card
          style={{ boxShadow: "2px 2px 4px 2px rgba(208, 216, 243, 0.6)" }}
            size="small"
            title={"Producos"}
            extra={
              <Button
                size="small"
                type="dashed"
                onClick={(_) => setModalAddItemOpen(true)}
                style={{ fontWeight: "600", color: "#ff0000" }}
              >
                <PlusOutlined /> Agregar producto
              </Button>
            }
          >
            <Table
              size="small"
              dataSource={items}
              columns={columns}
              rowKey={(record, index) => index}
              pagination={false}
              scroll={{ y: 300 }}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
            />
          </Card>
        </Col>
      </Row>
      <Row style={row_style}>
        <Col span={24}>
          <Button type="primary" style={{ marginTop: "16px" }} block>
            Generar Pedido
          </Button>
        </Col>
      </Row>

      <Modal
        open={modalAddItemOpen}
        onCancel={(_) => setModalAddItemOpen(false)}
        destroyOnClose
        title="Agregar"
        width={"700px"}
        footer={null}
      >
        <PedidoItem
          callback={(item) => {
            agregarItem(item);
            setModalAddItemOpen(false);
          }}
        />
      </Modal>
      <Modal
        open={modalSelectProveedor}
        onCancel={(_) => setModalSelectProveedor(false)}
        destroyOnClose
        title="Agregar"
        width={"700px"}
        footer={null}
      >
        <SelectProveedor
          callback={(p) => {
            setSelectedProveedor(p);
            onChange("proveedor_idproveedor", p.idproveedor);
            setModalSelectProveedor(false);
          }}
        />
      </Modal>
    </>
  );
};

export default PedidoProveedor;
