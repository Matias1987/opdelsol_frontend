import { Col, Row, Table } from "antd";
import { useState } from "react";

const ListaEnviosAdmin = (props) =>{
    const [dataSource, setDataSource] = useState([])
    return <>
        <h4>Lista de Envios</h4>
        <Row>
            <Col span={24}>
            <Table 
                dataSource={dataSource}
                columns={
                    [
                        {title:"Sucursal Dest.", dataIndex:"sucursal_dest"},
                        {title:"Cantidad", dataIndex:"cantidad"},
                    ]
                }
                />
            </Col>
        </Row>
        
    </>
}

export default ListaEnviosAdmin;