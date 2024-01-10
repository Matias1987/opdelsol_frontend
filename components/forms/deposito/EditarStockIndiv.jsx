import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { parse_int_string } from "@/src/helpers/string_helper";
import { get, post } from "@/src/urls";
import { Button, Col, Input, Modal, Row, Spin } from "antd";
import { useState } from "react";

const EditarStockIndiv = (props) => {
    const [stock ,setStock] = useState(null)
    const [open, setOpen] = useState(false)
    const [codigo, setCodigo] = useState(null)
    const onOpen = () => {
        setOpen(true)
       
        fetch(get.obtener_stock_sucursal + `${props.idsucursal}/${props.idcodigo}`)
        .then(r=>r.json())
        .then((response)=>{
            
            setStock(response.data[0])
        })


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


    const guardarCambios = () => {
        post_method(post.update.modificar_cantidad_stock,{
            cantidad:stock.cantidad,
            fksucursal:props.idsucursal,
            idcodigo:props.idcodigo
        },
        (response)=>{
            alert("OK")
            props?.callback?.()
            setOpen(false)
        }
        )
    }

    return <>
    <Button onClick={onOpen} type="default">{props.buttonText}</Button>
        <Modal title={"Editar Cantidad Stock"} open={open} onCancel={onClose} footer={null}>
            {stock==null ? <Spin /> : 
            <>
            <Row>
                <Col span={24}>
                    <Input style={{backgroundColor:"lightyellow"}} readOnly prefix="Código: " value={codigo.codigo}/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Input prefix={<b>Cantidad: </b>} value={stock.cantidad} onChange={(e)=>{
                        setStock(
                            s=>(
                                {...s,"cantidad":parse_int_string(((e.target?.value?.toString())||"").toString())}))
                    }} />  
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Button  block type="primary" onClick={guardarCambios}>Guardar Cambios</Button>
                </Col>
            </Row>
            </>
            }
        </Modal>
    </>
}

export default EditarStockIndiv;