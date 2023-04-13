import { Button, Form, Input } from "antd";
import LayoutSingle from "@/components/layout/layout_single";

export default function Login(){
    return (
    <Form>
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