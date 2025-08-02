import Tags from "@/components/etiquetas/tagsCodigos";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Button, Col,  Input, Modal, Radio, Row, Spin } from "antd";
import { useEffect, useState } from "react";

const EditarCodigoIndiv = (props) =>{

    const [codigo, setCodigo] = useState(null)

    const [open, setOpen] = useState(false)

    const [modoPrecio, setModoPrecio] = useState(1)

    const [precioSubgrupo, setPrecioSubgrupo] = useState(0)

    useEffect(()=>{onOpen()},[])

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
                codigo_orig: response.data[0].codigo,
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
                if(response.data.msg){
                    alert(response.data.msg)
                }
                else{
                    alert("Cambios guardados correctamente")
                }
                
                props?.callback?.(codigo.idcodigo)
                setOpen(false)
            }
            )

    }

    return <>
    {codigo == null ? <><Spin /></> :<> 
        <Row>
            <Col span={24}>
                Modificar C&oacute;digo
            </Col>
        </Row>
            <Row>
                <Col span={24}>
                    <Input style={{backgroundColor:"lightyellow", color: codigo.codigo_orig === codigo.codigo ? "black" : "red"}} prefix="Código: " value={(codigo.codigo||"").toUpperCase()} onChange={(e)=>{onChange("codigo",(e.target.value||"").toUpperCase())}}/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Input prefix="Precio Indv.: " value={codigo.precio} onChange={(e)=>{onChange("precio",parseFloat(e.target.value))}}/>
                </Col>
            </Row>
           
            <Row>
                <Col span={24}>
                    <Input prefix="Descripción: " value={codigo.descripcion} onChange={(e)=>{onChange("descripcion",e.target.value)}}/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Tags idcodigo={codigo.idcodigo} readOnly={"-1"}/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                <Radio.Group 
                                value={modoPrecio}
                                onChange={(e)=>{
                                    setModoPrecio(v=>{ return e.target.value})
                                    }}>
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
    {/*<Button onClick={onOpen} danger type="primary" size="small">{props.buttonText}</Button>
    
    <Modal open={open} destroyOnClose onCancel={onClose} footer={null} key={props.idcodigo}> 

        
    </Modal>*/}
    </>

}

export default EditarCodigoIndiv;