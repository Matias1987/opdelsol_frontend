import { get } from "@/src/urls";
import { Col, Row, Table } from "antd";
import { useEffect, useState } from "react";

const ListaCobrosAdmin = (props) =>{
    const [dataSource, setDataSource] = useState([])
    useEffect(()=>{
        //console.log("run user effect")
        fetch(get.obtener_lista_cobros_admin)
        .then(response=>response.json())
        .then((response)=>{
            setDataSource(response.data.map(
                r=>({
                    sucursal: r.sucursal,
                    cliente: r.cliente,
                    monto: r.monto,
                })
            ))
        })
    },[]);
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