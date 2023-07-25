import { Button, Col, Divider, Form, Row, Spin, Switch } from "antd";
import { useEffect, useState } from "react";
import ModoPago from "../ModoPago";
import { get, post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";

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
    const [dataVenta, setDataVenta] = useState(null)
    const [dataCliente, setDataCliente] = useState(null)

    useEffect(()=>{
        if(mustSave){
            
        }
        if(typeof props.idventa !== 'undefined')
        {
            //get venta details
            fetch(get.venta + props.idventa)
            .then(response=>response.json())
            .then((response)=>{
                
                //alert(JSON.stringify(response.data[0]))
                setDataVenta(d=>{
                    
                    return response.data[0]
                    }
                    )
                    //response.data[0]
            })
           
        }
       
        if(typeof props.idcliente !== 'undefined')
        {
            //get cliente details
            fetch(get.cliente_por_id + props.idcliente)
            .then(response=>response.json())
            .then((response)=>{
                //alert("jsfld")
                //alert(JSON.stringify(response))
                setDataCliente(
                    {
                        nombre: response.data[0].nombre_completo,
                       
                        dni: response.data[0].dni,
        
                        telefono1: response.data[0].telefono1,
        
                        direccion: response.data[0].direccion,
                    }
                )
            })
        }
    },[mustSave])

    const onMPChange = (val) => {setMP(_mp=>val)}

    const onCobrarClick = (e) => {
        //setMustSave(true)
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

        //alert("PROPS: " + JSON.stringify(props))

        var params = {mp: mp,tipo: props.tipo, monto: 1000, caja_idcaja: 1, usuario_idusuario: 1}//<---- TEMPORARY
        params = typeof props.idventa === 'undefined' ? params : {...params,iventa:props.idventa} 
        params = typeof props.idcliente === 'undefined' ? params : {...params,idcliente:props.idcliente} 
        console.log(JSON.stringify(params))
        alert(JSON.stringify(params))
        post_method(post.insert.cobro,params,(id)=>{
            alert("done!")
        })
    }
    const cliente_detalle = () => (
        dataCliente == null ? 
        <Spin /> :
        <>
        <b>Cliente:&nbsp;{dataCliente.nombre} </b> &nbsp;&nbsp; DNI: <b>{dataCliente.dni}</b>&nbsp;
            Tel&eacute;fono: {dataCliente.telefono1}&nbsp;
            Direcci&oacute;n: {dataCliente.direccion}&nbsp;
        </>
    )

    const venta_detalle = () => (
        dataVenta == null ? <Spin />  :
        <>
        <p>Nro. Venta: {dataVenta.idventa} &nbsp;&nbsp;&nbsp; Fecha: {dataVenta.fecha}</p>
        </>
    )
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
                        {cliente_detalle()}
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        {venta_detalle()}
                    </Col>
                </Row>
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