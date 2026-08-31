import { useState } from "react";
import { Table, Button, Tag, Card, Modal } from "antd";
import PedidoProveedor from "./nuevo_pedido";

const AdminPedidos = () => {
  const [modalNuevoOpen, setModalNuevoOpen] = useState(false);
  const [modalDetalleOpen, setModalDetalleOpen] = useState(false);
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      proveedor: "Proveedor 1",
      fecha: "28-08-2026",
      estado: "Pendiente",
    },
    {
      id: 2,
      proveedor: "Proveedor 2",
      fecha: "27-08-2026",
      estado: "Recibido",
    },
    { id: 3, proveedor: "Proveedor 3", fecha: "26-08-2026", estado: "Anulado" },
  ]);

  const cambiarEstado = (id, nuevoEstado) => {
    setPedidos(
      pedidos.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p)),
    );
  };

  const columns = [
    { title: "N° Pedido", dataIndex: "id", key: "id" },
    { title: "Proveedor", dataIndex: "proveedor", key: "proveedor" },
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado) => {
        let color = "blue";
        if (estado === "Recibido") color = "green";
        if (estado === "Anulado") color = "red";
        return <Tag color={color}>{estado}</Tag>;
      },
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => cambiarEstado(record.id, "Anulado")}
            disabled={record.estado === "Anulado"}
          >
            Anular
          </Button>
          <Button
            type="link"
            onClick={() => cambiarEstado(record.id, "Recibido")}
            disabled={record.estado === "Recibido"}
          >
            Recibir
          </Button>
          <Button
            type="link"
            onClick={() => alert(`Detalle del pedido ${record.id}`)}
          >
            Ver detalle
          </Button>
          <Button
            type="link"
            onClick={() => {}}
          >
            Asignar Factura
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Card
        title="Administración de pedidos"
        size="small"
        extra={
          <>
            <Button
              onClick={(_) => {
                setModalNuevoOpen(true);
              }}
            >
              Nuevo
            </Button>{" "}
          </>
        }
      >
        <Table
          size="small"
          dataSource={pedidos}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </Card>
      <Modal
        open={modalNuevoOpen}
        onCancel={(_) => setModalNuevoOpen(false)}
        width={"900px"}
        title="Nuevo"
        footer={null}
      >
        <PedidoProveedor />
      </Modal>
      <Modal
        open={modalDetalleOpen}
        onCancel={(_) => setModalDetalleOpen(false)}
        width={"900px"}
        title="Detalle"
        footer={null}
      ></Modal>
    </>
  );
};

export default AdminPedidos;
