import { get } from "@/src/urls";
import { Button, Checkbox, Col, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import GrupoForm from "../forms/GrupoForm";
import EditarLoteGrupo from "./editarLoteGrupo";

const ListadoGrupos = ( props ) => {
    const [grupos, setGrupos] = useState([])
    const [popupAddOpen, setPopupAddOpen] = useState(false)
    const [popupEditLoteOpen, setPopupEditLoteOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const columns = 
        [
            {title: 'ID',dataIndex: 'id',key: 'id'},
            {title: 'Nombre Largo',dataIndex: 'nombre_largo',key: 'nombre_largo'},
            {title: 'Nombre Corto',dataIndex: 'nombre_corto',key: 'nombre_corto'},
            {
                title: 'Acciones', dataIndex: 'idgrupo', key: 'idgrupo',
                render: 
                    (_,{id})=>{
                        return (<>
                                <Button onClick={()=>{}}>Editar</Button>
                        </>    )                
                    }
            },
            {
                title: <Checkbox onChange={(e)=>{
                    setGrupos(dt=>dt.map(_g=>({..._g,checked:e.target.checked})))
                }}></Checkbox>,
                render:(_,{id, checked})=><Checkbox 
                checked={checked}
                onChange={(_)=>{
                    setGrupos(ds=>ds.map(g=>({...g,checked:g.id==id ? !g.checked : g.checked}) ))
                }}></Checkbox>
            }
        ]
    
    useEffect(()=>{
        fetch(get.lista_grupos)
        .then(r=>r.json())
        .then(r=>{
            setGrupos(
                r.data.map(
                    (row)=>(
                        {
                            id: row.idgrupo,
                            nombre_corto: row.nombre_corto,
                            nombre_largo: row.nombre_largo,
                            checked:false,
                        }
                    )
                )
            )
        })
        .catch((_)=>{console.log("error")})
    },update)
    return <>
    <Row>
        <Col span={24}>
            <h3>Lista de Grupos</h3>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Button onClick={()=>{setPopupAddOpen(true)}}>Agregar Grupo</Button>
            <Button onClick={()=>{setPopupEditLoteOpen(true)}}>Editar Seleccion</Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table dataSource={grupos} columns={columns} />
        </Col>
    </Row>

    <Modal 
    destroyOnClose
    open={popupAddOpen}
    title="Agregar Grupo"
    footer={null}
    onCancel={()=>{setPopupAddOpen(false)}}
    >
        <GrupoForm  action="ADD" callback={()=>{setPopupAddOpen(false);setUpdate(!update)}} />
    </Modal>

    <Modal 
    destroyOnClose
    open={popupEditLoteOpen}
    title="Editar Lote"
    footer={null}
    width={"70%"}
    onCancel={()=>{setPopupEditLoteOpen(false); setUpdate(!update)}}
    >
        <EditarLoteGrupo 
        callback={()=>{setUpdate(!update); setPopupEditLoteOpen(false)}} 
        grupos={(grupos.filter(g=>g.checked)).map(_g=>({idgrupo:_g.id,nombre_corto:_g.nombre_corto}))} 
        />
    </Modal>
    
    
    </>
}

export default ListadoGrupos;