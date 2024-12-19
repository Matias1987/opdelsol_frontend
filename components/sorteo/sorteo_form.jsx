import {Row, Col, DatePicker, Input, Button} from "antd"
const SorteoForm = (props) => {
    return <>
        <Row>
            <Col span={24}>
            
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                Fecha
                <DatePicker />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Input prefix="Comentarios: " />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button>Guardar</Button>
            </Col>
        </Row>
    </>
}


export default SorteoForm