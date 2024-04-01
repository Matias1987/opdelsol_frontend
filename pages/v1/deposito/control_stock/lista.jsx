import MyLayout from "@/components/layout/layout";
import { get } from "@/src/urls";
import { Col, Row, Table } from "antd";
import { useEffect, useState } from "react";

export default function ListaControlesStock(){
    const [data, setData] = useState([])
    

    useEffect(()=>{
        //alert(get.obtener_lista_controles)
        fetch(get.obtener_lista_controles)
        .then(r=>r.json())
        .then((response)=>{
            setData(response.data)
        })
    },[])

    const columns = [ 
        {dataIndex: "fecha_f", title:"Fecha"},
        {dataIndex: "usuario", title:"Usuario"},
        {dataIndex: "sucursal", title:"Sucursal"},
        {dataIndex: "comentarios", title:"Comentarios"},
    ]
    return <>
    <Row>
        <Col span={24}>
            
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table dataSource={data} columns={columns} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>

        </Col>
    </Row>
    <Row>
        <Col span={24}>

        </Col>
    </Row>
        
    </>
}

ListaControlesStock.PageLayout = MyLayout;