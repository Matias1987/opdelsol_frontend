import { Button, Form, Input } from "antd";
import LayoutSingle from "@/components/layout/layout_single";
const post_helper = require("../../../../src/helpers/post_helper")
const urls = require("../../../../src/urls")
export default function Login(){

    const onFinish = (values)=>{
        post_helper.post_method(urls.post.login,values,(res)=>{
            if(res.data.loged == 1){
                windows.location.replace(urls.public_urls.dashboard)
            }
            else{
                alert("Datos Incorrectos")
            }
        })
    }

    const onFinishFailed = (errorInfo) => {

    }

    return (
    <Form
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    >
        <h4>Log In</h4>
        <Form.Item label={"Usuario"}>
            <Input style={{width:"300px"}} />
        </Form.Item>
        <Form.Item label={"Contraseña"}>
            <Input.Password style={{width:"300px"}} />
        </Form.Item>
        <Form.Item>
            <Button>Log In</Button>
        </Form.Item>

    </Form>)

}

Login.PageLayout = LayoutSingle;