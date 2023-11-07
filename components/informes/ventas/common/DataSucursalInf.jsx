import { get } from "@/src/urls";
import { Spin } from "antd";
import { useEffect, useState } from "react";

const DataSucursalInf = (props) => {
    const [data, setData] = useState(null)
    useEffect(()=>{
        fetch(get.sucursal_details + props.idsucursal)
        .then(response=>response.json())
        .then((response)=>{
            setData(data=>response.data[0])
        })
    },[])
    return data == null ? <Spin /> : <>
    Sucursal: <span style={{fontWeight:'bold',}}>{data.denominacion}</span>
    <br /> 
    {data.direccion}<br /> 
    {data.telefono}<br /> 
    </>
}

export default DataSucursalInf;