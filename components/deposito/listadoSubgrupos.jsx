import GrupoSelect from "@/components/GrupoSelect";
import EditarSubgrupo from "@/components/forms/deposito/EditarSubgrupo";
import { get } from "@/src/urls";
import { Button, Card, Checkbox, Col, Divider, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import EditarLoteSubgrupo from "./editarLoteSubgrupo";
import SubGrupoFormV2 from "../forms/SubGrupoFormV2";
import { PlusOutlined } from "@ant-design/icons";
import EditarPreciosSubgruposForm from "../forms/deposito/EditarPreciosSubgruposForm";

const ListadoSubGrupos = ( props ) => {
    const [change, setChange] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [filtrarPorGrupo, setFiltrarPorGrupo] = useState(false)
    const [idgrupo, setIdGrupo] = useState(-1)
    const [filtroTabla, setFiltroTable] = useState("")
    const [popupEditSeleccionOpen, setPopupEditSeleccionOpen] = useState(false)
    const [popupEditarPreciosOpen,setEditarPopupPreciosOpen] = useState(false)
    const [popupAddOpen, setPopupAddOpen] = useState(false)
    const [selectedSubGrupo, setSelectedSubgrupo] = useState(-1)

    
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
        {width:"60px", 
            title: <Checkbox
            disabled={filtrarPorGrupo} 
            onChange={(e)=>{
                setDataSource(dt=>dt.map(_sg=>({..._sg,checked:e.target.checked})))
            }}></Checkbox>,
            render:(_,{id, checked})=><Checkbox 
            checked={checked}
            onChange={(_)=>{
                setDataSource(ds=>ds.map(sg=>({...sg,checked:sg.id==id ? !sg.checked : sg.checked}) ))
            }}></Checkbox>
        },
        /*{title: 'ID',dataIndex: 'id',key: 'id'},*/
        {width:"250px", title: 'Ruta',dataIndex: 'ruta',key: 'ruta', render:(_,{ruta})=><>
        <i style={{fontSize:".75em", color:"blue"}}>{ruta}</i>
        </>},
        {width:"250px", title: 'Nombre Largo',dataIndex: 'nombre_largo'},
        {width:"250px", title: 'Nombre Corto',dataIndex: 'nombre_corto'},
        {width:"250px", title: 'Precio Defecto',dataIndex: 'precio_defecto'},
        {width:"250px", 
            title: 'Acciones',
            render: 
                (_,{idsubgrupo})=>{
                    return<>
                    <EditarSubgrupo idsubgrupo={idsubgrupo} buttonText="Editar" callback={()=>{setChange(!change)}} /> 
                        &nbsp;
                    <Button size="small" type="link" danger onClick={()=>{setSelectedSubgrupo(idsubgrupo); setEditarPopupPreciosOpen(true)}}>Modif. Precios Subgrupo</Button>   
                        </>           
                }
            
        },
        
    ]

    const onSearch = (value) => {
        setFiltroTable(value)
    }

    return(
        <>
        <Card 
        bodyStyle={{backgroundColor:"#E7E7E7"}}
        headStyle={{backgroundColor:"#F07427", color:"white"}}
        bordered
        title={<><span>SubGrupos</span>&nbsp;&nbsp;<Button size="small" style={{color:"blue"}} onClick={()=>{setPopupAddOpen(true)}}><PlusOutlined /> Agregar Subgrupo</Button></>}
        size="small" >
            <Row>
                <Col span={24}>
                    
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Button size="small" danger onClick={()=>{setPopupEditSeleccionOpen(true)}}>Editar Selecci&oacute;n</Button>
                    &nbsp;
                    
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
                    <GrupoSelect callback={(id)=>{setIdGrupo(id);setChange(!change);}} disabled={!filtrarPorGrupo} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Input.Search style={{ backgroundColor:"lightblue"}} onSearch={onSearch} prefix="QuickSearch: "/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table 
                    size="small"
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    columns={columns} dataSource={
                        filtroTabla.trim().length<1 ? dataSource : dataSource.filter(r=>(r.nombre_corto.toString().toUpperCase().includes(filtroTabla.toUpperCase()) || r.nombre_largo.toString().toUpperCase().includes(filtroTabla.toUpperCase())))
                    } scroll={{y:"500px"}} pagination={true} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>

                </Col>
            </Row>
        </Card>
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
        <Modal 
        width={"60%"} 
        title={<i style={{color:"#555555", fontSize:".9em"}} >Editar Precios Tipo:&nbsp;<b>{"Subgrupo"}</b>&nbsp;&nbsp;&nbsp;ID:&nbsp;<b>{selectedSubGrupo}</b></i>   } 
        open={popupEditarPreciosOpen} 
        onCancel={()=>{setEditarPopupPreciosOpen(false)}} 
        footer={null} 
        destroyOnClose
        >
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={24}>
                            <span style={{fontSize:".8em"}}>Modifica C&oacute;digos cuyos precios son por SUBGRUPO</span>
                        </Col>
                    </Row>
                    <br />
                    <EditarPreciosSubgruposForm fkcategoria={selectedSubGrupo} categoria={"subgrupo"} callback={()=>{setEditarPopupPreciosOpen(false)}}/>
                </Col>
            </Row>
        </Modal>
        </>)
}

export default ListadoSubGrupos;