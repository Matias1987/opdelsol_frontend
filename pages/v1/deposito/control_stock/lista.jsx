import PopupDetalleControl from "@/components/deposito/control/popup_detalle";
import MyLayout from "@/components/layout/layout";
import { get } from "@/src/urls";
import { Col, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";

export default function ListaControlesStock(){
    const [data, setData] = useState([])
    const [sucursales, setSucursales] = useState([])
    const [selectedSucursal, setSelectedSucursal] = useState(-1)

    useEffect(()=>{
        //alert(get.obtener_lista_controles)
        fetch(get.obtener_lista_controles + selectedSucursal)
        .then(r=>r.json())
        .then((response)=>{
            //alert(JSON.stringify(response.data))
            setData(response.data)
        })

        fetch(get.sucursales)
        .then(r=>r.json())
        .then((response)=>{
            setSucursales(
                [...[{value:-1, label:"Todas las Sucursales"}],
                 ...response.data.map(r=>({value: r.idsucursal, label:r.nombre, }))
                ]
            )
        })
    },[selectedSucursal])

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
            <Select value={selectedSucursal} options={sucursales} style={{width:"300px"}} onChange={(v)=>{setSelectedSucursal(v)}} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table dataSource={data} columns={columns} scroll={{y:"500px"}} pagination={false} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>

        </Col>
    </Row>

        
    </>
}

ListaControlesStock.PageLayout = MyLayout;