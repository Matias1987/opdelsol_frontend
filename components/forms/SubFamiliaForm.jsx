import { Form, Divider, Button, Select, Input, Modal } from "antd";
import LoadSelect from "../LoadSelect";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import FamiliaForm from "./FamiliaForm";
import { get, post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import { v4 as uuidv4 } from "uuid";

const SubFamiliaForm = (props) => {
  const [form] = Form.useForm();
  const [popup_open, setPopupOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [uid, setUID] = useState("");
  const [btnEnabled, setBtnEnabled] = useState(true);
  
  useEffect(()=>{setUID(uuidv4());},[]);

  const agregar = (_values) => {
    alert(JSON.stringify(_values))
    alert(post.insert.subfamilia)
    post_method(post.insert.subfamilia, _values, (res) => {
      if (res.status == "OK") {
        alert("Datos Guardados");
        props?.callback?.();
      } else {
        alert("Error: " + res.data);
      }
    });
  };

  const onFinish = (values) => {
    console.log(values);
    switch (props.action) {
      case "ADD":
        agregar({...values, uid});
        break;
      case "EDIT":
        post_method(post.update.subfamilia, {...values, uid}, (res) => {
          if (res.status == "OK") {
            alert("Cambios Guardados");
          } else {
            alert("Error.");
          }
        });
        break;
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const setValue = (id) => {
    form.setFieldsValue({ familia_idfamilia: id });
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const onOkPopup = () => {
    setPopupOpen(false);
    setReload(!reload);
  };

  const agregarFamiliaFormPopup = (_) => (
    <>
      <Button
        type="primary"
        size="small"
        onClick={() => {
          setPopupOpen(true);
        }}
      >
        <PlusCircleOutlined />
        &nbsp;Agregar Familia
      </Button>
      <Modal
        footer={null}
        width={"500px"}
        title={"Agregar Familia"}
        open={popup_open}
        onCancel={closePopup}
      >
        <FamiliaForm action="ADD" callback={onOkPopup} />
      </Modal>
    </>
  );

  return (
    <>
      <Form
        style={{ color: "white" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Form.Item
          style={{ color: "white" }}
          label="Familia"
          name="familia_idfamilia"
          rules={[
            {
              required: true,
              message: "Seleccione Familia",
            },
          ]}
        >
          <>
            <LoadSelect
              key={reload}
              fetchurl={get.familia_menu_opt}
              callback={(id) => {
                setValue(id);
              }}
              reload={reload}
            />
            {agregarFamiliaFormPopup()}
          </>
        </Form.Item>
        <Form.Item
          label="Nombre Corto"
          name="nombre_corto"
          rules={[
            {
              required: true,
              message: "Ingrese Nombre Corto",
            },
          ]}
        >
          <Input
            onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
          />
        </Form.Item>
        <Form.Item
          label="Nombre Largo"
          name="nombre_largo"
          rules={[
            {
              required: true,
              message: "Ingrese Nombre Largo",
            },
          ]}
        >
          <Input
            onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SubFamiliaForm;
