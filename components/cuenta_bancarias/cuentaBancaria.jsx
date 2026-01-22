import { Button, Col, Input, Row } from "antd";

const CuentaBancaria = () => {
    return <>
    <Row style={{padding:"8px"}} >
        <Col span={24}>
            <Input prefix="Nombre: " />
        </Col>
    </Row>
    <Row  style={{padding:"8px"}} >
        <Col span={24}>
            <Button type="primary" block>Guardar</Button>
        </Col>
    </Row>
    </>
}

export default CuentaBancaria;