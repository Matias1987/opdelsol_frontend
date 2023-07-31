import LayoutCaja from "@/components/layout/layout_caja"
import { Form, Input, Table } from "antd";
import { useEffect, useState } from "react";

export default function ListaCaja(){
    const [dataSource, setDataSource] = useState([])

    useEffect(()=>{

    },[])
    
    const columns = []
    
    return (<>
        <h3>Lista de caja diaria</h3>
        <Table columns={columns} dataSource={dataSource} />
    </>)
}

ListaCaja.PageLayout = LayoutCaja;