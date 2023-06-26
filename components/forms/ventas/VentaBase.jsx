import ModoPago from "@/components/forms/ModoPago";
import SelectCliente from "@/components/forms/ventas/SelectCliente";
import SelectMedico from "@/components/forms/ventas/SelectMedico";
import SelectObraSocial from "@/components/forms/ventas/SelectObraSocial";
import TotalesVenta from "@/components/forms/ventas/TotalVenta";
import RecetaStockItems from "@/components/forms/ventas/receta_stock/Items";
import { BackwardFilled, ForwardFilled } from "@ant-design/icons";
import { Button, Col, DatePicker, Divider, Form, Input, Row, Steps, Tabs, TextArea } from "antd";

import { useState } from "react";

/* leer: https://refine.dev/blog/common-usestate-mistakes-and-how-to-avoid/ */

export default function VentaBase(props){
 const [venta, setVenta] = useState( {
        fkcliente: -1,
        fkdestinatario: -1,
        fkmedico: -1,
        fkos: -1,
        mp: null,
        subtotal: 0,
        descuento: 0,
        total: 0,
        fechaRetiro: null,
        comentarios: "",
        productos: null,

    })

    const onChange = (field, value) => {
        setVenta(
            (venta)=>{
                const __venta = {...venta, [field]:value};
                props?.callback(__venta);
                return __venta;
            }
        )
    }

    const finalizar_venta = (e)=>{
        setVenta((venta)=>{
            props?.onfinish(venta);
            return venta;
        })
    }

    const onFinish = (values)=>{}
    
    const onFinishFailed = (error)=>{}

    const tabs_items = [
        {
            key: 'paso1',
            label: 'Cliente y Medico',
            children: 
            <>
            <Row>
                    <Col span={24} >
                        <Form.Item>
                            <SelectCliente callback={(value)=>{onChange("fkcliente", value)}} />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item>
                            <SelectCliente   callback={(value)=>{onChange("fkdestinatario", value)}} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item>
                            <SelectMedico  callback={(value)=>{onChange("fkmedico", value)}} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item>
                            <SelectObraSocial callback={(value)=>{onChange("fkos", value)}} />
                        </Form.Item>
                    </Col>
                </Row>
            </>
        },
        {
            key: 'paso2',
            label: 'Productos',
            children: 
            <>
                <Form.Item>
                    {props.children}
                </Form.Item>
            </>
        },
        {
            key: 'paso3',
            label: 'Modo de Pago',
            children: 
            <>
                <Form.Item>
                    <TotalesVenta total={ typeof props !== 'undefined' ? props.total : "0"} callback={(value)=>{onChange("descuento", value)}} />
                    <ModoPago callback={(value)=>{onChange("mp", value)}} />
                </Form.Item>
            </>
        },
        {
            key: 'paso4',
            label: 'Finalizar Sobre',
            children: 
            <>
                <Form.Item label={"Fecha de Retiro"}>
                    <DatePicker onChange={(value)=>{onChange("fechaRetiro", value)}} />
                </Form.Item>
                <Form.Item label={"Comentarios"}>
                   <Input.TextArea rows={2} onChange={(value)=>{onChange("comentarios", value)}} />
                </Form.Item>
                
                <Form.Item>
                    <Button type="primary" block onClick={finalizar_venta}>Imprimir Sobre</Button>
                </Form.Item>
            </>
        },
    ];

    return (
    <>
    <Form  onFinish={onFinish} onFinishFailed={onFinishFailed}>
	
        <Tabs defaultActiveKey="paso1" items={tabs_items} size="large"/>

    </Form>
    </>
    )
}