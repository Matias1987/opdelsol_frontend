import { get } from "@/src/urls";
import { Spin } from "antd";
import { useEffect, useState } from "react";

export default function LCStockItems(props){
    
    const [data, setData] = useState(null)
    
    useEffect(()=>{
        const url = get.obtener_venta_items + props.idventa;
        fetch(url)
        .then(response=>response.json())
        .then((response)=>{
            setData(response.data)
            alert("ITEMS::: " + JSON.stringify(response))
        })
    },[])



    return data == null ? <Spin /> : <>
    <table style={{width:"100%", fontSize:".75em", padding:"0"}}>
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
                        <td style={{padding:"0",textAlign:"left"}}><b>{r.codigo}</b></td>
                        <td style={{padding:"0",textAlign:"left"}}>{r.descripcion}</td>
                        <td style={{padding:"0",textAlign:"right"}}>{r.precio}</td>
                        <td style={{padding:"0",textAlign:"right"}}>{r.cantidad}</td>
                        <td style={{padding:"0",textAlign:"right"}}>{r.total}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    </>;
}