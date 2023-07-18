import { Button, Col, Form, Row } from "antd";
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

    return (<>
                <h3>{(typeof props.title === 'undefined' ? 'Cobro' : props.title)}</h3>
                <Row>
                    <Col span={24}>
                        <ModoPago callback={onMPChange} total={5000} />   
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Button type="primary" onClick={onCobrarClick}>Cobrar</Button>
                    </Col>
                </Row>
            </>)}