import { get } from "@/src/urls";
import { Button, Col, Input, Modal, Row, Spin } from "antd";
import { useState } from "react";

const EditarCodigoIndiv = (props) =>{

    const [codigo, setCodigo] = useState(null)

    const [open, setOpen] = useState(false)

    const onOpen = () => {
        setOpen(true)
        fetch(get.detalle_codigo + props.idcodigo)
        .then(r=>r.json())
        .then((response)=>{
            setCodigo({
                idcodigo: response.data[0].idcodigo,
                codigo: response.data[0].codigo,
                
                precio: response.data[0].precio,
                descripcion: response.data[0].descripcion,
            })
        })
        .catch(er=>{console.log(er)})
    }

    const onClose = () => {
        setOpen(false)
    }

    const onChange = (idx, val) => {
        setCodigo(c=>{
            return {...c,[idx]:val}
        })
    }

    return <>
    <Button onClick={onOpen} type="primary">{props.buttonText}</Button>
    
    <Modal open={open} destroyOnClose onCancel={onClose} footer={null}> 

        {codigo == null ? <><Spin /></> :<> 
        <Row>
            <Col span={24}>
                Modificar C&oacute;digo
            </Col>
        </Row>
            <Row>
                <Col span={24}>
                    <Input style={{backgroundColor:"lightyellow"}} readOnly prefix="Código: " value={codigo.codigo}/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Input prefix="Precio: " value={codigo.precio} onChange={(e)=>{onChange("precio",e.target.value)}}/>
                </Col>
            </Row>
           
            <Row>
                <Col span={24}>
                    <Input prefix="Descripción: " value={codigo.descripcion} onChange={(e)=>{onChange("descripcion",e.target.value)}}/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Button block type="primary">Guardar Cambios</Button>
                </Col>
            </Row>
            </>}
        </Modal>
    </>

}

export default EditarCodigoIndiv;