import { formatFloat } from "@/src/helpers/formatters";
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
    <table style={{width:"100%", fontSize:"1.0em", padding:"0", marginLeft:"auto", marginRight:"auto"}}>
        <thead>
            <tr>
                <th style={{fontSize:".7em", width:'100px'}}></th>
                <th style={{fontSize:".7em", padding:".1em", textAlign:"center"}}>C&oacute;digo</th>
                <th style={{fontSize:".7em", padding:".1em", textAlign:"left"}}>Eje</th>
                {/*<th style={{fontSize:".7em", padding:"0", textAlign:"center"}}>Descripci&oacute;n</th>*/}
                <th style={{fontSize:".7em", padding:".1em", textAlign:"right"}}>Precio</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map(r=>(
                    <tr >
                        <td style={{borderBottom:"1px dotted"}}>{((r.tipo||"").toUpperCase()).replace(/_/g," ")}</td>
                        <td style={{borderBottom:"1px dotted", padding:".2em",textAlign:"left"}}><span style={{fontWeight:"600"}}>{r.codigo}</span> {!r.tipo.includes("armazon") ? <></> : <>&nbsp; <span style={{fontSize:".9em", fontStyle:"italic"}}>{r.descripcion}</span></>}</td>
                        <td style={{borderBottom:"1px dotted", padding:".2em",textAlign:"left"}}><b>{ !r.tipo.includes("armazon") ? r.eje : ""}</b></td>
                        {/*<td style={{borderBottom:"1px dotted", padding:"0",textAlign:"left", paddingLeft:"8px", fontSize:".7em"}}><i>{r.descripcion}</i></td>*/}
                        <td style={{borderBottom:"1px dotted", padding:".2em",textAlign:"right"}}>$&nbsp;{formatFloat(r.precio)}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    </div>;
}