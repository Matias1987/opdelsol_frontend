import { Form, Divider, Button, Select, Input } from "antd";
import FamiliaSelect from "../FamiliaSelect";


const SubFamiliaForm = () =>{

    const [form] = Form.useForm();



    const onFinish = (values) => {
        console.log('Success:', values);
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const setValue = (id)=>{
        form.setFieldsValue({familia:id})
      }

    return (<>

        <Form 
        style={{color: "white"}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}

        >
            <Form.Item
            style={{color:"white"}}
                label="Familia"
                name="familia"
                rules={[
                    {
                        required: true,
                        message: 'Seleccione Familia',
                    },
                ]}
            >
            <FamiliaSelect callback={
                    (id)=>{
                        setValue(id);
                    }
                    
                } />
            </Form.Item>
            <Form.Item
            label="Nombre Corto"
            name="nombre_corto"
            rules={[
                {
                required: true,
                message: 'Ingrese Nombre Corto',
                },
            ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
            label="Nombre Largo"
            name="nombre_largo"
            rules={[
                {
                required: true,
                message: 'Ingrese Nombre Largo',
                },
            ]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Guardar
                </Button>
            </Form.Item>
        </Form>
        </>)
}

export default SubFamiliaForm;