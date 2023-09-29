import CustomModal from "@/components/CustomModal";
import { Button, Input, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { CheckCircleFilled, CloseOutlined, EditOutlined, ReloadOutlined } from "@ant-design/icons";

import { get } from "@/src/urls";
import ClienteForm from "@/components/forms/ClienteForm";
import FichaCliente from "@/components/FichaCliente";
import LayoutCaja from "@/components/layout/layout_caja";
import DetalleCliente from "@/components/DetalleCliente";
import ClienteFormV2 from "./forms/ClienteFormV2";
import ListaPagares from "./forms/caja/ListaPagares";

export default function ListaClientes(props){
    const [clientes, setClientes] = useState(null);
    const [searchVal , setSearchVal] = useState("")

    const onSearch = (value) => {
        const params = encodeURIComponent(value);
        fetch(get.buscar_cliente+params)
        .then(response=>response.json())
        .then((response)=>{
            setClientes(
            response.data.map(r=>(
                {
                    dni: r.dni,
                    idcliente: r.idcliente,
                    apellido: r.apellido,
                    nombre: r.nombre,
                    direccion: r.direccion,
                    bloqueado: r.bloqueado,
                }
            )))
        })
        .catch((err)=>{console.log(err)})
    } 
    
    const refresh = () => {
        fetch(get.lista_clientes)
        .then(response=>response.json())
        .then((response)=>{
            setClientes(
                response.data.map(r=>(
                    {
                        dni: r.dni,
                        idcliente: r.idcliente,
                        apellido: r.apellido,
                        nombre: r.nombre,
                        direccion: r.direccion,
                        telefono1: r.telefono1,
                        bloqueado: r.bloqueado,
                    }
                ))
            )
        })
        .catch((err)=>{console.log(err)})
    }

    useEffect(()=>{
        refresh()
    },[])

    const columns = [
        {dataIndex: 'apellido', title: 'Apellido', key: 'apellido'},
        {dataIndex: 'nombre', title: 'Nombre', key: 'nombre'},
        {dataIndex: 'dni', title: 'DNI', key: 'dni'},
        {dataIndex: 'direccion', title: 'Direccion', key: 'direccion'},
        {dataIndex: 'idcliente', title: '', key: 'acciones', render: (_,{idcliente})=>(
            <>
            {
                typeof props.ficha !== 'undefined' ?
                    <CustomModal openButtonText={"Ficha Cliente"}>
                        <FichaCliente idcliente={idcliente} />
                    </CustomModal>
                :
                <></>
                
            }
            <CustomModal title="Detalle Cliente" openButtonText={"Detalle"}>
                <DetalleCliente idcliente={idcliente} />
            </CustomModal>
            <CustomModal title="Pagares" openButtonText={"Pagares"}>
                <ListaPagares idcliente={idcliente} />
            </CustomModal>
            
            </>
        )},
    ]

    return <>
    <h3>Lista de Clientes</h3>
    <Input.Search onSearch={onSearch} value={searchVal} onChange={(e)=>{setSearchVal(e.target.value)}} />
        <CustomModal openButtonText="+ Agregar" title="Agregar Cliente" >
            <ClienteFormV2 callback={(id)=>{
                //alert(id); 
                //upload_cliente_details(id) 
                refresh()
                }}/>
        </CustomModal>
        <Button size="small" danger onClick={(e)=>{setSearchVal(s=>{
            refresh()
            return ""
            })}}><ReloadOutlined />Recargar</Button>
    <Table columns={columns} dataSource={clientes} />
    </>
}

ListaClientes.PageLayout = LayoutCaja;  