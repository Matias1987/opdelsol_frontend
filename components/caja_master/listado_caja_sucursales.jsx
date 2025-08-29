import { Button, Col, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import ModifIngresoCaja from "./modificacion_ingreso_caja";

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
        <ModifIngresoCaja  callback={_=>{setPopupModifMontoOpen(false)}} />
      </Modal>
    </>
  );
};

export default ListadoCajaSucursales;
