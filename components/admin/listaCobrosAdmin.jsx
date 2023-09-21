import { Col, Row, Table } from "antd";
import { useState } from "react";

const ListaCobrosAdmin = (props) =>{
    const [dataSource, setDataSource] = useState([])
    return <>
        <h4>Lista de Cobros</h4>
        <Row>
            <Col span={24}>
            <Table 
                dataSource={dataSource}
                columns={
                    [
                        {title:"Sucursal", dataIndex:"sucursal"},
                        {title:"Cliente", dataIndex:"cliente"},
                        {title:"Monto", dataIndex:"monto"},
                    ]
                }
                />
            </Col>
        </Row>
        
    </>
}

export default ListaCobrosAdmin;