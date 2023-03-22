import React from "react";
import { Form, Button, Input, Divider } from "antd";
import DynamicField from '@/components/DynamicField';



const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 12 }
  }
};

export default function App() {
  const [form] = Form.useForm();

  function handleFinish(values) {
    console.log("VALUES", values);
    alert("Check console for values");
  }
  return (
    <div className="App">
      <h1>AntD Dynamic Form Example</h1>
      <Form form={form} {...defaultFormItemLayout} onFinish={handleFinish}>
        <Form.Item
          name="first"
          label="Persistent Field"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Divider dashed>Additional Fields</Divider>
        <DynamicField />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
