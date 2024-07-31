const { get } = require("@/src/urls")
const { Spin } = require("antd")
const { useEffect, useState } = require("react")

const SucursalLabel = (props) => {
    const [data,setData] = useState(null)
    
    useEffect(()=>{
        if(props.idsucursal<0)
        {
            return;
        }
        //get details
        fetch(
            get.sucursal_details  + props.idsucursal
        )
        .then(response=>response.json())
        .then((response)=>{
            
            if((response.data||null)==null)
            {
                setData(null)
                return
            }
            if(typeof response.data.length === 'undefined')
            {
                setData(null)
                return
            }
            if(response.data.length <1)
            {
                setData(null)
                return
            }

            setData(response.data)
        })
        .catch(e=>{console.log("error")})
    },[])

    return data == null  ? <></> : (
        <>
        <span style={ {color:'white'}} >{data[0].nombre}</span>
        </>
    )
}

export default SucursalLabel;