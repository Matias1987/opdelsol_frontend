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
    },[])

    return typeof data === 'undefined' || data === null ? <Spin /> : (
        <>
        <span style={
            (typeof props.style !== 'undefined' ? props.style : {color:'blue'})
        }>{data[0].nombre}</span>
        </>
    )
}

export default SucursalLabel;