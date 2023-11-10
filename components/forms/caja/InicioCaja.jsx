import LayoutCaja from "@/components/layout/layout_caja"
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";

export default function InicioCaja(props){
    const [open, setOpen] = useState(false)
    const [btnBlocked, setBtnBlocked] = useState(false)
    const onFinishFailed = ()=> {

    }

    const onFinish = (values) => {
        setBtnBlocked(true)
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
                ><b>Inicio de Caja</b></Button>
                <Modal 
                footer={null}
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
                            <Input  onClick={(e)=>{e.target.select()}}  />
                        </Form.Item>
                        <Form.Item label={"Comentarios"} name={"comentarios"}>
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" disabled={btnBlocked}>Confirmar</Button>
                        </Form.Item>

                    </Form>
                </Modal>
            </>)}
