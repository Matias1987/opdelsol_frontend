const { Select } = require("antd");
const { useState, useEffect } = require("react");

const SucursalSelect = (props) => {
    const [sucursalData,setSucursalData] = useState([]);
    const sucursalUrl = "";
    const loadSucursales = () => {
        fetch(sucursalUrl)
        .fetch((response)=>response.json())
        .fetch((response)=>{
            setSucursalData(response)
        })
    }

    useEffect(()=>{
        loadSucursales()
    },[])

    return (
        <>
        <Select 
            options={sucursalData}
            style={{width:240}}
            onChange={
                (value)=>{
                    props.callback(value)
                }
            }
        />
        </>
    )

}

export default SucursalSelect;