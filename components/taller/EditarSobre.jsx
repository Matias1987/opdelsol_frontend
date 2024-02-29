import globals from "@/src/globals";
import { get } from "@/src/urls";
import { Col, Row, Table } from "antd";
import { useState } from "react";

const EditarSobre = (props) => {
    const [venta, setVenta] = useState(null)
    const [ventaItems, setVentaItems] = useState([
        {idventaitem: 1, codigo:"COMECODE", idcodigo: 1},
        {idventaitem: 2, codigo:"COMECODE1", idcodigo: 2},
        {idventaitem: 3, codigo:"COMECODE", idcodigo: 1},
        {idventaitem: 4, codigo:"COMECODE3", idcodigo: 3},
    ])

    const load = _ => {
        fetch(get.venta + props.idventa)
        .then(r=>r.json())
        .then((response)=>{
            setVenta({

            })
        })
        fetch(get.obtener_venta_items+props.idventa)
        .then(r=>r.json())
        .then((response)=>{
            setVentaItems(
                response.data.map(vi=>(
                    {
                        idventaitem: vi.idventaitem,
                        codigo: vi.codigo,
                        idcodigo: vi.stock_codigo_idcodigo,
                    }
                ))
            )
        })
    }

    const columns = [ 
        {dataIndex: "Codigo", title: "Codigo"},
        {dataIndex: "idcodigo", title: ""},
    ]


    const getRows = _ => {
        let items =[]
        switch(venta.tipo){
            case globals.tiposVenta.MONOFLAB:
                    items.push({label:"LEJOS_OI"})
                    items.push({label:"LEJOS_OD"})
                    items.push({label:"CERCA_OI"})
                    items.push({label:"CERCA_OD"})
                break
            case globals.tiposVenta.RECSTOCK:
                    items.push({label:"LEJOS_OI"})
                    items.push({label:"LEJOS_OD"})
                    items.push({label:"CERCA_OI"})
                    items.push({label:"CERCA_OD"})
                break
            case globals.tiposVenta.MULTILAB:
                    items.push({label:"OI"})
                    items.push({label:"OD"})
                break
            
        }
    }


    return <>
    <Row>
        <Col span={24}>
            
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table
                columns={columns}
                dataSource={ventaItems}
                bordered
                size="middle"
                scroll={{
                x: 'calc(700px + 50%)',
                y: 240,
                }}
            />
        </Col>
    </Row>
    </>
}

export default EditarSobre;