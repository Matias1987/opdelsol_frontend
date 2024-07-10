import { Button, Col, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import AgregarMedicoForm from "./agregarMedico";
import { get } from "@/src/urls";
import { EditFilled } from "@ant-design/icons";

const ListaMedicos = (props) => {
    const [data, setData] = useState([])
    const [modoEditar, setModoEditar] = useState(false)
    const [open, setOpen] = useState(false)
    const [reload, setReload] = useState(false)
    const [idmedico, setIdMedico] = useState(-1)
    const [filtro, setFiltro] = useState("")
    const columns = [
        {dataIndex: "nombre", title:"Nombre"},
        {dataIndex: "direccion", title:"Direccion"},
        {dataIndex: "telefono", title:"Telefono"},
        {render:(_,{idmedico})=><><Button disabled onClick={()=>{
            setIdMedico(idmedico)
            setModoEditar(true)
            setOpen(true)
        }}><EditFilled /></Button></>},

    ]
    
    const load = () => {
        fetch(get.lista_medicos)
        .then(r=>r.json())
        .then(response=>{
            /**
             * [{"idmedico":1,
             * "nombre":"SIN RECETA",
             * "matricula":null,
             * "direccion":null,
             * "telefono":null,
             * "enabled":1
             * },

            */
           setData(response.data)
        })
        .catch(e=>{console.log("Error of some kind...")})
    }

    
    useEffect(()=>{
        load()
    },[reload])
    
    return <>
    <Row>
        <Col span={24}>
            <Button onClick={()=>{setModoEditar(false); setOpen(true)}}>Agregar</Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input prefix="Buscar: " onChange={(e)=>{setFiltro(e.target.value.toUpperCase())}} allowClear/>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table columns={columns} dataSource={data.filter(r=>filtro.trim().length>0 ? r.nombre.includes(filtro) : true  )} scroll={{y:"500px"}} />
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
    <Modal open={open} onCancel={()=>{  setOpen(false)}} footer={null} destroyOnClose>
        <AgregarMedicoForm editar={modoEditar} idmedico={idmedico} callback={()=>{setOpen(false); setReload(!reload)}} />
    </Modal>
    </>

}

export default ListaMedicos;