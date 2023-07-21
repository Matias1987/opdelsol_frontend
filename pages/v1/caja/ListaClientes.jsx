import { post_method } from "@/src/helpers/post_helper"
import { useEffect, useState } from "react"

export default function ListaClientes(){
    const [clientes, setClientes] = useState([])
    const [filtros, setFiltros] = useState({})
    const url = ""

    useEffect(()=>{

        post_method(url, filtros,(response)=>{
            setClientes(response.data)
        })
    },[])

    const columns = [
        {dataIndex: "idcliente", title: "ID", hidden: false},
        {dataIndex: "nombre", title: "Nombre", hidden: false},
        {dataIndex: "dni", title: "DNI", hidden: false},
        {dataIndex: "telefono", title: "Telefono", hidden: false},
        {dataIndex: "idcliente", title: "", hidden: false, render: (_,{idcliente})=>{
            return <>
                <Button>Editar</Button>
                <Button>Ficha</Button>
            </>
        }},

    ]
    

    return (<>
        <h3>Lista de Clientes</h3>
        <Table columns={columns.filter(c=>!c.hidden)} dataSource={clientes} ></Table>
    </>
)}