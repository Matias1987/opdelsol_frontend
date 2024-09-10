import ModoPago from "@/components/forms/ModoPago";
import SelectCliente from "@/components/forms/ventas/SelectCliente";
import SelectMedico from "@/components/forms/ventas/SelectMedico";
import SelectObraSocial from "@/components/forms/ventas/SelectObraSocial";
import TotalesVenta from "@/components/forms/ventas/TotalVenta";
import globals from "@/src/globals";
import { Button, Col, DatePicker, Form, Input, Row, Tabs, TimePicker } from "antd";
import esES from "antd/locale/es_ES"
import { useState } from "react";
//import ModoPagoV2 from "../modo_pago/ModoPagoV2";
import ModoPagoV3 from "../modo_pago/ModoPagoV3";

/* leer: https://refine.dev/blog/common-usestate-mistakes-and-how-to-avoid/ */
/**
 * 
 * @param ocultarFechaRetiro
 * @returns 
 */
export default function VentaBase(props){
 const [btnEnabled, setBtnEnabled] = useState(true)
 const [venta, setVenta] = useState( {
        fkcliente: null,
        fkdestinatario: null,
        fkmedico: null,
        fkos: null,
        fkusuario: globals.obtenerUID(),
        mp: null,
        subtotal: 0,
        descuento: 0,
        total: 0,
        fechaRetiro: null,
        horaRetiro: null,
        comentarios: "",
        productos: null,
        fksucursal: globals.obtenerSucursal(),
        fkcaja: globals.obtenerCajaID(),
        json_items:'',

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
        setBtnEnabled(false)
        setVenta((venta)=>{
            props?.onfinish?.(venta, _=>{setBtnEnabled(true)});
            return venta;
        })
        
    }

    const onFinish = (values)=>{}
    
    const onFinishFailed = (error)=>{}

    const tabs_items = [
        {
            key: 'paso1',
            label: <span style={{fontWeight:"bold"}}>Cliente y Medico</span>,
            children: 
            <>
            <Row className="table-row-dark"  style={{padding:".9em"}}>
                <Col   span={24} >
                <SelectCliente openButtonText={<span style={{color:"#3300CC"}}>&nbsp;*Seleccione Cliente</span>} callback={(value)=>{onChange("fkcliente", value)}} />
                </Col>
            </Row>
            <Row className="table-row-light" style={{padding:".9em"}}>
                <Col    span={24} >
                <SelectCliente  destinatario callback={(value)=>{onChange("fkdestinatario", value)}} />
                </Col>
            </Row>
            <Row className="table-row-dark" style={{padding:".9em"}}>
                <Col  span={24}>
                <SelectMedico  openButtonText={<span style={{color:"#3300CC"}}>&nbsp;*Seleccione M&eacute;dico</span>} callback={(value)=>{onChange("fkmedico", value)}} />
                </Col>
            </Row>
           
           
            <Row className="table-row-light" style={{padding:".9em"}} >
                <Col   span={24}>
                <SelectObraSocial callback={(value)=>{onChange("fkos", value)}} />
                </Col>
            </Row>
            </>
        },
        {
            key: 'paso2',
            label: <span style={{fontWeight:"bold"}}>Productos</span>,
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
            label: <span style={{fontWeight:"bold"}}>Modo de Pago</span>,
            children: 
            <Row>
                <Col span={24}>
                    <Form.Item>
                        <TotalesVenta 
                        subtotal={typeof props !== 'undefined' ? props.subTotal : "0"}
                        total={ typeof props !== 'undefined' ? props.total : "0"} 
                        callback={(value)=>{onChange("descuento", value)}} 
                        />
                        {<ModoPagoV3  
                        total={ typeof props !== 'undefined' ? props.total : "0"} 
                        callback={(value)=>{onChange("mp", value)}}
                        tarjetaHidden={false}
                        ctacteHidden={false}
                        chequeHidden={false}
                        mutualHidden={false}
                        />}
                        {/*<ModoPagoV2 />*/}
                    </Form.Item>
                </Col>
            </Row>
        },
        {
            /* fecha y hora de entrega opcional */
            key: 'paso4',
            label: <span style={{fontWeight:"bold"}}>Finalizar Sobre</span>,
            children: 
            <Row>
                {
                    props.ocultarFechaRetiro ? <></>
                    :
                    <>
                        <Col span="12">
                            <Form.Item label={"Fecha de Retiro"}>
                                <DatePicker locale={esES} format={"DD-MM-YYYY"} onChange={(value)=>{onChange("fechaRetiro", value.format("DD-MM-YYYY"))}} />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item label={"Hora de Retiro"}>
                                <TimePicker format={'HH:mm'}  onChange={(value,timeString)=>{onChange("horaRetiro", timeString)}} />
                            </Form.Item>
                        </Col>
                    </>
                    
                }
                <Col span="24">
                    <Form.Item label={"Comentarios"}>
                    <Input.TextArea rows={2} onChange={(e)=>{onChange("comentarios", e.target.value)}} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Button style={{borderRadius:"0"}} disabled={!btnEnabled} type="primary" block onClick={finalizar_venta}>Imprimir Sobre</Button>
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