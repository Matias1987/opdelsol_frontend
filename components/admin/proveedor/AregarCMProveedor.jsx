import { Button, Col, Input, Row } from "antd";

const AgregarCMProveedor = (props) => {
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
            <Input prefix="Comentarios" />
        </Col>
    </Row>
    <Row style={{padding:"1em"}}>
        <Col span={24}>
            <Button block type="primary">Agregar</Button>
        </Col>
    </Row>
    </>
}

export default AgregarCMProveedor;