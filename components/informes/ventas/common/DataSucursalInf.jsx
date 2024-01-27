import { get } from "@/src/urls";
import { InstagramFilled, InstagramOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useEffect, useState } from "react";

const DataSucursalInf = (props) => {
    const [data, setData] = useState(null)
    useEffect(()=>{
        fetch(get.sucursal_details + props.idsucursal)
        .then(response=>response.json())
        .then((response)=>{
            setData(data=>response.data[0])
            props?.callback?.()
        })
    },[])
    return data == null ? <Spin /> : <>
    Sucursal: <span style={{fontWeight:'bold',}}>{data.denominacion}</span>
    <br /> 

    {data.direccion} &nbsp;&nbsp;&nbsp;    {data.telefono}
    <br />
    <div style={{whiteSpace: "nowrap", fontSize:".9em"}}>
    {
        data.whatsapp!=null ? <><WhatsAppOutlined /> {data.whatsapp}</>:<></>
    }
    &nbsp;
    {
        data.instagram!=null ? <><InstagramOutlined />{data.instagram}</>:<></>
    }
    </div>
    </>
}

export default DataSucursalInf;