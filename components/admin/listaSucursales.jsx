import { get } from "@/src/urls";
import { Button, Card, Col, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import AgregarSucursal from "./agregarSucursal";
import EditarSucursal from "./editarSucursal";
import { EditOutlined } from "@ant-design/icons";

const ListaSucursales = (props) => {
    const [sucursales, setSucursales] = useState([])
    const [loading, setLoading] = useState(false)
    const [popupAddOpen, setPopupAddOpen] = useState(false)
    const [popupEditOpen, setPopupEditOpen] = useState(false)
    const [reload, setReload] = useState(false)
    const [idsucursal, setIdSucursal] = useState(-1)
    
    const columns = [
        {width:"200px", dataIndex: "nombre", title:"Nombre"},
        {width:"200px", dataIndex: "direccion", title:"Dirección"},
        {width:"200px", dataIndex: "telefono", title:"Teléfono"},
        {width:"200px", title:"Óptica", dataIndex:"optica"},
        {width:"200px", title:"Facebook", dataIndex:"facebook"},
        {width:"200px", title:"Whatsapp", dataIndex:"whatsapp"},
        {width:"200px", title:"Instagram", dataIndex:"instagram"},

        {fixed:'right', width:"50px", title:"", render:(_,obj)=>{
            return <>
                <Button size="small" type="primary" onClick={()=>{
                    onEditarClick(obj.idsucursal)
                }}><EditOutlined/></Button>
            </>
        }},
    ]

    const onEditarClick = (idsucursal) => {
        setIdSucursal(idsucursal)
        setPopupEditOpen(true)
    }

    const onAgregarClick = () => {
        setIdSucursal(-1)
        setPopupAddOpen(true)
    }

    const load = () => {
        setLoading(true)
        fetch(get.sucursales)
        .then(r=>r.json())
        .then((response)=>{
            let _sucursales = (response.data)||[]
            setSucursales(_sucursales)
            setLoading(false)
        })
    }

    const onCancelPopupAddEdit = () => {
        setPopupAddOpen(false)
        setReload(!reload)
    }
    const onCancelPopupEdit = () => {
        setPopupEditOpen(false)
        setReload(!reload)
    }

    useEffect(()=>{
        load()
    },[reload])

 return <>
    <Card title={<>Lista de Sucursales</>} size="small">
        
        <Row>
            <Col span={24}>
                <Table 
                size="small"
                dataSource={sucursales} 
                columns={columns} 
                loading={loading} 
                scroll={{y:"400px"}} 
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
    <Modal destroyOnClose open={popupAddOpen} onCancel={onCancelPopupAddEdit} footer={null}>
        <AgregarSucursal idsucursal={-1} callback={onCancelPopupAddEdit} />
    </Modal>
    <Modal destroyOnClose open={popupEditOpen} onCancel={onCancelPopupEdit} footer={null}>
        <EditarSucursal idsucursal={idsucursal} callback={onCancelPopupEdit} />
    </Modal>
 </>
}

export default ListaSucursales;