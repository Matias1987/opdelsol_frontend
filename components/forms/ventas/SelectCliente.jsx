import CustomModal from "@/components/CustomModal";
import { Button, Input, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { CheckCircleFilled, CloseOutlined, EditOutlined } from "@ant-design/icons";
import ClienteForm from "../ClienteForm";
import { get } from "@/src/urls";

const SelectCliente = (props) =>{
    const [idCliente, setIdCliente] = useState(-1);
    const [loadingDetalles, setLoadingDetalles] = useState(true);
    const [clientes, setClientes] = useState(null);
    const [clienteData, setClienteData] = useState(null);

    const onSearch = (value) => {
        
        const params = encodeURIComponent(value);
        //alert(value)
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

    const upload_cliente_details = (id) => {
        setLoadingDetalles(true);

        setIdCliente(_id=>{
            props?.callback?.(id)
            return id
        });
        

        fetch(get.cliente_por_id+id)
        .then(response=>response.json())
        .then((response)=>{
           
            setClienteData({
                nombre: response.data[0].nombre_completo,
               
                dni: response.data[0].dni,

                telefono1: response.data[0].telefono1,

                direccion: response.data[0].direccion,

            })

            setLoadingDetalles(false);

        })
        .catch(err=>{console.log(err)})
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


    const columns = [
        {dataIndex: 'apellido', title: 'Apellido', key: 'apellido'},
        {dataIndex: 'nombre', title: 'Nombre', key: 'nombre'},
        {dataIndex: 'dni', title: 'DNI', key: 'dni'},
        {dataIndex: 'direccion', title: 'Direccion', key: 'direccion'},
        {dataIndex: 'idcliente', title: '', key: 'acciones', render: (_,{idcliente})=>(
            <>
            <Button onClick={()=>{upload_cliente_details(idcliente)}}><CheckCircleFilled />Seleccionar</Button>
            </>
        )},
    ]
    const show_details = _ => (
        loadingDetalles ? <Spin /> :
        <>
        {typeof props.destinatario === 'undefined'? "Cliente" : "Destinatario"}: <>
            <b>{clienteData.nombre} </b> &nbsp;&nbsp; DNI: <b>{clienteData.dni}</b>&nbsp;
            Tel&eacute;fono: {clienteData.telefono1}&nbsp;
            Direcci&oacute;n: {clienteData.direccion}&nbsp;
        </>
        <Button danger onClick={()=>{
            props?.callback?.(null)
            setIdCliente(-1)
            }}><CloseOutlined /></Button>
        </>
    )

    return (
        idCliente==-1 ? 
        <>
        <CustomModal openButtonText={typeof props.destinatario !== 'undefined' ? 'Seleccionar Destinatario' : "Seleccione Cliente" } title="" >
        {typeof props.destinatario !== 'undefined' ? 'Buscar Destinatario' : "Buscar Cliente" }
            <Input.Search onSearch={onSearch} />
            <CustomModal openButtonText="+ Agregar" title="Agregar" >
                <ClienteForm callback={(id)=>{
                    //alert(id); 
                    upload_cliente_details(id) 
                    }}/>
            </CustomModal>
            <Table columns={columns} dataSource={clientes} />
        </CustomModal>
        
        </>
        : show_details() )
}

export default SelectCliente;