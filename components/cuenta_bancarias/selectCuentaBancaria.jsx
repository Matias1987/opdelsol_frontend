import { Select } from "antd";
import { useEffect, useState } from "react";

const SelectCuentaBancaria = ({callback}) => {
    const [dataSource, setDataSource] = useState([])
    const load = ( ) =>{

    }

    useEffect(()=>{load();},[])

    return <>
    <Select options={dataSource} onSelect={callback} style={{width:"300px"}} />
    </>
}

export default SelectCuentaBancaria;