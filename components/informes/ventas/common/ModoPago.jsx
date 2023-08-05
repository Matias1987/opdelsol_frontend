import { get } from "@/src/urls"
import { Spin } from "antd"
import { useEffect, useState } from "react"

export default function ModoPagoInf(props){
    const [data, setData] = useState(null)
    useEffect(()=>{
        alert(get.get_venta_mp + props.idventa)
        fetch(get.get_venta_mp + props.idventa)
        .then(response=>response.json())
        .then((response)=>{
            setData(response.data)
        })
    },[])

    const get_mp = (r)=>{
        switch(r.modo_pago){
            case "efectivo": return <tr><td><span>{r.modo_pago}: <b>{r.monto}</b></span><hr /></td></tr>
            case "tarjeta": return  <tr><td><span>{r.modo_pago}: <b>{r.monto}</b>&nbsp;&nbsp;targeta:&nbsp;{"soon..."}</span><hr /></td></tr>
            case "ctacte": return   <tr><td><span>{r.modo_pago}: <b>{r.monto}</b>&nbsp;&nbsp;Cant. Cuotas::&nbsp;{r.cant_cuotas}&nbsp;&nbsp;Monto Cuota:&nbsp;{r.monto_cuota}</span><hr /></td></tr>
            case "cheque": return   <tr><td><span>{r.modo_pago}: <b>{r.monto}</b></span><hr /></td></tr>
            case "mutual": return   <tr><td><span>{r.modo_pago}: <b>{r.monto}</b></span><hr /></td></tr>
        }
    }

    return data == null ? <Spin /> : <> 
    Modo de Pago
    <table>
        <tbody style={{fontSize:".75em"}}>
            {
                data.map(r=>(
                    get_mp(r)
                ))
            }
        </tbody>
    </table>
    </>}