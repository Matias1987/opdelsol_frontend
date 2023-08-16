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

        //alert(JSON.stringify(params))

        //THIS REGION IS TEMPORARILY COMMENTED

        globals.obtenerCajaAsync((response)=>{


            if(response==null)
            {
                alert("Caja cerrada")
                return;
            }

            params.caja_idcaja=response.idcaja;
            
            post_method(post.insert.cobro,params,(id)=>{
                setIdCobro(id.data)
            })
            
            const accion = typeof props.tipo === 'undefined' ? '':props.tipo
            props.callback?.({accion: accion, estado_next: (accion == "ingreso" ? (entrega ? "ENTREGADO" : "PENDIENTE") : (accion == "entrega" ? "ENTREGADO": "PENDIENTE"))     })
            setOpen(false)
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
        <p>Monto: <b>{dataVenta.debe}</b>  Haber: <b>{dataVenta.haber}</b>  Saldo:  <b>{dataVenta.saldo}</b></p>
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
                //onOk={()=>{setOpen(false)}} <-- removed because the footer is set to null
                onCancel={()=>{setOpen(false)}}
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
                        <Button danger onClick={onCobrarClick}>Cobrar</Button>&nbsp;&nbsp;
                        {
                            props.tipo == 'ingreso' && !entrega ? <Button size="small" type="primary" onClick={enviarADeposito}>Enviar a dep&oacute;sito</Button> : <></>
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
            >
                <PrinterWrapper>
                    <InformeX idcobro={idCobro}/>
                </PrinterWrapper>
            </Modal>

            </>)}