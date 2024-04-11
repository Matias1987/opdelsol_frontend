import { get } from "@/src/urls"
import PopupDetalleControl from "./popup_detalle"
import {Table, Row, Col} from "antd"
import { useEffect, useState } from "react"

const ListadoControles = (props) => {
    const [data, setData] = useState([])

    useEffect(()=>{
        alert(props.idsucursal)
        fetch(get.obtener_lista_controles + props.idsucursal)
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
        {render:(_,obj)=>
            <PopupDetalleControl codigos={JSON.parse(obj.json).codigos} key={obj.id} sucursal={obj.sucursal} usuario={obj.usuario} fecha={obj.fecha_f} comentarios={obj.comentarios}/>
        }
    ]
    return <>
    <Row>
        <Col span={24}>
            <h3>Lista de Controles de Stock</h3>
            <i> (&Uacute;lt. 200)</i>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table dataSource={data} columns={columns} scroll={{y:"500px"}} pagination={false} key={props.idsucursal} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>

        </Col>
    </Row>
    </>
}

export default ListadoControles;