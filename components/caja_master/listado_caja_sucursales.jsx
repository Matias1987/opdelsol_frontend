import { Button, Col, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import ModifIngresoCaja from "./modificacion_ingreso_caja";
import { get } from "@/src/urls";

const ListadoCajaSucursales = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupModifMontoOpen, setPopupModifMontoOpen] = useState(false)
  const [popupDetalleOpen, setPopupDetalleOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {

    fetch(get.cajas_ls)
    .then((response) => response.json())
    .then((response) => {
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
            scroll={{ y: "300px" }}
            size="small"
            title={(_) => <>Lista&nbsp;</>}
            dataSource={data}
            columns={[
              { dataIndex:"sucursal", title: "Sucursal" },
              { dataIndex:"monto_efectivo", title: "Monto" },
              { title: "Acciones", render:(_, row)=><>
                <Button type="link" size="small" onClick={_=>{setSelectedRow(row); setPopupModifMontoOpen(true)}}>Ingresar Dinero</Button>
                <Button type="link" size="small" onClick={_=>{setSelectedRow(row); setPopupDetalleOpen(true)}}>Ver Detalle</Button>
              </> },
            ]}
            pagination={false}
          />
        </Col>
      </Row>
      <Modal destroyOnClose open={popupModifMontoOpen} title="Modificar Monto" footer={null} onCancel={_=>{setPopupModifMontoOpen(false)}}>
        <ModifIngresoCaja callback={_=>{setPopupModifMontoOpen(false)}} selectedRow={selectedRow} />
      </Modal>
      <Modal destroyOnClose open={popupDetalleOpen} title="Detalle de Caja" footer={null} onCancel={_=>{setPopupDetalleOpen(false)}}>
        <p>Contenido del modal</p>
      </Modal>
    </>
  );
};

export default ListadoCajaSucursales;
