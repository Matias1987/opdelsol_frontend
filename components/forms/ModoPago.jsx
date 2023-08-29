import { Button, Checkbox, Col, Divider, Input, Row, Select, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import { DeleteFilled, RedoOutlined } from "@ant-design/icons";
import { get } from "@/src/urls";

/**
 * 
 * @param total total ammount (required) 
 * @param ctacteHidden  
 * @param tarjetaHidden  
 * @returns 
 */
export default function ModoPago(props){
    const [tarjetas, setTarjetas] = useState(null)
    const [bancos, setBancos] = useState(null)
    const [mpLoaded, setMPLoaded] = useState(false)
    const [modoPago, setModoPago] = useState({
        efectivo_monto: 0,
        tarjeta_monto: 0,
        tarjeta_tarjeta: 0,
        fk_tarjeta: null,
        fk_banco: null,
        ctacte_monto: 0,
        ctacte_cuotas: 0,
        ctacte_monto_cuotas: 0,
        cheque_monto: 0,
        mutual_monto: 0,
        mutual_mutual: 0,
        total: 0,
    })
    useEffect(()=>{

        if(tarjetas==null)
        {
            fetch(get.lista_tarjetas)
            .then(response=>response.json())
            .then((response)=>{
                setTarjetas(
                    response.data.map(t=>({
                        value: t.idtarjeta,
                        label: t.nombre,
                    }))
                )
            })
        }
        if(bancos==null)
        {
            //get bancos
            fetch(get.lista_bancos)
            .then(response=>response.json())
            .then((response)=>{
                setBancos(response.data.map(r=>({
                    value: r.idbanco,
                    label: r.nombre,
                })))
            })
        }

        if(tarjetas!=null && bancos!=null && !mpLoaded){
        
            if(typeof props.idventa !== 'undefined')
            {
                if(props.idventa >0){

                    const _soloCtaCte = typeof props.mostrarSoloCtaCte === 'undefined' ? false : props.mostrarSoloCtaCte

                    const __url = props.mostrarSoloCtaCte ? get.get_venta_mp_ctacte : get.get_venta_mp;
                            

                    fetch(__url + props.idventa)
                            .then(response=>response.json())
                            .then((response)=>{

                                //alert(JSON.stringify(response))

                                setMPLoaded(true)
                                
                                var _temp = JSON.parse(JSON.stringify(modoPago));
                                //alert(__url)
                                response.data.forEach(r=>{
                                    switch(r.modo_pago)
                                    {
                                        case 'efectivo':
                                            _temp = {..._temp,efectivo_monto: r.monto}
                                            
                                            break;
                                        case 'ctacte':
                                            _temp = {..._temp,ctacte_monto: r.monto, ctacte_cuotas: r.cant_cuotas, ctacte_monto_cuotas: r.monto_cuota }
                                            
                                            break;
                                        case 'cheque':
                                            _temp = {..._temp,cheque_monto: r.monto, fk_banco: r.banco_idbanco}
                                            
                                            break;
                                        case 'mutual':
                                            _temp = {..._temp,mutual_monto: r.monto}
                                            
                                            break;
                                        case 'tarjeta':
                                            _temp = {..._temp,tarjeta_monto: r.monto, fk_tarjeta: r.fk_tarjeta}
                                            
                                            break;
                                    }
                                })

                                setModoPago(t=>
                                {
                                    _temp.total =   parseFloat(_temp.cheque_monto||0)+
                                                    parseFloat(_temp.ctacte_monto||0)+
                                                    parseFloat(_temp.tarjeta_monto||0)+
                                                    parseFloat(_temp.mutual_monto||0)+
                                                    parseFloat(_temp.efectivo_monto||0)
                                    ;

                                    props?.callback?.(_temp)

                                    return _temp
                                })
                            })
                }
            }
    }

        if(typeof props === 'undefined'){
            alert("props undefined")
        }
        if(typeof props.total === 'undefined'){
            alert("total undefined")
        }
    },[tarjetas, bancos])

    const onChange = (index, value) => {
        setModoPago( (modoPago) => { 
            const _mp = {...modoPago,[index]:value};
            _mp.total = parseFloat(_mp.cheque_monto||0)+
                        parseFloat(_mp.ctacte_monto||0)+
                        parseFloat(_mp.tarjeta_monto||0)+
                        parseFloat(_mp.mutual_monto||0)+
                        parseFloat(_mp.efectivo_monto||0);

            props?.callback?.(_mp);
            return _mp;
        })
    }

    return (
        (tarjetas == null || bancos == null) ? <Spin  /> :
    <>
        <h5>Modo de Pago</h5>
        <>
            <Row>

                <Col span={8} >
                    <Input onClick={(e)=>{e.target.select()}} value={modoPago.efectivo_monto}  prefix="Efectivo: " onChange={(e)=>{onChange("efectivo_monto", e.target.value)}}></Input>
                </Col>
            </Row>
            <Row style={{display: props.tarjetaHidden ? "none" : "flex"}}>
                <Col span={6}><Input  onClick={(e)=>{e.target.select()}} value={modoPago.tarjeta_monto}  prefix="Tarjeta: " onChange={(e)=>{onChange("tarjeta_monto", e.target.value)}}></Input></Col>
                <Col span={4}><Input  onClick={(e)=>{e.target.select()}}  prefix="Nro.: " onChange={(e)=>{onChange("tarjeta_tarjeta", e.target.value)}}></Input></Col>
                <Col span={14}>
                    Tarjeta: &nbsp;
                    <Select value={modoPago.fk_tarjeta} options={tarjetas} style={{width:'300px'}} onChange={(value)=>{onChange("fk_tarjeta", value)}} />
                </Col>
                
            </Row>
            <Row style={{display: props.ctacteHidden  ? "none" : "flex"}}>
                <Col span={10}><Input onClick={(e)=>{e.target.select()}} value={modoPago.ctacte_monto} prefix="Cta. Cte.: " onChange={(e)=>{onChange("ctacte_monto", e.target.value)}}></Input></Col>
                <Col span={4}><Input onClick={(e)=>{e.target.select()}} value={modoPago.ctacte_cuotas} prefix="Nro Cuotas: " onChange={(e)=>{onChange("ctacte_cuotas", e.target.value)}}></Input></Col>
                <Col span={8}><Input onClick={(e)=>{e.target.select()}} value={modoPago.ctacte_monto_cuotas}  prefix="Valor Cuota: " onChange={(e)=>{onChange("ctacte_monto_cuotas", e.target.value)}}></Input></Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Input onClick={(e)=>{e.target.select()}} value={modoPago.cheque_monto} prefix="Cheque: " onChange={(e)=>{onChange("cheque_monto", e.target.value)}}></Input>
                </Col>
                <Col span={14}>
                    &nbsp;Banco:&nbsp;<Select value={modoPago.fk_banco} placeholder="Seleccione Banco" style={{width:"300px"}} options={bancos} onChange={(value)=>{onChange("fk_banco",value)}} />
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Input onClick={(e)=>{e.target.select()}} value={modoPago.mutual_monto}  prefix="Mutual: " onChange={(e)=>{onChange("mutual_monto", e.target.value)}}></Input>
                    
                </Col>
            </Row>
            <Row>
                <Col span={24}><Button size="small" danger type="link" onClick={(e)=>{
                    if(confirm("Limpiar Campos?")){
                        setModoPago(__mp => {
                            const ___mp = {
                                efectivo_monto: 0,
                                tarjeta_monto: 0,
                                tarjeta_tarjeta: 0,
                                fk_tarjeta: null,
                                fk_banco: null,
                                ctacte_monto: 0,
                                ctacte_cuotas: 0,
                                ctacte_monto_cuotas: 0,
                                cheque_monto: 0,
                                mutual_monto: 0,
                                mutual_mutual: 0,
                                total: 0,
                            }
                            props?.callback?.(___mp)
                            return ___mp
                        })
                    }
                }}><RedoOutlined /></Button></Col>
            </Row>

            {
                props.totalsHidden ?  <></> :
            <Row>
                <Col span={6}>
                    <Input readOnly prefix="Total a Pagar"  bordered={false} style={{color:"red"}} value={props.total} />
                </Col>
                <Col span={9}>
                    <Input readOnly prefix="Pago Total"  bordered={false} style={{color:"red"}} value={modoPago.total} />
                </Col>
                <Col span={9}>
                    <Input readOnly prefix="Saldo"  bordered={false} style={{color:"red"}} value={  (typeof props.total === 'undefined' ? 0 : props.total)-modoPago.total} />
                </Col>
            </Row>
            }
        </>
    </>)}