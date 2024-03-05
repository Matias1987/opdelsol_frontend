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
    const [modifyingId, setModifyingId] = useState('')
    const query_detalles = get.obtener_stock_detalles_venta + globals.obtenerSucursal() + "/";
    const columns_6rows = [
        //{dataIndex:"idventaitem", width:"3%"},
        {
            title:"Orden",
            width:"10%",
            onCell:(record)=>({rowSpan: record.orden1 == 'OD' ? 3 : 0}), 
            render:(_,{orden})=>(<><b>{orden}</b></>)
        },
        {dataIndex:"orden1", width:"10%", title:"Tipo"},
        {dataIndex:"codigo", title:"Código Original", width:"30%"},
        {title:"", 
        width:"70px",

        render:(_,record)=><>
            <Button 
            block
            disabled={!record.usarEnabled} 
            onClick={()=>{

                setVentaItems6Rows(ventaItems6Rows.map(vi=>{return vi.tipo===record.tipo ? 
                    {
                    ...vi, 
                    usarEnabled: false,
                    agregarEnabled: false,
                    items: vi.items.filter(_i=>!_i.closable)
                    } : 
                    vi }))

                setModifyingId(record.tipo)
                onCodigoSelected(record.idcodigo, record.tipo)

            }}>
                <ArrowRightOutlined />
            </Button>
        </>},
        {title:"Uso", render:(_,record)=><>
            {
            record.items.map(i=><>
                <Tag closable={i.closable} 
                onClose={()=>
                {
                    setVentaItems6Rows(_ventaItems=>(_ventaItems.map(vi=>(vi.tipo===record.tipo ? {...vi,agregarEnabled:true, usarEnabled:true} : vi))))}} 
                    style={{fontSize:"1.2em"}} color={i.closable ? "red" : "green-inverse"}
                >
                    {i.codigo}</Tag>
                </>)
            }
                <Button 
                    disabled={!record.agregarEnabled} 
                    onClick={()=>{
                    setLoading(true)
                    setModifyingId(record.tipo)
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
    const [ventaItems6Rows, setVentaItems6Rows] = useState([

        {  tipo: "lejos_od" ,      orden: "LEJOS", orden1: "OD",     codigo:"",  idcodigo: -1, agregarEnabled:  true,  usarEnabled: true,  items:[]},
        {  tipo: "lejos_oi" ,      orden: "LEJOS", orden1: "OI",     codigo:"",  idcodigo: -1,  agregarEnabled:  true,  usarEnabled: true,  items:[]},
        {  tipo: "lejos_armazon" , orden: "LEJOS", orden1: "ARMAZON",codigo:"",  idcodigo: -1,  agregarEnabled:  false, usarEnabled: false, items:[]},
        {  tipo: "cerca_od" ,      orden: "CERCA", orden1: "OD",     codigo:"",  idcodigo: -1,  agregarEnabled:  true,  usarEnabled: true,  items:[]},
        {  tipo: "cerca_oi" ,      orden: "CERCA", orden1: "OI",     codigo:"",  idcodigo: -1,  agregarEnabled:  true,  usarEnabled: true,  items:[]},
        {  tipo: "cerca_armazon" , orden: "CERCA", orden1: "ARMAZON",codigo:"",  idcodigo: -1,  agregarEnabled:  false, usarEnabled: false, items:[]},

    ])
    const [ventaItems3Rows, setVentaItems3Rows] = useState([

        {tipo: "OD",        tipo: "od" ,codigo:"",     idcodigo: 1000,    agregarEnabled: true,usarEnabled: true,  items:[]},
        {tipo: "OI",        tipo: "oi" ,codigo:"",     idcodigo: 200,     agregarEnabled:  true, usarEnabled: true, items:[]},
        {tipo: "ARMAZON",   tipo: "armazon" ,codigo:"",idcodigo: 400,     agregarEnabled:  false, usarEnabled: false, items:[]},

    ])

    const populate_rows = (data, six_rows_type) => {
        let _rows = six_rows_type ? [...ventaItems6Rows] : [...ventaItems3Rows]
        //alert(JSON.stringify(_rows))
        //loop thru rows finding keys
        data.forEach(
            data_row=>{
                
                if(+data_row.original==1){
                    
                    //alert(JSON.stringify(_rows.map(r=>(r.tipo == data_row.tipo ? {...r, codigo: data_row.codigo, isadicional: false, idcodigo: data_row.idcodigo} : {}))))
                    //_rows.forEach(r=>{alert(JSON.stringify({t1: data_row.tipo, t2: r.tipo}))})
                    _rows = _rows.map(_row=>(_row.tipo == data_row.tipo ? {..._row, codigo: data_row.codigo, isadicional: false, idcodigo: data_row.idcodigo} : _row))

                }
                else{
                    
                    _rows = _rows.map(_row=>(_row.tipo == data_row.tipo ? {..._row,items:[..._row.items,{tipo: data_row.tipo, codigo: data_row.codigo, isadicional: true, idcodigo: data_row.idcodigo}]}: _row))
                }

            }
        )
        //alert(JSON.stringify(_rows))
        setVentaItems6Rows(_rows)
    }


    useEffect(()=>{
        load()
    },[])

    const load = _ => {
        //fetch(get.venta + 6021)
        //.then(r=>r.json())
        //.then((response)=>{
        //    setVenta({
//
        //    })
        //})
        fetch(get.items_adicional_venta+6021)
        .then(r=>r.json())
        .then((response)=>{
           // alert(JSON.stringify(response))
            populate_rows(response.data, true)
        })
    }

    const onCodigoSelected = (id, tipo)=>{
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
                tipo: typeof tipo==='undefined' ? modifyingId:tipo,
                closable: true,
            };
            if(typeof tipo==='undefined')
            {
                setVentaItems6Rows((_ventaitems)=>(_ventaitems.map(vi=>(vi.tipo == modifyingId ? { ...vi, items:[...vi.items,_data], agregarEnabled:false, usarEnabled:false } : vi))))
            }
            else{
                setVentaItems6Rows((_ventaitems)=>(_ventaitems.map(vi=>(vi.tipo == tipo ? { ...vi, items:[...vi.items,_data], agregarEnabled:false, usarEnabled:false } : vi))))
            }
            
            
            setLoading(false)

        })
        .catch((error)=>{alert(error)})
    }


    return <>
    <Row>
        <Col span={24}>
            
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table
                loading={loading}
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                pagination={false}
                columns={columns_6rows}
                dataSource={ventaItems6Rows}
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