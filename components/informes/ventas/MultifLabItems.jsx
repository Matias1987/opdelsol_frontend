import { formatFloat } from "@/src/helpers/formatters";
import { currency_format } from "@/src/helpers/string_helper";
import { get } from "@/src/urls";
import { Spin } from "antd";
import { useEffect, useState } from "react";

export default function MultifLabItems(props){
    
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
    <table style={{width:"100%", fontSize:".95em", padding:"0", marginLeft:"auto", marginRight:"auto"}}>
        <thead>
            <tr>
                <th></th>
                <th style={{fontSize:".7em", padding:"0", textAlign:"center"}}>Esf.</th>
                <th style={{fontSize:".7em", padding:"0", textAlign:"center"}}>Cil.</th>
                <th style={{fontSize:".7em", padding:"0", textAlign:"center"}}>Eje</th>
                <th style={{fontSize:".7em", padding:"0", textAlign:"center"}}>C&oacute;digo</th>
                {/*<th style={{padding:"0", textAlign:"left"}}>Descripci&oacute;n</th>
                <th style={{fontSize:".7em", padding:"0", textAlign:"left"}}>Descripci&oacute;n</th>*/}
                <th style={{fontSize:".7em", padding:"0", textAlign:"right"}}>Precio</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map(r=>(
                    <tr >
                        <td style={{borderBottom:"1px dotted"}} >{((r.tipo||"").toUpperCase()).replace(/_/g," ")}</td>
                        {r.tipo.includes("armazon") ? <></> :
                            <>
                                <td style={{ borderBottom:"1px dotted", paddingLeft:"8px", fontSize:".8em", padding:"0",textAlign:"center"}}>{(parseFloat(+r.esf||0)>0 ? "":"") + r.esf}</td>
                                <td style={{ borderBottom:"1px dotted", paddingLeft:"8px", fontSize:".8em", padding:"0",textAlign:"center"}}>{r.cil}</td>
                                <td style={{ borderBottom:"1px dotted", paddingLeft:"8px", fontSize:".8em", padding:"0",textAlign:"center"}}>{r.eje}</td>
                            </>
                        }

                        <td colSpan={r.tipo.includes("armazon") ? "4" : "1"} style={{fontSize:".9em", borderBottom:"1px dotted", paddingLeft:"8px",textAlign:"left"}}><b>{r.codigo}</b>{!r.tipo.includes("armazon") ? <></> : <>&nbsp; <span style={{fontSize:".8em", fontStyle:"italic"}}>{r.descripcion}</span></>}</td>
                        
                        {/*<td style={{padding:"0",textAlign:"left"}}>{r.descripcion}</td>
                        <td style={{borderBottom:"1px dotted", padding:"0",textAlign:"left", fontSize:".7em"}}><i>{r.descripcion}</i></td>*/}
                        <td style={{ borderBottom:"1px dotted", padding:"0",textAlign:"right"}}>$&nbsp;{formatFloat(r.precio)}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    </>;
}