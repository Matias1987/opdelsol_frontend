import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Form, Input } from "antd";

const MedicoForm = (props) => {
    const [form] = Form.useForm();

    const onFinishFailed = (e) => {
        alert(e)
    }

    const onFinish = (values) => {
        const url = post.insert.medico;

        post_method(url,values,(response)=>{
            alert("Medico Agregado")
            if(typeof props.callback !== 'undefined'){
                props.callback(response.data)
            }
        })
    }

    return (<>
    Agregar Medico
    <Form 
    onFinish={onFinish} 
    form={form} 
    onFinishFailed={onFinishFailed}>
        <Form.Item label={"Nombre"} name={"nombre"}>
            <Input />
        </Form.Item>
        <Form.Item label={"Matricula"} name={"matricula"}>
            <Input />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit">Guardar</Button>
        </Form.Item>

    </Form>
    </>);
}

export default MedicoForm;