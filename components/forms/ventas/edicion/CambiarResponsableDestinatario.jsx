import { EditFilled, EditOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Input, Modal, Row, Spin } from "antd";
import { useState } from "react";
import SelectCliente from "../SelectCliente";
import { get, post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";

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
       
        fetch(get.venta + props.idventa)
        .then(r=>r.json())
        .then((resp)=>{

            setResponsableLoading(true)

            
            fetch(get.cliente_por_id + resp.data[0].cliente_idcliente)
            .then(r=>r.json())
            .then((response)=>{
               
                setResponsable({
                    id:response.data[0].idcliente,
                    dni:response.data[0].dni,
                    nombre:response.data[0].apellido + ', ' + response.data[0].nombre,
                })

                setResponsableLoading(false)
            })


            setDestinatarioLoading(true)
            fetch(get.cliente_por_id + resp.data[0].fk_destinatario)
            .then(r=>r.json())
            .then((response)=>{
                if((response?.data||[]).length>0)
                {
                    setDestinatario({
                        id:response.data[0].idcliente,
                        dni:response.data[0].dni,
                        nombre:response.data[0].apellido + ', ' + response.data[0].nombre,
                    })
                    setDestinatarioLoading(false)
                }
                
            })

        })

    }

    const onOpenClick = () => {
        
        load()
        setOpen(true)
    }

    const onCancel = () => { 
        setOpen(false)
        props?.callback?.()
    }

    const onGuardar = () => {
        if(!confirm("Realizar Cambios?")){
            return
        }
        if(cambios.iddestinatario!=-1)
        {
            post_method(post.update.cambiar_destinatario,{idventa: props.idventa, iddestinatario:cambios.iddestinatario},(response)=>{
                alert("Destinatario Cambiado")
                load()
            })
        }

        if(cambios.idresponsable!=-1)
        {
            post_method(post.update.cambiar_responsable,{idventa: props.idventa, idresponsable:cambios.idresponsable},(response)=>{
                alert("Responsable cambiado")
                load()
            })
        }


    }

    return <>
    <Button size="small" type="ghost" onClick={onOpenClick} style={{color:"red"}}><EditFilled /></Button>
    <Modal open={open} onCancel={onCancel} width="80%" onOk={oncancel} footer={null}>
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
                <SelectCliente callback={onResponsableChange}  />
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