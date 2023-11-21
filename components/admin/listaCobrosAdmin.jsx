import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Col, Row, Table } from "antd";
import { useEffect, useState } from "react";

const ListaCobrosAdmin = (props) =>{
    const [dataSource, setDataSource] = useState([])
    useEffect(()=>{
        //console.log("run user effect")
        post_method(post.obtener_lista_cobros,{},(response)=>{
            alert(JSON.stringify(response))
            setDataSource(response.data.map(r=>({
                cliente:r.cliente_nombre,
                monto:r.monto,
                sucursal: r.sucursal,
                idcobro: r.idcobro,
            })))
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