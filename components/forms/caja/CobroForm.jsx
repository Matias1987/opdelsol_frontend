import { Button, Col, Divider, Input, Modal, Row, Spin, Switch } from "antd";
import { useEffect, useState } from "react";
import { get, post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeX from "@/components/informes/caja/InformeX";
import globals from "@/src/globals";
import CustomModal from "@/components/CustomModal";
import ListaCobros from "./ListaCobros";
import VentaDetallePopup from "@/components/VentaDetalle";
import { current_date_ymd } from "@/src/helpers/string_helper";
import { registrarVentaEntregada, registrarVentaPendiente, registrar_evento } from "@/src/helpers/evento_helper";
import ModoPagoV4 from "../modo_pago/ModoPagoV4";

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

    const [descuento, setDescuento] = useState(0)
    

    /**     2/9/2023
     * I believe that only the callback function should be invoqed here, there are actions that shouldn't be done by this component, such as 
     * changing the sales status, I have to change that in the near future...
     */

    /**
     * this is mean to be executed twice: after the initial load and when idcobro changes (i.e. when the cobro is created...), I dunno if this is a good way 
     */
    useEffect(()=>{
        if(idCobro>-1){
            
            /**
             * If only the credit option is selected, the server returns 0. So when this happen,
             * no inform is required to be shown. Anyway, a popup with the message 'nothing to show'
             * appears, in part, with the objective of testing.
             */
            if(idCobro==0)
            {
                //alert("Nothing to show")
                setOpen(false)
                props.callback?.()
                return;
            }

            setInformeOpen(true)
        }
       
    },[idCobro])


    const handleCancel = () => {
        
        props.callback?.()
        setInformeOpen(false); 
        setOpen(false)
    }

    const onMPChange = (val) => {setMP(_mp=>val)}


    const onCobrarClick = (e) => {
        //e.stopImmediatePropagation();
        setCobrarDisabled(true)
//#region  validations
        if(mp==null)
        {
            setCobrarDisabled(false)
            return
        }
     
        if(typeof props.tipo === 'undefined'){
            alert("tipo undefined")
            setCobrarDisabled(false)
            return
        }

        
        //<!> props.mustCancel is obsolete, therefore, _mc is must be removed...
        const _mc = typeof props.mustCancel !== 'undefined' ? props.mustCancel : false;
        

        if(typeof props.tipo!= 'undefined')
        {
            if(props.tipo == 'cuota')
            {
                if(+mp.total==0)
                {
                    alert("Monto igual a 0")
                    setCobrarDisabled(false)
                    return
                }
            }
            if(props.tipo=='resfuerzo')
            {
                if((parseFloat(dataVenta.subtotal) - parseFloat(descuento) - parseFloat(dataVenta.haber||0)) <= 0 )
                {
                    alert("Saldo igual a 0")
                    setCobrarDisabled(false)
                    return
                }
                if(+mp.total==0)
                {
                    alert("Monto igual a 0")
                    setCobrarDisabled(false)
                    return
                }
            }
        }

       
        /**
         * si hay venta pero es de monto 0
         */
        if(dataVenta!=null && +mp.total==0&&dataVenta.saldo==0)
        {
            if(typeof props.tipo !== 'undefined')
            {
                if(props.tipo=='entrega')
                {
                    post_method(post.cambiar_estado_venta,{tk: globals.getToken(),idventa: dataVenta.idventa, estado: 'ENTREGADO',fecha_retiro: current_date_ymd()},(resp)=>{alert("OK"); setOpen(false); props?.callback?.()})
                    registrarVentaEntregada(dataVenta.idventa)
                }
                else{
                    if(entrega)
                    {
                        post_method(post.cambiar_estado_venta,{tk: globals.getToken(),idventa: dataVenta.idventa, estado: 'ENTREGADO',fecha_retiro: current_date_ymd()},(resp)=>{alert("OK"); setOpen(false); props?.callback?.()})
                        registrarVentaEntregada(dataVenta.idventa)
                    }
                    else{
                        post_method(post.cambiar_estado_venta,{tk: globals.getToken(),idventa: dataVenta.idventa, estado: 'PENDIENTE'},(resp)=>{alert("OK"); setOpen(false); props?.callback?.()})
                        registrarVentaPendiente(dataVenta.idventa)
                    
                    }
                }
            }

            return
        }

     
        
        if(dataVenta!=null){

            const _sdo =  (parseFloat(dataVenta.subtotal) - parseFloat(descuento) - parseFloat(dataVenta.haber||0)) - parseFloat( mp.total)

            if(+mp.total == 0 && _sdo != 0) { 
                alert("Monto igual a 0")
                setCobrarDisabled(false)
                return;
            }

            if( (entrega || _mc) && _sdo!=0){
                
                alert("Saldo distinto a 0")
                setCobrarDisabled(false)
                return
            }
            if(_sdo<0){
                alert("Saldo menor a cero")
                setCobrarDisabled(false)
                return 
            }
        }
        /*
        some other validations for secondary fields which 
        depends wether the amount field has a value other than 0
        */
        if(mp.ctacte_monto!=0)
        {
            if(mp.ctacte_cuotas <1)
            {
                //invalid number for installments
                alert("Seleccione cantidad de cuotas")
                setCobrarDisabled(false)
                return
            }

        }

        if(mp.transferencia_monto != 0)
        {
            if(mp.fk_banco_transferencia == null)
                {
                    //invalid bank
                    alert("Seleccione Banco")
                    setCobrarDisabled(false)
                    return
                }
        }
        
        if(mp.cheque_monto != 0  )
        {
            if(mp.fk_banco == null)
            {
                //invalid bank
                alert("Seleccione Banco")
                setCobrarDisabled(false)
                return
            }
        }

        if(mp.tarjeta_monto!= 0)
        {
            if(mp.fk_tarjeta==null)
            {
                //invalid credit card
                alert("Seleccione Tarjeta")
                setCobrarDisabled(false)
                return
            }
        }

        if(mp.tarjeta1_monto!= 0)
        {
            if(mp.fk_tarjeta1==null)
            {
                //invalid credit card
                alert("Seleccione Tarjeta 2")
                setCobrarDisabled(false)
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
            sucursal_idsucursal: globals.obtenerSucursal(),
            descuento: descuento,
            fecha: current_date_ymd(),
            tk: globals.getToken(),
        }

        params = typeof props.idventa === 'undefined' ? params : {...params,idventa:props.idventa} 
        params = typeof props.idcliente === 'undefined' ? params : {...params,idcliente:props.idcliente} 

        /**
         * if parametric action is 'entrega' but balance is higher than 0, then change status to 'resfuerzo'.. the status of the operation will remain as 'terminado'
         * get 'saldo'
        
        * the following two lines were modified * 
        */
        const _sdo = typeof props.idventa === 'undefined' ? 0 : (parseFloat(dataVenta.subtotal) - parseFloat(descuento) - parseFloat(dataVenta.haber||0)) - parseFloat( mp.total)

        const __tipo = props.tipo!=='undefined' ? props.tipo == 'entrega' && _sdo > 0 ? 'resfuerzo' : props.tipo : '';
        
        params.tipo=__tipo;

        //alert(__tipo)

        if(typeof props.tipo !== 'undefined'){
            switch(__tipo)
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
                alert("Caja cerrada o desactualizada.")
                setCobrarDisabled(false)
                return;
            }

            if(!confirm("Confirmar Operación"))
            {
                setCobrarDisabled(false)
                return;
            }

            setCobrarDisabled(true)

            params.caja_idcaja=response.idcaja;
            
            post_method(post.insert.cobro,params,(id)=>{
                if(id.data==0){
                    if(dataVenta!=null && __tipo!='resfuerzo')
                    {   let est = (__tipo=='entrega' ? 'ENTREGADO' : (entrega ? "ENTREGADO" : "PENDIENTE"))
                        
                        post_method(
                            post.cambiar_estado_venta,
                            {
                                idventa: dataVenta.idventa, 
                                /*estado at this point could be entrega or ingreso  */
                                estado: est,

                                fecha_retiro: current_date_ymd()
                            },
                            (resp)=>{

                                setIdCobro(0)
                                props?.callback?.()
                                setOpen(false)
                            })
                            registrar_evento("VENTA", "Cambio estado a "+ est,dataVenta.idventa)
                    }
                    else{
                        setIdCobro(0)
                        props?.callback?.()
                        setOpen(false)
                    }
                }
                else
                {
                    if(dataVenta!=null && __tipo!='resfuerzo')
                    {
                        //entrega
                        let est = (__tipo=='entrega' ? 'ENTREGADO' : (entrega ? "ENTREGADO" : "PENDIENTE"))
                       
                        post_method(
                            post.cambiar_estado_venta,
                            {
                                idventa: dataVenta.idventa, 
                                /*estado at this point could be entrega or ingreso  */
                                estado: est,

                                fecha_retiro: current_date_ymd()
                            },
                            (resp)=>{

                                /** actualizar balance de cta cte en recibo x */
                                if(+(id.data||"0")>0)
                                {
                                    fetch(get.actualizar_saldo_en_cobro + id.data)
                                    .then(___response=>___response.json())
                                    .then((___response)=>{
                                        setIdCobro(id.data)
                                        props?.callback?.()
                                        //setOpen(false)
                                    })
                                }
                                else{
                                    props?.callback?.()
                                }
                                
                        })
                        registrar_evento("VENTA", "Cambio estado a "+ est,dataVenta.idventa)
                    }
                    else{
                        //alert(JSON.stringify(id))
                        /**
                         * actualizar balance de cta cte en recibo x 
                         */
                        if(+(id.data||"0")>0)
                        {
                            fetch(get.actualizar_saldo_en_cobro + id.data)
                            .then(___response=>___response.json())
                            .then((___response)=>{
                                setIdCobro(id.data)
                                props?.callback?.()
                                //setOpen(false)
                            })
                        }
                        else{
                            props?.callback?.()
                        }
                        
                    }   

                    registrar_evento("COBRO", "Registro Cobro $"+mp.total.toString(), id.data)
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
            <p>
                Monto: <b>{dataVenta.subtotal}</b>  &nbsp;&nbsp;
                <Input prefix={"Descuento:" } value={descuento} onChange={(e)=>{setDescuento(parseFloat(e.target.value.length<1?"0":e.target.value))}} />
                
                Haber: <b>{dataVenta.haber}</b>  &nbsp;&nbsp;
                <span style={{backgroundColor:"lightyellow", color:"red"}}>Saldo:  <b>{parseFloat(dataVenta.subtotal) - parseFloat(descuento) - parseFloat(dataVenta.haber||0)}</b></span>&nbsp;&nbsp;
                <VentaDetallePopup idventa={dataVenta.idventa} /> 
            </p>&nbsp;&nbsp;
            <CustomModal title={"Cobros Venta Nro.: " + dataVenta.idventa} openButtonText="Ver Cobros">
                <ListaCobros idventa={dataVenta.idventa} readOnly={true} />
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
        setEntrega(false)
        setMP(null)
        if(typeof props.idventa !== 'undefined')
            {
                //get venta details
                fetch(get.venta + props.idventa)
                .then(response=>response.json())
                .then((response)=>{
                    
                    setDescuento(response.data[0].descuento)
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
        if(mp.total!=0)
        {
            alert("Monto a pagar distinto a 0")
            return
        }
        if(!confirm("Confirmar envio a depósito")){
            return
        }
        /**
         * Al marcarse como deposito sin cobrar, las filas de modo de pago deben ser eliminadas!!
         */
        post_method(post.cambiar_estado_venta,{idventa: props.idventa, estado: 'PENDIENTE', removeMPRows:1},(resp)=>{ alert("OK"); setOpen(false); props?.callback?.()})
    }

    return (<>
            <Button size="small" type="primary" onClick={onOpen}>{typeof props.buttonText === 'undefined' ? "Cargar Pago" : props.buttonText}</Button>
            <Modal
                width={"90%"}
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
                        <ModoPagoV4
                        idventa={typeof props.idventa === 'undefined' ? -1 : props.idventa}
                        mostrarSoloCtaCte={props.tipo!='ingreso'}
                        totalsHidden={typeof props.totalsHidden === 'undefined' ? true : props.totalsHidden} 
                        callback={onMPChange} 
                        total={dataVenta == null ? 0 : parseFloat(dataVenta.subtotal) - parseFloat(descuento) - parseFloat(dataVenta.haber||0)} 
                        ctacteHidden = {typeof props.ctacteHidden !== undefined ? props.ctacteHidden : false}
                        tarjetaHidden = {typeof props.tarjetaHidden !== undefined ? props.tarjetaHidden : false}
                        chequeHidden = {typeof props.chequeHidden !== undefined ? props.chequeHidden : false}
                        mutualHidden = {typeof props.mutualHidden !== undefined ? props.mutualHidden : false}

                        />  
                    </Col>
                </Row>
                
                {estado_switch()}

                {
                    props.tipo=='cuota' &&  mp != null  ? <Button type="primary" onClick={onCobrarClick} disabled={cobrarDisabled|| (mp.total<1 )}>Cobrar</Button> : <></>
                }
                
                { dataVenta == null || mp == null ? <></> :<>
                <Row>
                    <Col span={24}>
                        
                        <Divider />
                        
                        {
                            //entrega para ventas sin deuda
                            (parseFloat(dataVenta.subtotal) - parseFloat(descuento) - parseFloat(dataVenta.haber||0) )==0  && mp.total==0 && (entrega||props.tipo=='entrega') ? <Button onClick={onCobrarClick} disabled={cobrarDisabled} danger>Entrega</Button> : <></>
                        }
                        {
                            //resfuerzo con saldo 0 posterior
                            mp.total!=0 && (props.tipo=='resfuerzo'||props.tipo == 'ingreso') ? <Button onClick={onCobrarClick} disabled={cobrarDisabled} danger>Cobrar</Button> : <></>
                        }
                        {   //intento de entrega pero con saldo distinto a 0
                            props.tipo=='entrega'  &&(parseFloat(dataVenta.subtotal) - parseFloat(descuento) - parseFloat(dataVenta.haber||0) -+mp.total)!=0 && mp.total!=0 ? <Button onClick={onCobrarClick} disabled={cobrarDisabled} danger>Cobro Resfuerzo</Button> : <></>
                        }
                        {   //intento de entrega pero con saldo distinto a 0
                            props.tipo=='entrega' && parseFloat(dataVenta.subtotal) - parseFloat(descuento) - parseFloat(dataVenta.haber||0) != 0  &&(parseFloat(dataVenta.subtotal) - parseFloat(descuento) - parseFloat(dataVenta.haber||0) -+mp.total )==0 ? <Button onClick={onCobrarClick} disabled={cobrarDisabled} danger>Entrega</Button> : <></>
                        }
                        {  /* (+dataVenta?.saldo - +descuento)==0? <></> :
                            <Button disabled={cobrarDisabled || (mp.total<1 )} danger onClick={onCobrarClick}>Cobrar {props.tipo == 'entrega' ? ' y/o marcar como entregado' : entrega? ' y Marcar como entregado':''}</Button>
                        */}
                    
                        {
                            props.tipo == 'ingreso' && !entrega ? <>&nbsp;<Button disabled={mp.total>0 || cobrarDisabled}  type="primary" onClick={enviarADeposito}>Enviar a dep&oacute;sito </Button></> : <></>
                        }

                        
                       
                    </Col>
                </Row>
                </> 
                }
                </Modal>
            {/* informe x */}
            <Modal
                maskClosable={false}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={(typeof props.okButtonProps === 'undefined') ? {children:"CERRAR"} : props.okButtonProps}
                width={"80%"}
                title={"Recibo X"}
                open={informeOpen}
                onOk={()=>{ 
                    setInformeOpen(false); setOpen(false)}}
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