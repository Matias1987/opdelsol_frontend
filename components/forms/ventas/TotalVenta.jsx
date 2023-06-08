import { Col, Input, Row } from "antd";

const TotalesVenta = (props) => (
    <>
        <Row>
            <h4>Totales</h4>
        </Row>
        <Row>
            <Col span={6}><Input prefix={"SubTotal: $"} readOnly/></Col>

            <Col span={6}><Input prefix={"Descuento: $"} style={{backgroundColor:"lightyellow"}}/></Col>

            <Col span={6}><Input prefix={"Total: $"} readOnly   /></Col>
        </Row>
    </>
)

export default TotalesVenta;