const { Form, Input, Button } = require("antd")
const { default: GrupoSelect } = require("../GrupoSelect")

const SubGrupoForm = () => {
    const [form] = Form.useForm();
    
    const onFinish = (values) => {
        console.log('Success:', values);
      };
      
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    const setValue = (id)=>{
    form.setFieldsValue({grupo:id})
    }
    return (
    <>
        <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        >
            <Form.Item
            label={"Grupo"}
            name={"grupo"}
            rules={[{required: true,}]}
            >
                <GrupoSelect callback = {(id)=>{
                    setValue(id)
                }} />
            </Form.Item>
            <Form.Item
            label={"Nombre Corto"}
            name={"nombre_corto"}
            rules={[{required: true,}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
            label={"Nombre Largo"}
            name={"nombre_largo"}
            rules={[{required: true,}]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Guardar</Button>
            </Form.Item>
        </Form>    
    </>
    )
}

export default SubGrupoForm;