import { Col, Row, Table } from "antd";
import { useState } from "react";

const ListaGastosAdmin = (props) =>{
    const [dataSource, setDataSource] = useState([])
    return <>
        <h4>Lista de Gastos</h4>
        <Row>
            <Col span={24}>
            <Table 
                dataSource={dataSource}
                columns={
                    [
                        {title:"Sucursal", dataIndex:"sucursal"},
                        {title:"Concepto", dataIndex:"concepto"},
                        {title:"Monto", dataIndex:"monto"},
                    ]
                }
                />
            </Col>
        </Row>
        
    </>
}

export default ListaGastosAdmin;