const { Form, Input, Button } = require("antd")
const { default: SubGroupSelect } = require("../SubGroupSelect")

const CodigoForm = () => {
    const [form] = Form.useForm();
    
    const onFinish = (values) => {
        console.log('Success:', values);
      };
      
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    const setValue = (id)=>{
    form.setFieldsValue({subgrupo:id})
    }
    return (
        <>
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
        >
            <Form.Item

            label={"SubGrupo"}
            name={"subgrupo"}
            rules={[{required:true}]}
            >
                <SubGroupSelect callback = {
                    (id)=>{
                        setValue(id);
                    }
                } />
            </Form.Item>
            <Form.Item
            label={"Codigo"}
            name={"codigo"}
            rules={[{required:true}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
            label={"Descripcion"}
            name={"descripcion"}
            rules={[{required:true}]}
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
export default CodigoForm;