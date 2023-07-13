import { get } from "@/src/urls"
import { Spin } from "antd"
import { useEffect, useState } from "react"

const DestinatarioInf = (props) => {
    const [data, setData] = useState(null)
    useEffect(()=>{
        fetch(get.cliente_por_id + props.id)
        .then(response=>response.json())
        .then((response)=>{
            setData(_data=>(response.data))
        })
    },[])
    return data == null ? <Spin /> :<>
        <p>
            <span style={{fontWeight: 'bold'}}>DESTINATARIO:</span><br /> 
            Ap. y Nombre: {data.nombre_completo}<br />
        </p>
    </>
}
export default DestinatarioInf;