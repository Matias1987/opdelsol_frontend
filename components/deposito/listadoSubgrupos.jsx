import GrupoSelect from "@/components/GrupoSelect";
import EditarSubgrupo from "@/components/forms/deposito/EditarSubgrupo";
import { get } from "@/src/urls";
import { Button, Checkbox, Col, Divider, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import EditarLoteSubgrupo from "./editarLoteSubgrupo";
import SubGrupoFormV2 from "../forms/SubGrupoFormV2";

const ListadoSubGrupos = ( props ) => {
    const [change, setChange] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [filtrarPorGrupo, setFiltrarPorGrupo] = useState(false)
    const [idgrupo, setIdGrupo] = useState(-1)
    const [filtroTabla, setFiltroTable] = useState("")
    const [popupEditSeleccionOpen, setPopupEditSeleccionOpen] = useState(false)
    const [popupAddOpen, setPopupAddOpen] = useState(false)
    
    useEffect(()=>{
        
        fetch(get.lista_subgrupo + (filtrarPorGrupo ? idgrupo : -1) )
        .then(r=>r.json())
        .then(response=>{
            setDataSource(
            response.data.map(
                (row)=>(
                    {
                        id: row.idsubgrupo,
                        nombre_corto: row.nombre_corto,
                        nombre_largo: row.nombre_largo,
                        multiplicador: row.multiplicador,
                        idsubgrupo: row.idsubgrupo,
                        ruta: row.ruta,
                        precio_defecto: row.precio_defecto,
                        checked: false,
                        
                    }
                )
            ))
        })
        .catch(e=>{"error"})
    },[change])
    const columns = [
        {title: 'ID',dataIndex: 'id',key: 'id'},
        {title: 'Ruta',dataIndex: 'ruta',key: 'ruta', render:(_,{ruta})=><>
        <i style={{fontSize:".75em", color:"blue"}}>{ruta}</i>
        </>},
        {title: 'Nombre Largo',dataIndex: 'nombre_largo'},
        {title: 'Nombre Corto',dataIndex: 'nombre_corto'},
        {title: 'Precio Defecto',dataIndex: 'precio_defecto'},
        {
            title: 'Acciones',
            render: 
                (_,{idsubgrupo})=>{
                    return<EditarSubgrupo idsubgrupo={idsubgrupo} buttonText="Editar" callback={()=>{setChange(!change)}} />               
                }
            
        },
        {
            title: <Checkbox onChange={(e)=>{
                setDataSource(dt=>dt.map(_sg=>({..._sg,checked:e.target.checked})))
            }}></Checkbox>,
            render:(_,{id, checked})=><Checkbox 
            checked={checked}
            onChange={(_)=>{
                setDataSource(ds=>ds.map(sg=>({...sg,checked:sg.id==id ? !sg.checked : sg.checked}) ))
            }}></Checkbox>
        }
    ]

    const onSearch = (value) => {
        setFiltroTable(value)
    }

    return(
        <>
        <Row>
            <Col span={24}>
                <h3>Lista de SubGrupos</h3>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button onClick={()=>{setPopupEditSeleccionOpen(true)}}>Editar Selecci&oacute;n</Button>
                &nbsp;
                <Button onClick={()=>{setPopupAddOpen(true)}}>Agregar Subgrupo</Button>
            </Col>
          
        </Row>
        
        
        <Row style={{padding:"1em"}}>
            <Col span={6}>
                <Checkbox checked={filtrarPorGrupo} onChange={(e)=>{
                    setFiltrarPorGrupo(!filtrarPorGrupo)
                    setChange(!change)
                    }
                }>Filtrar por Grupo</Checkbox>
            </Col>
            <Col span={14}>
                <GrupoSelect callback={(id)=>{setIdGrupo(id); setChange(!change)}} disabled={!filtrarPorGrupo} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Divider />
                <Input.Search style={{ backgroundColor:"lightblue"}} onSearch={onSearch} prefix="QuickSearch: "/>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Table columns={columns} dataSource={
                    filtroTabla.trim().length<1 ? dataSource : dataSource.filter(r=>(r.nombre_corto.toString().toUpperCase().includes(filtroTabla.toUpperCase()) || r.nombre_largo.toString().toUpperCase().includes(filtroTabla.toUpperCase())))
                } scroll={{y:"500px"}} pagination={true} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>

            </Col>
        </Row>
        <Modal 
        destroyOnClose
        title="Editar Lote Subgrupo"
        open={popupEditSeleccionOpen} 
        width={"70%"} 
        onCancel={()=>{setPopupEditSeleccionOpen(false)}}
        footer={null}
        >
            <EditarLoteSubgrupo 
                subgrupos={(dataSource.filter(sg=>sg.checked)).map(sg=>({nombre_corto: sg.nombre_corto,idsubgrupo:sg.id}))} 
                callback={()=>{setChange(!change); setPopupEditSeleccionOpen(false);}}
            />
        </Modal>
        <Modal 
        open={popupAddOpen} 
        destroyOnClose 
        title="Agregar Subgrupo" 
        width={"70%"} 
        onCancel={()=>{setPopupAddOpen(false); setChange(!change);}}
        footer={null}
        >
            <SubGrupoFormV2 callback={()=>{setChange(!change); setPopupAddOpen(false);}}  action="ADD" />
        </Modal>
        </>)
}

export default ListadoSubGrupos;