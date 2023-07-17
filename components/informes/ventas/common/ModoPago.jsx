import { get } from "@/src/urls"
import { Spin } from "antd"
import { useEffect, useState } from "react"

export default function ModoPagoInf(props){
    const [data, setData] = useState(null)
    useEffect(()=>{
        fetch(get.get_venta_mp + props.idventa)
        .then(response=>response.json())
        .then((response)=>{
            setData(response.data)
        })
    },[])

    const get_mp = (r)=>{
        switch(r.nombre){
            case "efectivo": return <><span>{r.nombre}: <b>{r.monto}</b></span></>
            case "tarjeta": return <><span>{r.nombre}: <b>{r.monto}</b>&nbsp;&nbsp;targeta:&nbsp;{"soon..."}</span></>
            case "ctacte": return <><span>{r.nombre}: <b>{r.monto}</b>&nbsp;&nbsp;Cant. Cuotas::&nbsp;{r.cant_cuotas}&nbsp;&nbsp;Monto Cuota:&nbsp;{r.monto_cuota}</span></>
            case "cheque": return <><span>{r.nombre}: <b>{r.monto}</b></span></>
            case "mutual": return <><span>{r.nombre}: <b>{r.monto}</b></span></>
        }
    }

    return data == null ? <Spin /> : <> 
    <table>
        <tbody style={{fontSize:".75em"}}>
            {
                data.map(r=>(
                    <>{get_mp(r)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
                ))
            }
        </tbody>
    </table>
    </>}