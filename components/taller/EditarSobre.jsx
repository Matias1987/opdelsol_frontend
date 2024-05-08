import globals from "@/src/globals";
import { get, post } from "@/src/urls";
import { Button, Checkbox, Col, Modal, Row, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { ArrowRightOutlined, PlusOutlined } from "@ant-design/icons";
import SearchStock from "../SearchStock";
import { post_method } from "@/src/helpers/post_helper";
import DetalleCodigo from "../forms/deposito/DetalleCodigo";
import CustomModal from "../CustomModal";

const EditarSobre = (props) => {
    const [firstLoad, setFirstLoad] = useState(true)
    const [loading, setLoading] = useState(false)
    const [venta, setVenta] = useState(null)
    const [open, setOpen] = useState(false)
    const [modifyingId, setModifyingId] = useState('')
    const query_detalles = get.obtener_stock_detalles_venta ;
    const [reload, setReload] = useState(true)
    const [btnSaveEnabled, setBtnSaveEnabled] = useState(true)
    const [btnCambiarEstadoEnabled, setBtnCambiarEstadoEnabled] = useState(false)
    const [accion, setAccion] = useState("")
    var six_rows_type=true;

    const columns = [
        {
            title:"",
            width:"30px",
            onCell:(record)=>({rowSpan: record.orden1 == 'OD' ? 3 : 0}), 
            render:(_,{orden})=>(<span style={{textOrientation:"upright"}}><b>{orden}</b></span>)
        },
        {dataIndex:"orden1", width:"90px", title:"Tipo"},
        {dataIndex:"codigo", title:"Código Original", width:"30%", render:(_,record)=><>
        {record.codigo} &nbsp;  {record.idcodigo>0 ? <CustomModal openButtonText="Detalle"> <DetalleCodigo idcodigo={record.idcodigo} /> </CustomModal> :<></>} 
        </>},
        
        {title:"", 
        width:"60px",

        render:(_,record)=><>
            <Button  
            block
            disabled={!record.usarEnabled || record.idcodigo<1 || record.pedir} 
            onClick={()=>{

                setUsedRows(usedRows.map(vi=>{return vi.tipo===record.tipo ? 
                    {
                    ...vi, 
                    usarEnabled: false,
                    agregarEnabled: false,
                    items: vi.items.filter(_i=>!_i.closable)
                    } : 
                    vi }))
                setAccion("adicional")
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
                    setUsedRows(_ventaItems=>(_ventaItems.map(vi=>(vi.tipo===record.tipo ? {...vi,agregarEnabled:true, usarEnabled:true, items:record.items.filter(r=>!r.closable)} : vi))))}
                } 
                    style={{fontSize:i.closable ? "1.4em" : ".85em"}} color={i.closable ? "red" : "purple"}
                >
                    {i.codigo}</Tag>
                </>)
            }
                <Button 
                    disabled={record.pedir} 
                    onClick={()=>{
                    setLoading(true)
                    setModifyingId(record.tipo)
                    setAccion("adicional")
                    onPlusClick()
                    }}>
                        <PlusOutlined />
                </Button>
                
            </>
        },
        {title:"Pedidos", render:(_,record)=>{return <>
                {
                    record.pedidos.map(p=><Tag color="red">{p.fecha}</Tag>)
                }
                <Button
                onClick={()=>{
                    setLoading(true)
                    setModifyingId(record.tipo)
                    setAccion("pedido")
                    onPlusClick()
                    }}
                >Pedir</Button>
        </>}},
        
    ]


    const onPlusClick = () => {
        setOpen(true)
    }
    const [ventaItems6Rows, setVentaItems6Rows] = useState([

        {  tipo: "lejos_od" ,      orden: "LEJOS", orden1: "OD",     codigo:"",  idcodigo: -1, agregarEnabled:  true,   usarEnabled: true,  required:true,   pedir:false , pedidos:[], items:[]},
        {  tipo: "lejos_oi" ,      orden: "LEJOS", orden1: "OI",     codigo:"",  idcodigo: -1,  agregarEnabled:  true,  usarEnabled: true,  required:true,   pedir:false , pedidos:[], items:[]},
        {  tipo: "lejos_armazon" , orden: "LEJOS", orden1: "ARMAZON",codigo:"",  idcodigo: -1,  agregarEnabled:  false, usarEnabled: false,  required:false, pedir:false , pedidos:[],  items:[]},
        {  tipo: "cerca_od" ,      orden: "CERCA", orden1: "OD",     codigo:"",  idcodigo: -1,  agregarEnabled:  true,  usarEnabled: true,  required:true,   pedir:false , pedidos:[], items:[]},
        {  tipo: "cerca_oi" ,      orden: "CERCA", orden1: "OI",     codigo:"",  idcodigo: -1,  agregarEnabled:  true,  usarEnabled: true,  required:true,   pedir:false , pedidos:[], items:[]},
        {  tipo: "cerca_armazon" , orden: "CERCA", orden1: "ARMAZON",codigo:"",  idcodigo: -1,  agregarEnabled:  false, usarEnabled: false,  required:false, pedir:false , pedidos:[],  items:[]},

    ])
    const [ventaItems3Rows, setVentaItems3Rows] = useState([

        {  tipo: "od" ,      orden: "-", orden1: "OD",     codigo:"",  idcodigo: -1, agregarEnabled:  true,  usarEnabled: true, required: true,    pedidos:[], pedir:false , items:[]},
        {  tipo: "oi" ,      orden: "-", orden1: "OI",     codigo:"",  idcodigo: -1,  agregarEnabled:  true,  usarEnabled: true,required: true,    pedidos:[], pedir:false , items:[]},
        {  tipo: "armazon" , orden: "-", orden1: "ARMAZON",codigo:"",  idcodigo: -1,  agregarEnabled:  false, usarEnabled: false, required: false, pedidos:[], pedir:false , items:[]},

    ])

    const [usedRows, setUsedRows] = useState([])


    const validate = _ =>{
        let valid_data = true;
        usedRows.forEach(row=>{
            if(row.required && row.items.length<1 && +row.idcodigo!=-1){
                valid_data=false
            }
        })
        return valid_data
    }

    const save = _ => {

        //if(!validate())
        //{
        //    alert("Todos los campos con código, excepto armazones, son requeridos")
        //    return
        //}

        var _data_items_adicionales = [];
        var _data_pedidos = [];

        usedRows.forEach(row=>{
           
            _data_items_adicionales = [..._data_items_adicionales,...row.items.filter(it=>it.userAdded)]
        })
        //ventaItems6Rows.forEach(row=>{
        //   
        //    _data_items_adicionales = [..._data_items_adicionales,...row.items.filter(it=>it.userAdded)]
        //})

        

        if(!confirm("Confirmar")){
            return
        }
        setBtnSaveEnabled(false)
        post_method(post.insert.item_adicional,{fkventa: props.idventa, fksucursal: globals.obtenerSucursal() , items: _data_items_adicionales},(response)=>{
            alert("Datos guardados")
            setFirstLoad(true)
            setBtnCambiarEstadoEnabled(true)
            setBtnSaveEnabled(true)
            setReload(!reload)
        })

    }

    const populate_rows = (data) => {
        let _rows =  six_rows_type ? [...ventaItems6Rows] : [...ventaItems3Rows] //first time

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
       // alert("afsf" + validate())
       let valid_data = true;
        _rows.forEach(row=>{
           if(row.required && row.items.length<1 && +row.idcodigo!=-1){
               valid_data=false
           }
       })

        if(valid_data){
            
            setBtnCambiarEstadoEnabled(true)
        }

        /*************************************************************************************************************************
         * PEDIDOS
         */

        post_method(post.obtener_items_ventas_taller,{idventa: props.idventa},(response)=>{
            //alert("1")
            response.data.forEach((r)=>{
              
                _rows = _rows.map(r1=>(r.tipo != r1.tipo ? r1 : {...r1, pedidos: [...r1.pedidos,...[{idpedido:0,fecha:"08-05-2024"}]]}))
               
            })
            setUsedRows(_rows)

            setLoading(false)
        })
    }



    useEffect(()=>{
        if(firstLoad)
        {
            setFirstLoad(false)
            load()
        }
        

    },[reload])

    const load = _ => {
        setLoading(true)
        fetch(get.venta + props.idventa)
        .then(r=>r.json())
        .then((response)=>{

            //alert(JSON.stringify(response.data[0]))
            
            switch(response.data[0].tipo.toString())
            {
                case globals.tiposVenta.LCLAB:
                    six_rows_type=false;
                    break
                case globals.tiposVenta.MONOFLAB:
                    six_rows_type=true
                    break
                case globals.tiposVenta.MULTILAB:
                    six_rows_type=false
                    break
                case globals.tiposVenta.RECSTOCK:
                    six_rows_type=true
                    break
                case globals.tiposVenta.LCSTOCK:
                    six_rows_type=false
                    break
            }

            setVenta(response.data[0])
            
            fetch(get.items_adicional_venta+props.idventa)
            .then(r=>r.json())
            .then((response)=>{
               
                populate_rows(response.data, true)
                
                
                
            })
            .catch(e=>{console.log("err 1")})

        })
        .catch(e=>{console.log("err 2")})
        
    }

    const on_agregar_adicional = (id, tipo) =>{ 
        //get details!
        setLoading(true)
        fetch(query_detalles + `${globals.obtenerSucursal()}/${id}`)
        .then(response=>response.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            if(response.data.length<1)
            {
                alert("Stock no disponible en sucursal")
                setLoading(false)
                return
            }
            if(parseInt(response.data[0].cantidad)<1){
                setLoading(false)
                alert("Stock insuficiente")
                return
            }
            //alert(JSON.stringify(response))
            const _data = {
                codigo: response.data[0].codigo,
                descripcion: response.data[0].descripcion,
                //precio: response.data[0].precio,
                cantidad: response.data[0].cantidad,
                idcodigo: id,
                tipo: typeof tipo==='undefined' ? modifyingId:tipo,
                closable: true,
                userAdded:true,
            };
            if(typeof tipo==='undefined')
            {
                setUsedRows((_ventaitems)=>(_ventaitems.map(vi=>(vi.tipo == modifyingId ? { ...vi, items:[...vi.items,_data], agregarEnabled:false, usarEnabled:false } : vi))))
            }
            else{
                setUsedRows((_ventaitems)=>(_ventaitems.map(vi=>(vi.tipo == tipo ? { ...vi, items:[...vi.items,_data], agregarEnabled:false, usarEnabled:false } : vi))))
            }

            setLoading(false)

            setReload(!reload)

        })
        .catch((error)=>{alert(error)})
    }

    const on_agregar_pedido = (id, tipo) => {
        //get codigo details
        fetch(get.detalle_codigo + id).then(r=>r.json()).then((response)=>{


            setUsedRows(_ur => _ur.map(r1=>(r1.tipo != modifyingId ? r1 : {...r1, pedidos: [...r1.pedidos,...[{idpedido:1, codigo: "-", fecha:"18-05-2024"}]]})))

            setLoading(false)
            setReload(!reload)
        })
    }

    const onCodigoSelected = (id, tipo)=>{
        alert(accion)
       if(accion=="adicional")
        {
            on_agregar_adicional(id, tipo)
        }
        else{
            on_agregar_pedido(id)
        }
    }

    const detalle_venta = _ => venta == null ? <></> : <>
    <Row>
        <Col span={24} style={{padding:"1em"}}>
            <Row>
                <Col span={24}>
                    <h4>Detalle Venta  Nro.: {props.idventa}</h4>
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
                columns={ columns }
                dataSource={ usedRows}
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
            <Button block type="primary" onClick={save} disabled={!btnSaveEnabled}>Aplicar Cambios</Button>
        </Col>
        <Col span={4}></Col>
        <Col span={10}>
            <Button block danger disabled={!btnCambiarEstadoEnabled} onClick={()=>{
                if(!confirm("Confirmar")){
                    return
                }

                setBtnCambiarEstadoEnabled(false)
                setBtnSaveEnabled(false)
                post_method(post.update.cambiar_venta_sucursal_deposito,{idventa:props.idventa, en_laboratorio: 0},(resp)=>{
                    alert("OK")
                    props?.callback?.()
                })
            }}>Marcar Como Calibrado</Button>
        </Col>
    </Row>
    <Modal open={open} onCancel={()=>{setOpen(false); setLoading(false);}} title="Agregar Código" footer={null} >
        <SearchStock 
            callback={(resp)=>{
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