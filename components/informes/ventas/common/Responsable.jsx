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
        <span style={{whiteSpace:"nowrap"}}>Ap. y Nombre: <span style={{fontWeight:"bolder"}}>{data.nombre_completo}</span>&nbsp;</span><br />
        <span style={{whiteSpace:"nowrap"}}>Nro. Cliente: <span style={{fontWeight:"bolder"}}>{props.id}</span>&nbsp;&nbsp;DNI:<span style={{fontWeight: 'bolder'}}>{data.dni}&nbsp;&nbsp;</span>Tel.:<span style={{fontWeight: 'bolder'}}>{data.telefono1}</span></span><br /> 
        <span style={{whiteSpace:"nowrap"}}>Fecha de Nac: <span style={{fontWeight:"bolder"}}>{data.fecha_nacimiento_f}</span></span><br />
        <span style={{whiteSpace:"nowrap"}}>Domicilio: <span style={{fontWeight:"bolder"}}>{data.direccion  + " - " + data.localidad}</span></span>
        </p>
    </>
}

export default ResponsableInf;