import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";

const { Form, Input, Button } = require("antd")

const ObraSocialForm = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const url = post.insert.mutual;

        post_method(url,values,(response)=>{
            if(typeof props.callback !== 'undefined'){
                props.callback(response.data)
            }
        })
    }

    return (<>
        <Form form={form} onFinish={onFinish}>
            <Form.Item label={"Nombre"} required={true} name={"nombre"}>
                <Input />
            </Form.Item>
            <Form.Item label={"Siglas"} required={true} name={"siglas"}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit">Agregar O.S.</Button>
            </Form.Item>
        </Form>
    </>)
}

export default ObraSocialForm;