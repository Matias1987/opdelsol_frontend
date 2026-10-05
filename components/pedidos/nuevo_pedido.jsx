import { useRef, useState } from "react";
import {
  DatePicker,
  Button,
  Table,
  InputNumber,
  Modal,
  Row,
  Col,
  Card,
  Input,
} from "antd";
import globals from "@/src/globals";
import PedidoItem from "./pedido_item";
import SelectProveedor from "../admin/proveedor/SelectProveedor";
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined";
import EditFilled from "@ant-design/icons/EditFilled";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import { v4 as uuidv4 } from "uuid";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import ConnectedButton from "../etc/CntButton";
const PedidoProveedor = ({callback}) => {
  const [modalAddItemOpen, setModalAddItemOpen] = useState(false);
  const [modalSelectProveedor, setModalSelectProveedor] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const postIdRef = useRef(uuidv4());

  const [pedido, setPedido] = useState({
    //idpedido: 5,
    sucursal_origen: null,
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
      render: (value, record, index) => (
        <span style={{ fontWeight: "600" }}>{record.codigo}</span>
      ),
    },
    {
      width: "100px",
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
      width: "50px",
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
    selectedProveedor ? (
      <>
        Proveedor:&nbsp;
        <span
          style={{ fontWeight: "600", color: "#11005e", fontSize: "1.1em" }}
        >
          {selectedProveedor.nombre}
        </span>
      </>
    ) : (
      <>Seleccione...</>
    );

  const row_style = {
    padding: "6px",
  };

  const generar_pedido = () => {
    setBtnDisabled(true);
    try {
      const payload = {
        ...pedido,
        sucursal_origen: globals.obtenerSucursal()??6,
        uid: postIdRef.current,
        items: items.map((i) => ({
          codigo: i.codigo,
          cant_pedida: i.cant_pedida,
          codigo_idcodigo: i.codigo_idcodigo,
        })),
      };

    
      post_method(post.insert.insert_pedido, payload, (response) => {
        alert("Datos Guardados.");
        callback?.()
      });
    } catch (error) {}
  };

  return (
    <>
      <Row style={row_style}>
        <Col span={24}>
          {detalle_proveedor()}{" "}
          <ConnectedButton onClick={(_) => setModalSelectProveedor(true)}>
            <EditFilled />
          </ConnectedButton>
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
              <ConnectedButton
                size="small"
                type="dashed"
                onClick={(_) => setModalAddItemOpen(true)}
                style={{ fontWeight: "600", color: "#ff0000" }}
              >
                <PlusOutlined /> Agregar producto
              </ConnectedButton>
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
          <ConnectedButton
            type="primary"
            style={{ marginTop: "16px" }}
            block
            disabled={btnDisabled}
            onClick={_=>generar_pedido()}
          >
            Generar Pedido
          </ConnectedButton>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
              <Input.TextArea rows={8} value={JSON.stringify({
        ...pedido,
        uid: postIdRef.current,
        items: items.map((i) => ({
          codigo: i.codigo,
          cant_pedida: i.cant_pedida,
          idcodigo: i.codigo_idcodigo,
        })),
      })} />
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
