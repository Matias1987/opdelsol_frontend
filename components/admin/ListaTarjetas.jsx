import { Button, Col, Modal, Row, Table } from "antd";
import { useState } from "react";
import AgregarTarjetaForm from "./agregarTarjeta";

const ListaTarjetas = (props) => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const columns = []
    return <>
    <Row>
        <Col span={24}>
        <Button onClick={()=>{setOpen(true)}}>Agregar</Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table columns={columns} dataSource={data} />
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
    <Modal open={open} onCancel={()=>{setOpen(false)}} footer={null}>
        <AgregarTarjetaForm />
    </Modal>
    </>
}


export default ListaTarjetas;