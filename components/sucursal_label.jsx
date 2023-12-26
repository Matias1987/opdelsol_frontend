const { get } = require("@/src/urls")
const { Spin } = require("antd")
const { useEffect, useState } = require("react")

const SucursalLabel = (props) => {
    const [data,setData] = useState(null)
    useEffect(()=>{
        //get details
        fetch(get.sucursal_details + props.idsucursal)
        .then(response=>response.json())
        .then((response)=>{
            setData(response.data)
        })
        .catch(e=>{console.log("error")})
    },[])

    return data === null ? <></> : (
        <>
        <span style={ {color:'white'}} >{data[0].nombre}</span>
        </>
    )
}

export default SucursalLabel;