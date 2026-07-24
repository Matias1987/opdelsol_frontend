import { PlusCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import NuevoDescuento from "./nuevoDescuento";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";

const ClienteDescuentos = ({ cliente }) => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const columns = [
    { title: "Detalle", dataIndex: "detalle" },
    {
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
      render: (_, { activo }) => (
        <>
          <Checkbox checked={activo}></Checkbox>
        </>
      ),
    },
    { title: "Acciones" },
  ];

  const load = () => {
    post_method(
      post.descuentos_cliente,
      { idcliente: cliente.idcliente },
      (response) => {
        //alert(JSON.stringify(response))
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
  }, []);

  return (
    <>
      <Card
        style={{
          boxShadow: "-1px 1px 1px 1px #9e9c9c",
          backgroundColor: "#fafafa",
        }}
        size="small"
        title="Lista Descuentos"
        extra={
          <>
            <Button
              type="primary"
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
          dataSource={data}
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
