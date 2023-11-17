import { get } from "@/src/urls";
import { Col, Row, Table } from "antd";
import { useEffect, useState } from "react";

const ListaVentasAdmin = (props) =>{
    const [dataSource, setDataSource] = useState([])
    useEffect(()=>{
        console.log("run user effect  key " + props.key )
        console.log(get.obtener_lista_ventas_admin)
        fetch(get.obtener_lista_ventas_admin)
        .then(response=>{console.log("#######################################"+JSON.stringify(response)) ; return response.json()})
        .then((response)=>{
            //alert(JSON.stringify(response))
            
            setDataSource(response.data.map(
                r=>({
                    sucursal: r.sucursal,
                    vendedor: r.vendedor,
                    cliente: r.cliente,
                    monto: r.monto,
                })
            ))
        })
    },[]);
    return <>
        <h4>Lista de Ventas</h4>
        <Row>
            <Col span={24}>
            <Table 
                dataSource={dataSource}
                columns={
                    [
                        {title:"Sucursal", dataIndex:"sucursal"},
                        {title:"Vendedor", dataIndex:"vendedor"},
                        {title:"Cliente", dataIndex:"cliente"},
                        {title:"Monto", dataIndex:"monto"},
                    ]
                }
                />
            </Col>
        </Row>
        
    </>
}

export default ListaVentasAdmin;