import globals from "@/src/globals";
import { get } from "@/src/urls";
import { InfoCircleFilled } from "@ant-design/icons";
import { Button, Card, Col, Modal, Row, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import Informe from "../informe/informe";

const ListadoVentasTM = (_) => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const columns = [
    {
      render: (_, record) => +record.isParent==0 ? <></> : (
        <>
          <Button onClick={e=>{
            setVentaSeleccionada(record);
            setModalOpen(true);
          }}>
            <InfoCircleFilled />
          </Button>
        </>
      ),
      width: "50px",
      title: "info",
    },
    { dataIndex: "idventa", width: "80px", title: "ID" },
    { dataIndex: "cliente", width: "80px", title: "Cliente" },
    { dataIndex: "fecha", width: "80px", title: "Fecha" },
    {
      title: "Estado",
      width: "80px",
      dataIndex: "estado",
      render: (_, { estado, isParent, estado_trabajo }) =>  {

        if(+isParent === 0){
          return <Tag
            color={
              estado_trabajo == "LAB"
                ? "red"
                : estado_trabajo == "CALIBRADO"
                ? "blue"
                : estado_trabajo == "TERMINADO"
                ? "green"
                : estado_trabajo == "PEDIDO"
                ? "orange"
                : "purple"
            }
          >
            {estado_trabajo}
          </Tag>
        }
        switch (estado) {
          case "PENDIENTE":
            return (
              <b>{`${estado} `}</b>
            );
          case "ENTREGADO":
            return <b>{estado}</b>;
          case "ANULADO":
            return <b>{estado}</b>;
          case "TERMINADO":
            return <b>{estado}</b>;
        }
      },
    },
    {
      width: "80px",
      title: "Acciones",
      render: (_, record) => <Button>Marcar como Entregado</Button>,
    },
  ];
  const load = () => {
    fetch(get.obtener_ventas_tm + globals.obtenerSucursal())
      .then((response) => response.json())
      .then((response) => {
        //alert(JSON.stringify(response.data));
        setData(response.data);
      });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Card>
        <Row>
          <Col>
            <Table columns={columns} dataSource={data} scroll={{ y: "300" }} />
          </Col>
        </Row>
      </Card>
      <Modal
        destroyOnClose
        width={"1100px"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        title={`Venta ${ventaSeleccionada?.idventa}`}
      >

        <Informe idventa={ventaSeleccionada?.idventa} />
      </Modal>
    </>
  );
};

export default ListadoVentasTM;
