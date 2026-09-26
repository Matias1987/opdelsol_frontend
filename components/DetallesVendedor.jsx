import { get } from "@/src/urls"
import { useState } from "react"


const DetallesVendedor = (props) => {
    const [data, setData] = useState(null)
    useState(()=>{
        fetch(get.detalle_usuario + props.idusuario)
        .then(response=>response.json())
        .then((response)=>{
            setData(
                response.data
            )
        })
    })
    return data == null ? <></>:
    <>
        {data.nombre}    
    </>
}

export default DetallesVendedor;