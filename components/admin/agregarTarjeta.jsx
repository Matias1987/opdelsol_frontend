import { Button, Col, Input, Row } from "antd";

const AgregarTarjetaForm = (props) => {
    return <>
    <Row>
        <Col span={24}>
            <h3>Formulario Tarjeta</h3>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        <Input prefix="Nombre: " />
        </Col>
    </Row>
    
    <Row>
        <Col span={24} style={{padding:"1em"}}>
            <Button type="primary">Agregar</Button>
            &nbsp;
            <Button danger size="small">Cancelar</Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        </Col>
    </Row>
    </>
}

export default AgregarTarjetaForm;