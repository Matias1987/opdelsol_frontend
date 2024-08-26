import CustomTable from "@/components/forms/CustomTable";
import { get } from "@/src/urls";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Modal, Row } from "antd";

import FamiliaForm from "../forms/FamiliaForm";
import { useState } from "react";
import EditarPreciosSubgruposForm from "../forms/deposito/EditarPreciosSubgruposForm";

const ListadoFamilias = ( props ) => {
    const [open, setOpen] = useState(false)
    const [reload, setReload] = useState(false)
    const [popupEditarPreciosOpen, setEditarPopupPreciosOpen] = useState(false)
    const [selectedFamilia, setSelectedFamilia] = useState(-1)
    return <>
    <Card 
    bodyStyle={{backgroundColor:"#E7E7E7"}}
    headStyle={{backgroundColor:"#F07427", color:"white"}}
    bordered
    size="small" 
    title={<><span>Familias</span> &nbsp;&nbsp;<Button size="small" style={{color:"blue"}} onClick={()=>{setOpen(true)}}><PlusOutlined /> Agregar Familia</Button></>}
    >
        <Row>
            <Col span={24}>
            <CustomTable 
            key={reload}
            fetchUrl={get.lista_familia}
            columns = {
                [
                   
                    {title: 'Nombre Largo',dataIndex: 'nombre_largo',key: 'nombre_largo'},
                    {title: 'Nombre Corto',dataIndex: 'nombre_corto',key: 'nombre_corto'},
                    {
                        title: 'Acciones', dataIndex: 'idfamilia', key: 'idfamilia',
                        render: 
                            (_,{id})=>{
                                return (<>
                                    <Button disabled onClick={()=>{}}>Editar</Button>
                                    <Button size="small" type="link" danger onClick={()=>{setSelectedFamilia(id); setEditarPopupPreciosOpen(true)}}>Modif. Precios Subgrupos</Button>
                                </>    )                
                            }
                    }
                ]
            }
            parsefnt={
                (response)=>( response.data.map(
                        row=>(
                            {
                                id: row.idfamilia,
                                nombre_corto: row.nombre_corto,
                                nombre_largo: row.nombre_largo
                            }
                        )
                    )
                )
            }
        />
            </Col>
        </Row>

    </Card>
    <Modal open={open} onCancel={()=>{setOpen(false)}} footer={null} title="Agregar Familia">
        <FamiliaForm action={"ADD"} callback={()=>{setOpen(false); setReload(!reload)}} />
    </Modal>
    <Modal 
        width={"60%"} 
        title={<i style={{color:"#555555", fontSize:".9em"}} >Editar Precios Tipo:&nbsp;<b>{"Familia"}</b>&nbsp;&nbsp;&nbsp;ID:&nbsp;<b>{selectedFamilia}</b></i>   } 
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
                    <EditarPreciosSubgruposForm fkcategoria={selectedFamilia} categoria={"familia"} callback={()=>{setEditarPopupPreciosOpen(false)}}/>
                </Col>
            </Row>
    </Modal>
    
    </>
}

export default ListadoFamilias;