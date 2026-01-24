import { Button, Card, Col, Flex, Form, Input, Row } from "antd";
import LayoutSingle from "@/components/layout/layout_single";
import useStorage from "../../../../useStorage";
import globals from "@/src/globals";
import { registrar_evento } from "@/src/helpers/evento_helper";
import { post, public_urls } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";

export default function Login() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (typeof values.nombre === "undefined") {
      alert("completar campos obligatorios (*)");
      return;
    }
    if (typeof values.password === "undefined") {
      alert("completar campos obligatorios (*)");
      return;
    }

    if (values.nombre == "" || values.nombre === null) {
      alert("completar campos obligatorios (*)");
      return;
    }
    if (values.password == "" || values.password === null) {
      alert("completar campos obligatorios (*)");
      return;
    }

    post_method(post.login, values, (res) => {
      if (res.data.logged == 1) {
        const { setItem } = useStorage();

        console.log(res.data.token);
        setItem("token", res.data.token);
        setItem("uid", res.data.uid);
        setItem("uname", res.data.udata.nombre);

        setItem("ventas", res.data.udata.ventas);
        setItem("caja1", res.data.udata.caja1);
        setItem("caja2", res.data.udata.caja2);
        setItem("deposito_min", res.data.udata.deposito_min);
        setItem("deposito", res.data.udata.deposito);
        setItem("admin1", res.data.udata.admin1);
        setItem("admin2", res.data.udata.admin2);
        setItem("admin_prov", res.data.udata.admin_prov);
        setItem("laboratorio", res.data.udata.laboratorio);
        setItem("multInstances", res.data.udata.multInstances);

        globals.setUserLogedIn(1);

        registrar_evento("USER_LOGIN", "Inicio de sesion", res.data.uid);

        if (typeof window !== "undefined") {
          window.location.replace(public_urls.modo);
        }
      } else {
        alert("Datos Incorrectos");
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    alert(errorInfo);
  };

  return (
    <Flex
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e9e9e9, #cfcfcf)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        title="Log In"
        style={{
          width: "440px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          borderRadius: 12,
        }}
      >
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
          <h4></h4>
          <Form.Item label={"Usuario"} name="nombre" required={true} value="">
            <Input style={{ width: "300px" }} placeholder="Ingrese Usuario" />
          </Form.Item>
          <Form.Item
            label={"Contraseña"}
            name="password"
            required={true}
            value=""
          >
            <Input.Password style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{ borderRadius: 8 }}
            >
              Acceder
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
}

Login.PageLayout = LayoutSingle;
