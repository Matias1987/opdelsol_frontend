const { get } = require("@/src/urls")
const { useState } = require("react")

const DetallesVendedor = (props) => {
    const [data, setData] = useState(null)
    useState(()=>{
        //alert(get.detalle_usuario + props.idusuario)
        fetch(get.detalle_usuario + props.idusuario)
        .then(response=>response.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
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