import React, { useState } from "react";
import { Layout, Table, Button, Tag, Modal, List, Card } from "antd";
import PedidoProveedor from "./nuevo_pedido";

const { Header, Content, Footer } = Layout;

const DetallePedidos = () => {
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      proveedor: "Proveedor 1",
      fecha: "28-08-2026",
      estado: "Pendiente",
      productos: [
        { nombre: "Arroz", cantidad: 10 },
        { nombre: "Aceite", cantidad: 5 },
      ],
    },
    {
      id: 2,
      proveedor: "Proveedor 2",
      fecha: "27-08-2026",
      estado: "Recibido",
      productos: [
        { nombre: "Harina", cantidad: 20 },
        { nombre: "Azúcar", cantidad: 15 },
      ],
    },
  ]);

  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

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
          <Button type="link" onClick={() => setPedidoSeleccionado(record)}>
            Ver detalle
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Card>
        <Table
          dataSource={pedidos}
          columns={columns}
          rowKey="id"
          pagination={false}
        />

        <Modal
          open={!!pedidoSeleccionado}
          onCancel={() => setPedidoSeleccionado(null)}
          footer={null}
          title={`Detalle del Pedido N° ${pedidoSeleccionado?.id}`}
        >
          {pedidoSeleccionado && (
            <>
              <p>
                <b>Proveedor:</b> {pedidoSeleccionado.proveedor}
              </p>
              <p>
                <b>Fecha:</b> {pedidoSeleccionado.fecha}
              </p>
              <p>
                <b>Estado:</b> {pedidoSeleccionado.estado}
              </p>
              <List
                header={<b>Productos</b>}
                dataSource={pedidoSeleccionado.productos}
                renderItem={(item) => (
                  <List.Item>
                    {item.nombre} — Cantidad: {item.cantidad}
                  </List.Item>
                )}
              />
            </>
          )}
        </Modal>
      </Card>
    </>
  );
};

export default DetallePedidos;
