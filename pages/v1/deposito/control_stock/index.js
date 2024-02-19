import { Col, Input, Row, Table } from "antd";
import { useState } from "react";

export default function ControlStock(){
    const [dataSourceFound, setDataSourceFound] = useState([])
    const [dataSourceNotFound, setDataSourceNotFound] = useState([])
    const columns_found = [
        {dataIndex: "codigo", title:"codigo"},
        {dataIndex: "cant_loaded", title:"Cant. Loaded"},
        {dataIndex: "cant_deposito", title:"Cant. Deposito"},
        
    ]

    const columns_not_found = [
        {dataIndex: "codigo", title:"codigo"},
        {dataIndex: "cant_loaded", title:"Cant. Loaded"},
    ]

    const get_local_stock = (codigo) => {

    }

    const onSearchValueChange = (e) => {
        const value = e.target.value
        
    }

    return <>
        <Row>
            <Col span={24}>
                <Input onChange={onSearchValueChange}  />
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <p>Found</p>
                <Table columns={columns_found} dataSource={dataSourceFound}/>
            </Col>
            <Col span={12}>
                <p>Not Found</p>
                <Table columns={columns_not_found} dataSource={dataSourceNotFound} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>

            </Col>
        </Row>
    </>
}