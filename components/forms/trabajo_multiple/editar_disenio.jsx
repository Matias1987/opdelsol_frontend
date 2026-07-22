import { Button, Card, Col, Input, Modal, Row } from "antd"

const EditarDisenio = ({idsubgrupo}) =>{
    const row_style = {padding:"8px"}
    return <>
        <Card title="Modificar" size="small">
            <Row style={row_style}>
                <Col span={24}>
                    <Input addonBefore="Nombre: " />
                </Col>
            </Row>
            <Row style={row_style}>
                <Col span={24}>
                    <Input addonBefore="Descripción: " />
                </Col>
            </Row>
            <Row style={row_style}>
                <Col span={24}>
                    <Input addonBefore="Precio: " />
                </Col>
            </Row>
            <Row style={row_style}>
                <Col span={24}>
                    <Button block type="primary">Guardar</Button>
                </Col>
            </Row>
        </Card>
    </>
}

export default EditarDisenio;