import { currency_format } from "@/src/helpers/string_helper";
import { get } from "@/src/urls";
import { Spin } from "antd";
import { useEffect, useState } from "react";

export default function LCLabItems(props){
    
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
    <table style={{width:"95%", fontSize:".95em", padding:"0", marginLeft:"auto", marginRight:"auto"}}>
        <thead>
            <tr>
                <th></th>
                <th style={{padding:"0", textAlign:"left"}}>C&oacute;digo</th>
                {/*<th style={{padding:"0", textAlign:"left"}}>Descripci&oacute;n</th>*/}

                <th style={{padding:"0", textAlign:"right"}}>Precio</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map(r=>(
                    <tr >
                        <td style={{borderBottom:"1px dotted"}}><i><b>{((r.tipo||"").toUpperCase()).replace(/_/g," ")}</b></i>&nbsp;&nbsp;</td>
                        {/*<td style={{padding:"0",textAlign:"left"}}><b>{r.codigo}</b></td>*/}
                        <td style={{padding:"0",textAlign:"left", borderBottom:"1px dotted"}}>{r.tipo=='od' || r.tipo=='oi' ? <>
                        <b>{r.codigo}</b>&nbsp;&nbsp;&nbsp;ESF:&nbsp;{r.esf} &nbsp;&nbsp;CIL:&nbsp;{r.cil} &nbsp;&nbsp;EJE:&nbsp;{r.eje} &nbsp;&nbsp;CB:&nbsp;{r.curva_base} &nbsp;&nbsp;DIAM:&nbsp;{r.diametro} 
                        </> : <>{r.codigo}</> }</td>
                        <td style={{padding:"0",textAlign:"right", borderBottom:"1px dotted"}}>{currency_format(r.precio)}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    </>;
}