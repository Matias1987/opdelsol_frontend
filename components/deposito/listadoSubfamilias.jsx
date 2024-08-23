import CustomTable from "@/components/forms/CustomTable"
import { get } from "@/src/urls";
import { Button, Col, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import SubFamiliaForm from "../forms/SubFamiliaForm";

const ListadoSubFamilias = ( props ) => {
    const [popupAddOpen, setPopupAddOpen] = useState(false)
    const [subfamilias, setSubfamilias] = useState([])
    const [reload, setReload] = useState(false)
    const columns = [
            {title: 'ID',dataIndex: 'id',key: 'id'},
            {title: 'Nombre Largo',dataIndex: 'nombre_largo',key: 'nombre_largo'},
            {title: 'Nombre Corto',dataIndex: 'nombre_corto',key: 'nombre_corto'},
            {
                title: 'Acciones', dataIndex: 'idsubfamilia', key: 'idsubfamilia',
                render: 
                    (_,{idsubfamilia})=>{
                        return (<>
                                <Button disabled onClick={()=>{}}>Editar</Button>
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
                        nombre_largo: row.nombre_largo
                    }
                )
            ))
        })
    },[reload])
    
    return <>
    <Row>
        <Col span={24}>
            <h3>Lista de SubFamilias</h3>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        <Button onClick={()=>{setPopupAddOpen(true)}}>Agregar Subfamilia</Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table 
            columns={columns}
            dataSource={subfamilias}
            />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        </Col>
    </Row>
    
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

    </>
}

export default ListadoSubFamilias;