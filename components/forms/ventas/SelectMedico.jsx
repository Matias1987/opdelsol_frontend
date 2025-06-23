import { useEffect, useState } from "react"
import MedicoForm from "./MedicoForm"
import CustomModal from "@/components/CustomModal"
import { Button, Input, Spin, Table, Modal } from "antd"
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import { get } from "@/src/urls"

export default function SelectMedico(props){
    const [idMedico, setIdMedico] = useState(-1)
    const [medicos, setMedicos] = useState([])
    const [dataMedico, setDataMedico] = useState(null)
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [popupAddOpen, setPopupAddOpen] = useState(false)
    useEffect(()=>{
        setLoading(true)
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
            setLoading(false)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[reload])

    const onSearch = (value) => {
        const url = get.buscar_medico;
        const _value = encodeURIComponent(value)
        setLoading(true)
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
            setLoading(false)
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
            <Button size="small" style={{color:"red"}} type="ghost" onClick={()=>{setIdMedico(-1); setDataMedico(null); props?.callback?.(null);}}><CloseOutlined size={"small"} /></Button>
        </>
    )

    const columns = [
        {dataIndex: "nombre", title: "Nombre"},
        {dataIndex: "matricula", title: "Matricula"},
        {dataIndex: "idmedico", title: "", render: (_,{idmedico})=>(<><Button onClick={()=>{onMedicoSelected(idmedico)}} size="small"><CheckCircleOutlined /></Button></>)},
    ]
    return (idMedico==-1 ? 
        <>
        <CustomModal width="900px" openButtonText={ typeof props.openButtonText === 'undefined' ? "Seleccione Médico" : props.openButtonText} title="Seleccionar Médico" >
           
            <Input.Search prefix="Buscar: " size="small" onSearch={onSearch} />
            &nbsp;<br />
            {/*<CustomModal openButtonText="+ Agregar" title="Agregar" >
                <MedicoForm callback={(id)=>{onMedicoSelected(id)}} />
            </CustomModal>*/}
            <Table 
            title={_=><>Lista de M&eacute;dicos&nbsp;&nbsp;<Button size="small" onClick={_=>{setPopupAddOpen(true)}}><PlusOutlined /> Agregar</Button></>}
            size="small"
            scroll={{y:"500px"}}
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
            columns={columns} 
            dataSource={medicos} />
        </CustomModal>
        <Modal destroyOnClose width={"800px"} title="Agregar Médico" open={popupAddOpen} onCancel={_=>{setPopupAddOpen(false)}}>
            <MedicoForm callback={_=>{setReload(!reload); setPopupAddOpen(false);}} />
        </Modal>
        </>
        :
        show_details())
}