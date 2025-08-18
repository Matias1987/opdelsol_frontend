import { Button, Col, Row } from "antd";
import SucursalSelect from "../SucursalSelect";

const NuevaCaja = () => {
  return (
    <>
    <Row>
       <Col span={24}>
         <SucursalSelect callback={value => console.log(value)} />
       </Col>
       <Col span={24}>
         <Button type="primary" style={{ marginTop: '16px' }}>Crear Caja</Button>
       </Col>
    </Row>
    
    </>
  );
};

export default NuevaCaja;