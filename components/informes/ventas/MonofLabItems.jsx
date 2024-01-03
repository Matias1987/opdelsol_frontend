import { currency_format } from "@/src/helpers/string_helper";
import { get } from "@/src/urls";
import { Spin } from "antd";
import { useEffect, useState } from "react";

export default function MonofLabItems(props){
    
    const [data, setData] = useState(null)
    
    useEffect(()=>{
        const url = get.obtener_venta_items + props.idventa;
        fetch(url)
        .then(response=>response.json())
        .then((response)=>{
            setData(response.data)
            //alert("ITEMS::: " + JSON.stringify(response))
        })
    },[])



    return data == null ? <Spin /> : <>
    <table style={{width:"100%", fontSize:".75em", padding:"0"}}>
        <thead>
            <tr>
                <th></th>
                <th style={{padding:"0", textAlign:"center"}}>Esf.</th>
                <th style={{padding:"0", textAlign:"center"}}>Cil.</th>
                <th style={{padding:"0", textAlign:"center"}}>Eje</th>
                <th style={{padding:"0", textAlign:"left"}}>C&oacute;digo</th>
                {/*<th style={{padding:"0", textAlign:"left"}}>Descripci&oacute;n</th>*/}
                
                <th style={{padding:"0", textAlign:"right"}}>Precio</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map(r=>(
                    <tr >
                        <td>{r.tipo}</td>
                        <td style={{padding:"0",textAlign:"center"}}>{(parseFloat(+r.esf||0)>0 ? "":"") + r.esf}</td>
                        <td style={{padding:"0",textAlign:"center"}}>{r.cil}</td>
                        <td style={{padding:"0",textAlign:"center"}}>{r.eje}</td>
                        <td style={{padding:"0",textAlign:"left"}}><b>{r.codigo}</b></td>
                        
                        {/*<td style={{padding:"0",textAlign:"left"}}>{r.descripcion}</td>*/}
                        
                        <td style={{padding:"0",textAlign:"right"}}>{currency_format(r.precio)}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    </>;
}