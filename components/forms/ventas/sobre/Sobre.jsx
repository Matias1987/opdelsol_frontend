import { Col, Row } from "antd"
import SelectCliente from "../SelectCliente"
import SelectMedico from "../SelectMedico"
import SelectObraSocial from "../SelectObraSocial"

const Sobre = props => {
    /**
     * el sobre se compone de:
     * destinatario
     * medico
     * productos
     */
    return <>
        <Row className="table-row-light" style={{ padding: ".9em" }}>
            <Col span={24} >
                <SelectCliente destinatario callback={(value) => { onChange("fkdestinatario", value) }} />
            </Col>
        </Row>
        <Row className="table-row-dark" style={{ padding: ".9em" }}>
            <Col span={24}>
                <SelectMedico openButtonText={<span style={{ color: "#3300CC" }}>&nbsp;*Seleccione M&eacute;dico</span>} callback={(value) => { onChange("fkmedico", value) }} />
            </Col>
        </Row>
        <Row className="table-row-light" style={{ padding: ".9em" }} >
            <Col span={24}>
                <SelectObraSocial callback={(value) => { onChange("fkos", value) }} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                {props.children}
            </Col>
        </Row>
    </>
}

export default Sobre;