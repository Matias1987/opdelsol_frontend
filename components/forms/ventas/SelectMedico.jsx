import { useState } from "react"
import MedicoForm from "./MedicoForm"
import CustomModal from "@/components/CustomModal"
import { Button, Input, Table } from "antd"
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons"

export default function SelectMedico(){
    const [idMedico, setIdMedico] = useState(-1)
    const [medicos, setMedicos] = useState([
        //these are temporary values
        {idmedico: '1', nombre: 'medico1', matricula: '00001'},
        {idmedico: '2', nombre: 'medico2', matricula: '00002'},
        {idmedico: '3', nombre: 'medico3', matricula: '00003'},
        {idmedico: '4', nombre: 'medico4', matricula: '00004'},
        {idmedico: '5', nombre: 'medico5', matricula: '00005'},
    ])
    const columns = [
        {dataIndex: "nombre", title: "Nombre"},
        {dataIndex: "matricula", title: "Matricula"},
        {dataIndex: "idmedico", title: "", render: (idmedico)=>(<><Button onClick={()=>{setIdMedico(idmedico)}}><CheckCircleOutlined /></Button></>)},
    ]
    return (idMedico==-1 ? 
        <>
        <CustomModal openButtonText="Seleccione Medico" title="" >
            Medico
            <Input.Search />
            <CustomModal openButtonText="+ Agregar" title="Agregar" >
                <MedicoForm />
            </CustomModal>
            <Table columns={columns} dataSource={medicos} />
        </CustomModal>
        </>
        :
        <>
        Medico: <b>lalalla</b> &nbsp;
        <Button danger onClick={()=>{setIdMedico(-1)}}><CloseOutlined /></Button>
        </>)
}