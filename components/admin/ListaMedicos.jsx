import { Button, Checkbox, Col, Input, Modal, Row, Table, Card } from "antd";
import { useEffect, useState } from "react";
import AgregarMedicoForm from "./agregarMedico";
import { get, post } from "@/src/urls";
import { EditFilled, PlusOutlined } from "@ant-design/icons";
import { post_method } from "@/src/helpers/post_helper";

const ListaMedicos = (props) => {
    const [data, setData] = useState([])
    const [modoEditar, setModoEditar] = useState(false)
    const [open, setOpen] = useState(false)
    const [reload, setReload] = useState(false)
    const [idmedico, setIdMedico] = useState(-1)
    const [filtro, setFiltro] = useState("")
    const [loading, setLoading] = useState(false)
    const columns = [
        {dataIndex: "nombre", title:"Nombre"},
        {dataIndex: "direccion", title:"Direccion"},
        {dataIndex: "telefono", title:"Telefono"},
        {render:(_,{idmedico})=><><Button  onClick={()=>{
            setIdMedico(idmedico)
            setModoEditar(true)
            setOpen(true)
        }}><EditFilled /></Button></>},
        {
            title:"Activo", 
            render:(_,{idmedico, activo})=><>
                <Checkbox 
                
                checked={activo} 
                onChange={(e)=>{
                    setLoading(true)
                    post_method(post.desactivar_medico,{idmedico:idmedico},(resp)=>{
                        setReload(!reload)
                    })
                    //setData(_data=>_data.map(t=>t.idmedico==idmedico ? {...t,activo:!t.activo}:t))
                }} 
                /></>
        },

    ]
    
    const load = () => {
        setLoading(true)
        fetch(get.lista_medicos_opt)
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
           setData(d=>response.data.map(m=>({...m,activo:+m.enabled==1})))
           setLoading(false)
        })
        .catch(e=>{console.log("Error of some kind...")})
    }

    
    useEffect(()=>{
        load()
    },[reload])
    
    return <>
    <Card
    size="small"
    title={<>M&eacute;dicos&nbsp;<Button type="link" onClick={()=>{setModoEditar(false); setOpen(true)}}><PlusOutlined /> Agregar</Button></>}
  >
    <Row>
        <Col span={24}>
            <Input prefix="Buscar: " onChange={(e)=>{setFiltro(e.target.value.toUpperCase())}} allowClear/>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Table 
                size="small"
                columns={columns} 
                dataSource={data.filter(r=>filtro.trim().length>0 ? r.nombre.includes(filtro) : true  )} 
                scroll={{y:"500px"}} 
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                />
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
    </Card>
    <Modal open={open} onCancel={()=>{  setOpen(false)}} footer={null} destroyOnClose>
        <AgregarMedicoForm editar={modoEditar} idmedico={idmedico} callback={()=>{ setReload(!reload); setOpen(false);}} />
    </Modal>
    </>

}

export default ListaMedicos;