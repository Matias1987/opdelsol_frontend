import ModoPago from "@/components/forms/ventas/ModoPago";
import SelectCliente from "@/components/forms/ventas/SelectCliente";
import SelectMedico from "@/components/forms/ventas/SelectMedico";
import RecStockArmazon from "@/components/forms/ventas/receta_stock/Armazon";
import RecStockCristal from "@/components/forms/ventas/receta_stock/Cristal";
import { Button, Divider, Form } from "antd";

export default function VentaRecetaStock(){
    return (
    <>
    <Form>
    <Form.Item>
        <SelectCliente />
    </Form.Item>
    <Form.Item>
        <SelectCliente destinatario={true} />
    </Form.Item>
    <Form.Item>
        <SelectMedico />
    </Form.Item>
    <Form.Item>
        {/* Lejos */}
        <RecStockCristal tipo='LEJOS_OD' />
    </Form.Item>
    <Form.Item>    
        <RecStockCristal tipo='LEJOS_OI' />
    </Form.Item>
    <Form.Item>    
        <RecStockArmazon tipo='LEJOS' />
    </Form.Item>
    <Form.Item>
        {/* Cerca */}
        <RecStockCristal tipo='CERCA_OD' />
    </Form.Item>
    <Form.Item>    
        <RecStockCristal tipo='CERCA_OI' />
    </Form.Item>
    <Form.Item>    
        <RecStockArmazon tipo='CERCA' />
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