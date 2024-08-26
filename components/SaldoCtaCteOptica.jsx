import globals from "@/src/globals";
import { get } from "@/src/urls";
import { useEffect, useState } from "react";

const SaldoCtaCteOptica = (props) =>
{
    const [balance, setBalance] = useState(null)
    const [optica, setOptica] = useState(null)
    if(typeof props.idcliente === 'undefined')
    {
        alert("error")
        return
    }
    useEffect(()=>{
        //alert(get.saldo_ctacte + props.idcliente)
        //fetch(get.saldo_ctacte + props.idcliente)
        fetch(get.saldo_ctacte_optica + `${props.idcliente}/${globals.obtenerOptica()}`)
        .then(response=>response.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            const _debe = response.data.debe == null ? 0 : response.data.debe;
            const _haber = response.data.haber == null ? 0 : response.data.haber;
            setBalance({
                debe: _debe,
                haber: _haber,
                saldo: parseFloat(response.data[0].debe||"0") - parseFloat(response.data[0].haber||"0")
            })
        })

        fetch(get.obtener_optica + globals.obtenerOptica())
        .then(r=>r.json())
        .then(r=>{
            //alert(JSON.stringify(r))
            if((r||null) == null || (r?.data||null) == null)
            {
                return
            }
            if(r.data.length<1)
            {
                return
            }
            setOptica({nombre: r.data[0].nombre||""})
        })
    },[])

    const detalle_optica  = _ =>optica==null ? <></> : <span style={{fontWeight:"bold"}}>{optica.nombre}</span>

    return balance == null ? <></> : <>
        Saldo {detalle_optica()}: ${parseFloat(balance.saldo).toFixed(2)}
    </>
}

export default SaldoCtaCteOptica;