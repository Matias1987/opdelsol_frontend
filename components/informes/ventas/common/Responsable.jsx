import { get } from "@/src/urls"
import { Spin } from "antd"
import { useEffect, useState } from "react"

const ResponsableInf = (props) => {
    const [data, setData] = useState(null)
    useEffect(()=>{
        fetch(get.cliente_por_id + props.id)
        .then(response=>response.json())
        .then((response)=>{
            setData(data=>response.data[0])
            props?.callback?.()
        })
    },[])
    return data == null ? <Spin /> :<>
    <p>
        <span style={{fontWeight: 'bold', fontSize:".80em"}}>RESPONSABLE:</span><br /> 
        <span style={{whiteSpace:"nowrap"}}>Ap. y Nombre: <b>{data.nombre_completo}</b>&nbsp;</span><br />
        <span style={{whiteSpace:"nowrap"}}>Nro. Cliente: <b>{props.id}</b>&nbsp;&nbsp;DNI:<span style={{fontWeight: 'bold'}}><b>{data.dni}</b>&nbsp;&nbsp;</span>Tel.:<b>{data.telefono1}</b></span><br /> 
        <span style={{whiteSpace:"nowrap"}}>Fecha de Nac: <b>{data.fecha_nacimiento_f}</b></span><br />
        <span style={{whiteSpace:"nowrap"}}>Domicilio: <b>{data.direccion  + " - " + data.localidad}</b></span>
        </p>
    </>
}

export default ResponsableInf;