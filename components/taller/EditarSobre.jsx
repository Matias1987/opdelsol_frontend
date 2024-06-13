import globals from "@/src/globals";
import { get, post } from "@/src/urls";
import { Button, Col, Modal, Row, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { ArrowRightOutlined, PlusOutlined } from "@ant-design/icons";
import { post_method } from "@/src/helpers/post_helper";
import DetalleCodigo from "../forms/deposito/DetalleCodigo";
import CustomModal from "../CustomModal";
import SearchCodigo from "../SearchCodigo";

const EditarSobre = (props) => {
    const [firstLoad, setFirstLoad] = useState(true)
    const [loading, setLoading] = useState(false)
    const [venta, setVenta] = useState(null)
    const [open, setOpen] = useState(false)
    const [modifyingId, setModifyingId] = useState('')
    const query_detalles = get.obtener_stock_detalles_venta ;
    const [reload, setReload] = useState(true)
    const [btnSaveEnabled, setBtnSaveEnabled] = useState(true)
    const [btnCambiarEstadoEnabled, setBtnCambiarEstadoEnabled] = useState(true)
    const [accion, setAccion] = useState("")

    const [idlocalPedidos, setIdLocalPedidos] = useState(0)
    const [idlocalAdicionales, setIdLocalAdicionales] = useState(0)
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
            disabled={!record.usarEnabled || record.idcodigo<1 || record.pedir || props.readonly} 
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
                onCodigoSelected(record.idcodigo, record.tipo, "adicional")

            }}>
                <ArrowRightOutlined />
            </Button>
        </>},
        
        {title:"Uso", render:(_,record)=><>
            {
            record.items.map(i=><>
                <Tag 
                key={i.localId}
                closable={i.closable} 
                onClose={()=>
                {
                    setUsedRows(_ventaItems=>(_ventaItems.map(vi=>(vi.tipo===record.tipo ? {...vi,agregarEnabled:true, usarEnabled:true, items:record.items.filter(vi1=>vi1.localId!=i.localId)} : vi))))}
                } 
                    style={{fontSize:i.closable ? "1em" : ".85em"}} color={i.closable ? "red" : "purple"}
                >
                    {i.codigo}</Tag>
                </>)
            }
                <Button 
                    disabled={record.pedir||props.readonly} 
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
                    
                    record.pedidos.map(p=><Tag key={p.localId} closable={p.userAdded} onClose={()=>{
                       //usedRows.forEach(r1=>(record.tipo == r1.tipo ? {...r1, pedidos:r1.pedidos.filter(r2=>r2.localId!=p.localId)} : r1))
                       //setUsedRows(r=>r.map(r1=>(record.tipo == r1.tipo ? {...r1, pedidos:r1.pedidos.filter(r2=>r2.localId!=p.localId)} : r1)))
                       //setReload(!reload)
                       //alert(JSON.stringify(usedRows))

                       let _ur = usedRows.map(r1=>(record.tipo == r1.tipo ? {...r1, pedidos:r1.pedidos.filter(r2=>r2.localId!=p.localId)} : r1))

                       //alert(JSON.stringify(_ur))

                       setUsedRows(_ur)
                       
                    }} color={p.userAdded ? "red" : "purple"}>{p.codigo}</Tag>)
                }
                <Button
                disabled={props.readonly}
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

            _data_pedidos = [..._data_pedidos, ...row.pedidos.filter(p=>p.userAdded)]
        })

        //ventaItems6Rows.forEach(row=>{
        //   
        //    _data_items_adicionales = [..._data_items_adicionales,...row.items.filter(it=>it.userAdded)]
        //})

        //alert(JSON.stringify(_data_pedidos))
        //if(_data_items_adicionales.length>0 && _data_pedidos.length>0)
        //{
        //    alert("La cantidad de pedidos es mayor a 0")
        //    return
        //}

        if(!confirm("Confirmar")){
            return
        }
        setBtnSaveEnabled(false)

        post_method(post.insert.pedido,{items: _data_pedidos, fkventa: props.idventa, fksucursalpedido: globals.obtenerSucursal()},(response)=>{
            //alert("Datos guardados")
            //setFirstLoad(true)
            //setBtnCambiarEstadoEnabled(true)
            //setBtnSaveEnabled(true)
            //setReload(!reload)

            post_method(post.insert.item_adicional,{fkventa: props.idventa, fksucursal: globals.obtenerSucursal() , items: _data_items_adicionales},(response)=>{
                //alert("Datos guardados")
                setFirstLoad(true)
                setBtnCambiarEstadoEnabled(true)
                setBtnSaveEnabled(true)
                setReload(!reload)
            })
        })

        //if(_data_pedidos.length>0)
        //{
        //}
        //if(_data_items_adicionales.length>0){
        //}



    }

    const populate_rows = (data) => {
        let _rows =  six_rows_type ? [...ventaItems6Rows] : [...ventaItems3Rows] //first time

        _rows = _rows.map(r=>({...r, idcodigo: -1, items:[]})) //reset

        let _local_id =  -1;

        data.forEach(
            data_row=>{
                
                if(+data_row.original==1){
                    
                    _rows = _rows.map(_row=>(_row.tipo == data_row.tipo ? {..._row, codigo: data_row.codigo, isadicional: false, idcodigo: data_row.idcodigo, agregarEnabled:  true,  usarEnabled: true} : _row))

                }
                else{
                    
                    _rows = _rows.map(_row=>(_row.tipo == data_row.tipo ? {..._row,items:[..._row.items,{tipo: data_row.tipo, codigo: data_row.codigo, isadicional: true, idcodigo: data_row.idcodigo, userAdded:false, localId:_local_id}]}: _row))
                }
                _local_id--;
            }
        )
       
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
        _local_id =  -1;

        post_method(post.obtener_items_ventas_taller,{idventa: props.idventa},(response)=>{
        
            response.data.forEach((r)=>{
              
                _rows = _rows.map(r1=>(r.tipo != r1.tipo ? r1 : {...r1, pedidos: [...r1.pedidos,...[{codigo: r.codigo, tipo: r.tipo, userAdded:false, localId:_local_id}]]}))
                _local_id --;
               
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
   
            const _data = {
                codigo: response.data[0].codigo,
                descripcion: response.data[0].descripcion,
                //precio: response.data[0].precio,
                cantidad: response.data[0].cantidad,
                idcodigo: id,
                tipo: typeof tipo==='undefined' ? modifyingId:tipo,
                closable: true,
                userAdded:true,
                localId: idlocalAdicionales,
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
            setBtnCambiarEstadoEnabled(false)
            setIdLocalAdicionales(idlocalAdicionales+1)

        })
        .catch((error)=>{alert(error)})
    }

    const on_agregar_pedido = (id, tipo) => {
        //get codigo details
        fetch(get.detalle_codigo + id).then(r=>r.json()).then((response)=>{
           
            let cod = response.data[0]
            setUsedRows(_ur => _ur.map(r1=>(r1.tipo != modifyingId ? r1 : {...r1, pedidos: [...r1.pedidos,...[{codigo: cod.codigo, fkcodigo: cod.idcodigo, tipo: modifyingId, userAdded:true, localId: idlocalPedidos}]]})))
            setIdLocalPedidos(idlocalPedidos+1)
            setLoading(false)
            setReload(!reload)
            setBtnCambiarEstadoEnabled(false)
        })
    }

    const onCodigoSelected = (id, tipo, _accion="")=>{
        let _a = _accion == "" ? accion : _accion
      
       if(_a=="adicional")
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
        <Col style={{padding:".5em"}} span={10}>
            <Button block type="primary" onClick={save} disabled={!btnSaveEnabled||props.readonly}>Aplicar Cambios</Button>
        </Col>
        <Col style={{padding:".5em"}} span={6}>
            <Button type="primary" onClick={()=>{props?.callback?.()}} block>
                Cerrar
            </Button>
        </Col>
        <Col style={{padding:".5em"}} span={4}>
            <Button block danger disabled={!btnCambiarEstadoEnabled||props.readonly} size="small"  onClick={()=>{

                var _data_items_adicionales = [];
                var _data_pedidos = [];

                usedRows.forEach(row=>{
                
                    _data_items_adicionales = [..._data_items_adicionales,...row.items.filter(it=>it.userAdded)]

                    _data_pedidos = [..._data_pedidos, ...row.pedidos.filter(p=>p.userAdded)]
                })

                if(_data_items_adicionales.length>0){
                    alert("Hay elementos adicionales cargados")
                    return
                }

                if(!confirm("Confirmar")){
                    return
                }

                setBtnCambiarEstadoEnabled(false)
                setBtnSaveEnabled(false)
                //post_method(post.update.cambiar_venta_sucursal_deposito,{idventa:props.idventa, en_laboratorio: 0},(resp)=>{
                //    alert("OK")
                //    props?.callback?.()
                //})
                post_method(post.update.marcar_como_calibrando,{idventa:props.idventa},(resp)=>{
                    alert("OK")
                    props?.callback?.()
                })
            }}>Marcar Como Calibrado</Button>
        </Col>
        <Col style={{padding:".5em"}} span={4}>
            <Button block danger disabled={!btnCambiarEstadoEnabled||props.readonly}  size="small"  onClick={()=>{

                var _data_items_adicionales = [];
                var _data_pedidos = [];

                usedRows.forEach(row=>{

                    _data_items_adicionales = [..._data_items_adicionales,...row.items.filter(it=>it.userAdded)]

                    _data_pedidos = [..._data_pedidos, ...row.pedidos.filter(p=>p.userAdded)]
                })

                if(_data_pedidos.length>0){
                    alert("Hay pedidos cargados")
                    return
                }

                //if(!validate())
                //    {
                //        if(!confirm("Todos los campos con código, No estan cargados. Continuar?"))
                //        {
                //            return
                //        }
                //        else{
                //            if(!confirm("Confirmar")){
                //                return
                //            }
                //        }
                //    }

                if(!validate())
                {
                    alert("Todos los campos con códigos no estan cargados.")
                    return
                }

                setBtnCambiarEstadoEnabled(false)
                setBtnSaveEnabled(false)
                //post_method(post.update.cambiar_venta_sucursal_deposito,{idventa:props.idventa, en_laboratorio: 0},(resp)=>{
                //    alert("OK")
                //    props?.callback?.()
                //})
                post_method(post.update.marcar_como_terminado,{idventa:props.idventa},(resp)=>{
                    alert("OK")
                    props?.callback?.()
                })
            }}>Marcar Como Terminado</Button>
        </Col>
    </Row>
    <Modal width={"80%"} open={open} onCancel={()=>{setOpen(false); setLoading(false);}} title="Agregar Código" footer={null} >
        {/*<SearchStock 
            callback={(resp)=>{
                onCodigoSelected(resp)
                setOpen(false)
            }
            }
            
        />*/}
        <SearchCodigo
        suggestions={usedRows.map(r=>r.codigo)}
        callback={(resp)=>{
            onCodigoSelected(resp)
            setOpen(false)
        }
        }
            />
    </Modal>
    </>
}

export default EditarSobre;