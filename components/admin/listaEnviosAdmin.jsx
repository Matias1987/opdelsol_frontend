import { get } from "@/src/urls";
import { Col, Row, Table } from "antd";
import { useEffect, useState } from "react";

const ListaEnviosAdmin = (props) =>{
    const [dataSource, setDataSource] = useState([])
    useEffect(()=>{
        fetch(get.obtener_lista_envios_admin)
        .then(response=>response.json())
        .then((response)=>{
            setDataSource(response.data.map(
                r=>({
                    sucursal_dest: r.sucursal_dest,
                    
                    monto: r.monto,
                })
            ))
        })
    },[]);
    return <>
        <h4>Lista de Envios</h4>
        <Row>
            <Col span={24}>
            <Table 
                dataSource={dataSource}
                columns={
                    [
                        {title:"Sucursal Dest.", dataIndex:"sucursal_dest"},
                        {title:"Monto", dataIndex:"monto"},
                    ]
                }
                />
            </Col>
        </Row>
        
    </>
}

export default ListaEnviosAdmin;