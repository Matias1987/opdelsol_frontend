import { Col, Input, Row } from "antd";

const TotalesVenta = (props) => {
    const totales = {
        descuento: 0,
        concepto_descuento: "",
        nro_orden: "",
        total: 0,
    }
return (
    <>
        <Row>
            <h4>Totales</h4>
        </Row>
        <Row>
            <Col span={5}><Input prefix={"SubTotal: $"} readOnly/></Col>

            <Col span={5}><Input prefix={"Descuento: $"} style={{backgroundColor:"lightyellow"}}/></Col>

            <Col span={14}><Input prefix={"Concepto Descuento: "} style={{backgroundColor:"lightyellow"}}></Input></Col>
        </Row>
        <Row>
            <Col span={24}><Input prefix={"Total: $"} readOnly   /></Col>
        </Row>
    </>)
}

export default TotalesVenta;