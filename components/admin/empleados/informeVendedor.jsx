import { Col, Rate, Row } from "antd";

const InformeVendedor = (props) => {
    const row_style = {padding:"16px"}
    return <>
        <Row style={row_style} gutter={[16,16]}>
            <Col>Nombre: </Col>

            <Col>Usuario </Col>
        </Row>
        <Row style={row_style} gutter={[16,16]}>
            <Col>Calificación: </Col>

            <Rate allowHalf defaultValue={3.5} />
        </Row>
        <Row style={row_style} gutter={[16,16]}>
            <Col>Ventas Hoy</Col>

            <Col>0</Col>
        </Row>
    </>
}

export default InformeVendedor;