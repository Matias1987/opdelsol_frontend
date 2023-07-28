import CustomModal from "@/components/CustomModal";
import { Button, Input, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { CheckCircleFilled, CloseOutlined, EditOutlined } from "@ant-design/icons";
import ClienteForm from "../ClienteForm";
import { get } from "@/src/urls";

const FiltroCliente = (props) => {
    const [clientes, setClientes] = useState(null);
    
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
                }
            )))
        })
        .catch((err)=>{console.log(err)})
    } 
    
    useEffect(()=>{
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
                    }
                ))
            )
        })
        .catch((err)=>{console.log(err)})
    },[])

    return <>
    <Input.Search onSearch={onSearch} />
        <CustomModal openButtonText="+ Agregar" title="Agregar" >
            <ClienteForm callback={(id)=>{alert(id); upload_cliente_details(id) }}/>
        </CustomModal>
    <Table columns={columns} dataSource={clientes} />
    </>
}

export default FiltroCliente;