import { get } from "@/src/urls"
import {Row, Col, Spin} from "antd"
import { useEffect, useState } from "react"
const DetalleGanador = (props) => {
    const {idcliente} = props
    const [cliente, setCliente] = useState(null)
    useEffect(_=>{
        fetch(get.cliente_por_id + idcliente)
        .then(r=>r.json())
        .then(response=>{
         
            setCliente(response.data[0])
        })
    },[])
    return cliente == null ? <Spin /> :    <>
        <Row>
            <Col span={24} style={{textAlign:"center", fontSize:"28px", padding:"12px"}}>
            GANADOR
            </Col>
        </Row>
        <Row>
            <Col span={24} style={{textAlign:"center", fontSize:"48px", fontWeight:"bold", padding:"12px"}}>
            {cliente.apellido +", "+ cliente.nombre}
            </Col>
        </Row>
        <Row>
            <Col span={24} style={{textAlign:"center", fontSize:"32px", padding:"12px"}}>
            DNI: {cliente.dni}
            </Col>
        </Row>
    </>
}

export default DetalleGanador