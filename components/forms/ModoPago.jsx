import { Button, Checkbox, Col, Divider, Input, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import { DeleteFilled } from "@ant-design/icons";

export default function ModoPago(props){
    const [saldo, setSaldo] = useState(0)
    useEffect(()=>{

        //alert("total vta " + props.total)
        //alert("total mp " +  modoPago.total)
        /*
        setSaldo((s)=>{
            const t = typeof props === 'undefined' ? 0 : props.total;
            return t - modoPago.total
        })*/
    })
    const [modoPago, setModoPago] = useState({
        efectivo_monto: 0,
        tarjeta_monto: 0,
        tarjeta_tarjeta: 0,
        ctacte_monto: 0,
        ctacte_cuotas: 0,
        ctacte_monto_cuotas: 0,
        cheque_monto: 0,
        mutual_monto: 0,
        mutual_mutual: 0,
        total: 0,
    })

   

    const onChange = (index, value) => {
        setModoPago( (modoPago) => { 
            const _mp = {...modoPago,[index]:value};
            _mp.total = parseFloat(_mp.cheque_monto||0)+
                        parseFloat(_mp.ctacte_monto||0)+
                        parseFloat(_mp.tarjeta_monto||0)+
                        parseFloat(_mp.mutual_monto||0)+
                        parseFloat(_mp.efectivo_monto||0);

            props?.callback(_mp);

            /*setSaldo((s)=>{
                const t = typeof props === 'undefined' ? 0 : props.total;
                return t - _mp.total
            })*/

            return _mp;
        })
    }

    return (
    <>
        <h5>Modo de Pago</h5>
        <>
            <Row>
                <Col span={8} >
                    <Input  prefix="Monto Efectivo: " onChange={(e)=>{onChange("efectivo_monto", e.target.value)}}></Input>
                </Col>
                
            </Row>
            <Row>
              
                <Col span={8}><Input   prefix="Monto Tarjeta: " onChange={(e)=>{onChange("tarjeta_monto", e.target.value)}}></Input></Col>
                <Col span={10}><Input   prefix="Tarjeta: " onChange={(e)=>{onChange("tarjeta_tarjeta", e.target.value)}}></Input></Col>
                
            </Row>
            <Row>
                
                <Col span={10}><Input  prefix="Monto Cta. Cte.: " onChange={(e)=>{onChange("ctacte_monto", e.target.value)}}></Input></Col>
                <Col span={4}><Input prefix="Nro Cuotas: " onChange={(e)=>{onChange("ctacte_cuotas", e.target.value)}}></Input></Col>
                <Col span={8}><Input  prefix="Valor Cuota: " onChange={(e)=>{onChange("ctacte_monto_cuotas", e.target.value)}}></Input></Col>
                
            </Row>
            <Row>
                <Col span={8}>
                    <Input  prefix="Monto Cheque: " onChange={(e)=>{onChange("cheque_monto", e.target.value)}}></Input>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Input  prefix="Monto Mutual: " onChange={(e)=>{onChange("mutual_monto", e.target.value)}}></Input>
                    
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Input readOnly prefix="Total"  bordered={false} style={{color:"red"}} value={modoPago.total} />
                </Col>
                <Col span={8}>
                    <Input readOnly prefix="Saldo"  bordered={false} style={{color:"red"}} value={ props.total-modoPago.total} />
                </Col>
            </Row>
        </>
    </>)}