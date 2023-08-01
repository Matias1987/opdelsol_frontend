import { Button, Col, Divider, Form, Modal, Row, Spin, Switch } from "antd";
import { use, useEffect, useState } from "react";
import ModoPago from "../ModoPago";
import { get, post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeX from "@/components/informes/caja/InformeX";
import globals from "@/src/globals";

/**
 * 
 * @param tipo: ingreso op, resfuerzo, entrega, cuota
 * @param idcliente: cliente
 * @param idventa: venta
 * @param monto: monto  
 * @param title: window's title
 * @param mustCancel: saldo must be 0
 * @param totalsHidden: hide totals
 */
export default function CobroOperacion(props){
    const [mp, setMP] = useState(null)
    const [mustSave, setMustSave] = useState(false)
    const [entrega, setEntrega] = useState(true)
    const [dataVenta, setDataVenta] = useState(null)
    const [dataCliente, setDataCliente] = useState(null)
    const [informeOpen, setInformeOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const [idCobro, setIdCobro] = useState(-1)

    useEffect(()=>{
        if(idCobro>0){
            //alert("open informe")
            setInformeOpen(true)
        }
        else{
            
    }
    },[idCobro])


    const handleCancel = () => {setInformeOpen(false)}

    const onMPChange = (val) => {setMP(_mp=>val)}

    const onCobrarClick = (e) => {

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

        if(typeof props.mustCancel !== 'undefined'){
            if(props.mustCancel && (props.monto - mp.total)>0){
                alert("Saldo distinto a 0")
                return
            }
        }

        var params = {mp: mp,tipo: props.tipo, monto: mp.total, caja_idcaja: globals.obtenerCaja(), usuario_idusuario: globals.obtenerUID()}//<---- TEMPORARY
        params = typeof props.idventa === 'undefined' ? params : {...params,iventa:props.idventa} 
        params = typeof props.idcliente === 'undefined' ? params : {...params,idcliente:props.idcliente} 

        if(typeof props.tipo !== 'undefined'){
            switch(props.tipo)
            {
                case "ingreso": params = {...params, accion: "ingreso", estado: (entrega ? "entrega" : "deposito")}; break;
                case "entrega": params = {...params, accion: "entrega"}; break;
                case "resfuerzo": params = {...params, accion: "resfuerzo"}; break;
            }
        }

        post_method(post.insert.cobro,params,(id)=>{
            setIdCobro(id.data)
        })
        
        const accion = typeof props.tipo === 'undefined' ? '':props.tipo
        props.callback?.({accion: accion, estado_next: (accion == "ingreso" ? (entrega ? "ENTREGADO" : "DEPOSITO") : (accion == "entrega" ? "ENTREGADO": "DEPOSITO"))     })
        setOpen(false)
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


    const onOpen = () => {
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
        setOpen(true)
    }

    return (<>
            <Button onClick={onOpen}>{"Cargar Pago"}</Button>
            <Modal
                width={"80%"}
                title={"Cobro"}
                open={open}
                onOk={()=>{ 
                    setOpen(false)}}
                onCancel={()=>{setOpen(false)}}
                okText= {"OK"}
                destroyOnClose={true}
            >
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
                        <ModoPago totalsHidden={typeof props.totalsHidden === 'undefined' ? true : props.totalsHidden} callback={onMPChange} total={dataVenta == null ? 0 : dataVenta.debe} />  
                    </Col>
                </Row>
                
                {estado_switch()}
                <Row>
                    <Col span={24}>
                        <Divider />
                        <Button danger onClick={onCobrarClick}>Cobrar</Button>
                    </Col>
                </Row>
                </Modal>
            {/* informe x */}
            <Modal
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={(typeof props.okButtonProps === 'undefined') ? {children:"CERRAR"} : props.okButtonProps}
                
                width={"80%"}
                title={"Recibo X"}
                open={informeOpen}
                onOk={()=>{ 
                    setInformeOpen(false)}}
                onCancel={handleCancel}
                okText= {"OK"}
                destroyOnClose={true}
            >
                <PrinterWrapper>
                    <InformeX idcobro={idCobro}/>
                </PrinterWrapper>
            </Modal>

            </>)}