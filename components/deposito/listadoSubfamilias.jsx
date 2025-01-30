import CustomTable from "@/components/forms/CustomTable"
import { get } from "@/src/urls";
import { Button, Card, Checkbox, Col, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import SubFamiliaForm from "../forms/SubFamiliaForm";
import FamiliaSelect from "../FamiliaSelect";
import { PlusOutlined } from "@ant-design/icons";
import EditarPreciosSubgruposForm from "../forms/deposito/EditarPreciosSubgruposForm";

const ListadoSubFamilias = ( props ) => {
    const [popupAddOpen, setPopupAddOpen] = useState(false)
    const [subfamilias, setSubfamilias] = useState([])
    const [reload, setReload] = useState(false)
    const [filtrarPorFamilia, setFiltrarPorFamilia] = useState(false)
    const [selectedFamilia, setSelectedFamilia] = useState(-1)
    const [selectedSubFamilia, setSelectedSubFamilia] = useState(-1)
    const [popupEditarPreciosOpen, setEditarPopupPreciosOpen] = useState(false)

    const columns = [
           
            {width:"250px", title: 'Familia',dataIndex: 'familia',key: 'familia', render:(_,{familia})=><span style={{fontSize:"0.80em", color:"blue"}}>{familia}&nbsp;/</span>},
            {width:"250px", title: 'Nombre Largo',dataIndex: 'nombre_largo',key: 'nombre_largo',},
            {width:"250px", title: 'Nombre Corto',dataIndex: 'nombre_corto',key: 'nombre_corto'},
            {width:"250px", 
                title: 'Acciones', dataIndex: 'idsubfamilia', key: 'idsubfamilia',
                render: 
                    (_,{idsubfamilia})=>{
                        return (<>
                                <Button disabled onClick={()=>{}}>Editar</Button>
                                <Button size="small" type="link" danger onClick={()=>{setSelectedSubFamilia(idsubfamilia); setEditarPopupPreciosOpen(true)}}>Modif. Precios Subgrupos</Button>
                        </>    )                
                    }
            }
        ]

    useEffect(()=>{
        fetch(get.lista_subfamilias)
        .then(r=>r.json())
        .then(r=>{
            setSubfamilias(r.data.map(
                (row)=>(
                    {
                        idsubfamilia: row.idsubfamilia,
                        nombre_corto: row.nombre_corto,
                        nombre_largo: row.nombre_largo,
                        familia_idfamilia: row.familia_idfamilia,
                        familia:row.familia,
                    }
                )
            ))
        })
    },[reload])
    
    return <>
    <Card 
        bodyStyle={{backgroundColor:"#E7E7E7"}}
        headStyle={{backgroundColor:"#F07427", color:"white"}}
        bordered
        title={<><span>SubFamilias</span>&nbsp;&nbsp;<Button size="small" style={{color:"blue"}} onClick={()=>{setPopupAddOpen(true)}}><PlusOutlined /> Agregar Subfamilia</Button></>}
        size="small" >

        <Row>
            <Col span={8}>
                <Checkbox checked={filtrarPorFamilia} onChange={()=>{setFiltrarPorFamilia(!filtrarPorFamilia)}}>Filtrar por Familia</Checkbox>
                
            </Col>
            <Col span={16}>
                <FamiliaSelect disabled={!filtrarPorFamilia} callback={(id)=>{setSelectedFamilia(id)}} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Table 
                scroll={{y:"300px"}}
                size="small"
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                columns={columns}
                dataSource={selectedFamilia>0 && filtrarPorFamilia ? subfamilias.filter(sf=>sf.familia_idfamilia==selectedFamilia) : subfamilias}
                />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            </Col>
        </Row>
    </Card>
    <Modal 
    open={popupAddOpen} 
    footer={null} 
    title="Agregar Subfamilia" 
    onCancel={()=>{setPopupAddOpen(false); setReload(!reload)}}
    
    >
        <SubFamiliaForm callback={()=>{
            setPopupAddOpen(false)
            setReload(!reload)
        }}  action="ADD" />
    </Modal> 
    <Modal 
        width={"60%"} 
        title={<i style={{color:"#555555", fontSize:".9em"}} >Editar Precios Tipo:&nbsp;<b>{"Subfamilia"}</b>&nbsp;&nbsp;&nbsp;ID:&nbsp;<b>{selectedSubFamilia}</b></i>   } 
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
                    <EditarPreciosSubgruposForm fkcategoria={selectedSubFamilia} categoria={"subfamilia"} callback={()=>{setEditarPopupPreciosOpen(false)}}/>
                </Col>
            </Row>
    </Modal>

    </>
}

export default ListadoSubFamilias;