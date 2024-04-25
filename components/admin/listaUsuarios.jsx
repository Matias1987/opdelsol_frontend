import { get } from "@/src/urls";
import { Button, Card, Col, Modal, Row, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import AgregarPrivilegiosUsuarios from "./agregarPrivilegiosUsuarios";
import AgregarUsuarioForm from "./agregarUsuario";
import { EditFilled } from "@ant-design/icons";

const ListaUsuarios = (props) => {
    const [usuarios, setUsuarios] = useState([])
    const [popupAddEditOpen, setPopupAddEditOpen] = useState(false)
    const [selectedUsuario, setSelectedUsuario] = useState(-1)
    const [popupPrivilegiosOpen, setPopupPrivilegiosOpen] = useState(false)
    const [editarUsuario, setEditarUsuario] = useState(false)
    const [update, setUpdate] = useState(false)
    const columns = [
        {title:"Nombre", dataIndex:"nombre"},
        {title:"Permisos",  render:(_,record)=>{
            const permisos = record.permisos || []
            return permisos.map(p=><>
                <div style={{margin:"2em", padding:"1em", fontSize:".6em", border:"1px solid black"}}>
                    <b>{p.sucursal}</b>
                    <Tag color={+p.ventas==1? "green-inverse" : "red-inverse"}>Vtas</Tag>
                    <Tag color={+p.caja1==1? "green-inverse" : "red-inverse"}>Caja1</Tag>
                    <Tag color={+p.caja2==1? "green-inverse" : "red-inverse"}>Caja2</Tag>
                    <Tag color={+p.deposito_min==1? "green-inverse" : "red-inverse"}>DepMin</Tag>
                    
                    <Tag color={+p.deposito==1? "green-inverse" : "red-inverse"}>Dep</Tag>
                    <Tag color={+p.laboratorio==1? "green-inverse" : "red-inverse"}>Lab</Tag>
                    <Tag color={+p.admin1==1? "green-inverse" : "red-inverse"}>Adm1</Tag>
                    <Tag color={+p.admin2==1? "green-inverse" : "red-inverse"}>Adm2</Tag>
                </div>
            </>)
        }},
        {title:"Acciones", dataIndex:"idusuario", render:(_,{id})=>{
            return <>
                <Button onClick={()=>{
                    setEditarUsuario(true)
                    setSelectedUsuario(id)
                    setPopupAddEditOpen(true)
                }}><EditFilled /></Button>
                <Button onClick={()=>{
                    setSelectedUsuario(id)
                    setPopupPrivilegiosOpen(true)}
                    }>Modificar Permisos</Button>
                
            </>
            
        }}
    ]

    const load = () => {
        //alert(get.obtener_usuarios_permisos)
        fetch(get.obtener_usuarios_permisos)
        .then(r=>r.json())
        .then(response=>{
            
            
            let resp = response.data||[]

            let data = []
            let temp = {}
            //alert(JSON.stringify(resp))
            resp.forEach(e => {
                if(typeof temp[e.id.toString()] === 'undefined')
                {
                    temp[e.id.toString()] = e
                    data.push(temp[e.id.toString()])
                }
                if(typeof temp[e.id.toString()].permisos === 'undefined' )
                {
                    temp[e.id.toString()].permisos = []
                    const _temp = {
                        "id":e.id,
                        "sucursal":"BASE",
                        "nombre":e.nombre,
                        "ventas":e.ventas,
                        "caja1":e.caja1,
                        "caja2":e.caja2,
                        "deposito_min":e.deposito_min,
                        "deposito":e.deposito,
                        "admin1":e.admin1,
                        "admin2":e.admin2,
                        "laboratorio":e.laboratorio,
                        
                    }
           
                    
                    temp[e.id.toString()].permisos.push(_temp)
                }
                else{
                    temp[e.id.toString()].permisos.push(e)
                }
                
            });

            //alert(JSON.stringify(data))

            setUsuarios(data)

        })
        .catch(e=>{
            console.log("error")
        })
    }
    
    useEffect(()=>{
        load()
    },[update])



    return <>
    <Row>
        <Col span={24}>

        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'} dataSource={usuarios} columns={columns} />
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
    <Row>
        <Col span={24}>
            <Button onClick={()=>{ setEditarUsuario(false); setPopupAddEditOpen(true);}}>Agregar</Button>
        </Col>
    </Row>
    <Modal destroyOnClose footer={null} title="Editar" open={popupPrivilegiosOpen} onCancel={()=>{setPopupPrivilegiosOpen(false)}} key={selectedUsuario}>
        <AgregarPrivilegiosUsuarios idusuario={selectedUsuario}  key={selectedUsuario} callback={()=>{setUpdate(!update); setPopupPrivilegiosOpen(false);}} />
    </Modal>
    <Modal destroyOnClose open={popupAddEditOpen} onCancel={()=>{setPopupAddEditOpen(false)}} footer={null} title={editarUsuario?"Editar":"Agregar Usuario"} >
        <AgregarUsuarioForm idusuario={selectedUsuario}  key={selectedUsuario} edicion={editarUsuario} />
    </Modal>
    </>
}

export default ListaUsuarios;