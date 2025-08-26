import { Button, Col, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";

const ListadoCajaSucursales = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupModifMontoOpen, setPopupModifMontoOpen] = useState(false)
  useEffect(() => {
    //const fetchData = async () => {
    //  setLoading(true);
    //};
//
    //fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Table
            size="small"
            title={(_) => <>Lista&nbsp;</>}
            dataSource={[
                {idcaja:1, sucursal: "ALBERDI", monto:"10000"},
            ]}
            columns={[
              { dataIndex:"idcaja", title: "Sucursal" },
              { dataIndex:"monto", title: "Monto" },
              { title: "Acciones", render:(_,{idcaja})=><>
                <Button>Ingresar Dinero</Button>
                <Button onClick={_=>{setPopupModifMontoOpen(true)}}>Modificar Monto</Button>
              </> },
            ]}
            pagination={false}
          />
        </Col>
      </Row>
      <Modal open={popupModifMontoOpen} title="Modificar Monto" footer={null}>
        <Row>
            <Col span={24}>
                <Input value={0} prefix="Monto" />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Input prefix="Comentarios" />
            </Col>
        </Row>
        <Row>
            <Col span={24} style={{display:"flex", alignContent:"center", justifyContent:"end"}}>
                <Button type="primary">Guardar</Button>
            </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ListadoCajaSucursales;
