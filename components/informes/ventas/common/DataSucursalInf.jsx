import { get } from "@/src/urls";
import { InstagramOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useEffect, useState } from "react";

const DataSucursalInf = ({callback, idsucursal, hideContactData}) => {
    const [data, setData] = useState(null)
    useEffect(()=>{
        fetch(get.sucursal_details + idsucursal)
        .then(response=>response.json())
        .then((response)=>{
            setData(data=>response.data[0])
            callback?.()
        })
    },[])
    return data == null ? <Spin /> : <>
    Sucursal: <span style={{fontWeight:'bolder',}}>{data.denominacion}</span>
    <br /> 
    {data.direccion} &nbsp;&nbsp;&nbsp;    <br />{data.telefono}

    { hideContactData ? <></>:
        <>
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

    </>
}

export default DataSucursalInf;