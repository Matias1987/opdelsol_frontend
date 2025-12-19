import Pagare from "@/components/informes/caja/Pagare"
import { formatFloat } from "@/src/helpers/formatters"
import { get } from "@/src/urls"
import { Table } from "antd"
import { useEffect, useState } from "react"


/**
 * 
 * @param {*} icliente 
 */
const ListaPagares = (props) => {
    const [pagares, setPagares] = useState([])
    const [loading, setLoading] = useState(false)
   
    useEffect(()=>{
        const url = get.obtener_pagares_cliente+props.idcliente
        setLoading(true)
        fetch(url)
        .then(r=>r.json())
        .then((response)=>{
            
            setPagares(response.data.map((r=>({
                idVenta: r.idventa,
                fecha: r.fecha,
                monto: r.monto,
            }))))
            setLoading(false)
        })
    },[])

    return <>
        <Table
        loading={loading}
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
                    title:"monto", dataIndex: 'monto', render:(_,{monto})=><>$&nbsp;{formatFloat(monto)}</>
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