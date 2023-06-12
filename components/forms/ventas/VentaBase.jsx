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

    const [idcliente, setIdCliente] = useState(-1);
    const [iddestinatario, setIdDestinatario] = useState(-1);
    const [idmedico, setIdMedico] = useState(-1);
    const [idos, setIdOS] = useState(-1);
    const [productos,setProductos] = useState([])
    const [mp,setMP] = useState([])
    const [descuento,setDescuento] = useState(0)
    const [total,setTotal] = useState(0)


    const _venta = {
        fkcliente: -1,
        fkdestinatario: -1,
        fkmedico: -1,
        fkos: -1,
        //productos: null,
        mp: null,
        subtotal: 0,
        descuento: 0,
        total: 0,
        fechaRetiro: null,
        comentarios: "",

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


    const callback_mp = (values) => {
        _venta.mp = values;
    }

    const finalizar_venta = (e)=>{
        props.onfinish(_venta)
    }

    const onFinish = (values)=>{}
    
    const onFinishFailed = (error)=>{}

    const tabs_items = [
        {
            key: '1paso',
            label: 'Cliente y Medico',
            children: 
            <>
            <Row>
                    <Col span={24} >
                        <Form.Item>
                            <SelectCliente idcliente={idcliente} callback={callback_cliente} />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item>
                            <SelectCliente destinatario={true} iddestinatario={iddestinatario} callback={callback_destinatario} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item>
                            <SelectMedico idmedico={idmedico} callback={callback_medico} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item>
                            <SelectObraSocial callback={callback_os} />
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
                    <TotalesVenta total={ typeof props !== 'undefined' ? props.total : "0"} />
                    <ModoPago mp={mp} callback={callback_mp} />
                </Form.Item>
            </>
        },
        {
            key: 'paso4',
            label: 'Finalizar Sobre',
            children: 
            <>
                <Form.Item label={"Comentarios"}>
                   <Input.TextArea rows={2} onChange={(v)=>{_venta.comentarios=v}} />
                </Form.Item>
                <Form.Item label={"Fecha de Retiro"}>
                    <DatePicker onChange={(value)=>{_venta.fechaRetiro=value}} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" block onClick={finalizar_venta}>Guardar Venta</Button>
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