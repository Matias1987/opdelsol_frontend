const { Form, Input, Button } = require("antd")
const { default: GrupoSelect } = require("../GrupoSelect")
const urls = require("../../../src/urls")
const post_helper = require("../../../src/helpers/post_helper")
const SubGrupoForm = () => {
    const [form] = Form.useForm();
    
    const onFinish = (values) => {
        switch(props.action){
            case 'ADD': post_helper.post_method(urls.post.insert.subgrupo,values,(res)=>{
              if(res.status == "OK"){alert("Datos Guardados")}else{alert("Error.")}});
              break;
            case 'EDIT': post_helper.post_method(urls.post.update.subgrupo,values,(res)=>{
              if(res.status == "OK"){alert("Cambios Guardados")}else{alert("Error.")}});
              break;
            };
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