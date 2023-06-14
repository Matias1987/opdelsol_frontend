import { post_method } from "@/src/helpers/post_helper";
import { Button, DatePicker, Form, Input } from "antd";


export default function ClienteForm(){

    const [form] = Form.useForm();
    const url = ""
    const onFinish = (values) => {
        post_method(url,values,(res)=>{
            alert("Agregado")
        })
    }
    const onFinishFailed = (err) => {}

    return (<>

    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label={"DNI"} name={"dni"}>
            <Input />
        </Form.Item>
        <Form.Item label={"Nombres"} name={"nombres"}>
            <Input />
        </Form.Item>
        <Form.Item label={"Fecha de Nacimiento"} name={"nacimiento"}>
            <DatePicker />
        </Form.Item>
        <Form.Item label={"Apellidos"} name={"apellidos"}>
            <Input />
        </Form.Item>
        <Form.Item label={"Domicilio"} name={"domicilio"}>
            <Input />
        </Form.Item>
        <Form.Item label={"Telefono"} name={"telefono"}>
            <Input />
        </Form.Item>
        <Form.Item>
            <Button>Guardar</Button>
        </Form.Item>
    </Form>

</>)}