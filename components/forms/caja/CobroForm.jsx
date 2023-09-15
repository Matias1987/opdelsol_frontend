import { Button, Col, Divider, Form, Modal, Row, Spin, Switch } from "antd";
import { use, useEffect, useState } from "react";
import ModoPago from "../ModoPago";
import { get, post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeX from "@/components/informes/caja/InformeX";
import globals from "@/src/globals";
import CustomModal from "@/components/CustomModal";
import ListaCobros from "./ListaCobros";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * 
 * @param tipo: ingreso op, resfuerzo, entrega, cuota
 * @param idcliente: cliente
 * @param idventa: venta
 * @param monto: monto  
 * @param title: window's title
 * @param mustCancel: saldo must be 0
 * @param totalsHidden: hide totals
 * @param  callback: callback...
 * @param  tarjetaHidden: ...
 * @param  ctacteHidden: callback...
 * @param buttonText
 */
export default function CobroOperacion(props){
    const [mp, setMP] = useState(null)
    const [mustSave, setMustSave] = useState(false)
    const [entrega, setEntrega] = useState(false)
    const [dataVenta, setDataVenta] = useState(null)
    
    const [dataCliente, setDataCliente] = useState(null)
    const [informeOpen, setInformeOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const [idCobro, setIdCobro] = useState(-1)
    const [cobrarDisabled, setCobrarDisabled] = useState(false)

    /**     2/9/2023
     * I believe that only the callback function should be invoqued here, there are actions that shouldn't be done by this component, such as 
     * changing the sales status, I have to change that in the near future...
     */

    /**
     * this is mean to be executed twice: after the initial load and when idcobro changes (i.e. when the cobro is created...), I dunno if this is a good way 
     */
    useEffect(()=>{
        if(idCobro>-1){
            alert("open informe")
            /**
             * el servidor devuelve 0  cuando se elijio ctacte como 
             * modo de pago...
             */
            if(idCobro==0)
            {
                alert("Nothing to show")
                props.callback?.()
                setOpen(false)
                return;
            }

            setInformeOpen(true)
        }
       
    },[idCobro])


    const handleCancel = () => {
        
        //const accion = typeof props.tipo === 'undefined' ? '':props.tipo
        //props.callback?.({accion: accion, estado_next: (accion == "ingreso" ? (entrega ? "ENTREGADO" : "PENDIENTE") : (accion == "entrega" ? "ENTREGADO": "PENDIENTE"))     })
          
        props.callback?.()
        setInformeOpen(false); 
        setOpen(false)
    }

    const onMPChange = (val) => {setMP(_mp=>val)}

    const onEntregaClick = (e) => {
        if(dataVenta.saldo != 0){
            return;
        }

        post_method(post.cambiar_estado_venta,{idventa: dataVenta.idventa, estado: 'ENTREGADO'},(resp)=>{alert("OK"); setOpen(false); props?.callback?.()})
    }

    const onCobrarClick = (e) => {
//#region  validations
        if(mp === null){
            alert("Modo de pago no seleccionado.")
            return;
        }

        if(mp.total<1){
            alert("Monto a pagar igual a cero")
            return;

        }
  

        if(typeof props.tipo === 'undefined'){
            alert("tipo undefined")
            return
        }

        const _mc = typeof props.mustCancel !== 'undefined' ? props.mustCancel : false;

        if(dataVenta!=null){

            if(+mp.total == 0 && dataVenta.debe != 0) { 
                alert("Monto igual a 0")
                return;
            }

            //alert(`debe: ${dataVenta.saldo} total a pagar: ${mp.total}`)
            if( (entrega || _mc) && (dataVenta.saldo - mp.total)!=0){
                alert("Saldo distinto a 0")
                return
            }

            if(dataVenta.debe < mp.total){
                alert("Monto mayor a deuda")
                return
            }
        }
//#endregion

        var params = {
            mp: mp,
            tipo: props.tipo, 
            monto: mp.total, 
            caja_idcaja: globals.obtenerCajaID(), 
            usuario_idusuario: globals.obtenerUID(),
            sucursal_idsucursal: globals.obtenerSucursal()
        }
        params = typeof props.idventa === 'undefined' ? params : {...params,idventa:props.idventa} 
        params = typeof props.idcliente === 'undefined' ? params : {...params,idcliente:props.idcliente} 

        if(typeof props.tipo !== 'undefined'){
            switch(props.tipo)
            {
                case "ingreso": 
                    params = {...params, accion: "ingreso", estado: (entrega ? "entrega" : "deposito"), removeMPRows: 1}; 
                break;
                case "entrega": 
                    params = {...params, accion: "entrega", removeCtaCteRow: 1}; 
                break;
                case "resfuerzo": 
                
                    params = {...params, accion: "resfuerzo", removeCtaCteRow: 1}; 
                break;
            }
        }

        globals.obtenerCajaAsync((response)=>{

            if(response==null)
            {
                alert("Caja cerrada")
                return;
            }

            if(!confirm("Confirmar Cobro"))
            {
                return;
            }

            setCobrarDisabled(true)

            params.caja_idcaja=response.idcaja;
            
            post_method(post.insert.cobro,params,(id)=>{

                if(id.data==0){
                    setIdCobro(0)
                }
                else
                {
                    /**
                     * actualizar balance de cta cte en recibo x 
                     */
                    alert(get.actualizar_saldo_en_cobro + id.data)
                    fetch(get.actualizar_saldo_en_cobro + id.data)
                    .then(___response=>___response.json())
                    .then((___response)=>{

                        setIdCobro(id.data)

                    })
                }
                
                
                if(dataVenta!=null && props.tipo!='resfuerzo')
                {
                    post_method(
                        post.cambiar_estado_venta,
                        {
                            idventa: dataVenta.idventa, 
                            /*estado at this point could be entrega or ingreso  */
                            estado: (props.tipo=='entrega' ? 'ENTREGADO' : (entrega ? "ENTREGADO" : "PENDIENTE"))
                        },
                        (resp)=>{alert("OK")})
                }
            })
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
        dataVenta == null ? <></>  :
        <>
            <p>Nro. Venta: {dataVenta.idventa} &nbsp;&nbsp;&nbsp; Fecha: {dataVenta.fecha_formated}</p>
            <p>Monto: <b>{dataVenta.debe}</b>  Haber: <b>{parseFloat(dataVenta.debe) - parseFloat(dataVenta.saldo)}</b>  Saldo:  <b>{dataVenta.saldo}</b></p>
            <CustomModal title={"Cobros Venta Nro.: " + dataVenta.idventa} openButtonText="Ver Cobros">
                <ListaCobros idventa={dataVenta.idventa} />
            </CustomModal>
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
        setCobrarDisabled(false)
        if(typeof props.idventa !== 'undefined')
            {
                //get venta details
                fetch(get.venta + props.idventa)
                .then(response=>response.json())
                .then((response)=>{
                    
                    if(response.data[0].saldo==0){
                        setCobrarDisabled(true)
                    }
                    setDataVenta(d=>{
                        return response.data[0]
                    }
                    )
                })
            }
        
            if(typeof props.idcliente !== 'undefined')
            {
                //get cliente details
                fetch(get.cliente_por_id + props.idcliente)
                .then(response=>response.json())
                .then((response)=>{
                    
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

    /**
     * Para enviar a deposito sin cobrar
     */

    const enviarADeposito = () =>{
        /**
         * Al marcarse como deposito sin cobrar, las filas de modo de pago deben ser eliminadas!!
         */
        post_method(post.cambiar_estado_venta,{idventa: props.idventa, estado: 'PENDIENTE', removeMPRows:1},(resp)=>{ alert("OK"); setOpen(false); props?.callback?.()})
    }

    return (<>
            <Button type="primary" onClick={onOpen}>{typeof props.buttonText === 'undefined' ? "Cargar Pago" : props.buttonText}</Button>
            <Modal
                width={"80%"}
                title={"Cobro"}
                open={open}
                onCancel={()=>{ setOpen(false);}}
                okText= {"OK"}
                destroyOnClose={true}
                footer={
                    null
                }
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
                        <ModoPago 
                        idventa={typeof props.idventa === 'undefined' ? -1 : props.idventa}
                        mostrarSoloCtaCte={props.tipo!='ingreso'}
                        totalsHidden={typeof props.totalsHidden === 'undefined' ? true : props.totalsHidden} 
                        callback={onMPChange} 
                        total={dataVenta == null ? 0 : dataVenta.saldo} 
                        ctacteHidden = {typeof props.ctacteHidden !== undefined ? props.ctacteHidden : false}
                        tarjetaHidden = {typeof props.tarjetaHidden !== undefined ? props.tarjetaHidden : false}
                        />  
                    </Col>
                </Row>
                
                {estado_switch()}
                <Row>
                    <Col span={24}>
                        <Divider />
                        <Button disabled={cobrarDisabled} danger onClick={onCobrarClick}>Cobrar {props.tipo == 'entrega' ? ' y marcar como entregado' : ''}</Button>&nbsp;&nbsp;
                        {
                            props.tipo == 'ingreso' && !entrega ? <Button size="small" type="primary" onClick={enviarADeposito}>Enviar a dep&oacute;sito</Button> : <></>
                        }
                        {
                            props.tipo == 'entrega' ? <Button disabled={!cobrarDisabled} onClick={onEntregaClick}>Marcar Como Entregado</Button>:<></>
                        }
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
                footer={null}
            >
                <PrinterWrapper>
                    <InformeX idcobro={idCobro}/>
                </PrinterWrapper>
            </Modal>

            </>)}