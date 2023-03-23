import { Select } from "antd";

const { useState, useEffect } = require("react");

const [dataCliente, setDataCliente] = useState([])
const clienteUrl = ""
 
const ClienteSelect = (props) => {
    const loadClientes = () =>{
        fetch(clienteUrl)
        .then((response)=>response.json())
        .then((response)=>{setDataCliente(response.data)})
        .cath()
    }

    useEffect(()=>{
        loadClientes()
    },[])

    return (
        <>
        <Select 
            options={dataCliente}
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

export default ClienteSelect;