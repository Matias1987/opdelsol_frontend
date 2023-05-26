const { Input, Form, Button } = require("antd");

const ProveedorForm = (props) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        //alert(values)
        props.onSubmit({
            nombre:values.nombre,
            cuit: values.cuit
        })
        //console.log('Success:', values);
      };
      
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return(
        <>
            <Form
            form={form}
            style={{color: "white"}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}

            >
                <Form.Item
                name={"nombre"}
                label={"Nombre"}
                rules={[{required:true}]}
                >
                    <Input onInput={e => e.target.value = e.target.value.toUpperCase()} style={{width:300}}/>
                </Form.Item>
                <Form.Item
                name={"cuit"}
                label={"CUIT"}
                rules={[{required:true}]}
                >
                    <Input style={{width:300}}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Guardar</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default ProveedorForm;