import { currency_format } from "@/src/helpers/string_helper"
import { get } from "@/src/urls"
import { Spin } from "antd"
import { useEffect, useState } from "react"

export default function ModoPagoInf(props){
    const [data, setData] = useState(null)
    useEffect(()=>{
        //alert(get.get_venta_mp + props.idventa)
        fetch(get.get_venta_mp + props.idventa)
        .then(response=>response.json())
        .then((response)=>{
            setData(response.data)
            props?.callback?.()
            //alert(JSON.stringify(response))
        })
    },[])

    const get_mp = (r)=>{
        switch(r.modo_pago){
            case "efectivo": return <tr><td><span>{r.modo_pago}: <b>${currency_format(r.monto)}</b></span><hr /></td></tr>
            case "tarjeta": return  <tr><td><span>{r.modo_pago}: <b>${currency_format(r.monto)}</b>&nbsp;&nbsp;tarjeta:&nbsp;{ r.nombre_tarjeta}</span><hr /></td></tr>
            case "ctacte": return   <tr><td><span>{r.modo_pago}: <b>${currency_format(r.monto)}</b>&nbsp;&nbsp;Cant. Cuotas:&nbsp;{r.cant_cuotas}&nbsp;&nbsp;Monto Cuota:&nbsp;${r.monto_cuota}</span><hr /></td></tr>
            case "cheque": return   <tr><td><span>{r.modo_pago}: <b>${currency_format(r.monto)}</b>&nbsp;&nbsp;Banco: &nbsp;{r.nombre_banco}</span><hr /></td></tr>
            case "mutual": return   <tr><td><span>{r.modo_pago}: <b>${currency_format(r.monto)}</b></span><hr /></td></tr>
            case "mercadopago": return   <tr><td><span>{"Mercado Pago"}: <b>${currency_format(r.monto)}</b></span><hr /></td></tr>
            case "transferencia": return   <tr><td><span>{"Transferencia"}: <b>${currency_format(r.monto)}</b>&nbsp;&nbsp;Banco: &nbsp;{r.nombre_banco}</span><hr /></td></tr>
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