import React from "react";
import { Form, Divider, Button, Select, Input } from "antd";


const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const FamiliaForm = () => (
  <Form
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


    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default FamiliaForm;
 