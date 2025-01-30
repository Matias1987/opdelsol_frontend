import ImprimirSobreVenta from "@/pages/v1/ventas/informes/sobre_venta";
import { post_method } from "@/src/helpers/post_helper";
import { useEffect, useState } from "react";
import { post } from "@/src/urls";
import globals from "@/src/globals";
import FiltroVentas from "@/components/forms/ventas/filtroVentas";
import CobroOperacion from "@/components/forms/caja/CobroForm";
import { ReloadOutlined } from "@ant-design/icons";
import VentaDetallePopup from "@/components/VentaDetalle";
import { current_date_ymd } from "@/src/helpers/string_helper";
import { registrarVentaAnulado, registrarVentaTerminado } from "@/src/helpers/evento_helper";
import { Table, Button, Tag, Row, Col } from "antd"
/**
 * 
 * @param estado INGRESADO, PENDIENTE, TERMINADO, ENTREGADO, ANULADO... 
 * @param idCliente id del cliente
 * @param idVendedor id del vendedor
 * @param fecha fecha de creacion
 * @param titulo titulo de la ventana
 * @param accion ingreso, entrega, adelanto 
 * @param imprimir if imprimir available
 * @param detalles the user can view the operation but can't print
 * @param cobrar
 * @param mustCancel
 * @param en_laboratorio
 * @param enviar_a_sucursal
 * @param ocultarFiltros
 * @param estado_taller
 */
const ListaVentas = (props) => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(true)
    const [filtros, setFiltros] = useState({})
    const [reload, setReload] = useState(true)

    const add = (obj,value,key) => typeof value === 'undefined' ? obj : {...obj, [key]:value}

    const buttons = (_idventa, _idcliente, _idsucursal, _tipo) => {
        return <>
            <><VentaDetallePopup idventa={_idventa} />&nbsp;&nbsp;</>
            {typeof props.imprimir !== 'undefined'  ?  <><ImprimirSobreVenta idventa={_idventa} />&nbsp;&nbsp;</>:<></>}
            {typeof props.cobrar !== 'undefined' ?  <>
            <CobroOperacion 
                buttonText={typeof props.buttonText !== 'undefined' ? props.buttonText : "Cobrar"}
                tarjetaHidden={false}
                ctacteHidden={false}
                totalsHidden={false}
                mustCancel={typeof props.mustCancel === 'undefined' ? false : props.mustCancel}
                idventa={_idventa} 
                idcliente={_idcliente} 
                tipo={props.accion} 
                callback={(data)=>{
                    setReload(!reload)
                }} />&nbsp;&nbsp;
            </>:<></>}
            
            
            {typeof props.marcarTerminado !== 'undefined' ?  <><Button size="small" type="primary" onClick={(e)=>{
                if(confirm("Marcar operación como disponible para entrega?"))
                {
                    if(_idsucursal != globals.obtenerSucursal() && ((props.ignoreSucursalEntrega||"0")=="0"))
                    {
                        alert("<!> Venta de Otra Sucursal")
                        return
                    }
                    post_method(post.cambiar_estado_venta,{idventa: _idventa, estado: 'TERMINADO', fecha_retiro:current_date_ymd()},(resp)=>{alert("OK"); setReload(!reload)})
                    registrarVentaTerminado(_idventa)
                }
            }}>Terminado</Button>&nbsp;&nbsp;</>:<></>}

            {(typeof props.enviarALaboratorio !== 'undefined'&& _tipo!=globals.tiposVenta.DIRECTA) ?  <Button size="small" danger onClick={(e)=>{
                if(confirm("Enviar venta a taller?"))
                {
                    if(_idsucursal != globals.obtenerSucursal())
                    {
                        alert("<!> Venta de Otra Sucursal")
                        return
                    }
                    post_method(post.update.cambiar_venta_sucursal_deposito,{idventa: _idventa, en_laboratorio: "1"},(resp)=>{alert("OK"); setReload(!reload)})
                }
            }}>Devoluci&oacute;n</Button>:<></>}

            {typeof props.anular !== 'undefined' ?<><Button size="small" danger onClick={(e)=>{
                if(confirm("Anular Operacion?")){
                    if(_idsucursal != globals.obtenerSucursal())
                    {
                        alert("<!> Venta de Otra Sucursal")
                        return
                    }   
                    post_method(post.cambiar_estado_venta,{idventa: _idventa, estado: 'ANULADO'},(resp)=>{
                        
                        setReload(!reload);
                        alert("OK");
                        post_method(post.update.inc_cantidades_stock_venta,{idventa:_idventa, idsucursal: globals.obtenerSucursal()},(response)=>{ })
                        registrarVentaAnulado(_idventa)
                    })
                }
            }}>Anular</Button></>:<></>}
            
            {/*typeof props.enviar_a_sucursal !== 'undefined' ?<><Button size="small" danger onClick={(e)=>{
                if(confirm("Confirmar")){
                    post_method(post.update.cambiar_venta_sucursal_deposito,{idventa: _idventa, en_laboratorio: "0"},(resp)=>{alert("OK"); setReload(!reload)})

                }
            }}>Enviar a Sucursal</Button></>:<></>*/}

            {typeof props.laboratorio_modificar!=='undefined'  ? <>
                <Button onClick={()=>{props?.onEditLaboratorioClick?.(_idventa)}} danger> Insumos </Button>
            </> : <></>}

            {/*<EditarVentaItems idventa={_idventa} />*/}


        </>
    }

    useEffect(()=>{
        setLoading(true)
        var params = {}
        if(typeof props.ignoreSucursal === 'undefined')
        {
            params = {idsucursal: globals.obtenerSucursal()}
        }
        if(typeof props.idsucursal !== 'undefined')
        {
            if(props.idsucursal!='-1')
            {
                params =    {idsucursal: props.idsucursal}
            }
            
        }
        params = add(params, props?.estado, 'estado')
        params = add(params, props?.idCliente, 'idCliente')
        params = add(params, props?.en_laboratorio, 'en_laboratorio')
        
        params = add(params, props?.fecha, 'fecha')
        if(+props.id>0)
        {
            params = add(params, props?.id, 'id')
        }
        

        if(typeof props.estado_taller !== 'undefined' )
        {
            params = add(params, props?.estado_taller,'estado_taller')
            
        }
        
        //filtros
        params = add(params, filtros.idcliente, 'idcliente')
        params = add(params, filtros.idmedico, 'idmedico')
        params = add(params, filtros.id, 'id')
        params = add(params, filtros.iddestinatario, 'iddestinatario')
        params = add(params, filtros.fecha, 'fecha')

        const url = post.venta_estado_sucursal;
        //alert(JSON.stringify(params))
        post_method(url, params,(response)=>{
            
            if(response==null)
            {
                return
            }

            if(response.data==null)
            {
                return
            }
            
            setDataSource(src=>(
                 response.data.map(v=>({
                    idventa: v.idventa,
                    idcliente: v.cliente_idcliente,
                    fecha: v.fecha,
                    cliente: v.cliente,
                    vendedor: v.vendedor,
                    estado: v.estado,
                    monto: v.monto,
                    tipo: v.tipo,
                    sucursal: v.sucursal,
                    idsucursal: v.sucursal_idsucursal,
                }))
            ))
            setLoading(false)
        })

       
       
    },[reload])

    const get_tipo = (tipo)=>{
        switch(+tipo)
        {
            case 1: return "Vta. Dir."; 
            case 2: return "Rec. Stock"; 
            case 3: return "L.C. Stock"; 
            case 4: return "Monof. Lab."; 
            case 5: return "Multif. Lab."; 
            case 6: return "L.C. Lab."; 
        }
    }

    const columns = [
        {width:"100px", hidden: false, title: "Nro.", dataIndex:"idventa"},
        {width:"150px", hidden: false, title: "Tipo", dataIndex: "tipo", render:(_,{tipo})=>(
            <span style={{fontSize:".75em", }}><b>{get_tipo(tipo)}</b></span>
        ) },
        {width:"150px", hidden: false, title: "Fecha", dataIndex:"fecha"},
        {width:"250px", hidden: false, title: "Cliente", dataIndex:"cliente"},
        {width:"200px", hidden: false, title: "Vendedor", dataIndex:"vendedor"},
        {width:"100px", hidden: (props.mostrarEstado||"1") == "0" , title: "Estado", dataIndex:"estado", render:(_,{estado})=>{
            switch(estado){
                case "INGRESADO": return <Tag color="magenta">{estado}</Tag>
                case "PENDIENTE": return <Tag color="geekblue">{estado}</Tag>
                case "ENTREGADO": return <Tag color="volcano">{estado}</Tag>
                case "ANULADO": return <Tag color="red">{estado}</Tag>
                case "TERMINADO": return <Tag color="green">{estado}</Tag>
            }
        }},
        {width:"150px", hidden: false, title:<div style={{textAlign:"right"}}>Monto</div> , dataIndex:"monto", render:(_,{monto})=><div style={{textAlign:"right"}}>$&nbsp;{parseFloat(monto)}</div>},
        {width:"150px", hidden: false, title: "Sucursal", dataIndex:"sucursal"},
        {width:"300px", hidden: false, title: "Acciones", dataIndex:"idventa", render: (_,{idventa,idcliente, idsucursal, tipo})=>{
            return <>
                {buttons(idventa,idcliente, idsucursal, tipo)}
            </>
        }},
    ]
    
    const _row_style = {
        padding: '.2em',
    }

    return <>

    <Row>
        <Col span={20} style={_row_style}> 
            <h3>{typeof props.titulo === 'undefined' ? "Lista de Ventas": props.titulo}</h3>
        </Col>
        <Col span={4}>
            <Button type="ghost" size="large" onClick={()=>{setReload(!reload)}}><ReloadOutlined /> Recargar</Button>
        </Col>
    </Row>
    <Row>
        <Col span={24} style={_row_style}>
            {typeof props.ocultarFiltros === 'undefined' ? <></> : <FiltroVentas callback={f=>{setFiltros(_f=>f); setReload(!reload)}} /> }
        </Col>
    </Row>
    <Row>
        <Col span={24} style={_row_style}>
            <Table 
            size="small"
            scroll={{y:"500px"}}
            pagination={typeof props.pagination === 'undefined' ? true : props.pagination}
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
            dataSource={dataSource} 
            columns={columns.filter(r=>!r.hidden)} 
            loading={loading} 
            />
        </Col>
    </Row>
    </>
}

export default ListaVentas;