import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Button, Checkbox, Col, DatePicker, Divider, Input, InputNumber, Row, Select } from "antd";
import { useEffect, useState } from "react";
import esES from "antd/locale/es_ES"
import SelectCuentaBancaria from "@/components/cuenta_bancarias/selectCuentaBancaria";
//onChange={(e)=>{ setPago(  p=>({ ...p, monto: parseFloat(e.target.value.trim()||"0")    })  )  }}
const AgregarPagoProveedor = (props) => {
    const [bancos, setBancos] = useState([])
    const [mpEfectivo, setMpEfectivo] = useState({
        monto:0,
        checked:false,
         fkcta_bancaria:null,
    })
    const [mpCheque, setMpCheque] = useState({

        monto:0,
        checked:false,
        fkbanco:-1,
        fkcta_bancaria:null,
    })
    const [mpTransferencia, setMpTransferencia] = useState({
        monto:0,
        checked:false,
        fkbanco:-1,
        fkcta_bancaria:null,
    })
    const [enabled, setEnabled] = useState(true)
    const [pago, setPago] = useState({
        monto:0,
        fecha: "",
    })
    const [reload, setReload] = useState(false)

    const guardar_click = () =>
    {
        if(pago.monto<=0)
        {
            alert("Monto debe ser mayor a 0")
            return
        }
        if(pago.fecha=="")
        {
            alert("Seleccionar Fecha")
            return
        }
        if(mpCheque.checked)
        {
            if(mpCheque.fkcta_bancaria==null)
            {
                alert("Cuenta no seleccionada para Cheque")
                return
            }
        }

        if(mpTransferencia.checked)
        {
            if(mpTransferencia.fkcta_bancaria==null)
            {
                alert("Cuenta no seleccionada para Transferencia")
                return
            }
        }

        const _data = {...pago,  modo:props.modo, fk_proveedor: props.idproveedor, efectivo: mpEfectivo, cheque: mpCheque, transferencia: mpTransferencia }

        alert(JSON.stringify(_data))

        setEnabled(false)
        post_method(post.insert.pago_proveedor,_data,(resp)=>{
            alert("Datos Guardados")
            props?.callback?.()
        })
    }

    const updateMP = (_efv = null, _cheque = null, _transf = null) =>{
        let total = 0
        
        let efv = (null === _efv ? mpEfectivo : _efv)
        let cheque = (null === _cheque ? mpCheque : _cheque)
        let transf = (null === _transf ? mpTransferencia : _transf)

        setMpEfectivo(efv)
        setMpCheque(cheque)
        setMpTransferencia(transf)

        total += efv.checked ? parseFloat(efv.monto) : 0
        total += cheque.checked ? parseFloat(cheque.monto) : 0
        total += transf.checked ? parseFloat(transf.monto) : 0

        setPago(p=>({...p,monto:total}))

        update()
    }

    const update = _ => setReload(!reload)

    useEffect(()=>{
       fetch(get.lista_bancos)
       .then(r=>r.json())
       .then(resp=>{
        setBancos(_=>resp.data.map(b=>({
            value:b.idbanco,
            label:b.nombre,
        })))
       })
    },[reload])


    return <>
    
        <Row>
            <Col span={24}>
            Fecha
            </Col>
        </Row>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
            <DatePicker locale={esES} format={"DD-MM-YYYY"} onChange={(value)=>{ 
                if(value===null)
                {
                    setPago(_p=>({..._p,fecha:""}))
                    return
                }
                setPago(_p=>({..._p,fecha:value.format("DD-MM-YYYY")}))
            }} />
            </Col>
        </Row>
        <Row style={{padding:"6px", border:"1px solid black", borderRadius:"6px"}}>
            <Col span={24}>
                <Checkbox  onChange={(e)=>{updateMP({...mpEfectivo, checked:!mpEfectivo.checked});}} checked={mpEfectivo.checked}>Efectivo</Checkbox>
                <Checkbox  onChange={(e)=>{updateMP(null,{...mpCheque, checked:!mpCheque.checked});}} checked={mpCheque.checked}>Cheque</Checkbox>
                <Checkbox  onChange={(e)=>{updateMP(null,null,{...mpTransferencia, checked:!mpTransferencia.checked});}} checked={mpTransferencia.checked}>Transferencia</Checkbox>
            </Col>
        </Row>
        {
            mpEfectivo.checked ? 
            <>
            <Row >
                <Col span={24}>
                    <span style={{fontWeight:"bold"}}>Efectivo</span>
                </Col>
            </Row>
            <Row style={{paddingLeft:"16px"}}>
                <Col span={24} style={{padding:"1em"}}>
                    {/*<Input allowClear type="number" onChange={(e)=>{updateMP({...mpEfectivo,monto:(e.target.value.length<1?"0":e.target.value)});}} value={(mpEfectivo.monto)} prefix="Monto: " />*/}
                    <InputNumber 
                    style={{width:"300px"}}
                    prefix="Monto: "
                    onClick={(e)=>{e.target.select()}}
                    onChange={(value)=>{updateMP({...mpEfectivo,monto:(value||"").toString().length<1?"0":value.toString()});}} 
                    value={(mpEfectivo.monto)} 
                    />
                </Col>
            </Row>
            </>
            :
            <></>
        }
        {
            mpCheque.checked ? 
            <>
            <Row >
                <Col span={24}>
                    <span style={{fontWeight:"bold"}}>Cheque</span>
                </Col>
            </Row>
            <Row style={{paddingLeft:"16px"}}>
                <Col span={24}>
                    <Row style={{padding:"1em"}}>
                        <Col span={24}>
                            {/*<Input allowClear type="number" onChange={(e)=>{updateMP(null,{...mpCheque,monto:(e.target.value.length<1?"0":e.target.value)});}} value={(mpCheque.monto)} prefix="Monto: " />*/}
                            <InputNumber 
                            style={{width:"300px"}}
                            prefix="Monto: "
                            onClick={(e)=>{e.target.select()}}
                            onChange={(value)=>{updateMP(null,{...mpCheque,monto:(value||"").toString().length<1?"0":value.toString()});}} 
                            value={(mpCheque.monto)} 
                            />
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            Cuenta
                        </Col>
                    </Row>
                    <Row style={{padding:"1em"}}>
                        <Col span={24}>
                            {/*<Select options={bancos} style={{width:"300px"}} onChange={(v)=>{setMpCheque(mp=>({...mp,fkbanco:v}))}} />*/}
                            <SelectCuentaBancaria callback={(v)=>{setMpCheque(mp=>({...mp,fkcta_bancaria:v}))}} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            
            </>
            :
            <></>
        }
        {
            mpTransferencia.checked ? 
            <>
            <Row >
                <Col span={24}>
                    <span style={{fontWeight:"bold"}}>Transferencia</span>
                </Col>
            </Row>
            <Row style={{paddingLeft:"16px"}}>
                <Col span={24}>
                    <Row style={{padding:"1em"}}>
                        <Col span={24}>
                            {/*<Input allowClear type="number" onChange={(e)=>{updateMP(null,null,{...mpTransferencia,monto:(e.target.value.length<1?"0":e.target.value)});}} value={(mpTransferencia.monto)} prefix="Monto: " />*/}
                            <InputNumber 
                            style={{width:"300px"}}
                            prefix="Monto: "
                            onClick={(e)=>{e.target.select()}} 
                            onChange={(value)=>{updateMP(null,null,{...mpTransferencia,monto:(value||"").toString().length<1?"0":value.toString()});}} 
                            value={(mpTransferencia.monto)} 
                            />
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            Cuenta
                        </Col>
                    </Row>
                    <Row style={{padding:"1em"}}>
                        <Col span={24}>
                            {/*<Select options={bancos} style={{width:"300px"}}  onChange={(v)=>{setMpTransferencia(mp=>({...mp,fkbanco:v}))}} />*/}
                            <SelectCuentaBancaria callback={(v)=>{setMpTransferencia(mp=>({...mp,fkcta_bancaria:v}))}} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            </>
            :
            <></>
        }
        <Row>
            <Col span={24}>
            Monto Total
            </Col>
        </Row>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Input readOnly value={parseFloat(pago.monto||"0").toLocaleString(2)}  />
            </Col>
        </Row>
        
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Divider />
                <Button type="primary" block onClick={guardar_click} disabled={!enabled}>Agregar</Button>
            </Col>
        </Row>
    </>
}

export default AgregarPagoProveedor;