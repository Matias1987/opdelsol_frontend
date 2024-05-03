import { Table } from "antd";
import { useState } from "react";

const ListaPedidos = () => {
    const [pedidos, setPedidos] = useState([])
    const columns = [
        {dataIndex:"codigo",title:"Codigo"},
        {render:(_,obj)=>{
            return <></>
        }}
    ]
    return <>
        <Table />
    </>
}

export default ListaPedidos;