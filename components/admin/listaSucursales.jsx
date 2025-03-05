import { get } from "@/src/urls";
import { Button, Col, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import AgregarSucursal from "./agregarSucursal";
import EditarSucursal from "./editarSucursal";

const ListaSucursales = (props) => {
    const [sucursales, setSucursales] = useState([])
    const [loading, setLoading] = useState(false)
    const [popupAddOpen, setPopupAddOpen] = useState(false)
    const [popupEditOpen, setPopupEditOpen] = useState(false)
    const [reload, setReload] = useState(false)
    const [idsucursal, setIdSucursal] = useState(-1)
    
    const columns = [
        {dataIndex: "nombre", title:"Nombre"},
        {dataIndex: "direccion", title:"Dirección"},
        {dataIndex: "telefono", title:"Teléfono"},
        {title:"Óptica", dataIndex:"optica"},

        {title:"Acciones", render:(_,obj)=>{
            return <>
                <Button onClick={()=>{
                    onEditarClick(obj.idsucursal)
                }}>Editar</Button>
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
    <Row>
        <Col span={24}>
            <h3>Lista de Sucursales</h3>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Button disabled onClick={onAgregarClick} type="primary">Agregar</Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table dataSource={sucursales} columns={columns} loading={loading}/>
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
    <Modal open={popupAddOpen} onCancel={onCancelPopupAddEdit} footer={null}>
        <AgregarSucursal idsucursal={-1} callback={onCancelPopupAddEdit} />
    </Modal>
    <Modal open={popupEditOpen} onCancel={onCancelPopupEdit} footer={null}>
        <EditarSucursal idsucursal={idsucursal} callback={onCancelPopupEdit} />
    </Modal>
 </>
}

export default ListaSucursales;