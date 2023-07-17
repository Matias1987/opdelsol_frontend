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
        <Row>
            <Col span={12}>
                Nro.:
                <Input onChange={onIDChange} />
            </Col>
            <Col span={12}>
                Cliente:
                <SelectCliente callback={onSelectCliente} />
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                M&eacute;dico:
                <SelectMedico callback={onSelectMedico} />
            </Col>
            <Col span={12}>
                Destinatario:
                <SelectCliente callback={onSelectDestinatario} />
            </Col>
        </Row>
    </>
}

export default FiltroVentas;