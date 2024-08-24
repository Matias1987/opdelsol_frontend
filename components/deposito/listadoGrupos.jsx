import { get } from "@/src/urls";
import { Button, Card, Checkbox, Col, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import GrupoForm from "../forms/GrupoForm";
import EditarLoteGrupo from "./editarLoteGrupo";
import SubFamiliaSelect from "../SubFamiliaSelect";
import { PlusOutlined } from "@ant-design/icons";
import EditarPreciosSubgruposForm from "../forms/deposito/EditarPreciosSubgruposForm";

const ListadoGrupos = ( props ) => {
    const [grupos, setGrupos] = useState([])
    const [popupAddOpen, setPopupAddOpen] = useState(false)
    const [popupEditLoteOpen, setPopupEditLoteOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [selectedSubfamilia, setSelectedSubfamilia] = useState(-1)
    const [filtrarPorSubfamilia, setFiltrarPorSubfamilia] = useState(false)
    const [popupEditarPreciosOpen,setEditarPopupPreciosOpen] = useState(false)
    const [selectedGrupo, setSelectedGrupo] = useState(-1)
    const columns = 
        [
            /*{title: 'ID',dataIndex: 'id',key: 'id'},*/
            {title: '',dataIndex: 'ruta',key: 'ruta', render:(_,{ruta})=><span style={{fontSize:".8em", color:"blue", }}>{ruta}</span>},
            {title: 'Nombre Largo',dataIndex: 'nombre_largo',key: 'nombre_largo'},
            {title: 'Nombre Corto',dataIndex: 'nombre_corto',key: 'nombre_corto'},
            {
                title: 'Acciones', dataIndex: 'idgrupo', key: 'idgrupo',
                render: 
                    (_,{id})=>{
                        return (<>
                                <Button size="small" disabled onClick={()=>{}}>Editar</Button>
                                &nbsp;
                                <Button size="small" type="link" danger onClick={()=>{setSelectedGrupo(id); setEditarPopupPreciosOpen(true)}}>Modif. Precios Subgrupos</Button>
                        </>    )                
                    }
            },
            {
                title: <Checkbox 
                disabled={filtrarPorSubfamilia}
                onChange={(e)=>{
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
                            subfamilia_idsubfamilia: row.subfamilia_idsubfamilia,
                            ruta: row.ruta,
                        }
                    )
                )
            )
        })
        .catch((_)=>{console.log("error")})
    },update)
    const row_style={
        padding:"12px"
    }
    return <>
    <Card 
    bodyStyle={{backgroundColor:"#E7E7E7"}}
    headStyle={{backgroundColor:"#F07427", color:"white"}}
    bordered
    size="small" 
    title={<><span> Grupos</span> &nbsp;&nbsp;<Button size="small" style={{color:"blue"}} onClick={()=>{setPopupAddOpen(true)}}><PlusOutlined /> Agregar Grupo</Button></>}
    >
        <Row style={row_style}>
            <Col span={24}>
                <Button danger size="small" onClick={()=>{setPopupEditLoteOpen(true)}}>Editar Selecci&oacute;n</Button>
            </Col>
        </Row>
        <Row style={row_style}>
            <Col span={6}>
                <Checkbox checked={filtrarPorSubfamilia} onChange={()=>{setFiltrarPorSubfamilia(!filtrarPorSubfamilia)}}>Filtrar por Subfamilia</Checkbox>
            </Col>
            <Col span={18}>
                <SubFamiliaSelect disabled={!filtrarPorSubfamilia} callback={(id)=>{setSelectedSubfamilia(id)}} />
            </Col>
        </Row>
        <Row style={row_style}>
            
            <Col span={24}>
                <Table 
                size="small"
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                dataSource={(selectedSubfamilia>0&&filtrarPorSubfamilia) ? grupos.filter(g=>g.subfamilia_idsubfamilia==selectedSubfamilia) : grupos} 
                columns={columns} />
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
        <Modal 
        width={"60%"} 
        title={<i style={{color:"#555555", fontSize:".9em"}} >Editar Precios Tipo:&nbsp;<b>{"Grupo"}</b>&nbsp;&nbsp;&nbsp;ID:&nbsp;<b>{selectedGrupo}</b></i>   } 
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
                    <EditarPreciosSubgruposForm fkcategoria={selectedGrupo} categoria={"grupo"} callback={()=>{setEditarPopupPreciosOpen(false)}}/>
                </Col>
            </Row>
        </Modal>
    
    </Card>
    </>
}

export default ListadoGrupos;