import { Button, Checkbox, Col, Input, Modal, Row, Table } from "antd";
import { act, useEffect, useState } from "react";
import AgregarTarjetaForm from "./agregarTarjeta";
import { get, post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";

const ListaTarjetas = (props) => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [filtro, setFiltro] = useState("")
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(false)
    const columns = [
        {dataIndex:"nombre", title:"Nombre"},
        {
            title:"Activo", 
            render:(_,{idtarjeta, activo})=><>
                <Checkbox 
                
                checked={activo} 
                onChange={(e)=>{
                    //setData(_data=>_data.map(t=>t.idtarjeta==idtarjeta ? {...t,activo:!t.activo}:t))
                    
                    setLoading(true)
                    
                    post_method(post.desactivar_tarjeta,{idtarjeta:idtarjeta},(resp)=>{
                        setReload(!reload)
                    })

                }} 
                /></>
        },
            
    ]
    useEffect(()=>{
        setLoading(true)
        fetch(get.lista_tarjetas)
        .then(r=>r.json())
        .then(response=>{
            setLoading(false)
            setData(response.data.map(r=>({...r,activo:+r.activo==1})))
        })
    },[reload])
    return <>
    <Row>
        <Col span={24}>
            <Button onClick={()=>{setOpen(true)}}>Agregar</Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input prefix="Buscar: " onChange={(e)=>{setFiltro(e.target.value.toUpperCase())}} allowClear/>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table loading={loading} columns={columns} dataSource={data.filter(r=>filtro.trim().length>0 ? r.nombre.includes(filtro) : true  )} scroll={{y:"500px"}} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        </Col>
    </Row>
    <Modal open={open} onCancel={()=>{setOpen(false)}} footer={null}>
        <AgregarTarjetaForm callback={()=>{setReload(!reload);setOpen(false);}} />
    </Modal>
    </>
}


export default ListaTarjetas;