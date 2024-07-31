import { get } from "@/src/urls";
import { Spin } from "antd";
import { useEffect, useState } from "react"

const StockCodigosSucursales = (props) => {
    const [dataSucursales, setDataSucursales] = useState(null)
    const [loadingSucursales, setLoadingSucursales] = useState(true)
    const url_stock_sucursales = get.stock_codigo_sucursales;//idcodigo
    const pastelColors = [
        '#FFB3BA',
        '#FFDFBA',
        '#FFABAB',
        '#FFC3A0',
        '#FF677D',
        '#D9BF77',
        '#F6BDC0',
        '#AB83D4',
        '#D8C4E0',
        '#FFE156',
        '#B9FBC0',
        '#B5EAD7',
        '#95E1D3',
        '#D0E1F9',
        '#B9D3B8',
        '#FFE1E1',
        '#FCE3C4',
        '#AEBCC8',
        '#FF9AA2',
        '#FF6F61',
        '#C0E5D2',
        '#FFCCF9',
        '#FFEDB1',
        '#C3B1E1',
        '#EAD2DB',
        '#FFC5D8',
        '#F1E2C2',
        '#F4C2C2',
        '#B1F2F0',
        '#E3FDFD',
        '#FF8C66',
        '#F3C1D8',
        '#A2DFF7',
        '#B7E4D8',
        '#E2F7E2',
        '#FFFFFF', // white
        '#F5E3E0',
        '#D7B5D3',
        '#C2D3D3',
        '#FFC8A2',
        '#F5B5BA',
        '#D4C7A8',
        '#F6E9A1',
        '#B7D0E9',
        '#FFD6C8',
        '#DAB1F8',
        '#E3CFC8',
        '#F1F0F0',
        '#E2DAF2',
        '#D6E2F0'
    ];
    

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
        {dataSucursales.map((r,index)=>
            <div style={{padding:".5em", backgroundColor:pastelColors[index], margin:".2em", border:"1px solid rgba(0,0,0,1)", borderRadius:"8px"}}>
                <span style={{color:"rgba(0,20,27,1)"}}>{r.sucursal}: <b>{r.cantidad}</b></span>
            </div>
        )}
    </div>
    </>
}

export default StockCodigosSucursales