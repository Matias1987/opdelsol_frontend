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
        <CustomModal openButtonText="Seleccione Cliente" title="" >
            Cliente
            <Input.Search />
            <CustomModal openButtonText="+" title="Agregar" >
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