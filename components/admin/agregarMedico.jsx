import { Button, Col, Input, Row } from "antd"

const AgregarMedicoForm = (props) => {
    return <>
    <Row>
        <Col span={24}>
        <h3>Formulario M&eacute;dico</h3>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        <Input prefix="Nombre" onChange={(e)=>{}} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        <Input prefix={<>Direcci&oacute;n</>} onChange={(e)=>{}} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        <Input prefix={<>Tel&eacute;fono</>} onChange={(e)=>{}} />
        </Col>
    </Row>
    <Row style={{padding:"1em"}}>
        <Col span={24}>
        <Button type="primary" >Agregar</Button>
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

export default AgregarMedicoForm