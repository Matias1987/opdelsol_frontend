import ModoPago from "@/components/forms/ventas/ModoPago";
import SelectCliente from "@/components/forms/ventas/SelectCliente";
import SelectMedico from "@/components/forms/ventas/SelectMedico";
import RecetaStockItems from "@/components/forms/ventas/receta_stock/Items";
import { Button, Col, Divider, Form, Row } from "antd";

export default function VentaRecetaStock(){
   
    
    const onFinish = (values)=>{}
    
    const onFinishFailed = (error)=>{}

    return (
    <>
    <Form  onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row>
            <Col span={12}>
                <Form.Item>
                    <SelectCliente />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <SelectCliente destinatario={true} />
                </Form.Item>
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <Form.Item>
                    <SelectMedico />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    Seleccionar Obra Social
                </Form.Item>
            </Col>
        </Row>
    <Form.Item>
        <RecetaStockItems />
    </Form.Item>
    <Form.Item>
        <ModoPago />
    </Form.Item>
    <Form.Item>
        <Button>Guardar Venta</Button>
    </Form.Item>
    </Form>
    </>
    )
}