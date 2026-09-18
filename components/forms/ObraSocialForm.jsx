import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Form, Input, Button } from "antd";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ObraSocialForm = (props) => {
  const postIdRef = useRef(uuidv4());
  const [form] = Form.useForm();
  const [btnEnabled, setBtnEnabled] = useState(true);

  const onFinish = (values) => {
    const url = post.insert.mutual;

    setBtnEnabled(false);
    post_method(url, { ...values, uid: postIdRef.current }, (response) => {
      setBtnEnabled(true);
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
          <Button htmlType="submit" disabled={!btnEnabled}>
            Agregar O.S.
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ObraSocialForm;
