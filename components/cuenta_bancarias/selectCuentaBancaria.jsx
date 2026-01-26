import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Select } from "antd";
import { useEffect, useState } from "react";

const SelectCuentaBancaria = ({callback}) => {
    const [dataSource, setDataSource] = useState([])
    const load = ( ) =>{
        fetch(get.actualizar_saldo_cliente)
        .then(response => response.json())
        .then(data => {
            const options = data.map(cuenta => ({
                value: cuenta.id_cuenta_bancaria,
                label: `${cuenta.alias}`
            }));
            setDataSource(options);
        })
        .catch(error => {
            console.error("Error fetching cuenta bancaria data:", error);
        });
    }

    useEffect(()=>{load();},[])

    return <>
    <Select options={dataSource} onSelect={callback} style={{width:"300px"}} />
    </>
}

export default SelectCuentaBancaria;