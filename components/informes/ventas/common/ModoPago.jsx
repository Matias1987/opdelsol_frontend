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
    return data == null ? <Spin /> : <></>}