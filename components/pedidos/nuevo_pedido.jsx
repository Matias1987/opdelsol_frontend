import { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Table,
  InputNumber,
  Select,
} from "antd";

const PedidoProveedor = () => {
  const [items, setItems] = useState([]);

  const columns = [
    {
      title: "Producto",
      dataIndex: "producto",
      key: "producto",
      render: (value, record, index) => (
        <Input
          value={value}
          placeholder="Nombre del producto"
          onChange={(e) => {
            const newItems = [...items];
            newItems[index].producto = e.target.value;
            setItems(newItems);
          }}
        />
      ),
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
      render: (value, record, index) => (
        <InputNumber
          min={1}
          value={value}
          onChange={(val) => {
            const newItems = [...items];
            newItems[index].cantidad = val;
            setItems(newItems);
          }}
        />
      ),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record, index) => (
        <Button
          danger
          onClick={() => {
            const newItems = items.filter((_, i) => i !== index);
            setItems(newItems);
          }}
        >
          Eliminar
        </Button>
      ),
    },
  ];

  const agregarItem = () => {
    setItems([...items, { producto: "", cantidad: 1 }]);
  };

  return (
    <>
      <Form layout="vertical">
        <Form.Item
          label="Proveedor"
          name="proveedor"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Seleccionar proveedor"
            options={[
              { value: "proveedor1", label: "Proveedor 1" },
              { value: "proveedor2", label: "Proveedor 2" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Fecha del pedido"
          name="fecha"
          rules={[{ required: true }]}
        >
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item
          label="Número de pedido"
          name="numero"
          rules={[{ required: true }]}
        >
          <Input placeholder="Ej: PED-2026-001" />
        </Form.Item>
      </Form>

      <Button
        type="primary"
        onClick={agregarItem}
        style={{ marginBottom: "16px" }}
      >
        Agregar producto
      </Button>

      <Table
        dataSource={items}
        columns={columns}
        rowKey={(record, index) => index}
        pagination={false}
      />

      <Button type="primary" style={{ marginTop: "16px" }}>
        Generar Pedido
      </Button>
    </>
  );
};

export default PedidoProveedor;
