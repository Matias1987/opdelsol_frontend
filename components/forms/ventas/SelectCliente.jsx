import CustomModal from "@/components/CustomModal";
import { Button, Input, Table } from "antd";
import { useState } from "react";
import { CheckCircleFilled, CloseOutlined, EditOutlined } from "@ant-design/icons";
import ClienteForm from "../ClienteForm";

const SelectCliente = (props) =>{
    const [idCliente, setIdCliente] = useState(-1);
    const [cliente, setCliente] = useState(null);
    
    const [clientes, setClientes] = useState([
        //these are temporary values
        {idcliente: '1', apellido: 'cliente1', nombre: 'cliente1_nombre', dni: '0000001', direccion: 'somedir'},
        {idcliente: '2', apellido: 'cliente2', nombre: 'cliente2_nombre', dni: '0000002', direccion: 'somedir'},
        {idcliente: '3', apellido: 'cliente3', nombre: 'cliente3_nombre', dni: '0000003', direccion: 'somedir'},
        {idcliente: '4', apellido: 'cliente4', nombre: 'cliente4_nombre', dni: '0000004', direccion: 'somedir'},
        {idcliente: '5', apellido: 'cliente5', nombre: 'cliente5_nombre', dni: '0000005', direccion: 'somedir'},
        {idcliente: '6', apellido: 'cliente6', nombre: 'cliente6_nombre', dni: '0000006', direccion: 'somedir'},
    ])

    const columns = [
        {dataIndex: 'apellido', title: 'Apellido', key: 'apellido'},
        {dataIndex: 'nombre', title: 'Nombre', key: 'nombre'},
        {dataIndex: 'dni', title: 'DNI', key: 'dni'},
        {dataIndex: 'direccion', title: 'Direccion', key: 'direccion'},
        {dataIndex: 'idcliente', title: '', key: 'acciones', render: (idcliente)=>(
            <>
            <Button onClick={()=>{setIdCliente(idcliente); props.callback(idcliente)}}><CheckCircleFilled />Seleccionar</Button>
            </>
        )},
    ]
    return (
        idCliente==-1 ? 
        <>
        <CustomModal openButtonText={typeof props.destinatario !== 'undefined' ? 'Seleccionar Destinatario' : "Seleccione Cliente" } title="" >
        {typeof props.destinatario !== 'undefined' ? 'Buscar Destinatario' : "Buscar Cliente" }
            <Input.Search />
            <CustomModal openButtonText="+ Agregar" title="Agregar" >
                <ClienteForm />
            </CustomModal>
            <Table columns={columns} dataSource={clientes} />
        </CustomModal>
        
        </>
        :
        <>
        {typeof props.destinatario === 'undefined'? "Cliente" : "Destinatario"}: <b>lalalla </b> &nbsp;&nbsp; DNI: <b>00000000</b>&nbsp;
        <Button danger onClick={()=>{setIdCliente(-1)}}><CloseOutlined /></Button>
        </>
        )
}

export default SelectCliente;