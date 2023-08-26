import { Col, Row, Table } from "antd"
import { useState } from "react"

export default function ListaTransferenciaSucursal(){
    const [dataSource, setDataSource] = useState([])



    return (<>
    <h3>Transferencias</h3>
    <Row>
        <Col span={12}>
            <Row>
                <Col>Generadas</Col>
            </Row>
            <Row>
                <Col span={24}>
                <Table dataSource={dataSource} columns={[
                    {title:"ID", dataIndex:"idtransferencia"},
                    {title:"Fecha", dataIndex:"fecha"},
                    {title:"Destino", dataIndex:"fkdestino"},
                    {title:"Monto", dataIndex:"monto"},
                    {title:"Comentarios", dataIndex:"comentarios"},
                ]} />
                </Col>
            </Row>
        </Col>
    </Row>
    <Row>
        <Col span={12}>
            <Row>
                <Col>Recibidas</Col>
            </Row>
            <Row>
                <Col span={24}>
                <Table dataSource={dataSource} columns={[
                    {title:"ID", dataIndex:"idtransferencia"},
                    {title:"ID", dataIndex:"fecha"},
                    {title:"Origen", dataIndex:"fkorigen"},
                    {title:"Monto", dataIndex:"monto"},
                    {title:"Comentarios", dataIndex:"comentarios"},
                ]} />
                </Col>
            </Row>
        </Col>
    </Row>
    
    
    </>)
}