import { PlusCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Table } from "antd";
import { useState } from "react";
import NuevoDescuento from "./nuevoDescuento";

const ClienteDescuentos = ({ cliente }) => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const columns = [
    { title: "Detalle" },
    { title: "Porcentaje" },
    { title: "Activo" },
    { title: "Acciones" },
  ];
  return (
    <>
      <Card
        size="small"
        title="Lista Descuentos"
        extra={
          <>
            <Button
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
