const { Row, Col } = require("antd")
const { default: SucursalSelect } = require("../SucursalSelect")

const AgregarFondoFijo = props =>{

    return <>
    <Row>
        <Col>
            <SucursalSelect />
        </Col>
    </Row>
    </>
}