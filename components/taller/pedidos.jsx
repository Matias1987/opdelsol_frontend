import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Table } from "antd";
import { useEffect, useState } from "react";

const ListaPedidos = () => {
    const [pedidos, setPedidos] = useState([])


    const columns = [
        {dataIndex:"idventa",title:"Nro."},
        {dataIndex:"cliente",title:"Cliente"},
        {dataIndex:"usuario",title:"Usuario"},
        {dataIndex:"fecha_retiro",title:"Fecha Retiro"},
        {render:(_,obj)=>{
            return <></>
        }}
    ]


    useEffect(()=>{
        post_method(post.obtener_ventas_taller,{estado:"PEDIDO"},(response)=>{
            setPedidos(response.data.map(r=>({
                idventa: r.idventa,
                cliente: r.cliente,
                usuario: r.usuario,
                fecha_retiro: fecha_retiro_f,

            })))
        })
    },[])

    return <>
        <Table columns={columns} dataSource={pedidos} />
    </>
}

export default ListaPedidos;