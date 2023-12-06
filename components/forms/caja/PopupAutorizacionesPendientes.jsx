import { Col, Row, Table } from "antd"
import { useState } from "react"

const PopupNotificacionesPendientes = () => {
    const [dataSource, setDataSource] = useState([])
    const columns = [
        {dataIndex: "idusuario", title:"idusuario"},
        {dataIndex: "nombre", title: "Nombre"},
        {dataIndex: "estado", title: "Estado"},
        {dataIndex: "idusuario", title:"Acciones", render:(_,{idusuario})=>(
            <>

            </>
        )}

    ]
    return <>
    <Row>
        <Col span={24}>
            <h4>Autorizaciones Pendientes</h4>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table dataSource={dataSource} columns={columns} />
        </Col>
    </Row>
    
    
    </>
}

export default PopupNotificacionesPendientes