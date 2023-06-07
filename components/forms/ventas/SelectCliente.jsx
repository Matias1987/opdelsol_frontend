import CustomModal from "@/components/CustomModal";
import { Button, Input } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import ClienteForm from "../ClienteForm";

const SelectCliente = (props) =>{
    const [idCliente, setIdCliente] = useState(-1)
    return (
        idCliente==-1 ? 
        <>
        <CustomModal openButtonText={typeof props.destinatario !== 'undefined' ? 'Seleccionar Destinatario' : "Seleccione Cliente" } title="" >
        {typeof props.destinatario !== 'undefined' ? 'Buscar Destinatario' : "Buscar Cliente" }
            <Input.Search />
            <CustomModal openButtonText="+ Agregar" title="Agregar" >
                <ClienteForm />
            </CustomModal>
        </CustomModal>
        </>
        :
        <>
        Cliente: lalalla DNI: 00000000
        <Button><EditOutlined /></Button>
        </>
        )
}

export default SelectCliente;