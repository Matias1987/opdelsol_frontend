import { get } from "@/src/urls";
import { Button, Col, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import AgregarSucursal from "./agregarSucursal";

const ListaSucursales = (props) => {
    const [sucursales, setSucursales] = useState([])
    const [loading, setLoading] = useState(false)
    const [popupAddOpen, setPopupAddOpen] = useState(false)
    const [reload, setReload] = useState(false)
    const [idsucursal, setIdSucursal] = useState(-1)
    const columns = [
        {dataIndex: "nombre", title:"Nombre"},
        {dataIndex: "direccion", title:"Dirección"},
        {dataIndex: "telefono", title:"Teléfono"},
        {title:"Acciones", render:(_,obj)=>{
            return <>
                <Button disabled onClick={()=>{
                    onEditarClick(obj.idsucursal)
                }}>Editar</Button>
            </>
        }},
    ]

    const onEditarClick = (idsucursal) => {
        setIdSucursal(idsucursal)
        setPopupAddOpen(true)
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
 </>
}

export default ListaSucursales;