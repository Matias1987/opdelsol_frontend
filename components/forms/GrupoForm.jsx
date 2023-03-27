import { Button, Form, Input } from "antd";
import { useForm } from "rc-field-form";
import SubFamiliaSelect from "../SubFamiliaSelect";


const GrupoForm = () => {
    const [form] = Form.useForm();
    
    const onFinish = (values) => {
        console.log('Success:', values);
      };
      
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    const setValue = (id)=>{
    form.setFieldsValue({subfamilia:id})
    }


    return (
        <>
            <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
                
                <Form.Item
                name={"subfamilia"}
                label={"SubFamilia"}
                rules={[{required: true,}]}
                >
                    <SubFamiliaSelect 
                    
                    callback = {(id) =>{
                        setValue(id)
                    }}
                    
                    />

                </Form.Item>
                <Form.Item
                name={"nombre_corto"}
                label={"Nombre Corto"}
                rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                name={"nombre_largo"}
                label={"Nombre Largo"}
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

export default GrupoForm;