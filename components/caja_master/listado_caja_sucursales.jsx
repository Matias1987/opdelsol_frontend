import { Button, Col, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import ModifIngresoCaja from "./modificacion_ingreso_caja";
import { get } from "@/src/urls";

const ListadoCajaSucursales = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupModifMontoOpen, setPopupModifMontoOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {

    fetch(get.cajas_ls)
    .then((response) => response.json())
    .then((response) => {
      alert(JSON.stringify(response))
      setData(response);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setLoading(false);
    });

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
            dataSource={data}
            columns={[
              { dataIndex:"sucursal", title: "Sucursal" },
              { dataIndex:"monto_efectivo", title: "Monto" },
              { title: "Acciones", render:(_, row)=><>
                <Button onClick={_=>{setSelectedRow(row); setPopupModifMontoOpen(true)}}>Ingresar Dinero</Button>
              </> },
            ]}
            pagination={false}
          />
        </Col>
      </Row>
      <Modal destroyOnClose open={popupModifMontoOpen} title="Modificar Monto" footer={null} onCancel={_=>{setPopupModifMontoOpen(false)}}>
        <ModifIngresoCaja  callback={_=>{setPopupModifMontoOpen(false)}} selectedRow={selectedRow} />
      </Modal>
    </>
  );
};

export default ListadoCajaSucursales;
