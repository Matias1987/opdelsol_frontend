import { Button, Col, Input, Row, Select, Table } from "antd";
import { useState } from "react";
import CustomModal from "../CustomModal";
import { DeleteFilled } from "@ant-design/icons";

export default function ModoPago(){
    const [modos, setModos] = useState([]);

    const add_mp = (_modo) => {
        setModos([... modos,_modo] );
    }

    const Modo = (props) => {

        switch(props.tipo){
            case "efectivo": return (
            <>
            <Row>
                <Col span={20}>
                    <Input prefix="Monto Efectivo"></Input>
                    
                </Col>
                <Col span={4}><Button><DeleteFilled /></Button></Col>
            </Row>
            </>)
            case "tarjeta": return (
            <>
            <Row>
                <Col span={12}><Input prefix="Monto Tarjeta"></Input></Col>
                <Col span={8}><Input prefix="Tarjeta"></Input></Col>
                <Col span={4}><Button><DeleteFilled /></Button></Col>
            </Row>
            </>)
            case "ctacte": return (<>
            <Row>
                <Col span={8}><Input prefix="Monto Cta. Cte."></Input></Col>
                <Col span={4}><Input prefix="Nro Cuotas"></Input></Col>
                <Col span={8}><Input prefix="Valor Cuota"></Input></Col>
                <Col span={4}><Button><DeleteFilled /></Button></Col>
            </Row></>)
            case "cheque": return (<>
            <Row>
                <Col span={20}>
                    <Input prefix="Monto Cheque"></Input>
                    
                </Col>
                <Col span={4}><Button><DeleteFilled /></Button></Col>
            </Row></>)
        }
    }

    

    return (
    <>
    
        <h4>Modo de Pago</h4>
        <Select prefix="Agregar Modo:" options={
            [
                {value:"efectivo", label:"Efectivo"},
                {value:"tarjeta", label:"Tarjeta"},
                {value:"ctacte", label:"Cuenta Corriente"},
                {value:"cheque", label:"Cheque"},
            ]
        } 

        onChange={(val)=>{add_mp(val)}}
        
        />
        {modos.map(m=>(<Modo tipo={m}/>))}
    

    </>)}