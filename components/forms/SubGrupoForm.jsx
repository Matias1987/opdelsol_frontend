const { Form, Input, Button, InputNumber, Switch } = require("antd")
const { default: GrupoSelect } = require("../GrupoSelect")
const urls = require("../../src/urls")
const post_helper = require("../../src/helpers/post_helper")
const SubGrupoForm = (props) => {
    const [form] = Form.useForm();
    
    const onFinish = (values) => {
        switch(props.action){
            case 'ADD': post_helper.post_method(urls.post.insert.subgrupo,values,(res)=>{
              if(res.status == "OK"){alert("Datos Guardados")}else{alert("Error: " + res.data)}});
              break;
            case 'EDIT': post_helper.post_method(urls.post.update.subgrupo,values,(res)=>{
              if(res.status == "OK"){alert("Cambios Guardados")}else{alert("Error.")}});
              break;
            };
      };
      
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    const setValue = (idx,value)=>{
        switch(idx){
            case "grupo_idgrupo": form.setFieldsValue({grupo_idgrupo:value}); break;
            case "multiplicador": form.setFieldsValue({multiplicador:value}); break;
        }
    

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
            name={"grupo_idgrupo"}
            rules={[{required: true,}]}
            >
                <GrupoSelect callback = {(id)=>{
                    setValue("grupo_idgrupo",id)
                }} />
            </Form.Item>
            <Form.Item
            label={"Nombre Corto"}
            name={"nombre_corto"}
            rules={[{required: true,}]}
            style={{width:"500px"}}
            >
                <Input />
            </Form.Item>
            <Form.Item
            label={"Nombre Largo"}
            name={"nombre_largo"}
            rules={[{required: true,}]}
            style={{width:"500px"}}
            >
                <Input />
            </Form.Item>
            <Form.Item
            label={"Multiplicador"}
            name={"multiplicador"}
            >
                <InputNumber step={".1"} value={"1"} min="0" onChange={(v)=>{
                    setValue("multiplicador",v)
                }}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Guardar</Button>
            </Form.Item>
        </Form>    
    </>
    )
}

export default SubGrupoForm;