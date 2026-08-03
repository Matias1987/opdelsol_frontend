import PlusOutlined from "@ant-design/icons/PlusOutlined";
import { Button, Card, Checkbox, Flex, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import NuevoDescuento from "./nuevoDescuento";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";

const ClienteDescuentos = ({ cliente }) => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [ocultarInactivos, setOcultarInactivos] = useState(true);
  const columns = [
    { title: "Detalle", dataIndex: "detalle",  },
    {
      width: 300,
      title: "Porcentaje",
      dataIndex: "porcentaje",
      render: (_, record) => (
        <>
          <Input readOnly addonAfter="%" value={record.porcentaje} />
        </>
      ),
    },
    {
      title: "Activo",
      width: 60,
      render: (_, { activo }) => (
        <>
          <Checkbox checked={activo}></Checkbox>
        </>
      ),
    },
    {
      title: <div style={{ textAlign: "center" }}>Acciones</div>,
      width: 140,
      render: (_, { activo, id }) => (
        <>
          <Button size="small" danger onClick={_=>cambiarEstadoDescuento(id, !activo)}>Cambiar estado</Button>
        </>
      ),
    },
  ];

  const cambiarEstadoDescuento = (id_descuento, activo) => {
    post_method(
      post.update.cambiar_estado_descuento,
      { id_descuento, activo },
      (response) => {
        setReload(!reload);
      },
    );
  };

  const load = () => {
    post_method(
      post.descuentos_cliente,
      { idcliente: cliente.idcliente },
      (response) => {
        //alert("response: " + JSON.stringify(response));
        setData(
          response.map((record) => ({
            detalle: record.nombre_corto,
            porcentaje: record.porcentaje,
            id: record.id_descuento,
            idsubgrupo: record.fk_subgrupo,
            precio_subgrupo: record.precio_defecto_mayorista,
            activo: +record.activo == 1,
          })),
        );
      },
    );
  };

  useEffect(() => {
    load();
  }, [reload]);

  return (
    <>
      <Card
        style={{
          boxShadow: "-1px 1px 1px 1px #9e9c9c",
          backgroundColor: "#fafafa",
        }}
        size="small"
        title={<Flex justify="space-between">Lista Descuentos   <Checkbox checked={ocultarInactivos} onChange={(e) => setOcultarInactivos(e.target.checked)}>Ocultar Inactivos</Checkbox></Flex>}
        extra={
          <>
            <Button
              danger
              type="dashed"
              onClick={(_) => {
                setModalOpen(true);
              }}
            >
              <PlusOutlined /> Agregar
            </Button>
          </>
        }
      >
        <Table
          size="small"
          columns={columns}
          dataSource={ ocultarInactivos ? data.filter((d) => d.activo) : data }
          pagination={false}
          scroll={{ y: 300 }}
        />
      </Card>
      <Modal
        open={modalOpen}
        onCancel={(_) => {
          setModalOpen(false);
        }}
        destroyOnClose
        width={"900px"}
        footer={null}
        title="Agregar Descuento"
      >
        <NuevoDescuento
          pCliente={cliente}
          callback={(_) => {
            setModalOpen(false);
            setReload(!reload);
          }}
        />
      </Modal>
    </>
  );
};

export default ClienteDescuentos;
