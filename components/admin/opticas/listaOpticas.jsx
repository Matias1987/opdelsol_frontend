import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Modal, Row, Table } from "antd";
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
        /*{
            render:(_,{idoptica, checked})=><Checkbox 
            checked={checked}
            onChange={(e)=>{
                setOpticas(opts=>opts.map(o=>({...o, checked: o.idoptica== idoptica ? e.target.checked : false  })))
                props?.callback?.(e.target.checked?idoptica:-1)
            }} ></Checkbox>
        }*/
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
    <Card title={<>Lista de &Oacute;pticas <Button size="small" type="primary" onClick={()=>{setPopupAddOpen(true)}}><PlusOutlined /></Button></>} size="small">

        <Row>
            <Col span={24}>
                
            </Col>
        </Row>
        
        <Row>
            <Col span={24}>
                <Table 
                size="small"
                scroll={{y:"400px"}} 
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                dataSource={opticas} 
                columns={columns} 
                />
            </Col>
        </Row>
    </Card>
    <Modal open={popupAddOpen} footer={null} title="Agregar Optica" onCancel={()=>{setPopupAddOpen(false)}}>
        <OpticaForm callback={()=>{setPopupAddOpen(false); setReload(!reload);}} />
    </Modal>
    </>
}

export default ListaOpticas;