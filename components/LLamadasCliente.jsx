import { get } from "@/src/urls"
import LlamadaClienteForm from "./forms/LlamadaClienteForm"
import Card from "antd/es/card/Card"

const { Col, Row, Button, Table } = require("antd")
const { useState, useEffect } = require("react")

const LlamadasCliente = (props) => {
    const [llamadas, setLlamadas] = useState([])
    const [reload, setReload] = useState(false)
    const columns_llamadas = [
        { width:"100px", dataIndex: "fecha", title:"Fecha"},
        { width:"200px", dataIndex: "comentarios", title:"Comentarios"},
        { width:"100px", dataIndex: "sucursal", title:"Sucursal"},
        { width:"100px", dataIndex: "usuario", title: "Usuario"},
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

    return <div>
        <Card size="small" title={<>Lista de llamadas&nbsp;<LlamadaClienteForm idcliente={props.idcliente} callback={()=>{setReload(!reload)}}/></>}>
        <Row>
            <Col span={24}>
                <Table scroll={{y:"300px"}} columns={columns_llamadas} dataSource={llamadas} size="small" />
            </Col>
        </Row>
        </Card>
    </div>
}

export default LlamadasCliente