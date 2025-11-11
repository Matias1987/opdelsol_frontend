import { Card, Table, Row, Col, Modal, Button } from "antd";
import { useState, useEffect } from "react";
import AgregarDeuda from "./agregar_deuda";
import { PlusOutlined } from "@ant-design/icons";

const ListaDeudas = (props) => {
  const [deudas, setDeudas] = useState([]);
  const [reload, setReload] = useState(false);
  const [popupAddDeudaOpen, setPopupAddDeudaOpen] = useState(false)
  const columns = [];
  const load = () => {};

  useEffect(() => {
    load();
  }, [reload]);

  const onDeudaAdded = () =>{
    setPopupAddDeudaOpen(false);
    setReload(!reload);
  }

  return (
    <>
      <Card
      title="Listado de deudas"
        extra={
            <>
            <Button type="primary" onClick={()=>{setPopupAddDeudaOpen(true)}}><PlusOutlined /> Agregar</Button>
            </>
        }
      >
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={deudas}
              scroll={{ y: "600px" }}
            />
          </Col>
        </Row>
      </Card>
      <Modal
      footer={null}
      open={popupAddDeudaOpen}
      destroyOnClose
      width={"950px"}
      title="Agregar Deuda"
      onCancel={_=>{setPopupAddDeudaOpen(false)}}
      >
        <AgregarDeuda callback={onDeudaAdded} />
      </Modal>
    </>
  );
};

export default ListaDeudas;