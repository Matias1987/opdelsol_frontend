import { useEffect, useState } from "react";
import { Table, Button, Tag, Card, Modal } from "antd";
import PedidoProveedor from "./nuevo_pedido";
import fetchConRetryYTimeout from "@/src/helpers/get_helper";
import { get } from "@/src/urls";
import EnvioForm from "../forms/EnvioForm";
import DetallePedido from "./detalle";
import globals from "@/src/globals";
import { useNetworkStatus } from "../providers/NetworkContext";
/**
 * @param {*} modo - "interno" | "proveedor" | "todos"
 * @param {*} recibidos 1 : 0
 */
const AdminPedidos = ({ modo, recibidos }) => {
  const [modalNuevoOpen, setModalNuevoOpen] = useState(false);
  const [modalGenerarEnvioOpen, setModalGenerarEnvioOpen] = useState(false);
  const [modalDetalleOpen, setModalDetalleOpen] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [reload, setReload] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [detallePedido, setDetallePedido] = useState(null);
  const [nuevoPedidoModo, setNuevoPedidoModo] = useState("interno");
  const { isOnline } = useNetworkStatus();

  const cambiarEstado = (id, nuevoEstado) => {
    // Implementa la lógica para cambiar el estado del pedido
    console.log(`Cambiando estado del pedido ${id} a ${nuevoEstado}`);
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
            danger
            type="link"
            onClick={() => {
              setSelectedPedido(record);
              load_detalle_pedido(record.id);
            }}
            disabled={
              record.estado === "Recibido" && false //for now
            }
          >
            Generar Env&iacute;o
          </Button>
          <Button
            type="link"
            onClick={() => {
              setSelectedPedido(record);
              setModalDetalleOpen(true);
            }}
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
    const _modo = modo ?? "todos";
    const _recibidos = (recibidos ?? _modo == "todos") ? -1 : 0;

    const _id_sucursal_origen = _recibidos == 0 ? globals.obtenerSucursal() : 0;
    const _id_sucursal_pedido = _recibidos == 1 ? globals.obtenerSucursal() : 0;
    const _id_tipo_pedido = _modo === "interno" ? 1 : _modo == "todos" ? 0 : 2;

    const result = await fetchConRetryYTimeout(
      get.lista_stock_pedidos +
        `${_id_sucursal_origen}/${_id_tipo_pedido}/${_id_sucursal_pedido}/`,
    );

    if (!result) {
      alert("No se pudo cargar la lista de pedidos.");
      return;
    }

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

  const load_detalle_pedido = async (idpedido) => {
    const result = await fetchConRetryYTimeout(get.detalle_pedido + idpedido);
    setDetallePedido((_) =>
      result.map((p) => ({
        idcodigo: p.codigo_idcodigo,
        sucursal_origen: p.sucursal_origen,
        sucursal_pedido: p.sucursal_pedido,
        cantidad: +p.cant_pedida,
      })),
    );
    setModalGenerarEnvioOpen(true);
  };

  useEffect(() => {
    load();
  }, [reload, isOnline]);

  return (
    <>
      <Card
        title="Administración de pedidos"
        size="small"
        extra={
          <>
            <Button
              onClick={(_) => {
                setNuevoPedidoModo("compra");
                setModalNuevoOpen(true);
              }}
            >
              Nueva Compra
            </Button>{" "}
            <Button
              onClick={(_) => {
                setNuevoPedidoModo("interno");
                setModalNuevoOpen(true);
              }}
            >
              Nuevo Pedido Interno
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
        destroyOnClose={true}
      >
        <PedidoProveedor
          tipo={nuevoPedidoModo}
          callback={(_) => {
            setReload(!reload);
            //setModalNuevoOpen(false);
          }}
        />
      </Modal>
      <Modal
        open={modalDetalleOpen}
        onCancel={(_) => setModalDetalleOpen(false)}
        width={"900px"}
        title="Detalle"
        footer={null}
        destroyOnClose={true}
      >
        <DetallePedido idpedido={selectedPedido?.id} />
      </Modal>
      <Modal
        open={modalGenerarEnvioOpen}
        onCancel={(_) => setModalGenerarEnvioOpen(false)}
        width={"900px"}
        title="Generar Envío"
        footer={null}
        destroyOnClose={true}
      >
        <EnvioForm p_rows_to_add={detallePedido} />
      </Modal>
    </>
  );
};

export default AdminPedidos;
