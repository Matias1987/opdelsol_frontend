import { Button, Col, Modal, Row, Table } from "antd"
import { useState } from "react"
import ListaCobros from "../forms/caja/ListaCobros"

const AnularCobros = (props) =>{
    
    const [open, setOpen] = useState(false)
  
    const load=()=>{

    }
    return <>
    <Button onClick={()=>{setOpen(true);load();}} danger>Anular Cobros Venta</Button>
    <Modal width={"60%"} open={open} footer={null} onCancel={()=>{setOpen(false)}} title="Anular Cobros Ventas">
        <Row>
            <Col span={24}>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
               <ListaCobros idventa={props.idventa} anular readOnly />
            </Col>
        </Row>
    </Modal>
    </>
}

export default AnularCobros