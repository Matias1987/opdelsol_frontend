import { Button, Form, Input } from "antd";
import { useForm } from "rc-field-form";
import SubFamiliaSelect from "../SubFamiliaSelect";
const urls = require("../../src/urls")
const post_helper = require("../../src/helpers/post_helper")

const GrupoForm = (props) => {
    const [form] = Form.useForm();
    
    const onFinish = (values) => {
        switch(props.action){
            case 'ADD': post_helper.post_method(urls.post.insert.grupo,values,(res)=>{
              if(res.status == "OK"){alert("Datos Guardados")}else{alert("Error: " + res.data)}});
              break;
            case 'EDIT': post_helper.post_method(urls.post.update.grupo,values,(res)=>{
              if(res.status == "OK"){alert("Cambios Guardados")}else{alert("Error.")}});
              break;
            };
      };
      
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    const setValue = (id)=>{
    form.setFieldsValue({subfamilia_idsubfamilia:id})
    }


    return (
        <>
            <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
                
                <Form.Item
                name={"subfamilia_idsubfamilia"}
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