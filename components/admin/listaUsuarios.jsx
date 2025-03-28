import { get } from "@/src/urls";
import { Button, Card, Col, Modal, Row, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import AgregarPrivilegiosUsuarios from "./agregarPrivilegiosUsuarios";
import AgregarUsuarioForm from "./agregarUsuario";
import { EditFilled, PlusOutlined } from "@ant-design/icons";

const ListaUsuarios = (props) => {
    const [usuarios, setUsuarios] = useState([])
    const [popupAddEditOpen, setPopupAddEditOpen] = useState(false)
    const [selectedUsuario, setSelectedUsuario] = useState(-1)
    const [popupPrivilegiosOpen, setPopupPrivilegiosOpen] = useState(false)
    const [editarUsuario, setEditarUsuario] = useState(false)
    const [update, setUpdate] = useState(false)
    const columns = [
        {title:"Nombre", 
            dataIndex:"nombre", 
            render:(_,obj)=><span>{obj.nombre}&nbsp;<Button 
                                                    disabled
                                                    size="small" 
                                                    type="link" 
                                                    onClick={()=>{
                                                        setEditarUsuario(true)
                                                        setSelectedUsuario(obj.id)
                                                        setPopupAddEditOpen(true)
                                                    }}><EditFilled />
                                                    </Button></span>},
        {title:"Permisos",  render:(_,record)=>{
            const permisos = record.permisos || []
            return permisos.map(p=><>
                <div style={{margin:"2em", padding:"2px", fontSize:".6em"}}>
                    <b>{p.sucursal}&nbsp;</b>
                    <Tag color={+p.ventas==1? "green-inverse" : "red-inverse"}>Vtas</Tag>
                    <Tag color={+p.caja1==1? "green-inverse" : "red-inverse"}>Caja</Tag>
                    <Tag color={+p.deposito_min==1? "green-inverse" : "red-inverse"}>DepMin</Tag>
                    
                    <Tag color={+p.deposito==1? "green-inverse" : "red-inverse"}>Dep&oacute;sito</Tag>
                    <Tag color={+p.laboratorio==1? "green-inverse" : "red-inverse"}>Taller</Tag>
                    
                    <Tag color={+p.admin2==1? "green-inverse" : "red-inverse"}>Admin</Tag>
                </div>
            </>)
        }},
        {title:"", dataIndex:"idusuario", render:(_,{id})=>{
            return <>
                
                <Button size="small" type="link" onClick={()=>{
                    setSelectedUsuario(id)
                    setPopupPrivilegiosOpen(true)}
                    }>Modificar Permisos</Button>
                
                
            </>
            
        }}
    ]

    const load = () => {
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
    <Card

    title={<>Lista de Usuarios <Button type="link" onClick={()=>{ setEditarUsuario(false); setPopupAddEditOpen(true);}}><PlusOutlined />&nbsp;Agregar</Button></>}
    
    >
        <Row>
            <Col span={24}>
                <Table
                scroll={{y:"600px"}}
                size="small"
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'} 
                dataSource={usuarios} 
                columns={columns} />
            </Col>
        </Row>
    </Card>
    
    <Modal destroyOnClose footer={null} title="Editar" open={popupPrivilegiosOpen} onCancel={()=>{setPopupPrivilegiosOpen(false)}} key={selectedUsuario}>
        <AgregarPrivilegiosUsuarios idusuario={selectedUsuario}  key={selectedUsuario} callback={()=>{setUpdate(!update); setPopupPrivilegiosOpen(false);}} />
    </Modal>
    <Modal destroyOnClose open={popupAddEditOpen} onCancel={()=>{setPopupAddEditOpen(false)}} footer={null} title={editarUsuario?"Editar":"Agregar Usuario"} >
        <AgregarUsuarioForm idusuario={selectedUsuario}  key={selectedUsuario} edicion={editarUsuario} callback={()=>{ setUpdate(!update); setPopupAddEditOpen(false);}} />
    </Modal>
    </>
}

export default ListaUsuarios;