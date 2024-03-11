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
        <span style={{fontWeight: 'bold'}}>RESPONSABLE:</span><br /> 
        <span style={{whiteSpace:"nowrap"}}>Ap. y Nombre: {data.nombre_completo}&nbsp;</span><br />
        <span style={{whiteSpace:"nowrap"}}>Nro. Cliente: {props.id}&nbsp;&nbsp;<span style={{fontWeight: 'bold'}}>DNI:{data.dni}&nbsp;&nbsp;</span>Tel.:{data.telefono1}</span><br /> 
        <span style={{whiteSpace:"nowrap"}}>Fecha de Nac: {data.fecha_nacimiento_f}&nbsp;&nbsp;Direcci&oacute;n:&nbsp;{data.direccion}</span><br />
        <span style={{whiteSpace:"nowrap"}}>Domicilio: {data.direccion  + " - " + data.localidad}</span>
        </p>
    </>
}

export default ResponsableInf;