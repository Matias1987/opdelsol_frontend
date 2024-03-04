import globals from "@/src/globals";
import { get } from "@/src/urls";
import { Button, Col, Modal, Row, Select, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import VentaDetallePopup from "../VentaDetalle";
import { ArrowRightOutlined, PlusOutlined, RightCircleTwoTone, RightOutlined, RightSquareTwoTone } from "@ant-design/icons";
import SearchStock from "../SearchStock";
import SearchStockVentas from "../forms/ventas/SearchStockVentas";

const EditarSobre = (props) => {
    const [loading, setLoading] = useState(false)
    const [venta, setVenta] = useState(null)
    const [open, setOpen] = useState(false)
    const [modifyingId, setModifyingId] = useState(-1)
    const query_detalles = get.obtener_stock_detalles_venta + globals.obtenerSucursal() + "/";
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
        {title:"", 
        width:"70px",

        render:(_,record)=><>
            <Button 
            block
            disabled={!record.usarEnabled} 
            onClick={()=>{

                setVentaItems(ventaItems.map(vi=>{return vi.idventaitem===record.idventaitem ? 
                    {
                    ...vi, 
                    usarEnabled: false,
                    agregarEnabled: false,
                    items: vi.items.filter(_i=>!_i.closable)
                    } : 
                    vi }))

                setModifyingId(record.idventaitem)
                onCodigoSelected(record.idcodigo, record.idventaitem)

            }}>
                <ArrowRightOutlined />
            </Button>
        </>},
        {title:"Resultado", render:(_,record)=><>
            {
            record.items.map(i=><>
                <Tag closable={i.closable} 
                onClose={()=>
                {
                    setVentaItems(_ventaItems=>(_ventaItems.map(vi=>(vi.idventaitem===record.idventaitem ? {...vi,agregarEnabled:true, usarEnabled:true} : vi))))}} 
                    style={{fontSize:"1.2em"}} color={i.closable ? "red" : "green-inverse"}
                >
                    {i.codigo}</Tag>
                </>)
            }
                <Button 
                    disabled={!record.agregarEnabled} 
                    onClick={()=>{
                    setLoading(true)
                    setModifyingId(record.idventaitem)
                    onPlusClick()
                    }}>
                        <PlusOutlined />
                </Button>
            </>
        }
        
    ]
    const onPlusClick = () => {
        setOpen(true)
    }
    const [ventaItems, setVentaItems] = useState([

        {idventaitem: 1, orden: "LEJOS", tipo: "OD",        codigo:"COMECODE",      idcodigo: 1000, agregarEnabled: true,usarEnabled: true,  items:[]},
        {idventaitem: 2, orden: "LEJOS", tipo: "OI",        codigo:"COMECODE1",     idcodigo: 200, agregarEnabled:  true, usarEnabled: true, items:[]},
        {idventaitem: 3, orden: "LEJOS", tipo: "ARMAZON",   codigo:"ARMAZON1",      idcodigo: 400, agregarEnabled:  false, usarEnabled: false, items:[]},
        {idventaitem: 4, orden: "CERCA", tipo: "OD",        codigo:"COMECODE3",     idcodigo: 300, agregarEnabled:  true, usarEnabled: true, items:[]},
        {idventaitem: 5, orden: "CERCA", tipo: "OI",        codigo:"COMECODE3",     idcodigo: 300, agregarEnabled:  true, usarEnabled: true, items:[]},
        {idventaitem: 6, orden: "CERCA", tipo: "ARMAZON",   codigo:"ARMAZON2",      idcodigo: 300, agregarEnabled:  false, usarEnabled: false, items:[]},

    ])

    useEffect(()=>{},[modifyingId])

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

    const onCodigoSelected = (id, idventaitem)=>{
        //get details!
        setLoading(true)
        fetch(query_detalles + id)
        .then(response=>response.json())
        .then((response)=>{
            const _data = {
                codigo: response.data[0].codigo,
                descripcion: response.data[0].descripcion,
                precio: response.data[0].precio,
                cantidad: response.data[0].cantidad,
                idcodigo: id,
                closable: true,
            };
            if(typeof idventaitem==='undefined')
            {
                setVentaItems((_ventaitems)=>(_ventaitems.map(vi=>(vi.idventaitem == modifyingId ? { ...vi, items:[...vi.items,_data], agregarEnabled:false, usarEnabled:false } : vi))))
            }
            else{
                setVentaItems((_ventaitems)=>(_ventaitems.map(vi=>(vi.idventaitem == idventaitem ? { ...vi, items:[...vi.items,_data], agregarEnabled:false, usarEnabled:false } : vi))))
            }
            
            
            setLoading(false)

        })
        .catch((error)=>{alert(error)})
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
                loading={loading}
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
    <Row>
        <Col span={10}>
            <Button block type="primary">Aplicar Cambios</Button>
        </Col>
        <Col span={4}></Col>
        <Col span={10}>
            <Button block danger>Marcar Como Terminado</Button>
        </Col>
    </Row>
    <Modal open={open} onCancel={()=>{setOpen(false)}} title="Agregar Código" >
        <SearchStock 
            callback={(resp)=>{
                //alert(JSON.stringify(resp))
                onCodigoSelected(resp)
                setOpen(false)
            }
            }
            onco
        />
    </Modal>
    </>
}

export default EditarSobre;