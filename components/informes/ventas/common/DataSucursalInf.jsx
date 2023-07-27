import { get } from "@/src/urls";
import { Spin } from "antd";
import { useEffect, useState } from "react";

const DataSucursalInf = (props) => {
    //alert("id sucursal: " + JSON.stringify(props))
    const [data, setData] = useState(null)
    useEffect(()=>{
        fetch(get.sucursal_details + props.idsucursal)
        .then(response=>response.json())
        .then((response)=>{
            //alert("data sucursal: " + JSON.stringify(response))
            setData(data=>response.data[0])
        })
    },[])
    return data == null ? <Spin /> : <>
    <u><span style={{fontWeight:'bold',}}>{data.denominacion}</span></u>
    <br /> 
    {data.direccion}<br /> 
    {data.telefono}<br /> 
    </>
}

export default DataSucursalInf;