import ModoPago from "@/components/forms/ModoPago";
import SelectCliente from "@/components/forms/ventas/SelectCliente";
import SelectMedico from "@/components/forms/ventas/SelectMedico";
import RecetaStockItems from "@/components/forms/ventas/receta_stock/Items";
import { BackwardFilled, ForwardFilled } from "@ant-design/icons";
import { Button, Col, Divider, Form, Row, Steps } from "antd";
import { useState } from "react";

export default function VentaRecetaStock(){
    const [step, setStep] = useState(0);

    const next = _ => { setStep(step+1)}
    const prev = _ => { setStep(step-1)}
    
    const onFinish = (values)=>{}
    
    const onFinishFailed = (error)=>{}

    const GetStep = _ =>{
        switch (step) {
            case 0: return (
                <>
                <Row>
                    <Col span={12} >
                        <Form.Item>
                            <SelectCliente />
                        </Form.Item>
                    </Col>
                    <Col span={12} >
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
                </>
            );
            case 1: return (
                <>
                <Form.Item>
                    <RecetaStockItems />
                </Form.Item>
                </>
            );
            case 2: return (
                <>
                <Form.Item>
                    <ModoPago />
                </Form.Item>
                </>
            );
            case 3: return (
                <>
                <Form.Item>
                    <Button type="primary" block>Guardar Venta</Button>
                </Form.Item>
                </>
            )
        }
    }

    return (
    <>
    <Form  onFinish={onFinish} onFinishFailed={onFinishFailed}>
    
    <Steps
    size="small"
    current={step}
    items={[
      {
        title: 'Cliente y Medicos',
        description: "Cliente, Medico, Obra Social",
      },
      {
        title: 'Productos',
      },
      {
        title: 'Modo de Pagos',
        description: "Modo de pago, descuentos",
      },
      {
        title: 'Finalizar',
        description: "Vista Previa, Finalizar",
      },
    ]}
  />
  <br />
  <br />
	<div style={{width:"100%", padding:"2em", height:"400px"}}>
        <GetStep />
	</div>
        
    
    <Button onClick={prev} disabled={step<1}><BackwardFilled /> Anterior</Button>
    <Button onClick={next} disabled={step>=3}><ForwardFilled /> Siguiente</Button>
    
    </Form>
    </>
    )
}