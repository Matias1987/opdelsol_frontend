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
        })
    },[])
    return data == null ? <Spin /> :<>
    <p>
        <span style={{fontWeight: 'bold'}}>RESPONSABLE:</span><br /> 
        Ap. y Nombre: {data.nombre_completo}&nbsp;
        Nro. Cliente: {props.id}&nbsp;&nbsp;<span style={{fontWeight: 'bold'}}>DNI:{data.dni}&nbsp;&nbsp;</span>Tel.:{data.telefono1}<br /> 
        Fecha de Nac: {data.fecha_nacimiento_f}&nbsp;&nbsp;Direcci&oacute;n:{data.direccion}<br />
        </p>
    </>
}

export default ResponsableInf;