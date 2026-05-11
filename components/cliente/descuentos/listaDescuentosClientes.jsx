import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import NuevoDescuento from "./nuevoDescuento";
import { get } from "@/src/urls";

const ListaDescuentosClientes = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const columns = [
    {render:(_,record)=><>{+record.todos==0 ? <>Cliente</>:<>General</>}</>, title:"Tipo"},
    {dataIndex:"cliente", title:"Cliente"},
    {dataIndex:"porcentaje", title:"%"},
    {dataIndex:"subgrupo", title:"Subgrupo"},
    {render:(_,record)=><><Button><EditOutlined /></Button></>}
  ];
  const load = () =>{
    fetch(get.obtener_lista_descuentos)
    .then(r=>r.json())
    .then(response=>{
      setData(response)
    })
    .catch(e=>{
      console.log(e)
    })
  }
  useEffect(()=>{
    load();
  },[reload])
  return (
    <div>
      <Card
        size="small"
        title="Lista de descuentos"
        extra={
          <>
            <Button onClick={_=>{setModalOpen(true)}}>
              <PlusOutlined /> Agregar
            </Button>
          </>
        }
      >
        <Row>
          <Col span={24}>
            <Table
              size="small"
              columns={columns}
              dataSource={data}
              pagination={false}
              scroll={{ y: "300" }}
            />
          </Col>
        </Row>
      </Card>
      <Modal
  
        open={modalOpen}
        onCancel={(_) => {
          setModalOpen(false);
        }}
        destroyOnClose
        width={"700px"}
        footer={null}
        title="Agregar Descuento"
      >
        <NuevoDescuento
          callback={(_) => {
            setModalOpen(false);
            setReload(!reload);
          }}
        />
      </Modal>
    </div>
  );
};

export default ListaDescuentosClientes;
