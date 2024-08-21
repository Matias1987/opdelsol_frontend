import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import OpticaForm from "./opticaForm";
import { get } from "@/src/urls";

const ListaOpticas = (props) => {
    const [opticas, setOpticas] = useState([])
    const [popupAddOpen, setPopupAddOpen] = useState(false)
    const [reload, setReload] = useState(false)

    const columns = [
        {
            title:"Nombre", dataIndex:"nombre"
        },
        {
            render:(_,{idoptica, checked})=><Checkbox 
            checked={checked}
            onChange={(e)=>{
                setOpticas(opts=>opts.map(o=>({...o, checked: o.idoptica== idoptica ? e.target.checked : false  })))
                props?.callback?.(e.target.checked?idoptica:-1)
            }} ></Checkbox>
        }
    ]

    useEffect(()=>{
        fetch(get.opticas)
        .then(r=>r.json())
        .then((response)=>{
            setOpticas(_=>response.data.map(o=>({
                idoptica:o.idoptica,
                nombre:o.nombre,
                checked:false,
            })))
        })
        .catch(_=>{console.log("error")})
    },[reload])
    return <>

    <Row>
        <Col span={24}>
            <h3>Lista de &Oacute;pticas</h3>
        </Col>
    </Row>
    
    <Row>
        <Col span={24}>
            <Button onClick={()=>{setPopupAddOpen(true)}}><PlusOutlined />&nbsp;Agregar</Button>
        </Col>
    </Row>
    
    <Row>
        <Col span={24}>
            <Table dataSource={opticas} columns={columns} />
        </Col>
    </Row>
    <Modal open={popupAddOpen} footer={null} title="Agregar Optica" onCancel={()=>{setPopupAddOpen(false)}}>
        <OpticaForm callback={()=>{setPopupAddOpen(false); setReload(!reload);}} />
    </Modal>
    </>
}

export default ListaOpticas;