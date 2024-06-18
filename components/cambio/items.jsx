import { get } from "@/src/urls";
import { MinusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import { useEffect, useState } from "react";
/**
 * mark unused (returned) items in the database as unused (the original row must not be removed), and create a new row, for the used item
 * @param {*} props 
 * @returns 
 */

const cambio_items = (props) => {
    const [items,setItems] = useState([])
    useEffect(()=>{
        fetch(get.obtener_venta_items)
        .then(r=>r.json())
        .then((response)=>{

        })
        .catch(e=>{})

    },[])

    const click_on_remove = (iditem) => {
        
    }

    const columns = [
        {title:"Codigo"},
        {title:"Tipo"},
        {title:"Precio"},
        {title:"Acciones", render:(_,{iditem})=>{
            return <><Button onClick={()=>{click_on_remove(iditem)}}><MinusOutlined /></Button></>
        }},
    ]

    return <>
        <Row>
            <Col span={24}>
            <Table 
                dataSource={items}
                columns={columns}
            />
            </Col>
        </Row>
    </>
}

export default cambio_items;