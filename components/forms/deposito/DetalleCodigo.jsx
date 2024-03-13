import { Row, Col, Input, Spin }  from "antd"
import { useEffect, useState } from "react"
import StockCodigosSucursales from "./StockCodigoSucursales"
import EnviosCodigos from "./EnviosCodigo"
const { get } = require("@/src/urls")

const DetalleCodigo = (props) => {
    const [codigo, setCodigo] = useState(null)
    const {idcodigo} = props

    useEffect(()=>{
        fetch(get.detalle_codigo + idcodigo)
        .then(r=>r.json())
        .then((response)=>{
            setCodigo(response.data[0])
        })
    },[])

    return codigo==null ? <Spin /> : <>
    <Row>
        <Col span={24}>
            <h2>Detalle</h2>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input style={{backgroundColor:"lightblue"}} prefix={"Código"} readOnly value={codigo.codigo} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input style={{backgroundColor:"lightblue"}} prefix={"Descripción"} readOnly value={codigo.descripcion} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <StockCodigosSucursales idcodigo={idcodigo} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <EnviosCodigos idcodigo={idcodigo} />
        </Col>
    </Row>
    
    </>
}

export default DetalleCodigo