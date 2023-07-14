import CustomModal from "@/components/CustomModal";
import ImprimirSobreVenta from "@/pages/v1/informes/ventas/sobre_venta";
import { post_method } from "@/src/helpers/post_helper";
import { useEffect, useState } from "react";
import InformeVenta from "./Base";
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
        {typeof props.ingreso !== 'undefined' ?  <>Cobrar</>:<></>}
        {typeof props.entrega !== 'undefined' ?  <>Entregar Operacion</>:<></>}
        {typeof props.adelanto !== 'undefined' ?  <>Adelanto</>:<></>}
        {typeof props.imprimir !== 'undefined' ?  <CustomModal openButtonText={"Imprimir"}><ImprimirSobreVenta idventa={_idventa} /></CustomModal>:<></>}
        {typeof props.detalles !== 'undefined' ?  <CustomModal openButtonText={"Imprimir"}><InformeVenta idventa={_idventa} /></CustomModal>:<></>}
    }
    
    useEffect(()=>{

        var params = {}
        params = add(params, props.estado, 'estado')
        params = add(params, props.idCliente, 'idCliente')
        params = add(params, props.idVendedor, 'idVendedor')
        params = add(params, props.fecha, 'fecha')
        const url = ""

        post_method(url, params,(response)=>{
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
        {title: "Nro.", dataKey:"idventa"},
        {title: "Fecha", dataKey:"fecha"},
        {title: "Cliente", dataKey:"cliente"},
        {title: "Vendedor", dataKey:"vendedor"},
        {title: "Estado", dataKey:"estado"},
        {title: "Monto", dataKey:"monto"},
        {title: "Acciones", dataKey:"idventa", render: (_,{idventa})=>{
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