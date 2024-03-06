import globals from "@/src/globals";
import { get, post } from "@/src/urls";
import { Button, Col, Modal, Row, Select, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import VentaDetallePopup from "../VentaDetalle";
import { ArrowRightOutlined, PlusOutlined, RightCircleTwoTone, RightOutlined, RightSquareTwoTone } from "@ant-design/icons";
import SearchStock from "../SearchStock";
import SearchStockVentas from "../forms/ventas/SearchStockVentas";
import { post_method } from "@/src/helpers/post_helper";

const EditarSobre = (props) => {
    const [loading, setLoading] = useState(false)
    const [venta, setVenta] = useState(null)
    const [open, setOpen] = useState(false)
    const [modifyingId, setModifyingId] = useState('')
    const query_detalles = get.obtener_stock_detalles_venta + globals.obtenerSucursal() + "/";
    //const [six_rows_type, setSixRowType] = useState(true)
    const [reload, setReload] = useState(true)
    var six_rows_type=true;

    const columns_6rows = [
        {
            title:"",
            width:"30px",
            onCell:(record)=>({rowSpan: record.orden1 == 'OD' ? 3 : 0}), 
            render:(_,{orden})=>(<span style={{textOrientation:"upright"}}><b>{orden}</b></span>)
        },
        {dataIndex:"orden1", width:"90px", title:"Tipo"},
        {dataIndex:"codigo", title:"Código Original", width:"30%"},
        {title:"", 
        width:"60px",

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
                    setVentaItems6Rows(_ventaItems=>(_ventaItems.map(vi=>(vi.tipo===record.tipo ? {...vi,agregarEnabled:true, usarEnabled:true, items:record.items.filter(r=>!r.closable)} : vi))))}
                } 
                    style={{fontSize:i.closable ? "1.4em" : ".85em"}} color={i.closable ? "red" : "purple"}
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


    const columns_3rows = [
        {dataIndex:"orden1", width:"90px", title:"Tipo"},
        {dataIndex:"codigo", title:"Código Original", width:"30%"},
        {title:"", 
        width:"60px",

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
                    setVentaItems6Rows(_ventaItems=>(_ventaItems.map(vi=>(vi.tipo===record.tipo ? {...vi,agregarEnabled:true, usarEnabled:true, items:record.items.filter(r=>!r.closable)} : vi))))}
                } 
                    style={{fontSize:i.closable ? "1.4em" : ".85em"}} color={i.closable ? "red" : "purple"}
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

        {  tipo: "lejos_od" ,      orden: "LEJOS", orden1: "OD",     codigo:"",  idcodigo: -1, agregarEnabled:  true,  usarEnabled: true, required:true,  items:[]},
        {  tipo: "lejos_oi" ,      orden: "LEJOS", orden1: "OI",     codigo:"",  idcodigo: -1,  agregarEnabled:  true,  usarEnabled: true, required:true,  items:[]},
        {  tipo: "lejos_armazon" , orden: "LEJOS", orden1: "ARMAZON",codigo:"",  idcodigo: -1,  agregarEnabled:  false, usarEnabled: false, required:false, items:[]},
        {  tipo: "cerca_od" ,      orden: "CERCA", orden1: "OD",     codigo:"",  idcodigo: -1,  agregarEnabled:  true,  usarEnabled: true, required:true,  items:[]},
        {  tipo: "cerca_oi" ,      orden: "CERCA", orden1: "OI",     codigo:"",  idcodigo: -1,  agregarEnabled:  true,  usarEnabled: true, required:true,  items:[]},
        {  tipo: "cerca_armazon" , orden: "CERCA", orden1: "ARMAZON",codigo:"",  idcodigo: -1,  agregarEnabled:  false, usarEnabled: false, required:false, items:[]},

    ])
    const [ventaItems3Rows, setVentaItems3Rows] = useState([

        {  tipo: "od" ,      orden: "-", orden1: "OD",     codigo:"",  idcodigo: -1, agregarEnabled:  true,  usarEnabled: true, required: true, items:[]},
        {  tipo: "oi" ,      orden: "-", orden1: "OI",     codigo:"",  idcodigo: -1,  agregarEnabled:  true,  usarEnabled: true,required: true,  items:[]},
        {  tipo: "armazon" , orden: "-", orden1: "ARMAZON",codigo:"",  idcodigo: -1,  agregarEnabled:  false, usarEnabled: false, required: false, items:[]},

    ])

    const save = _ => {
        var _data = [];

        (six_rows_type ? ventaItems6Rows : ventaItems3Rows).forEach(row=>{
            _data = [..._data,...row.items.filter(it=>it.userAdded)]
        })
        
        post_method(post.insert.item_adicional,{fkventa: props.idventa, fksucursal: globals.obtenerSucursal() , items: _data},(response)=>{
            alert("Datos guardados")
            setReload(!reload)
        })

    }

    const populate_rows = (data) => {
        let _rows = six_rows_type ? [...ventaItems6Rows] : [...ventaItems3Rows]

        _rows = _rows.map(r=>({...r, idcodigo: -1, items:[]})) //reset
        //alert(JSON.stringify(_rows))
        data.forEach(
            data_row=>{
                
                if(+data_row.original==1){
                    
                    _rows = _rows.map(_row=>(_row.tipo == data_row.tipo ? {..._row, codigo: data_row.codigo, isadicional: false, idcodigo: data_row.idcodigo, agregarEnabled:  true,  usarEnabled: true} : _row))

                }
                else{
                    
                    _rows = _rows.map(_row=>(_row.tipo == data_row.tipo ? {..._row,items:[..._row.items,{tipo: data_row.tipo, codigo: data_row.codigo, isadicional: true, idcodigo: data_row.idcodigo, userAdded:false}]}: _row))
                }

            }
        )
        setVentaItems6Rows(_rows)
    }


    useEffect(()=>{
        load()
    },[reload])

    const load = _ => {
        setLoading(true)
        fetch(get.venta + props.idventa)
        .then(r=>r.json())
        .then((response)=>{
            
            switch(response.data[0].tipo.toString())
            {
                case globals.tiposVenta.MONOFLAB:
                    
                    six_rows_type=true
                    break
                case globals.tiposVenta.MULTILAB:
                    six_rows_type=false
                    break
                case globals.tiposVenta.RECSTOCK:
                    six_rows_type=true
                    break
            }
            setVenta(response.data[0])

            fetch(get.items_adicional_venta+props.idventa)
            .then(r=>r.json())
            .then((response)=>{
                
                populate_rows(response.data, true)
                setLoading(false)

                //alert(six_rows_type)
            })

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
                userAdded:true,
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

    const detalle_venta = _ => venta == null ? <></> : <>
    <Row>
        <Col span={24} style={{padding:"1em"}}>
            <Row>
                <Col span={24}>
                    <h4>Detalle Venta</h4>
                </Col>
            </Row>
            <Row style={{padding:"1em"}}>
                <Col span={4} style={{textAlign:"left"}}>Cliente: </Col>
                <Col span={4}><b>{venta.cliente_nombre  + "  " + venta.cliente_dni} </b></Col>
            
                <Col span={4} style={{textAlign:"left"}}>Vendedor: </Col>
                <Col span={4}><b>{venta.usuario_nombre} </b></Col>

                <Col span={4} style={{textAlign:"left"}}>Sucursal: </Col>
                <Col span={4}><b>{venta.sucursal_nombre} </b></Col>
            </Row>
            <Row style={{padding:"1em"}}>
                <Col span={8} style={{textAlign:"left"}}>Fecha de Retiro: </Col>
                <Col span={16}><b>{venta.fecha_entrega_formated}</b> </Col>
            </Row>
        </Col>
    </Row>
    </>


    return <>
    {detalle_venta()}
    <Row>
        <Col span={24}>
            <Table
                loading={loading}
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                pagination={false}
                columns={ six_rows_type? columns_6rows : columns_3rows }
                dataSource={ six_rows_type? ventaItems6Rows : ventaItems3Rows }
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
            <Button block type="primary" onClick={save}>Aplicar Cambios</Button>
        </Col>
        <Col span={4}></Col>
        <Col span={10}>
            <Button block danger>Marcar Como Terminado</Button>
        </Col>
    </Row>
    <Modal open={open} onCancel={()=>{setOpen(false); setLoading(false);}} title="Agregar Código" footer={null} >
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