import { Button, Col, Input, Row } from "antd";

const AgregarPagoProveedor = (props) => {
    return <>
        <Row>
            <Col span={24}>
            </Col>
        </Row>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Input prefix="Monto" />
            </Col>
        </Row>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Button type="primary" block>Agregar</Button>
            </Col>
        </Row>
    </>
}

export default AgregarPagoProveedor;