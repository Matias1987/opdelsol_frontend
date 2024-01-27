import { useEffect, useState } from "react"
import MedicoForm from "./MedicoForm"
import CustomModal from "@/components/CustomModal"
import { Button, Input, Spin, Table } from "antd"
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons"
import { get } from "@/src/urls"

export default function SelectMedico(props){
    const [idMedico, setIdMedico] = useState(-1)
    const [medicos, setMedicos] = useState([])
    const [dataMedico, setDataMedico] = useState(null)

    useEffect(()=>{
        const url = get.lista_medicos;
        fetch(url)
        .then(response=>response.json())
        .then((response)=>{
            setMedicos(
                response.data.map(
                    r=>(
                        {
                            nombre: r.nombre,
                            matricula: r.matricula, 
                            idmedico: r.idmedico,
                        }
                    )
                )
            )
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const onSearch = (value) => {
        const url = get.buscar_medico;
        const _value = encodeURIComponent(value)
        fetch(url + _value)
        .then(response => response.json())
        .then((response)=>{
            setMedicos(
                response.data.map(
                    r=>(
                        {
                            nombre: r.nombre,
                            matricula: r.matricula, 
                            idmedico: r.idmedico,
                        }
                    )
                )
            )
        })
        .catch((err)=>{console.log(err)})
    }

    const onMedicoSelected = (id) => {
        //load details
        setIdMedico(id)
        fetch(get.obtener_medico + id)
        .then(response=>response.json())
        .then((response)=>{
            setDataMedico({
                nombre: response.data[0].nombre,
                idmedico: response.data[0].idmedico,
                matricula: response.data[0].matricula
            })
            props?.callback?.(id)
        })
    }

    const show_details = () => (
        dataMedico === null ? <Spin /> : <>
            Medico: <b>{dataMedico.nombre}</b> - <b>{dataMedico.matricula}</b> &nbsp;
            <Button danger onClick={()=>{setIdMedico(-1); setDataMedico(null); props?.callback?.(null);}}><CloseOutlined /></Button>
        </>
    )

    const columns = [
        {dataIndex: "nombre", title: "Nombre"},
        {dataIndex: "matricula", title: "Matricula"},
        {dataIndex: "idmedico", title: "", render: (_,{idmedico})=>(<><Button onClick={()=>{onMedicoSelected(idmedico)}}><CheckCircleOutlined /></Button></>)},
    ]
    return (idMedico==-1 ? 
        <>
        <CustomModal openButtonText={ typeof props.openButtonText === 'undefined' ? "Seleccione Medico" : props.openButtonText} title="" >
            Medico
            <Input.Search onSearch={onSearch} />
            {/*<CustomModal openButtonText="+ Agregar" title="Agregar" >
                <MedicoForm callback={(id)=>{onMedicoSelected(id)}} />
            </CustomModal>*/}
            <Table 
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
            columns={columns} 
            dataSource={medicos} />
        </CustomModal>
        </>
        :
        show_details())
}