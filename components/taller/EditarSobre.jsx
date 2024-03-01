import globals from "@/src/globals";
import { get } from "@/src/urls";
import { Button, Col, Modal, Row, Select, Table } from "antd";
import { useState } from "react";
import VentaDetallePopup from "../VentaDetalle";
import { PlusOutlined } from "@ant-design/icons";
import SearchStock from "../SearchStock";
import SearchStockVentas from "../forms/ventas/SearchStockVentas";

const EditarSobre = (props) => {
    const [venta, setVenta] = useState(null)
    const [open, setOpen] = useState(false)
    const columns_6rows = [
        //{dataIndex:"idventaitem", width:"3%"},
        {
            title:"Orden",
            width:"10%",
            onCell:(record)=>({rowSpan: record.tipo == 'OD' ? 3 : 0}), 
            render:(_,{orden})=>(<><b>{orden}</b></>)
        },
        {dataIndex:"tipo", width:"10%", title:"Tipo"},
        {dataIndex:"codigo", title:"Código Original", width:"30%"},
        {title:"Acción", 
        width:"10%",
        render:(_,record)=><>
            <Select placeholder="Seleccione..." style={{width:"100%"}} options={[
                {value:"USAR", label:"Utilizar"},
                {value:"REEMPLAZO", label:"Reemplazo"},
            ]}
            />
        </>},
        {title:"Resultado", render:(_,record)=><><Button onClick={setOpen(true)}><PlusOutlined /></Button></>}
        
    ]
    const [ventaItems, setVentaItems] = useState([

        {idventaitem: 1, orden: "LEJOS", tipo: "OD",        codigo:"COMECODE",      idcodigo: 1},
        {idventaitem: 2, orden: "LEJOS", tipo: "OI",        codigo:"COMECODE1",     idcodigo: 2},
        {idventaitem: 3, orden: "LEJOS", tipo: "ARMAZON",   codigo:"ARMAZON1",      idcodigo: 1},

        {idventaitem: 4, orden: "CERCA", tipo: "OD",        codigo:"COMECODE3",     idcodigo: 3},
        {idventaitem: 5, orden: "CERCA", tipo: "OI",        codigo:"COMECODE3",     idcodigo: 3},
        {idventaitem: 6, orden: "CERCA", tipo: "ARMAZON",   codigo:"ARMAZON2",      idcodigo: 3},

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



    const rows_venta = () => {

    }


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
             {rows_venta()}
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                pagination={false}
                columns={columns_6rows}
                dataSource={ventaItems}
                bordered
                size="middle"
                scroll={{
                x: 'calc(500px + 50%)',
                y: 500,
                }}
            />
        </Col>
    </Row>
    <Modal open={open} onCancel={()=>{setOpen(false)}}>
        <SearchStock 
        
        />
    </Modal>
    </>
}

export default EditarSobre;