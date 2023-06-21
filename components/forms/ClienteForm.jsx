import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, DatePicker, Form, Input } from "antd";


export default function ClienteForm(props){

    const [form] = Form.useForm();
    const url = post.insert.cliente;
    const onFinish = (values) => {
        alert(JSON.stringify(values))
        post_method(post.obtener_cliente_dni,{"dni":values.dni},(res)=>{
            if(res.data.length>0){
                alert("El cliente ya existe")
            }
            else{
                post_method(url,values,(res)=>{
                    alert("Agregado")
                    if(typeof props.callback !== 'undefined'){
                        props.callback(res.data);
                    }
                })
            }
        })
        
    }
    const onFinishFailed = (err) => {}

    const onChangeDate = (date, datestr) => {
        alert(datestr)
    }

    return (<>

    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label={"DNI"} name={"dni"}>
            <Input />
        </Form.Item>
        <Form.Item label={"Nombres"} name={"nombres"}>
            <Input />
        </Form.Item>
        <Form.Item label={"Apellidos"} name={"apellidos"}>
            <Input />
        </Form.Item>
        <Form.Item label={"Fecha de Nacimiento"} name={"nacimiento"}>
            <DatePicker onChange={onChangeDate} format={'DD/MM/YYYY'}/>
        </Form.Item>
        <Form.Item label={"Domicilio"} name={"domicilio"}>
            <Input />
        </Form.Item>
        <Form.Item label={"Telefono"} name={"telefono"}>
            <Input />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit">Guardar</Button>
        </Form.Item>
    </Form>

</>)}