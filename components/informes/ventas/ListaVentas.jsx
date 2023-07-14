import CustomModal from "@/components/CustomModal";
import ImprimirSobreVenta from "@/pages/v1/ventas/informes/sobre_venta";
import { post_method } from "@/src/helpers/post_helper";
import { useEffect, useState } from "react";
import InformeVenta from "./Base";
import { post } from "@/src/urls";
import globals from "@/src/globals";
const { Table, Button, Tag } = require("antd");
/**
 * 
 * @param estado INGRESADO, PENDIENTE, TERMINADO, ENTREGADO, ANULADO... 
 * @param idCliente id del cliente
 * @param idVendedor id del vendedor
 * @param fecha fecha de creacion
 * @param titulo titulo de la ventana
 * @param ingreso if the user can charge and change to pendiente
 * @param entrega if entrega process
 * @param adelanto user can charge without modifying the work status 
 * @param imprimir if imprimir available
 * @param detalles the user can view the operation but can't print
 */
const ListaVentas = (props) => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(true)
    const add = (obj,value,key) => typeof value === 'undefined' ? obj : {...obj, [key]:value}

    const buttons = (_idventa) => {
        return <>
            {typeof props.ingreso !== 'undefined' ?  <>Cobrar</>:<></>}
            {typeof props.entrega !== 'undefined' ?  <>Entregar Operacion</>:<></>}
            {typeof props.adelanto !== 'undefined' ?  <><Button>Adelanto</Button></>:<></>}
            {typeof props.imprimir !== 'undefined' ?  <CustomModal openButtonText={"Imprimir"}><ImprimirSobreVenta idventa={_idventa} /></CustomModal>:<></>}
            {typeof props.detalles !== 'undefined' ?  <CustomModal openButtonText={"Imprimir"}><InformeVenta idventa={_idventa} /></CustomModal>:<></>}
        </>
    }
    
    useEffect(()=>{

        var params = {idsucursal: globals.obtenerSucursal()}
        params = add(params, props?.estado, 'estado')
        params = add(params, props?.idCliente, 'idCliente')
        params = add(params, props?.idVendedor, 'idVendedor')
        params = add(params, props?.fecha, 'fecha')
        const url = post.venta_estado_sucursal;

        post_method(url, params,(response)=>{
            alert(JSON.stringify(response))
            setDataSource(src=>(
                 response.data.map(v=>({
                    idventa: v.idventa,
                    fecha: v.fecha,
                    cliente: v.cliente,
                    vendedor: v.vendedor,
                    estado: v.estado,
                    monto: v.monto,
                }))
            ))
        })

       
        setLoading(false)
    },[])

    const columns = [
        {title: "Nro.", dataIndex:"idventa"},
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
        {title: "Acciones", dataIndex:"idventa", render: (_,{idventa})=>{
            return <>
                {buttons(idventa)}
            </>
        }},
    ]
    return <>
        <h3>{typeof props.titulos === 'undefined' ? "Lista de Ventas": props.titulo}</h3>
        <Table dataSource={dataSource} columns={columns} loading={loading} />
    </>
}

export default ListaVentas;