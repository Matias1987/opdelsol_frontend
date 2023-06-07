import { useState } from "react"
import MedicoForm from "./MedicoForm"
import CustomModal from "@/components/CustomModal"
import { Button, Input } from "antd"
import { EditOutlined } from "@ant-design/icons"

export default function SelectMedico(){
    const [idMedico, setIdMedico] = useState(-1)
    return (idMedico==-1 ? 
        <>
        <CustomModal openButtonText="Seleccione Medico" title="" >
            Medico
            <Input.Search />
            <CustomModal openButtonText="+" title="Agregar" >
                <MedicoForm />
            </CustomModal>
        </CustomModal>
        </>
        :
        <>
        Medico: lalalla 
        <Button><EditOutlined /></Button>
        </>)
}