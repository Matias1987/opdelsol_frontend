import { get } from "@/src/urls";
import { useEffect, useState } from "react";

const SaldoCtaCte = (props) =>
{
    const [balance, setBalance] = useState(null)
    if(typeof props.idcliente === 'undefined')
    {
        alert("error")
        return
    }
    useEffect(()=>{
        //alert(get.saldo_ctacte + props.idcliente)
        fetch(get.saldo_ctacte + props.idcliente)
        .then(response=>response.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            const _debe = response.data.debe == null ? 0 : response.data.debe;
            const _haber = response.data.haber == null ? 0 : response.data.haber;
            setBalance({
                debe: response.data.debe,
                haber: response.data.haber,
                saldo: parseFloat(response.data[0].debe||0) - parseFloat(response.data[0].haber||0)
            })
        })
    },[])
    return balance == null ? <></> : <>
        Saldo (General): ${parseFloat(balance.saldo).toFixed(2)}
    </>
}

export default SaldoCtaCte;