import { currency_format } from "@/src/helpers/string_helper";
import { get } from "@/src/urls";
import { Spin } from "antd";
import { useEffect, useState } from "react";

export default function VentaDirectaItems(props){
    
    const [data, setData] = useState(null)
    
    useEffect(()=>{
        const url = get.obtener_venta_items + props.idventa;
        fetch(url)
        .then(response=>response.json())
        .then((response)=>{
            setData(response.data)
            //alert("ITEMS::: " + JSON.stringify(response))
            props?.callback?.()
        })
    },[])



    return data == null ? <Spin /> : <>
    <table style={{width:"80%", fontSize:".95em", padding:"0",  marginLeft:"auto", marginRight:"auto",}}>
        <thead>
            <tr>
                <th style={{padding:"0", textAlign:"left"}}>C&oacute;digo</th>
                <th style={{padding:"0", textAlign:"left"}}>Descripci&oacute;n</th>
                <th style={{padding:"0", textAlign:"right"}}>Precio</th>
                <th style={{padding:"0", textAlign:"right"}}>Cantidad</th>
                <th style={{padding:"0", textAlign:"right"}}>Total</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map(r=>(
                    <tr >
                        <td style={{borderBottom:"1px dotted", padding:"0"}}><b>{r.codigo}</b></td>
                        <td style={{borderBottom:"1px dotted", padding:"0"}}>{r.descripcion}</td>
                        <td style={{borderBottom:"1px dotted", padding:"0", textAlign:"right"}}>$&nbsp;{currency_format(r.precio)}</td>
                        <td style={{borderBottom:"1px dotted", padding:"0", textAlign:"right"}}>{r.cantidad}</td>
                        <td style={{borderBottom:"1px dotted", padding:"0",textAlign:"right"}}>$&nbsp;{currency_format(r.total)}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    </>;
}