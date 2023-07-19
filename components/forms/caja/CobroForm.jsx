import { Button, Col, Divider, Form, Row, Switch } from "antd";
import { useEffect, useState } from "react";
import ModoPago from "../ModoPago";

/**
 * 
 * @param tipo: ingreso op, resfuerzo, entrega, cuota
 * @param idcliente: cliente
 * @param idventa: venta
 * @param monto: monto  
 * @param title: window's title
 */
export default function CobroOperacion(props){
    const [mp, setMP] = useState(null)
    const [mustSave, setMustSave] = useState(false)
    const [entrega, setEntrega] = useState(true)

    useEffect(()=>{
        if(mustSave){
            if(mp === null){
                alert("Modo de pago no seleccionado.")
                return;
            }
            if(+mp.total == 0) { 
                alert("Monto igual a 0")
                return;
            }

            if(typeof props.tipo === 'undefined'){
                alert("tipo undefined")
                return
            }

            var params = {...mp,tipo: props.tipo, monto: props.monto}
            params = typeof props.idventa === 'undefined' ? params : {...params,iventa:props.idventa} 
            params = typeof props.idcliente === 'undefined' ? params : {...params,idcliente:props.idcliente} 
    
            alert(JSON.stringify(params))
        }
    },[mustSave])

    const onMPChange = (val) => {setMP(_mp=>val)}

    const onCobrarClick = (e) => {
        setMustSave(true)
    }

    const estado_switch = _ => props.tipo == 'ingreso' ? <Row>
        <Col span={24}>
            <Divider />
            <Switch style={{backgroundColor: entrega? 'green' : 'red'}} checkedChildren="Entrega" unCheckedChildren="Depósito" checked={entrega} onChange={(e)=>{setEntrega(!entrega)}} />
        </Col>
    </Row> : 
    <></>


    return (<>
                <h3>{(typeof props.title === 'undefined' ? 'Cobro' : props.title)}</h3>
                <Row>
                    <Col span={24}>
                        <ModoPago callback={onMPChange} total={5000} />   
                    </Col>
                </Row>
                {estado_switch()}
                <Row>
                    <Col span={24}>
                        <Divider />
                        <Button danger onClick={onCobrarClick}>Cobrar</Button>
                    </Col>
                </Row>
            </>)}