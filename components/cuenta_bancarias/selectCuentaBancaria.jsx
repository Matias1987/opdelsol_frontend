import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Select } from "antd";
import { useEffect, useState } from "react";

const SelectCuentaBancaria = ({callback}) => {
    const [dataSource, setDataSource] = useState([])
    const load = ( ) =>{
        fetch(get.obtener_cuenta_bancarias)
        .then(response => response.json())
        .then(response => {
            const options = response.data.map(cuenta => ({
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
    <Select prefix="Cuenta:" options={dataSource} onSelect={callback} style={{width:"300px"}} placeholder="Seleccionar Cuenta" />
    </>
}

export default SelectCuentaBancaria;