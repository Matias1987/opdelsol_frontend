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
        alert(get.saldo_ctacte + props.idcliente)
        fetch(get.saldo_ctacte + props.idcliente)
        .then(response=>response.json())
        .then((response)=>{
            alert(JSON.stringify(response))
            setBalance({
                debe: response.data.debe,
                haber: response.data.haber,
                saldo: parseFloat(response.data.debe) - parseFloat(response.data.haber)
            })
        })
    },[])
    return balance == null ? <></> : <>
        Saldo: {balance.saldo}
    </>
}

export default SaldoCtaCte;