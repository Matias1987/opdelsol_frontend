import { Col, Input, Row } from "antd"

const { useState } = require("react")
const { default: SelectCliente } = require("./SelectCliente")
const { default: SelectMedico } = require("./SelectMedico")

const FiltroVentas =(props) => {
    const [filtros,setFiltros] = useState({})

    const onSelectCliente = (id) => {
        setFiltros(_=>{
            const _f = {...filtros,idcliente:id}
            props?.callback?.(_f)
            return _f
        })
    }

    const onSelectMedico = (id) => {
        setFiltros(_=>{
            const _f = {...filtros,idmedico:id}
            props?.callback?.(_f)
            return _f
        })
    }

    const onSelectDestinatario = (id) => {
        setFiltros(_=>{
            const _f = {...filtros,iddestinatario:id}
            props?.callback?.(_f)
            return _f
        })
    }

    const onIDChange = (e) => {
        setFiltros(_=>{
            const _f = {...filtros,id:e.target.value}
            props?.callback?.(_f)
            return _f
        })
    }

    return <>
        <Row style={{padding: ".65em"}}>
            <Col span={24}>
                Nro.:&nbsp;&nbsp;
                <Input onChange={onIDChange} />
            </Col>
            
        </Row>
        <Row style={{padding: ".65em"}}>
            <Col span={24}>
                Cliente:&nbsp;&nbsp;
                <SelectCliente callback={onSelectCliente} />
            </Col>
        </Row>
        <Row style={{padding: ".65em"}}>
            <Col span={24}>
                M&eacute;dico:&nbsp;&nbsp;
                <SelectMedico callback={onSelectMedico} />
            </Col>
        </Row>
        <Row style={{padding: ".65em"}}>
            <Col span={24}>
                Destinatario:&nbsp;&nbsp;
                <SelectCliente callback={onSelectDestinatario} />
            </Col>
        </Row>
    </>
}

export default FiltroVentas;