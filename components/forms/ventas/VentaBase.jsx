import ModoPago from "@/components/forms/ModoPago";
import SelectCliente from "@/components/forms/ventas/SelectCliente";
import SelectMedico from "@/components/forms/ventas/SelectMedico";
import SelectObraSocial from "@/components/forms/ventas/SelectObraSocial";
import TotalesVenta from "@/components/forms/ventas/TotalVenta";
import RecetaStockItems from "@/components/forms/ventas/receta_stock/Items";
import globals from "@/src/globals";
import { BackwardFilled, ForwardFilled } from "@ant-design/icons";
import { Button, Col, DatePicker, Divider, Form, Input, Row, Steps, Tabs, TextArea, TimePicker } from "antd";

import { useState } from "react";

/* leer: https://refine.dev/blog/common-usestate-mistakes-and-how-to-avoid/ */

export default function VentaBase(props){
 const [venta, setVenta] = useState( {
        fkcliente: -1,
        fkdestinatario: -1,
        fkmedico: -1,
        fkos: -1,
        fkusuario: globals.obtenerUID(),
        mp: null,
        subtotal: 0,
        descuento: 0,
        total: 0,
        fechaRetiro: null,
        comentarios: "",
        productos: null,
        fksucursal: globals.obtenerSucursal(),
        fkcaja: globals.obtenerCaja(),

    })
    

    const onChange = (field, value) => {
        

        setVenta(
            (venta)=>{
                const __venta = {...venta, [field]:value};
                props?.callback?.(__venta);
                return __venta;
            }
        )
    }

    const finalizar_venta = (e)=>{
        setVenta((venta)=>{
            props?.onfinish?.(venta);
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
                            <SelectCliente  destinatario callback={(value)=>{onChange("fkdestinatario", value)}} />
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
            <Row>
                <Col span={24}>
                    <Form.Item>
                        {props.children}
                    </Form.Item>
                </Col>
            </Row>
        },
        {
            key: 'paso3',
            label: 'Modo de Pago',
            children: 
            <Row>
                <Col span={24}>
                    <Form.Item>
                        <TotalesVenta 
                        subtotal={typeof props !== 'undefined' ? props.subTotal : "0"}
                        total={ typeof props !== 'undefined' ? props.total : "0"} 
                        callback={(value)=>{onChange("descuento", value)}} 
                        />
                        <ModoPago  total={ typeof props !== 'undefined' ? props.total : "0"} callback={(value)=>{onChange("mp", value)}} />
                    </Form.Item>
                </Col>
            </Row>
        },
        {
            key: 'paso4',
            label: 'Finalizar Sobre',
            children: 
            <Row>
                <Col span="12">
                    <Form.Item label={"Fecha de Retiro"}>
                        <DatePicker format={"DD-MM-YYYY"} onChange={(value)=>{onChange("fechaRetiro", value.format("DD-MM-YYYY"))}} />
                    </Form.Item>
                </Col>
                <Col span="12">
                    <Form.Item label={"Hora de Retiro"}>
                        <TimePicker format={'HH:mm'}  onChange={(value)=>{onChange("horaRetiro", value)}} />
                    </Form.Item>
                </Col>
                <Col span="24">
                    <Form.Item label={"Comentarios"}>
                    <Input.TextArea rows={2} onChange={(e)=>{onChange("comentarios", e.target.value)}} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Button type="primary" block onClick={finalizar_venta}>Imprimir Sobre</Button>
                    </Form.Item>
                </Col>
            </Row>
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