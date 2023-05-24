import { get } from "@/src/urls";
import { Table } from "antd";
import { useEffect, useState } from "react";

export default function ListaDesperfectos(props){
    const [tableData,setTableData] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        setLoading(true)
        fetch(get.obtener_lista_baja_desperfectos)
        .then(response=>response.json())
        .then((response)=>{
            //parse
            setTableData(
                response.data.map(r=>(
                    {
                        fecha: r.fecha,
                        cantidad: r.cantidad,
                        comentarios: r.comentarios,
                        usuario: r.usuario,
                        sucursal: r.sucursal,
                        codigo: r.codigo,
                    }
                ))
            )
            setLoading(false)
        })
    },[])
    return (
    <>
        <h1>Lista De Desperfectos</h1>
        <Table 
            loading={loading}

            columns={
                [
                    {title: 'Fecha', dataIndex: 'fecha',},
                    {title: 'Código', dataIndex: 'codigo',},
                    {title: 'Cantidad', dataIndex: 'cantidad',},
                    {title: 'Comentarios', dataIndex: 'comentarios',},
                    {title: 'Usuario', dataIndex: 'usuario',},
                    {title: 'Sucursal', dataIndex: 'sucursal',},
                    
                ]
            }
            dataSource={tableData}
        />
    </>
    )
}