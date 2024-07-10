import { Button, Col, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import AgregarBancoForm from "./agregarBanco";
import { get } from "@/src/urls";

const ListaBancos = (props) =>{
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [filtro, setFiltro] = useState("")
    const [reload, setReload] = useState(false)

    const columns = [
        {dataIndex:"nombre", title:"Nombre"}
    ]


    useEffect(()=>{
        fetch(get.lista_bancos)
        .then(r=>r.json())
        .then(response=>{
            setData(response.data)
        })
    },[reload])


    return <>
    <Row>
        <Col span={24}>
            <Input prefix="Buscar: " onChange={(e)=>{setFiltro(e.target.value.toUpperCase())}} allowClear/>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        <Button onClick={()=>{setOpen(true)}}>Agregar</Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table columns={columns} dataSource={data.filter(r=>filtro.trim().length>0 ? r.nombre.includes(filtro) : true  )} scroll={{y:"500px"}}  />
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
        <AgregarBancoForm callback={()=>{setReload(!reload); setOpen(false);}} />
    </Modal>
    </>
}

export default ListaBancos;