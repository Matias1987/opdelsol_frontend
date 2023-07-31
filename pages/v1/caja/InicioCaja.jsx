import LayoutCaja from "@/components/layout/layout_caja"
import { Form, Input } from "antd";

export default function InicioCaja(){return (<>
    <Form>
        <Form.Item label={"Monto Inicial"}>
            <Input />
        </Form.Item>
        <Form.Item label={"Comentarios"}>
            <Input />
        </Form.Item>
        <Form.Item>
            <Button>Confirmar</Button>
        </Form.Item>

    </Form>
</>)}

InicioCaja.PageLayout = LayoutCaja;