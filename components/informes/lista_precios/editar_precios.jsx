import { Button, Col, Input, Row } from "antd";

const EditarPrecios = (props) => {

    return <>
        <Row>
            <Col span={24}>
                Editar Precio SubGrupo(s)
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Input prefix="Precio: " />   
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button>Confirmar</Button>
            </Col>
        </Row>
    </>
}

export default EditarPrecios
;