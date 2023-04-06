const { Form, Input, Button } = require("antd")
const { default: SubGroupSelect } = require("../SubGroupSelect")
const urls = require("../../../src/urls")
const post_helper = require("../../../src/helpers/post_helper")

const CodigoForm = (props) => {
    const [form] = Form.useForm();
    
    const onFinish = (values) => {
        switch(props.action){
            case 'ADD': post_helper.post_method(urls.post.insert.codigo,values,(res)=>{
              if(res.status == "OK"){alert("Datos Guardados")}else{alert("Error.")}});
              break;
            case 'EDIT': post_helper.post_method(urls.post.update.codigo,values,(res)=>{
              if(res.status == "OK"){alert("Cambios Guardados")}else{alert("Error.")}});
              break;
            };
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
            label={"Código"}
            name={"codigo"}
            rules={[{required:true}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
            label={"Descripción"}
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