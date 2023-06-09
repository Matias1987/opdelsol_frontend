import ModoPago from "@/components/forms/ModoPago";
import SelectCliente from "@/components/forms/ventas/SelectCliente";
import SelectMedico from "@/components/forms/ventas/SelectMedico";
import TotalesVenta from "@/components/forms/ventas/TotalVenta";
import RecetaStockItems from "@/components/forms/ventas/receta_stock/Items";
import { BackwardFilled, ForwardFilled } from "@ant-design/icons";
import { Button, Col, Divider, Form, Row, Steps } from "antd";
import { useState } from "react";

export default function VentaRecetaStock(){

    const [idcliente, setIdCliente] = useState(-1);
    const [iddestinatario, setIdDestinatario] = useState(-1);
    const [idmedico, setIdMedico] = useState(-1);
    const [idos, setIdOS] = useState(-1);
    const [productos,setProductos] = useState([])
    const [mp,setMP] = useState([])
    const [descuento,setDescuento] = useState(0)
    const [total,setTotal] = useState(0)

    const [step, setStep] = useState(0);

    const next = _ => { setStep(step+1)}
    const prev = _ => { setStep(step-1)}

    const _venta = {
        fkcliente: -1,
        fkdestinatario: -1,
        fkmedico: -1,
        fkos: -1,
        productos: null,
        mp: null,
        subtotal: 0,
        descuento: 0,
        total: 0,

    }

    const callback_cliente = (value) => {
        _venta.fkcliente = value;
    }
    
    const callback_destinatario = (value)=>{
        _venta.fkdestinatario = value;
    }

    const callback_medico = (value) => {
        _venta.fkmedico = value;
    }

    const callback_os = (value) => {
        _venta.fkos = value;
    }

    const callback_productos = (values) => {
        _venta.productos = values;
        //alert(JSON.stringify(_venta))
    }

    const callback_mp = (values) => {
        _venta.mp = values;
        //alert(JSON.stringify(values))
    }

    const finalizar_venta = (e)=>{
        alert(JSON.stringify(_venta))
    }

    const onFinish = (values)=>{}
    
    const onFinishFailed = (error)=>{}

    const hidden_style = {
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        //width: '1px',
        //height: '1px',
        //overflow: 'hidden',
    }

    

    const GetSteps = _ => (
        <>
            <div style={step===0 ? {backgroundColor:"white"} : hidden_style  }>
                <Row>
                    <Col span={12} >
                        <Form.Item>
                            <SelectCliente idcliente={idcliente} callback={callback_cliente} />
                        </Form.Item>
                    </Col>
                    <Col span={12} >
                        <Form.Item>
                            <SelectCliente destinatario={true} iddestinatario={iddestinatario} callback={callback_destinatario} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item>
                            <SelectMedico idmedico={idmedico} callback={callback_medico} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item>
                            Seleccionar Obra Social
                        </Form.Item>
                    </Col>
                </Row>
            </div>
            <div style={step===1 ? {backgroundColor:"white"} : hidden_style}>
                <Form.Item>
                    <RecetaStockItems productos={productos} callback={callback_productos} />
                </Form.Item>
            </div>
            <div style={step===2 ? {backgroundColor:"white"} : hidden_style}>
                <Form.Item>
                    <TotalesVenta />
                    <ModoPago mp={mp} callback={callback_mp} />
                </Form.Item>
            </div>
            <div style={step===3 ? {backgroundColor:"white"} : hidden_style}>
                <Form.Item>
                    <Button type="primary" block onClick={finalizar_venta}>Guardar Venta</Button>
                </Form.Item>
            </div>
        </>
    )

    return (
    <>
    <h2>Venta de Receta Stock</h2>
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

	<div style={{width:"100%", padding:"2em", height:"400px"}}>
        <GetSteps />
	</div>
        
    
    <Button onClick={prev} disabled={step<1}><BackwardFilled /> Anterior</Button>
    <Button onClick={next} disabled={step>=3}><ForwardFilled /> Siguiente</Button>
    
    </Form>
    </>
    )
}