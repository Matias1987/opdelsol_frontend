import LayoutCaja from "@/components/layout/layout_caja"
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";

export default function InicioCaja(props){
    const [open, setOpen] = useState(false)
    const onFinishFailed = ()=> {

    }

    const onFinish = (values) => {
        
        const data = {
            sucursal_idsucursal: globals.obtenerSucursal(),
            monto_inicial: values.monto,
        }
        post_method(post.insert.caja, data, (result)=>{
            alert("OK")
            props?.callback?.()
        })
    }
    return (<>
                
                <Button
                block 
                type="dashed"
                style={{backgroundColor:"#006262", color:"white"}}
                onClick={(e)=>{
                    setOpen(true)
                }}
                ><b>Abrir Caja</b></Button>
                <Modal 
                open={open}
                onCancel={
                    ()=>{setOpen(false)}
                }
                
                >
                    <h3>
                    Inicio de Caja
                    </h3>
                    <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item label={"Monto Inicial"} name={"monto"} rules={[{required:true}]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label={"Comentarios"} name={"comentarios"}>
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit">Confirmar</Button>
                        </Form.Item>

                    </Form>
                </Modal>
            </>)}
