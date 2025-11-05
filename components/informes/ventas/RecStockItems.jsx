import { currency_format } from "@/src/helpers/string_helper";
import { get } from "@/src/urls";
import { Spin } from "antd";
import { useEffect, useState } from "react";

export default function RecStockItems(props){
    
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



    return data == null ? <Spin /> : <div style={{width:"100%"}}>
    <table style={{width:"95%", fontSize:"1.0em", padding:"0", marginLeft:"auto", marginRight:"auto"}}>
        <thead>
            <tr>
                <th style={{width:'10%'}}></th>
                <th style={{padding:".1em", textAlign:"left"}}>C&oacute;digo</th>
                <th style={{padding:".1em", textAlign:"left"}}>Eje</th>
                {/*<th style={{padding:"0", textAlign:"left"}}>Descripci&oacute;n</th>*/}
                <th style={{padding:".1em", textAlign:"right"}}>Precio</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map(r=>(
                    <tr >
                        <td style={{borderBottom:"1px dotted"}}>{((r.tipo||"").toUpperCase()).replace(/_/g," ")}</td>
                        <td style={{borderBottom:"1px dotted", padding:".2em",textAlign:"left"}}><span style={{fontWeight:"600"}}>{r.codigo}</span></td>
                        <td style={{borderBottom:"1px dotted", padding:".2em",textAlign:"left"}}><b>{r.eje}</b></td>
                        {/*<td style={{padding:"0",textAlign:"left"}}>{r.descripcion}</td>*/}
                        <td style={{borderBottom:"1px dotted", padding:".2em",textAlign:"right"}}>{currency_format(r.precio)}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    </div>;
}