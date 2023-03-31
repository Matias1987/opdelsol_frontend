const { Select } = require("antd");
const { useState, useEffect } = require("react");

const SucursalSelect = (props) => {
    const [sucursalData,setSucursalData] = useState([]);
    const sucursalUrl = "";
    const loadSucursales = () => {
        fetch(sucursalUrl)
        .then((response)=>response.json())
        .then((response)=>{
            setSucursalData(response)
        })
        .catch((error)=>{console.error(error)})
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