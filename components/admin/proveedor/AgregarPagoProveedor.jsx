import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Button, Checkbox, Col, DatePicker, Divider, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
//onChange={(e)=>{ setPago(  p=>({ ...p, monto: parseFloat(e.target.value.trim()||"0")    })  )  }}
const AgregarPagoProveedor = (props) => {
    const [bancos, setBancos] = useState([])
    const [mpEfectivo, setMpEfectivo] = useState({
        monto:0,
            checked:false,
   
    })
    const [mpCheque, setMpCheque] = useState({

        monto:0,
        checked:false,
        fkbanco:-1,
    })
    const [mpTransferencia, setMpTransferencia] = useState({
        monto:0,
        checked:false,
        fkbanco:-1,
    })
    const [enabled, setEnabled] = useState(true)
    const [pago, setPago] = useState({
        monto:0
    })
    const [reload, setReload] = useState(false)

    const guardar_click = () =>
    {

        if(mpCheque.checked)
        {
            if(mpCheque.fkbanco<0)
            {
                alert("Banco no seleccionado para Cheque")
                return
            }
        }

        if(mpTransferencia.checked)
        {
            if(mpTransferencia.fkbanco<0)
            {
                alert("Banco no seleccionado para Transferencia")
                return
            }
        }

        setEnabled(false)
        post_method(post.insert.pago_proveedor,{...pago,  modo:props.modo, fk_proveedor: props.idproveedor, efectivo: mpEfectivo, cheque: mpCheque, transferencia: mpTransferencia },(resp)=>{
            alert("OK")
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

        total += efv.checked ? efv.monto : 0
        total += cheque.checked ? cheque.monto : 0
        total += transf.checked ? transf.monto : 0

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
            <DatePicker />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            Monto
            </Col>
        </Row>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Input readOnly value={parseFloat(pago.monto||"0")}  />
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
            <Row style={{padding:"1em"}}>
                <Col span={24}>
                    <Input allowClear type="number" onChange={(e)=>{updateMP({...mpEfectivo,monto:parseFloat(e.target.value||"0")});}} value={parseFloat(mpEfectivo.monto||"0")} prefix="Monto: " />
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
                            <Input allowClear type="number" onChange={(e)=>{updateMP(null,{...mpCheque,monto:parseFloat(e.target.value||"0")});}} value={parseFloat(mpCheque.monto||"0")} prefix="Monto: " />
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            Banco
                        </Col>
                    </Row>
                    <Row style={{padding:"1em"}}>
                        <Col span={24}>
                            <Select options={bancos} style={{width:"300px"}} onChange={(v)=>{setMpCheque(mp=>({...mp,fkbanco:v}))}} />
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
                            <Input allowClear type="number" onChange={(e)=>{updateMP(null,null,{...mpTransferencia,monto:parseFloat(e.target.value||"0")});}} value={parseFloat(mpTransferencia.monto||"0")} prefix="Monto: " />
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            Banco
                        </Col>
                    </Row>
                    <Row style={{padding:"1em"}}>
                        <Col span={24}>
                            <Select options={bancos} style={{width:"300px"}}  onChange={(v)=>{setMpTransferencia(mp=>({...mp,fkbanco:v}))}} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            </>
            :
            <></>
        }
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Divider />
                <Button type="primary" block onClick={guardar_click} disabled={!enabled}>Agregar</Button>
            </Col>
        </Row>
    </>
}

export default AgregarPagoProveedor;