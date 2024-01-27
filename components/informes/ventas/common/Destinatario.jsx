import { get } from "@/src/urls"
import { Spin } from "antd"
import { useEffect, useState } from "react"

const DestinatarioInf = (props) => {

    const [data, setData] = useState(null)

    useEffect(()=>{
        if(props.id != null)
        {
            fetch(get.cliente_por_id + props.id)
            .then(response=>response.json())
            .then((response)=>{
                setData(_data=>(response.data[0]))
                props?.callback?.()
                //setLoading(false)
            })
        }
    },[])
    
    return data == null  ? <></> :<>
        <p>
            <span style={{fontWeight: 'bold'}}>DESTINATARIO:</span><br /> 
            <span style={{whiteSpace:"nowrap"}}>Ap. y Nombre: {data.nombre_completo}</span><br />
        </p>
    </>
}
export default DestinatarioInf;