import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Button, Col,  Input, Modal, Radio, Row, Spin } from "antd";
import { useState } from "react";

const EditarCodigoIndiv = (props) =>{

    const [codigo, setCodigo] = useState(null)

    const [open, setOpen] = useState(false)

    const [modoPrecio, setModoPrecio] = useState(1)

    const [precioSubgrupo, setPrecioSubgrupo] = useState(0)

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
                modo_precio: response.data[0].modo_precio,
            })
            setModoPrecio(response.data[0].modo_precio)
            setPrecioSubgrupo(response.data[0].precio_defecto)
            //alert(JSON.stringify(response.data))
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

    const onSave = () => {
       //alert(JSON.stringify({...codigo, modo_precio: modoPrecio}))

        post_method(post.update.editar_codigo,
            {
                ...codigo, modo_precio: modoPrecio
            },
            (response)=>{
                alert("OK")
                props?.callback?.(codigo.idcodigo)
                setOpen(false)
            }
            )

    }

    return <>
    <Button onClick={onOpen} danger type="primary">{props.buttonText}</Button>
    
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
                    <Input prefix="Precio: " value={codigo.precio} onChange={(e)=>{onChange("precio",parseFloat(e.target.value))}}/>
                </Col>
            </Row>
           
            <Row>
                <Col span={24}>
                    <Input prefix="Descripción: " value={codigo.descripcion} onChange={(e)=>{onChange("descripcion",e.target.value)}}/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                <Radio.Group 
                                value={modoPrecio}
                                onChange={(e)=>{
                                    setModoPrecio(v=>{
                                            switch(e.target.value)
                                            {
                                                case 0: 
                                                onChange(
                                                    'precio',
                                                    parseFloat(form.getFieldValue('costo')) * multiplicador
                                                ); 
                                                break; 
                                                case 1: 
                                                onChange(
                                                    'precio',
                                                    parseFloat(precioSubgrupo)
                                                    )
                                                break;
                                            }
                                            return e.target.value})
                                        /*setValue("modo_precio",e.target.value)*/
                                    }}>
                                   { /*<Radio disabled value={0}>Multiplicador <b>({multiplicador})</b></Radio>*/}
                                    <Radio value={1}>Precio Subgrupo <b>(${precioSubgrupo})</b></Radio>
                                    <Radio value={2}>Precio Individual</Radio>
                                </Radio.Group>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                   <hr />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Button onClick={onSave} block type="primary">Guardar Cambios</Button>
                </Col>
            </Row>
            </>}
        </Modal>
    </>

}

export default EditarCodigoIndiv;