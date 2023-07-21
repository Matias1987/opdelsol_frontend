import { get } from "@/src/urls"
import { useEffect, useState } from "react"

export default function FichaCliente(){
    const [operaciones, setOperaciones] = useState([])
    const [dataCliente, setDataCliente] = useState(null)

    const columns = [
        {dataIndex: 'id',  title: 'Nro.'},
        {dataIndex: 'fecha',  title: 'Fecha'},
        {dataIndex: 'tipo',  title: 'Tipo'},
        {dataIndex: 'detalle',  title: 'Detalle'},
        {dataIndex: 'debe',  title: 'Debe'},
        {dataIndex: 'haber',  title: 'Haber'},
    ]

    const detalles_cliente =_ => dataCliente === null ? <Spin /> : <>
        <p>Nombre: {dataCliente.nombre} &nbsp;&nbsp;&nbsp;&nbsp; DNI: {dataCliente.dni}</p>
        <p>Tel.: {dataCliente.telefono} &nbsp;&nbsp;&nbsp;&nbsp; Dir.: {dataCliente.domicilio}</p>
    </>

    useEffect(()=>{

        //detalles
        fetch(get.cliente_por_id)
        .then(response=>response.json())
        .then((response)=>{
            setDataCliente(response.data)
        })
        //operaciones
        fetch(get.operaciones_cliente)
        .then(response=>response.json())
        .then((response)=>{
            setOperaciones(response.data)
        })
    },[])

    return (<>
    {detalles_cliente()}
    <Table columns={columns} dataSource={operaciones} />
    
    </>)
}