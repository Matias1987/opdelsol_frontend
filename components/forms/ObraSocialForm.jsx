import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ObraSocialForm = (props) => {
  const [form] = Form.useForm();
  const [uid, setUID] = useState("");
  const [btnEnabled, setBtnEnabled] = useState(true);
  
  useEffect(()=>{setUID(uuidv4());},[]);

  const onFinish = (values) => {
    const url = post.insert.mutual;

    post_method(url, {...values,uid:uid}, (response) => {
      if (typeof props.callback !== "undefined") {
        props.callback(response.data);
      }
    });
  };

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          rules={[{ required: true }]}
          label={"Nombre"}
          required={true}
          name={"nombre"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          label={"Siglas"}
          required={true}
          name={"siglas"}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Agregar O.S.</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ObraSocialForm;
