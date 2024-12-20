import { Button, Card, Col, Form, Input, Row } from "antd";
import LayoutSingle from "@/components/layout/layout_single";
import useStorage from "../../../../useStorage"
import globals from "@/src/globals";
import { registrar_evento } from "@/src/helpers/evento_helper";
import { post, public_urls } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";



export default function Login(){
    const [form] = Form.useForm();


    const onFinish = (values)=>{
        if(typeof values.nombre === 'undefined'){
            alert("completar campos obligatorios (*)");
            return;
        }
        if(typeof values.password === 'undefined'){
            alert("completar campos obligatorios (*)");
            return;
        }

        if(values.nombre == "" || values.nombre === null){
            alert("completar campos obligatorios (*)");
            return;
            
        }
        if(values.password == "" || values.password === null){
            alert("completar campos obligatorios (*)");
            return;

        }

        post_method(post.login,values,(res)=>{
            if(res.data.logged == 1){
                const {setItem} = useStorage();
               
                console.log(res.data.token)
                setItem("token",res.data.token)
                setItem("uid",res.data.uid)
                setItem("uname",res.data.udata.nombre)
                
                setItem("ventas", res.data.udata.ventas)
                setItem("caja1", res.data.udata.caja1)
                setItem("caja2", res.data.udata.caja2)
                setItem("deposito_min", res.data.udata.deposito_min)
                setItem("deposito", res.data.udata.deposito)
                setItem("admin1", res.data.udata.admin1)
                setItem("admin2", res.data.udata.admin2)
                setItem("admin_prov", res.data.udata.admin_prov)
                setItem("laboratorio", res.data.udata.laboratorio)
                globals.setUserLogedIn(1)

                registrar_evento("USER_LOGIN", "Inicio de sesion",res.data.uid )
                
                if (typeof window !== "undefined") {
                   
                        window.location.replace(public_urls.modo)
                  }

            }
            else{
                alert("Datos Incorrectos")
            }
        })
    }

    const onFinishFailed = (errorInfo) => {
        alert(errorInfo)
    }

    return (
        <Row align={"center"}>
            <Col span={12}>
                <Card title="Log In" style={{backgroundColor:"rgba(255,255,255,.25)", borderColor:"rgba(255,255,255,.25)"}}>
                    <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                    >
                        <h4></h4>
                        <Form.Item label={"Usuario"}  name="nombre"  required={true} value="">
                            <Input style={{width:"300px"}} placeholder="Ingrese Usuario"/>
                        </Form.Item>
                        <Form.Item label={"Contraseña"} name="password" required={true} value="">
                            <Input.Password style={{width:"300px"}}  />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Acceder</Button>
                        </Form.Item>

                    </Form>
                </Card>
            </Col>

        </Row>
        
    )

}

Login.PageLayout = LayoutSingle;