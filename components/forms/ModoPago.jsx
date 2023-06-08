import { Button, Col, Divider, Input, Row, Select, Table } from "antd";
import { useState } from "react";
import CustomModal from "../CustomModal";
import { DeleteFilled } from "@ant-design/icons";

export default function ModoPago(props){
    const [modos, setModos] = useState([]);

    const modo_pago = {
        efectivo_monto: 0,
        tarjeta_monto: 0,
        tarjeta_tarjeta: 0,
        ctacte_monto: 0,
        ctacte_cuotas: 0,
        ctacte_monto_cuotas: 0,
        cheque_monto: 0,
        mutual_monto: 0,
        mutual_mutual: 0,
    }



    const add_mp = (_modo) => {
        setModos([... modos,_modo] );
    }

    const Modo = () => (
        <>
            <Row>
                <Col span={20}>
                    <Input prefix="Monto Efectivo: " onChange={(e)=>{modo_pago.efectivo_monto = e.target.value;props.callback(modo_pago)}}></Input>
                    
                </Col>
                <Col span={4}><Button><DeleteFilled /></Button></Col>
            </Row>
            <Row>
                <Col span={12}><Input prefix="Monto Tarjeta: " onChange={(e)=>{modo_pago.tarjeta_monto = e.target.value;props.callback(modo_pago)}}></Input></Col>
                <Col span={8}><Input prefix="Tarjeta: " onChange={(e)=>{modo_pago.tarjeta_tarjeta = e.target.value;props.callback(modo_pago)}}></Input></Col>
                <Col span={4}><Button><DeleteFilled /></Button></Col>
            </Row>
            <Row>
                <Col span={8}><Input prefix="Monto Cta. Cte.: " onChange={(e)=>{modo_pago.ctacte_monto = e.target.value;props.callback(modo_pago)}}></Input></Col>
                <Col span={4}><Input prefix="Nro Cuotas: " onChange={(e)=>{modo_pago.ctacte_cuotas = e.target.value;props.callback(modo_pago)}}></Input></Col>
                <Col span={8}><Input prefix="Valor Cuota: " onChange={(e)=>{modo_pago.ctacte_monto_cuotas = e.target.value;props.callback(modo_pago)}}></Input></Col>
                <Col span={4}><Button><DeleteFilled /></Button></Col>
            </Row>
            <Row>
                <Col span={20}>
                    <Input prefix="Monto Cheque: " onChange={(e)=>{modo_pago.cheque_monto = e.target.value;props.callback(modo_pago)}}></Input>
                    
                </Col>
                <Col span={4}><Button><DeleteFilled /></Button></Col>
            </Row>
            <Row>
                <Col span={20}>
                    <Input prefix="Monto Mutual: " onChange={(e)=>{modo_pago.mutual_monto = e.target.value;props.callback(modo_pago)}}></Input>
                    
                </Col>
                <Col span={4}><Button><DeleteFilled /></Button></Col>
            </Row>
        </>
        )

    

    return (
    <>
        
        <h4>Modo de Pago</h4>
        
        <Divider />
        <Modo />
    

    </>)}