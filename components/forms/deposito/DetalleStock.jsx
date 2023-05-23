import globals from "@/src/globals";
import { get } from "@/src/urls";
import { Spin } from "antd";

const { useEffect, useState } = require("react")

const DetalleStock = (props) => {
    const [loadingSucursales, setLoadingSucursales] = useState(true)
    const [loadingDetalles, setLoadingDetalles] = useState(true)
    const [loadingEnvios, setLoadingEnvios] = useState(true)

    const [dataSucursales, setDataSucursales] = useState(null)
    const [dataDetalles, setDataDetalles] = useState(null)
    const [dataEnvios, setDataEnvios] = useState(null)

    const url_stock_sucursales = get.stock_codigo_sucursales;//idcodigo
    const url_detalle_stock = get.detalle_stock;//:idsucursal/:idcodigo
    const url_envios = get.obtener_envios_codigo;//idcodigo
    const idsucursal = globals.obtenerSucursal();

    

    //get stock sucursales
    useEffect(()=>{

        if(typeof props.idcodigo === 'undefined') {
            alert("codigo no establecido");
            return;
        }

        fetch(url_stock_sucursales + props.idcodigo )
        .then(response=>response.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            setDataSucursales(
                response.data.map(r=>(
                    {
                        sucursal: r.sucursal,
                        cantidad: r.cantidad,
                    }
                ))
            )

            setLoadingSucursales(false)

        });
        //get detalles
        fetch(url_detalle_stock + idsucursal + "/" + props.idcodigo)
        .then(response=>response.json())
        .then((response)=>{
            setDataDetalles(
                response.data[0]
            )
            setLoadingDetalles(false)
        });

        //get envios
        //alert(url_envios + props.idcodigo)
        fetch(url_envios + props.idcodigo)
        .then(response=>response.json())
        .then((response)=>{
            
            setDataEnvios(
                response.data.map(r=>(
                    {
                        nro_envio: r.nroenvio,
                        cantidad: r.cantidad,
                        
                    }
                ))
            )
            setLoadingEnvios(false)
        });
    },[])
    
    const Envios = _ => (
        loadingEnvios ? <Spin /> : <>
            <table  border={"0"}>
                <thead>
                    <tr>
                        <th colSpan={4}>Envios</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataEnvios.map(r=>(
                            <tr>
                                <td>Nro. Env&iacute;o:</td>
                                <td>{r.nro_envio}</td>
                                <td>Cantidad:</td>
                                <td>{r.cantidad}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )



    const Detalle = _ => (
        loadingDetalles ? <Spin /> : 
        <>
            <table border={"0"}  >
                <tbody>
                    <tr>
                        <td>C&oacute;digo:</td>
                        <td><b>{dataDetalles.codigo}</b></td>
                    </tr>
                    <tr>
                        <td>Descripci&oacute;n</td>
                        <td><b>{dataDetalles.descripcion}</b></td>
                    </tr>
                    <tr>
                        <td>Cantidad:</td>
                        <td><b>{dataDetalles.cantidad}</b></td>
                    </tr>
                    <tr>
                        <td>Costo:</td>
                        <td><b>{dataDetalles.costo}</b></td>
                        <td>Precio:</td>
                        <td><b>{0}</b></td>
                    </tr>
                </tbody>
            </table>
        </>
    )

    const CantidadSucursales = _ => (
        
            loadingSucursales ? <Spin /> : 
            <>
                {dataSucursales.map(r=>
                    <>
                        <p>Sucursal: {r.sucursal} &nbsp; Cantidad: {r.cantidad}</p>
                    </>
                )}
            </>
        
    )

    return (
        <>
            <Detalle />
            <CantidadSucursales />
            <Envios />
        </>
    )
}

export default DetalleStock;