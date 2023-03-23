import { Select } from "antd";

const { useState, useEffect } = require("react");

const ProveedorSelect = (props) => {

    const [dataProveedor, setDataProveedor] = useState([])
    const proveedorUrl = ""

    const loadProveedores = () => {
        fetch(proveedorUrl)
        .then((response)=>response.json())
        .then((response)=>{
            setDataProveedor(response.data)
        })
    }

    useEffect(()=>{
        loadProveedores()
    },[])

    return (
    <>
        <Select 
        options={dataProveedor}
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

export default ProveedorSelect;