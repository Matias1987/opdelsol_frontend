import { get } from "@/src/urls";
import { Spin } from "antd";
import { useEffect, useState } from "react"

const StockCodigosSucursales = (props) => {
    const [dataSucursales, setDataSucursales] = useState(null)
    const [loadingSucursales, setLoadingSucursales] = useState(true)
    const url_stock_sucursales = get.stock_codigo_sucursales;//idcodigo

    useEffect(()=>{

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
            }
            )

    },[ ])

    return loadingSucursales ? <Spin /> : 
    <>
    <h4>Stock Sucursales</h4>
    <div  style={{display:"flex", flexDirection:"row", justifyContent:"left", flexWrap: "wrap"}}>
        {dataSucursales.map(r=>
            <div style={{padding:".5em", backgroundColor:"lightblue", margin:".2em"}}>
                <span style={{color:"red"}}>{r.sucursal}: <b>{r.cantidad}</b></span>
            </div>
        )}
    </div>
    </>
}

export default StockCodigosSucursales