import { get } from "@/src/urls"
import LlamadaClienteForm from "./forms/LlamadaClienteForm"

const { Col, Row, Button, Table } = require("antd")
const { useState, useEffect } = require("react")

const LlamadasCliente = (props) => {
    const [llamadas, setLlamadas] = useState([])
    const [reload, setReload] = useState(false)
    const columns_llamadas = [
        {dataIndex: "fecha", title:"fecha"},
        {dataIndex: "comentarios", title:"Comentarios"},
        
        {dataIndex: "sucursal", title:"Sucursal"},
        {dataIndex: "usuario", title: "Usuario"},
    ]

    useEffect(()=>{
        fetch(get.lista_llamadas_cliente + props.idcliente)
        .then(response=>response.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            setLlamadas(response.data.map(l=>({
                fecha: l.fecha_f,
                usuario: l.usuario,
                sucursal: l.sucursal,
                comentarios: l.comentarios,
            })))
        })

    },[reload])

    return <div style={{padding:"1em"}}>
        <Row>
            <b>Lista de llamadas</b>
        </Row>
        <Row>
            <Col span={24}>
                <LlamadaClienteForm idcliente={props.idcliente} callback={()=>{setReload(!reload)}}/>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Table columns={columns_llamadas} dataSource={llamadas} />
            </Col>
        </Row>
    </div>
}

export default LlamadasCliente