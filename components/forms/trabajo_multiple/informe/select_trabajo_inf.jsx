import { Button, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import PrinterFilled from "@ant-design/icons/PrinterFilled";
import InformeVenta from "@/components/informes/ventas/Base";
import { get } from "@/src/urls";

const SelectTrabajoInforme = (idventa) => {
  const [modalInfOpen, setModalInfOpen] = useState(false);
  const [data, setData] = useState(null);
  const [selectedTrabajoId, setSelectedTrabajoId] = useState(-1);
  const columns = [
    { dataIndex: "id", title: "Nro." },
    { dataIndex: "tipo", title: "Tipo" },
    {
      dataIndex: "id",
      render: (_, { idventa }) => (
        <>
          <Button>
            <PrinterFilled />
          </Button>
        </>
      ),
    },
  ];
  const loadTrabajos = () => {
    fetch(get.trabajos_venta + idventa)
      .then((r) => r.json())
      .then((r) => {
        alert(JSON.stringify(r));
        setData(r.data);
      });
  };

  useEffect(() => {
    loadTrabajos();
  }, [idventa]);

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        scroll={{ y: 300 }}
        pagination={false}
      />
      <Modal
        footer={null}
        open={modalInfOpen}
        onCancel={(_) => {
          setModalInfOpen(false);
        }}
        destroyOnClose
        width={"900px"}
      >
        <InformeVenta idventa={idventa} idtrabajo={selectedTrabajoId} />
      </Modal>
    </>
  );
};
export default SelectTrabajoInforme;
