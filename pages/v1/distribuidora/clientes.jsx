import ClienteFormDistrib from "@/components/cliente/ClienteFormDistrib";
import FichaClienteMayorista from "@/components/cliente/FichaClienteMayorista";
import LayoutDistribuidora from "@/components/layout/layout_distribuidora";
import { get } from "@/src/urls";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Table } from "antd";
import { useEffect, useState } from "react";

export default function clientes() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(false);
  const [popupAddOpen, setPopupAddOpen] = useState(false);
  const [popupFichaOpen, setPopupFichaOpen] = useState(false);
  const [popupDetalleOpen, setPopupDetalleOpen] = useState(false);
  const columns = [
    {
      width: "200px",
      dataIndex: "nombre",
      title: "Nombre",
      key: "nombre",
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
    },
    { title: "Teléfono", dataIndex: "telefono1" },
    {
      title: "Acciones",
      render: (_, record) => (
        <>
          <Button type="link" onClick={_=>onFichaClienteClick(record)}>Ficha</Button>
          <Button type="link" onClick={_=>onDetalleClienteClick(record)}>Detalle</Button>
        </>
      ),
    },
  ];

  const onFichaClienteClick = (record) => {
    alert(JSON.stringify(record))
    setSelectedCliente(record);
    setPopupFichaOpen(true);
  }
  const onDetalleClienteClick = (record) => {
    setSelectedCliente(record);
    setPopupDetalleOpen(true);
  }

  const onClienteAdded = (_) => {
    refresh();
  };

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    setLoading(true);
    fetch(get.lista_clientes_m)
      .then((response) => response.json())
      .then((response) => {
        setData(
          response.data.map((r) => ({
            dni: r.dni,
            idcliente: r.idcliente,
            apellido: r.apellido,
            nombre: r.nombre,
            direccion: r.direccion,
            telefono1: r.telefono1,
            bloqueado: r.bloqueado,
          })),
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Card
        title={
          <>
            Clientes&nbsp;
            <Button
              type="link"
              onClick={(_) => {
                setPopupAddOpen(true);
              }}
            >
              <PlusOutlined />
            </Button>
          </>
        }
        size="small"
        style={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          borderRadius: "16px",
        }}
        styles={{
          header: {
            backgroundColor: "##ffffed",
            background:
              "linear-gradient(281deg, #ffebcd 32%, rgba(231,233,235, 1) 75%)",
            borderBottom: "1px solid #eee",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          },
        }}
        extra={
          <>
            <Button
              type="link"
              onClick={(_) => {
                refresh();
              }}
            >
              <ReloadOutlined />
            </Button>
          </>
        }
      >
        <Table
          dataSource={data}
          columns={columns}
          size="small"
          scroll={{ y: 300 }}
          loading={loading}
        />
      </Card>

      <Modal
        footer={null}
        open={popupAddOpen}
        onCancel={(_) => {
          setPopupAddOpen(false);
        }}
        destroyOnClose
        title="Nuevo Cliente"
        width={"600px"}
      >
        <ClienteFormDistrib callback={onClienteAdded} />
      </Modal>
      <Modal
        footer={null}
        open={popupFichaOpen}
        onCancel={(_) => {
          setPopupFichaOpen(false);
        }}
        destroyOnClose
        title="Saldo"
        width={"1000px"}
      >
        <FichaClienteMayorista idcliente={selectedCliente.idcliente} callback={onClienteAdded} />
      </Modal>
      <Modal
        footer={null}
        open={popupDetalleOpen}
        onCancel={(_) => {
          setPopupDetalleOpen(false);
        }}
        destroyOnClose
        title="Detalle"
        width={"600px"}
      >
       To Do ...
      </Modal>
    </>
  );
}

clientes.PageLayout = LayoutDistribuidora;
