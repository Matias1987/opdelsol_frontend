import { get } from "@/src/urls";
import { Col, Row, Table } from "antd";
import { useEffect, useState } from "react";

const ListaGastosAdmin = (props) =>{
    const [dataSource, setDataSource] = useState([])
    useEffect(()=>{
        fetch(get.obtener_lista_gastos_admin)
        .then(response=>response.json())
        .then((response)=>{
            setDataSource(response.data.map(
                r=>({
                    sucursal: r.sucursal,
                    concepto: r.concepto,
                    monto: r.monto,
                })
            ))
        })
    },[]);
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