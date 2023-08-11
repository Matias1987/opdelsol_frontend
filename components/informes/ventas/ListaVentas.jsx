import CustomModal from "@/components/CustomModal";
import ImprimirSobreVenta from "@/pages/v1/ventas/informes/sobre_venta";
import { post_method } from "@/src/helpers/post_helper";
import { useEffect, useState } from "react";
import InformeVenta from "./Base";
import { post } from "@/src/urls";
import globals from "@/src/globals";
import FiltroVentas from "@/components/forms/ventas/filtroVentas";
import CobroOperacion from "@/components/forms/caja/CobroForm";
import { InfoCircleFilled } from "@ant-design/icons";
import VentaDetallePopup from "@/components/VentaDetalle";
const { Table, Button, Tag, Alert } = require("antd");
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
 */
const ListaVentas = (props) => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(true)
    const [filtros, setFiltros] = useState({})
    const [reload, setReload] = useState(true)

    const add = (obj,value,key) => typeof value === 'undefined' ? obj : {...obj, [key]:value}

    const buttons = (_idventa, _idcliente) => {
        return <>
            <><VentaDetallePopup idventa={_idventa} />&nbsp;&nbsp;</>
            {typeof props.imprimir !== 'undefined' ?  <><ImprimirSobreVenta idventa={_idventa} />&nbsp;&nbsp;</>:<></>}
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

                    if(data==null || typeof data === 'undefined'){
                        setReload(!reload)
                        return;
                    }
                    
                    if(typeof props.estado !== 'undefined'){
                        switch(props.estado){
                            case 'INGRESADO':
                                if(typeof data.estado_next === 'undefined' )
                                {
                                    alert("ERROR; next state undefined")
                                }
                                post_method(post.cambiar_estado_venta,{idventa: _idventa, estado: data.estado_next},(resp)=>{alert("OK")})
                            break;
                            case 'TERMINADO':
                                post_method(post.cambiar_estado_venta,{idventa: _idventa, estado: 'ENTREGADO'},(resp)=>{alert("OK")})
                            break;
                        }
                    }
                    setReload(!reload)
                }} />&nbsp;&nbsp;
            </>:<></>}
            
            
            {typeof props.marcarTerminado !== 'undefined' ?  <><Button size="small" type="primary" onClick={(e)=>{
                if(confirm("Marcar operación como disponible para entrega?"))
                {
                    post_method(post.cambiar_estado_venta,{idventa: _idventa, estado: 'TERMINADO'},(resp)=>{alert("OK"); setReload(!reload)})
                }
            }}>Terminado</Button>&nbsp;&nbsp;</>:<></>}
            {typeof props.enviarALaboratorio !== 'undefined' ?  <Button size="small" danger onClick={(e)=>{
                if(confirm("Enviar venta a taller?"))
                {
                    post_method(post.update.cambiar_venta_sucursal_deposito,{idventa: _idventa, en_laboratorio: "1"},(resp)=>{alert("OK"); setReload(!reload)})
                }
            }}>Devoluci&oacute;n</Button>:<></>}

        </>
    }

    useEffect(()=>{

        var params = {idsucursal: globals.obtenerSucursal()}
        params = add(params, props?.estado, 'estado')
        params = add(params, props?.idCliente, 'idCliente')
        params = add(params, props?.en_laboratorio, 'en_laboratorio')
        //params = add(params, props?.idVendedor, 'idVendedor')
        params = add(params, props?.fecha, 'fecha')
        //alert(" FILTROS:  "+JSON.stringify(filtros))
        //filtros
        params = add(params, filtros.idcliente, 'idcliente')
        params = add(params, filtros.idmedico, 'idmedico')
        params = add(params, filtros.id, 'id')
        params = add(params, filtros.iddestinatario, 'iddestinatario')

        const url = post.venta_estado_sucursal;
        //alert("PARAMS: " + JSON.stringify(params))
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
                }))
            ))
        })

       
        setLoading(false)
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
        {title: "Nro.", dataIndex:"idventa"},
        {title: "Tipo", dataIndex: "tipo", render:(_,{tipo})=>(
            <span style={{fontSize:".75em", color:"blue"}}><b>{get_tipo(tipo)}</b></span>
        ) },
        {title: "Fecha", dataIndex:"fecha"},
        {title: "Cliente", dataIndex:"cliente"},
        {title: "Vendedor", dataIndex:"vendedor"},
        {title: "Estado", dataIndex:"estado", render:(_,{estado})=>{
            switch(estado){
                case "INGRESADO": return <Tag color="magenta">{estado}</Tag>
                case "PENDIENTE": return <Tag color="geekblue">{estado}</Tag>
                case "ENTREGADO": return <Tag color="volcano">{estado}</Tag>
                case "ANULADO": return <Tag color="red">{estado}</Tag>
                case "TERMINADO": return <Tag color="green">{estado}</Tag>
            }
        }},
        {title: "Monto", dataIndex:"monto"},
        {title: "Acciones", dataIndex:"idventa", render: (_,{idventa,idcliente})=>{
            return <>
                {buttons(idventa,idcliente)}
            </>
        }},
    ]

    

    return <>

        <h3>{typeof props.titulo === 'undefined' ? "Lista de Ventas": props.titulo}</h3>
        <FiltroVentas callback={f=>{setFiltros(_f=>f); setReload(!reload)}} />
        {JSON.stringify(filtros)}
        <Table dataSource={dataSource} columns={columns} loading={loading} />
    </>
}

export default ListaVentas;