import React from "react";
import { Form, Divider, Button, Select, Input } from "antd";
import urls  from "../../src/urls";
import post_helper  from "../../src/helpers/post_helper";

const FamiliaForm = (props) => {

  const agregar = (_values) =>{
    post_helper.post_method(urls.post.insert.familia,_values,(res)=>{
        if(res.status == "OK"){
          alert("Datos Guardados")
          props?.callback?.()
        }else
        {
          alert("Error: " + res.data)
        }
      }
      );
  }

  const onFinish = (values) => {
    switch(props.action){
      case 'ADD': 
        agregar(values)
        break;
      case 'EDIT': post_helper.post_method(urls.post.update.familia,values,(res)=>{
        if(res.status == "OK"){alert("Cambios Guardados")}else{alert("Error.")}});
        break;
      };
  }

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

  return (<Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
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
      <Input onInput={e => e.target.value = e.target.value.toUpperCase()}/>
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
      <Input onInput={e => e.target.value = e.target.value.toUpperCase()}/>
    </Form.Item>


    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        GUARDAR
      </Button>
    </Form.Item>
  </Form>)
};

export default FamiliaForm;
 