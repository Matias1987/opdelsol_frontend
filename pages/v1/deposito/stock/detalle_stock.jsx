import { Spin } from "antd";

const { useEffect, useState } = require("react")

const DetalleStock = (props) => {
    const [loadingSucursales, setLoadingSucursales] = useState(true)
    const [loadingDetalles, setLoadingDetalles] = useState(true)
    const [loadingEnvios, setLoadingEnvios] = useState(true)

    const [dataSucursales, setDataSucursales] = useState(null)
    const [dataDetalles, setDataDetalles] = useState(null)
    const [dataEnvios, setDataEnvios] = useState(null)

    const url_stock_sucursales = "";//some url
    const url_detalle_stock = "";//some url
    const url_envios = "";//some url

    //get stock sucursales
    useEffect(()=>{
        fetch(url_stock_sucursales)
        .then(response=>response.json())
        .then((response)=>{

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
        fetch(url_detalle_stock)
        .then(response=>response.json())
        .then((response)=>{
            setDataDetalles(
                response.data
            )
            setLoadingDetalles(false)
        });

        //get envios
        fetch(url_envios)
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
            setLoadingDetalles(false)
        });
    })
    
    const Envios = _ => {
        loadingEnvios ? <Spin /> : <>
            <table>
                <thead>
                    <tr>
                        <th colSpan={4}>Envios</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataEnvios.map(r=>{
                            <tr>
                                <td>Nro. Env&iacute;o:</td>
                                <td>{r.nro_envio}</td>
                                <td>Cantidad:</td>
                                <td>{r.cantidad}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    }



    const Detalle = _ => (
        loadingDetalles ? <Spin /> : 
        <>
            <table>
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
                        <td><b>{dataDetalles.cantidad}</b></td>
                        <td>Precio:</td>
                        <td><b>{dataDetalles.precio}</b></td>
                    </tr>
                </tbody>
            </table>
        </>
    )

    const CantidadSucursales = _ => (
        
            loadingSucursales ? <Spin /> : 
            <>
                {dataSucursales.map(r=>{
                    <>
                        <p>Sucursal: {r.sucursal} &nbsp; Cantidad: {r.cantidad}</p>
                    </>
                })}
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