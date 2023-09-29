import { get } from "@/src/urls"

const { default: Pagare } = require("@/components/informes/caja/Pagare")
const { Table } = require("antd")
const { useEffect, useState } = require("react")
/**
 * 
 * @param {*} icliente 
 */
const ListaPagares = (props) => {
    const [pagares, setPagares] = useState([])

   
    useEffect(()=>{
        const url = get.obtener_pagares_cliente+props.idcliente
        
        fetch(url)
        .then(r=>r.json())
        .then((response)=>{
            
            setPagares(response.data.map((r=>({
                idVenta: r.idventa,
                fecha: r.fecha,
                monto: r.monto,
            }))))
        })
    },[])

    return <>
        <Table
        dataSource={pagares}
        columns = {
            [
                {
                    title:"nro. venta", dataIndex: 'idVenta'
                },
                {
                    title:"fecha", dataIndex: 'fecha'
                },
                {
                    title:"monto", dataIndex: 'monto'
                },
                {
                    title:"Acciones", dataIndex: 'idVenta', 
                    render: (_,{idVenta})=><Pagare fkventa={idVenta} />
                }
            ]
        }
        />
    </>
}

export default ListaPagares;