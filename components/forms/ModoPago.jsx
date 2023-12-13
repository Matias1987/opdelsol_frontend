import { Button, Checkbox, Col, Divider, Input, Row, Select, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import { DeleteFilled, ForwardFilled, PlayCircleFilled, PlaySquareFilled, PlaySquareTwoTone, RedoOutlined, RightCircleFilled } from "@ant-design/icons";
import { get } from "@/src/urls";
import { round_float } from "@/src/helpers/string_helper";

/**
 * 
 * @param total total ammount (required) 
 * @param ctacteHidden  
 * @param tarjetaHidden  
 */
export default function ModoPago(props){
    const [tarjetas, setTarjetas] = useState(null)
    const [bancos, setBancos] = useState(null)
    const [mpLoaded, setMPLoaded] = useState(false)
    const [dataCuotas, setDataCuotas] = useState([])
    const [total, setTotal] = useState(0)
    const [modoPago, setModoPago] = useState({
        efectivo_monto: 0,
        tarjeta_monto: 0,
        tarjeta_tarjeta: 0,
        fk_tarjeta: null,
        tarjeta_nro: "",
        fk_banco: null,
        ctacte_monto: 0,
        ctacte_cuotas: 0,
        ctacte_monto_cuotas: 0,
        ctacte_interes: 1,
        cheque_monto: 0,
        mutual_monto: 0,
        mutual_mutual: 0,
        total: 0,
        saldo: 0,
    })
    useEffect(()=>{

        if(typeof props.total !== 'undefined')
        {
            setTotal(props.total)
        }

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
                                            _temp = {..._temp,ctacte_monto: r.monto, ctacte_cuotas: r.cant_cuotas, ctacte_monto_cuotas: r.monto_cuota, ctacte_interes: 1 }
                                            
                                            break;
                                        case 'cheque':
                                            _temp = {..._temp,cheque_monto: r.monto, fk_banco: r.banco_idbanco}
                                            
                                            break;
                                        case 'mutual':
                                            _temp = {..._temp,mutual_monto: r.monto}
                                            
                                            break;
                                        case 'tarjeta':
                                            _temp = {..._temp,tarjeta_monto: r.monto, fk_tarjeta: r.fk_tarjeta, tarjeta_nro: r.tarjeta_nro, tarjeta_tarjeta: r.cant_cuotas}
                                            
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

                                    _temp.saldo = (props?.total||0) - _temp.total
                                    props?.callback?.(_temp)

                                    return _temp
                                })
                            })
                }
            }
    }

    if(!props.ctacteHidden)
    {
        fetch(get.obtener_interes_cuota)
        .then(r=>r.json())
        .then((response)=>{

            setDataCuotas(
                response.data.map(
                    r=>({
                        value: r.cantidad_cuotas,
                        label: r.cantidad_cuotas,
                        interes: r.interes,
                        cantidad_cuotas: r.cantidad_cuotas,
                    })
                )
            )
            
        })
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
            
            _mp.saldo = total - _mp.total

            props?.callback?.(_mp);
            return _mp;
        })
    }

    const onChangeMontoCtaCte = (value) => {
        setModoPago( modoPago =>
            {
                let _total = parseFloat(modoPago.cheque_monto||0)+
                parseFloat(value||0)+
                parseFloat(modoPago.tarjeta_monto||0)+
                parseFloat(modoPago.mutual_monto||0)+
                parseFloat(modoPago.efectivo_monto||0)
                const _mp = {
                    ...modoPago,
                    ["ctacte_monto"]: value.length<1 ? 0 : parseFloat(value),
                    ["ctacte_cuotas"]:0,
                    ["ctacte_monto_cuotas"]: 0,
                    ["total"]:  _total,
                    ["saldo"]:  total - _total,
                    };
                
                props?.callback?.(_mp);
                return _mp;
            })
    }


    const button_mp_row = (index) => <>
        <Col span={1}><Button size="small"><RightCircleFilled /></Button></Col>
    </>

    return (
        (tarjetas == null || bancos == null) ? <Spin  /> :
    <>
        <h5>Modo de Pago</h5>
        <>
            <Row>
                <Col span={8} >
                    <Input 
                    type="number" 
                    min={0} 
                    step={0.01} 
                    onClick={(e)=>{e.target.select()}} 
                    value={modoPago.efectivo_monto}  
                    /*prefix={<><Button type="link" onClick={()=>{ if(modoPago.saldo<0){return} onChange("efectivo_monto",modoPago.saldo)}}>Efectivo</Button></> }*/
                    prefix="Efectivo: " 
                    onChange={(e)=>{onChange("efectivo_monto", e.target.value.length<1 ? 0 : e.target.value)}}
                    />
                </Col>
            </Row>

            <Row style={{display: props.tarjetaHidden ? "none" : "flex"}}>
                <Col span={6}>
                    <Input 
                    type="number" 
                    min={0} 
                    step={0.01}  
                    onClick={(e)=>{e.target.select()}} 
                    value={modoPago.tarjeta_monto}  
                    /*prefix={<><Button type="link" onClick={()=>{ if(modoPago.saldo<0){return} onChange("tarjeta_monto",modoPago.saldo)}}>Tarjeta</Button></> }*/
                    prefix="Tarjeta: "  
                    onChange={(e)=>{onChange("tarjeta_monto", e.target.value.length<1 ? 0 : e.target.value)}} 
                    />
                </Col>
                <Col span={9}> 
                    
                    <Select placeholder="Seleccione Tarjeta" value={modoPago.fk_tarjeta} options={tarjetas} style={{width:'100%'}} onChange={(value)=>{onChange("fk_tarjeta", value)}} />
                </Col>

                <Col span={4}><Input value={modoPago.tarjeta_nro}  onClick={(e)=>{e.target.select()}}  prefix="Nro.: " onChange={(e)=>{onChange("tarjeta_nro", e.target.value)}}></Input></Col>
                
                <Col span={4}><Input value={modoPago.tarjeta_tarjeta}  onClick={(e)=>{e.target.select()}}  prefix="C. Cuotas: " onChange={(e)=>{onChange("tarjeta_tarjeta", e.target.value)}}></Input></Col>
                
            </Row>
            
            <Row style={{display: props.ctacteHidden  ? "none" : "flex"}}>
                <Col span={11}>
                    <Input 
                    type="number" 
                    onClick={(e)=>{e.target.select()}} 
                    value={modoPago.ctacte_monto} 
                    /*prefix={<><Button type="link" onClick={()=>{ if(modoPago.saldo<0){return} onChangeMontoCtaCte(modoPago.saldo)}}>Cta. Cte.: </Button></>} */
                    prefix="Cta. Cte.: " 
                    onChange={(e)=>{onChangeMontoCtaCte(e.target.value)}} 
                    />
                </Col>
                <Col span={1}>Cuotas</Col>
                <Col span={3}>
                    <Select options={dataCuotas} value={modoPago.ctacte_cuotas} onChange={(v)=>{
                        
                        const _i = dataCuotas.find(r=>+r.cantidad_cuotas ==+v)
                        if(_i)
                        {
                           
                           setModoPago( modoPago =>
                            {
                                let _total = parseFloat(modoPago.cheque_monto||0)+
                                parseFloat(modoPago.ctacte_monto||0)+
                                parseFloat(modoPago.tarjeta_monto||0)+
                                parseFloat(modoPago.mutual_monto||0)+
                                parseFloat(modoPago.efectivo_monto||0)

                                const _mp = {
                                    ...modoPago,
                                    ["ctacte_interes"]: _i.interes,
                                    ["ctacte_cuotas"]:v,
                                    ["ctacte_monto_cuotas"]:  (round_float(parseFloat(_i.interes) * (parseFloat(modoPago.ctacte_monto)/parseFloat(v)))).toFixed(2),
                                    ["total"]:  _total,
                                    ["saldo"]:  total - _total,
                                    };

                                props?.callback?.(_mp);
                                return _mp;
                            }
                           )
                        }
                        }
                        } />
                </Col>
                <Col span={8}><Input  type="number" readOnly={false} onClick={(e)=>{e.target.select()}} value={modoPago.ctacte_monto_cuotas}  prefix="Valor Cuota: " onChange={(e)=>{onChange("ctacte_monto_cuotas", parseFloat(e.target.value))}}></Input></Col>
            </Row>
            <Row>
                <Col span={9}>
                    <Input 
                    type="number" 
                    onClick={(e)=>{e.target.select()}} 
                    value={modoPago.cheque_monto} 
                    /*prefix={<><Button type="link" onClick={()=>{ if(modoPago.saldo<0){return} onChange("cheque_monto",modoPago.saldo)}}>Cheque</Button></> }*/
                    prefix="Cheque: "  
                    onChange={(e)=>{onChange("cheque_monto", e.target.value.length<1 ? 0 : e.target.value)}}
                    />
                </Col>
                <Col span={14}>
                    &nbsp;Banco:&nbsp;<Select value={modoPago.fk_banco} placeholder="Seleccione Banco" style={{width:"300px"}} options={bancos} onChange={(value)=>{onChange("fk_banco",value)}} />
                </Col>
            </Row>

            <Row>
                <Col span={9}>
                    <Input 
                    type="number" 
                    onClick={(e)=>{e.target.select()}} 
                    value={modoPago.mutual_monto}  
                    /*prefix={<><Button type="link" onClick={()=>{ if(modoPago.saldo<0){return} onChange("mutual_monto",modoPago.saldo)}}>Mutual</Button></> }*/
                    prefix="Mutual: " 
                    onChange={(e)=>{onChange("mutual_monto", e.target.value.length<1 ? 0 : e.target.value)}}
                    />
                    
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
                                tarjeta_nro:0,
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
                    <Input readOnly prefix="Saldo"  bordered={false} style={{color:"red", fontWeight:'bold', backgroundColor:'rgba(255, 99, 71, 0.2)'}} value={  (typeof props.total === 'undefined' ? 0 : props.total)-modoPago.total} />
                </Col>
            </Row>
            }
        </>
    </>)}