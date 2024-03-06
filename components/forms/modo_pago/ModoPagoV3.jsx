import { Button, Checkbox, Col, Divider, Input, Row, Select, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { DeleteFilled, ForwardFilled, PlayCircleFilled, PlaySquareFilled, PlaySquareTwoTone, RedoOutlined, RightCircleFilled } from "@ant-design/icons";
import { get } from "@/src/urls";
import { round_float } from "@/src/helpers/string_helper";

/**
 * 
 * @param total total ammount (required) 
 * @param ctacteHidden  
 * @param tarjetaHidden  
 */
export default function ModoPagoV3(props){
    const [efectivoChecked, setEfectivoChecked] = useState(false)
    const [tarjetaChecked, setTarjetaChecked] = useState(false)
    const [ctacteChecked, setCtaCteChecked] = useState(false)
    const [chequeChecked, setChequeChecked] = useState(false)
    const [mutualChecked, setMutualChecked] = useState(false)
    const [mercadopagoChecked, setMercadoPagoChecked] = useState(false)
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
        tarjeta_nro: "0",
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
        mercadopago_monto:0,
    })

    useEffect(()=>{

        setEfectivoChecked(false)
        setTarjetaChecked(false)
        setCtaCteChecked(false)
        setChequeChecked(false)
        setMutualChecked(false)
        setMercadoPagoChecked(false)

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

                              
                                setMPLoaded(true)
                                
                                var _temp = JSON.parse(JSON.stringify(modoPago));
                     
                                response.data.forEach(r=>{
                                    switch(r.modo_pago)
                                    {
                                        case 'efectivo':
                                            _temp = {..._temp,efectivo_monto: r.monto}
                                            setEfectivoChecked(true)
                                            break;
                                        case 'ctacte':
                                            _temp = {..._temp,ctacte_monto: r.monto, ctacte_cuotas: r.cant_cuotas, ctacte_monto_cuotas: r.monto_cuota, ctacte_interes: 1 }
                                            setCtaCteChecked(true)
                                            break;
                                        case 'cheque':
                                            _temp = {..._temp,cheque_monto: r.monto, fk_banco: r.banco_idbanco}
                                            setChequeChecked(true)
                                            break;
                                        case 'mutual':
                                            _temp = {..._temp,mutual_monto: r.monto}
                                            setMutualChecked(true)
                                            break;
                                        case 'tarjeta':
                                            _temp = {..._temp,tarjeta_monto: r.monto, fk_tarjeta: r.fk_tarjeta, tarjeta_nro: r.tarjeta_nro, tarjeta_tarjeta: r.cant_cuotas}
                                            setTarjetaChecked(true)
                                            break;
                                        case 'mercadopago':
                                            _temp = {..._temp,mercadopago_monto: r.monto}
                                            setMercadoPagoChecked(true)
                                            break;
                                    }
                                })

                                setModoPago(t=>
                                {
                                    _temp.total =   parseFloat(_temp.cheque_monto||0)+
                                                    parseFloat(_temp.ctacte_monto||0)+
                                                    parseFloat(_temp.tarjeta_monto||0)+
                                                    parseFloat(_temp.mutual_monto||0)+
                                                    parseFloat(_temp.efectivo_monto||0)+
                                                    parseFloat(_temp.mercadopago_monto||0)
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
                        parseFloat(_mp.efectivo_monto||0)+
                        parseFloat(_mp.mercadopago_monto||0)
                        
                        ;
            
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
                parseFloat(modoPago.efectivo_monto||0)+
                parseFloat(modoPago.mercadopago_monto||0)
                ;
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
    <Row>
        <Col span={24}>
            <Divider />
        </Col>
    </Row>
        <Row style={{backgroundColor:"rgba(0,255,0,0.1)"}}>
            <Col span={6} >
                <b>Modo de Pago</b>
            </Col>
            <Col span={12} style={{backgroundColor:"rgba(0,255,0,0.2)", padding:".3em"}}>
                <Checkbox checked={efectivoChecked} onChange={(e)=>{
                    setEfectivoChecked(!efectivoChecked)
                    
                    if(false==e.target.checked){
                        //reset efectivo values
                        onChange("efectivo_monto",0)
                    }
                }}>Efectivo</Checkbox>
                <Checkbox disabled={props.tarjetaHidden} checked={tarjetaChecked} onChange={(e)=>{
                    setTarjetaChecked(!tarjetaChecked)
                    if(false==e.target.checked){
                        onChange("tarjeta_monto", 0)
                    }
                }}>Tarjeta</Checkbox>
                <Checkbox disabled={props.ctacteHidden} checked={ctacteChecked} onChange={(e)=>{
                    setCtaCteChecked(!ctacteChecked)
                    if(false==e.target.checked)
                    {
                        onChangeMontoCtaCte(0)
                    }
                    
                }}>CtaCte</Checkbox>
                <Checkbox disabled={props.chequeHidden} checked={chequeChecked} onChange={(e)=>{
                    setChequeChecked(!chequeChecked)
                    if(false==e.target.checked)
                    {
                        onChange("cheque_monto", 0)
                    }
                }}>Cheque</Checkbox>
                <Checkbox disabled={props.mutualHidden} checked={mutualChecked} onChange={(e)=>{
                    setMutualChecked(!mutualChecked)
                    if(false==e.target.checked)
                    {
                        onChange("mutual_monto", 0)
                    }
                    
                }}>Mutual</Checkbox>
                
                <Checkbox checked={mercadopagoChecked} onChange={(e)=>{
                    setMercadoPagoChecked(!mercadopagoChecked)
                    if(false==e.target.checked)
                    {
                        onChange("mercadopago_monto", 0)
                    }
                }}>MercadoPago</Checkbox>
            </Col>
        </Row>
        
        <>
            <Row style={{display: efectivoChecked ? "flex" : "none", backgroundColor:"rgba(244,232,179,0.5)", padding:"2px"}}>
                <Col span={8} >
                    <Input 
                    type="number" 
                    min={0} 
                    step={0.01} 
                    onClick={(e)=>{e.target.select()}} 
                    value={modoPago.efectivo_monto}  
                    /*prefix={<><Button type="link" onClick={()=>{ if(modoPago.saldo<0){return} onChange("efectivo_monto",modoPago.saldo)}}>Efectivo</Button></> }*/
                    prefix={<b>Efectivo: </b>} 
                    onChange={(e)=>{onChange("efectivo_monto", e.target.value.length<1 ? 0 : parseFloat(e.target.value))}}
                    />
                </Col>
            </Row>

            <Row style={{display: tarjetaChecked ? "flex" : "none", backgroundColor:"rgba(240,191,161,0.5)", padding:"2px"}}>
                <Col span={6}>
                    <Input 
                    type="number" 
                    min={0} 
                    step={0.01}  
                    onClick={(e)=>{e.target.select()}} 
                    value={modoPago.tarjeta_monto}  
                    /*prefix={<><Button type="link" onClick={()=>{ if(modoPago.saldo<0){return} onChange("tarjeta_monto",modoPago.saldo)}}>Tarjeta</Button></> }*/
                    prefix={<b>Tarjeta: </b>} 
                    onChange={(e)=>{onChange("tarjeta_monto", e.target.value.length<1 ? 0 : parseFloat(e.target.value))}} 
                    />
                </Col>
                <Col span={9}> 
                    
                    <Select 
                    showSearch
                    placeholder="Seleccione Tarjeta" 
                    value={modoPago.fk_tarjeta} 
                    options={tarjetas} 
                    style={{width:'100%'}} 
                    onChange={(value)=>{onChange("fk_tarjeta", value)}} 
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label.toUpperCase() ?? '').includes(input.toUpperCase())}
                    filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    />
                </Col>

                
                <Col span={4}><Input value={modoPago.tarjeta_tarjeta}  onClick={(e)=>{e.target.select()}}  prefix="C. Cuotas: " onChange={(e)=>{onChange("tarjeta_tarjeta", parseFloat(e.target.value))}}></Input></Col>
                
            </Row>
            
            <Row style={{display: ctacteChecked ? "flex" : "none", backgroundColor:"rgba(235,177,172,0.5)", padding:"2px"}}>
                <Col span={11}>
                    <Input 
                    type="number" 
                    onClick={(e)=>{e.target.select()}} 
                    value={modoPago.ctacte_monto} 
                    /*prefix={<><Button type="link" onClick={()=>{ if(modoPago.saldo<0){return} onChangeMontoCtaCte(modoPago.saldo)}}>Cta. Cte.: </Button></>} */
                    prefix={<b>Cta. Cte.: </b>} 
                    onChange={(e)=>{onChangeMontoCtaCte(e.target.value)}} 
                    />
                </Col>
                <Col span={1}>Cuotas</Col>
                <Col span={3}>
                    <Select 
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => (option.label.toString() == input.toString())}
                    
                    options={dataCuotas} 
                    value={modoPago.ctacte_cuotas} 
                    onChange={(v)=>{
                        
                        const _i = dataCuotas.find(r=>+r.cantidad_cuotas ==+v)
                        if(_i)
                        {
                           
                           setModoPago( modoPago =>
                            {
                                let _total = parseFloat(modoPago.cheque_monto||0)+
                                parseFloat(modoPago.ctacte_monto||0)+
                                parseFloat(modoPago.tarjeta_monto||0)+
                                parseFloat(modoPago.mutual_monto||0)+
                                parseFloat(modoPago.efectivo_monto||0)+
                                parseFloat(modoPago.mercadopago_monto||0)
                                ;

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
            <Row style={{display:  chequeChecked ? "flex" : "none", backgroundColor:"rgba(204,182,192,0.5) ", padding:"2px"}}>
                <Col span={9}>
                    <Input 
                    type="number" 
                    onClick={(e)=>{e.target.select()}} 
                    value={modoPago.cheque_monto} 
                    /*prefix={<><Button type="link" onClick={()=>{ if(modoPago.saldo<0){return} onChange("cheque_monto",modoPago.saldo)}}>Cheque</Button></> }*/
                    prefix={<b>Cheque: </b>} 
                    onChange={(e)=>{onChange("cheque_monto", e.target.value.length<1 ? 0 : parseFloat(e.target.value))}}
                    />
                </Col>
                <Col span={14}>
                    &nbsp;Banco:&nbsp;
                    <Select 
                    showSearch 
                    value={modoPago.fk_banco} 
                    placeholder="Seleccione Banco" 
                    style={{width:"300px"}} 
                    options={bancos} 
                    onChange={(value)=>{onChange("fk_banco",value)}} 
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label.toUpperCase() ?? '').includes(input.toUpperCase())}
                    filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    />
                </Col>
            </Row>

            <Row  style={{display: mutualChecked ? "flex": "none", backgroundColor:"rgba(207,186,235,0.5) ", padding:"2px"}}>
                <Col span={9}>
                    <Input 
                    type="number" 
                    onClick={(e)=>{e.target.select()}} 
                    value={modoPago.mutual_monto}  
                    /*prefix={<><Button type="link" onClick={()=>{ if(modoPago.saldo<0){return} onChange("mutual_monto",modoPago.saldo)}}>Mutual</Button></> }*/
                    prefix={<b>Mutual: </b>} 
                    onChange={(e)=>{onChange("mutual_monto", e.target.value.length<1 ? 0 : parseFloat(e.target.value))}}
                    />
                    
                </Col>
            </Row>
            <Row style={{display: mercadopagoChecked? "flex" : "none", backgroundColor:"rgba(161,196,231,0.5)", padding:"2px"}}>
                <Col span={9}>
                    <Input
                    type="number"
                    prefix={<b>Mercado Pago: </b>} 
                    onChange={(e)=>{onChange("mercadopago_monto", e.target.value.length<1 ? 0 : parseFloat(e.target.value))}} 
                    value={modoPago.mercadopago_monto}  
                    onClick={(e)=>{e.target.select()}} 
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    &nbsp;
                </Col>
            </Row>

            {/*<Row>
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
                                mercadopago_monto:0,
                            }
                            props?.callback?.(___mp)
                            return ___mp
                        })
                    }
                }}><RedoOutlined /></Button></Col>
            </Row>*/}

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