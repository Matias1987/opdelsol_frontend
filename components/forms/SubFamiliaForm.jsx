import { Form, Divider, Button, Select, Input } from "antd";
import LoadSelect from "../LoadSelect";

const urls = require("../../src/urls")
const post_helper = require("../../src/helpers/post_helper")

const SubFamiliaForm = (props) =>{

    const [form] = Form.useForm();



    const onFinish = (values) => {
        console.log(values)
        switch(props.action){
            case 'ADD': post_helper.post_method(urls.post.insert.subfamilia,values,(res)=>{
              if(res.status == "OK"){alert("Datos Guardados")}else{alert("Error.")}});
              break;
            case 'EDIT': post_helper.post_method(urls.post.update.subfamilia,values,(res)=>{
              if(res.status == "OK"){alert("Cambios Guardados")}else{alert("Error.")}});
              break;
            };
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const setValue = (id)=>{
        form.setFieldsValue({familia_idfamilia:id})
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
                name="familia_idfamilia"
                rules={[
                    {
                        required: true,
                        message: 'Seleccione Familia',
                    },
                ]}
            >
            <LoadSelect fetchurl={"http://localhost:3000/api/v1/familia/menu/options/"} callback={
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