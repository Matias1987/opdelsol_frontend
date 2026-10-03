import { useEffect, useState } from "react";
import { Table, Button, Tag, Card, Modal } from "antd";
import PedidoProveedor from "./nuevo_pedido";
import fetchConRetryYTimeout from "@/src/helpers/get_helper";
import { get } from "@/src/urls";

const AdminPedidos = () => {
  const [modalNuevoOpen, setModalNuevoOpen] = useState(false);
  const [modalDetalleOpen, setModalDetalleOpen] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [reload, setReload] = useState([]);
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
          <Button type="link" onClick={() => {}}>
            Asignar Factura
          </Button>
        </>
      ),
    },
  ];

  const load = async () => {
    const result = await fetchConRetryYTimeout(get.lista_stock_pedidos);

    /**
     * example:
     * {
        "idpedido": 9,
        "tipo": "COMPRA",
        "sucursal_origen": 6,
        "sucursal_pedido": 15,
        "proveedor_idproveedor": 33,
        "fecha": "2026-10-03T15:04:26.000Z",
        "cant_total_pedida": 20,
        "cant_total_recibida": 0,
        "comentarios": null
    },
     */

    setPedidos((_) =>
      result.map((p) => ({
        id: p.idpedido,
        tipo: p.tipo,
        proveedor: p.proveedor_idproveedor,
        fecha: p.fecha,
        estado: "", //to do
        cantidad: 0, //to do
      })),
    );
  };

  useEffect(() => {
    load();
  }, [reload]);

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
