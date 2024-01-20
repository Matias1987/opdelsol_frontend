import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Input, Modal, Row, Spin } from "antd";
import { useState } from "react";
import SelectCliente from "../SelectCliente";
import { get } from "@/src/urls";

const CambiarResponsableDestinatario = (props) =>{
    const [open, setOpen] = useState(false)
    const [responsableLoading, setResponsableLoading] = useState(true)
    const [destinatarioLoading, setDestinatarioLoading] = useState(true)

    const [destinatario, setDestinatario] = useState({
        id: -1,
        nombre: "",
        dni: ""
    })

    const [responsable, setResponsable] = useState({
        id:-1,
        nombre:"",
        dni:""
    })


    const [cambios, setCambios] = useState({
        iddestinatario:-1,
        idresponsable: -1
    })

    const onResponsableChange = (id)=>{
        setCambios(c=>({
            ...c,idresponsable:id
        }))
    }

    const onDestinatarioChange =(id) => {
        setCambios(c=>({
            ...c,iddestinatario:id
        }))
    }

    

    const load = () => {
       
        if(typeof props.idcliente !== 'undefined'){
            setResponsableLoading(true)
            fetch(get.cliente_por_id + props.idcliente)
            .then(r=>r.json())
            .then((response)=>{
                alert(JSON.stringify(response))
                setResponsable({
                    id:response.data[0].idcliente,
                    dni:response.data[0].dni,
                    nombre:response.data[0].apellido + ', ' + response.data[0].nombre,
                })

                setResponsableLoading(false)
            })
        }

        if(typeof props.iddestinatario !== 'undefined'){
            setDestinatarioLoading(true)
            fetch(get.cliente_por_id + props.iddestinatario)
            .then(r=>r.json())
            .then((response)=>{
                setDestinatario({
                    id:response.data[0].idcliente,
                    dni:response.data[0].dni,
                    nombre:response.data[0].apellido + ', ' + response.data[0].nombre,
                })
                setDestinatarioLoading(false)
            })
        }
    }

    const onOpenClick = () => {
        
        load()
        setOpen(true)
    }

    const onCancel = () => { 
        setOpen(false)
    }

    const onGuardar = () => {

    }

    return <>
    <Button size="small" type="ghost" onClick={onOpenClick}><EditOutlined /></Button>
    <Modal open={open} onCancel={onCancel} width="80%">
        <>

        
    
        <Row>
            <Col span={24}>
                <h3>Cambiar Responsable y/o Destinatario</h3>
            </Col>
        </Row>
        {   responsableLoading  ?  <><Spin /></> :
            <>
                <Row style={{backgroundColor:"rgba(0,250,0,.15)"}}>
                    <Col span={24}>
                        Responsable Actual: {responsable.nombre}&nbsp;&nbsp;&nbsp;D.N.I.: {responsable.dni}
                    </Col>
                </Row>
            </>
        }
        {   destinatarioLoading  ? <></> :
                <Row style={{backgroundColor:"rgba(0,250,0,.15)"}}>
                    <Col span={24}>
                        Destinatario Actual: {destinatario.nombre}&nbsp;&nbsp;&nbsp;D.N.I.: {destinatario.dni}
                    
                    </Col>
                </Row>
 
        }
        <Row>
            <Col span={24}>
                <Divider />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <SelectCliente callback={onResponsableChange} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <SelectCliente destinatario callback={onDestinatarioChange} />   
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button 
                onClick={onGuardar} 
                disabled={!(cambios.iddestinatario>0 || cambios.idresponsable>0)}
                >
                    Guardar Cambios
                </Button>
            </Col>
        </Row>
        </>
    </Modal>
    </>
}

export default CambiarResponsableDestinatario;