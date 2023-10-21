import PrinterWrapper from "@/components/PrinterWrapper";
import { convertToWords, current_date, format_date } from "@/src/helpers/string_helper";
import { get } from "@/src/urls";
import { Button, Modal, Spin } from "antd";
import { useEffect, useState } from "react";

/**
 * @param fkventa references the sales operation
 * 
 */
const Pagare = (props) => {

    const [modoPago, setModoPago] = useState(null)
    const [dataCliente, setDataCliente] = useState(null)
    const [open, setOpen] = useState(false)
    const [fechaVencimiento, setFechaVencimiento] = useState(null)
    const [detalleProducto, setDetalleProducto] = useState("")

    useEffect(()=>{
        const date = new Date()
        date.setFullYear(date.getFullYear() + 1)
        setFechaVencimiento(date)
        
    },[])

    const _pagare_ = _ => (
        <PrinterWrapper>
        <div style={{padding:"4em"}}>
            <table style = {{textAlign: 'left', width: '100%',}} border='0' cellpadding='2' cellspacing='2'>
                <tbody>
                    <tr>
                        <td style = {{verticalAlign: 'top', fontWeight: 'bold',}} > Vence el {fechaVencimiento == null ? "" : format_date(fechaVencimiento)}</td>
                        <td style = {{verticalAlign: 'top', fontWeight: 'bold',}} > Por $ {modoPago.monto_int}<br />
                        </td>
                    </tr>
                    <tr>
                        <td style = {{verticalAlign: 'top', textAlign:'right'}} colspan='2'>
                            Resistencia, Provincia del Chaco, <span style={{fontWeight: 'bold'}}>&nbsp;{current_date()}</span>
                        </td>
                    </tr>
                    <tr>
                        <td  style = {{verticalAlign: 'top'}} colspan='2'>
                            <p>El d&iacute;a <span style={{fontWeight: 'bold'}}>&nbsp;{current_date()}</span> Pagar&eacute; al Sr. ROVNER, Fernando 
                            Jos&eacute; y/u OPTICA MIDAS S.R.L, o a su orden, 'SIN PROTESTO' &#40;Art. 50 Dcto.Ley 5965/63&#41; la cantidad de Pesos <span
                            style={{fontWeight: 'bold'}}>&nbsp;&nbsp;{convertToWords(modoPago.monto_int, false)}</span> <b> {  (modoPago.monto_int - Math.trunc(modoPago.monto_int)).toFixed(2) }/100  </b>
                            pagaderos en calle Col&oacute;n 98 de la ciudad de Resistencia, Provincia del
                            Chaco.</p>
                            <p>El bien y/o servicio adquirido es: <span
                            style = {{fontWeight: 'bold'}} >&nbsp;{detalleProducto}</span></p>
                            <p>El precio de<span style={{fontWeight: 'bold'}}> CONTADO </span>
                            del producto adquirido es de: <span style = {{fontWeight: 'bold'}} >&nbsp;$&nbsp;{modoPago.monto_venta}&nbsp;</span></p>
                            <p>El monto de Venta FINANCIADO es de:&nbsp;<span
                            style = {{fontWeight: 'bold'}} >&nbsp;$&nbsp;{modoPago.monto_venta_int}</span></p>
                            <p>El importe desembolsado inicialmente en concepto de entrega
                            fue de: <span style = {{fontWeight: 'bold'}} >&nbsp;$&nbsp;{modoPago.entrega}</span></p>
                            <p>El saldo a financiar es de: <span style = {{fontWeight: 'bold'}} >&nbsp;$&nbsp;{modoPago.monto}&nbsp;</span>
                            en<span style={{fontWeight: 'bold'}}>&nbsp;{modoPago.cant_cuotas}</span> cuotas mensuales, iguales
                            y consejutivas de<span style={{fontWeight: 'bold'}}>&nbsp;$&nbsp;{modoPago.monto_cuota}</span> cada una,
                            que totalizan en el monto por el cual se suscribe el siguiente pagar&eacute;.</p>
                            <p>La Tasa de Inter&eacute;s Efectiva Anual &#40;T.E.A.&#41; aplicada es del:&nbsp;<span
                            style = {{fontWeight: 'bold'}} >&nbsp;{Math.round(((modoPago.monto_int / modoPago.monto) - Math.trunc(modoPago.monto_int / modoPago.monto)) * 100)}%</span></p>
                            <p>El sistema de amortización del capital es constante.</p>
                            <p>En caso de ejecuci&oacute;n judicial el librador acepta que se
                            encuentran reunidos en el presente
                            pagar&eacute; todos los requisitos del art. 36 de la Ley de Defensa del
                            Consumidor y renuncia
                            expresamente a la aplicaci&oacute;n del l&iacute;mite de responsabilidad por costas
                            &#40;art. 730, 2° p&aacute;rrafo del
                            C&oacute;digo Civil y Comercial de la Naci&oacute;n&#41; y a la inembargabilidad de
                            haberes de empleados
                            p&uacute;blicos dispuesta por el Decreto Nacional 6754/43.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style = {{verticalAlign: 'top'}} colspan='2'>
                            <br />
                            <br />
                            <br />
                            <table style = {{textAlign: 'left', width: '100%'}} border='0' cellpadding='2' cellspacing='2'>
                                <tbody>
                                    <tr>
                                        <td style = {{verticalAlign: 'top'}} colspan='2'>Firma
                                        ....................................................................................................................<br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style = {{verticalAlign: 'top'}} colspan='2'>
                                            Aclaraci&oacute;n:&nbsp; {dataCliente.nombre}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style = {{verticalAlign: 'top'}} > D.N.I.:&nbsp;{dataCliente.dni} </ td >
                                        <td style={{verticalAlign: 'top'}}>Tel&eacute;fono:&nbsp;{dataCliente.telefono} </td>
                                    </tr>
                                    <tr>
                                        <td style = {{verticalAlign: 'top'}} colspan='2'>Domicilio:&nbsp;
                                            {dataCliente.domicilio}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style = {{verticalAlign: 'top'}} colspan='2'>Localidad:&nbsp;
                                            {dataCliente.localidad}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </PrinterWrapper>
    )


    const onOpen = ( ) => {
        //get modo de pago y data del cliente
        const url = get.obtener_pagare + props.fkventa
        fetch(url)
        .then(resp=>resp.json())
        .then((response)=>{
           
            if(response.data != null)
            {
                if(response.data!=null)
                {
                    
                    setModoPago({
                        id_modopago: 0,
                        fkoperacion: response.data.idventa,
                        monto: response.data.monto,
                        monto_int: response.data.monto_int,
                        cant_cuotas: response.data.cant_cuotas,
                        monto_cuota: response.data.monto_cuota,
                        monto_venta: response.data.vta_monto, //<-- this one should be added to the query
                        producto_adquirido: "-",//<--this one too...
                        monto_venta_int: response.data.vta_monto_int,//<--and this
                        entrega: (response.data.monto_entrega == null ? 0 : response.data.monto_entrega),//<--and this
                    })
                    //get cliente data
                    
                    fetch(get.detalle_cliente + response.data.idcliente)
                    .then(r=>r.json())
                    .then((resp)=>{
                        
                        setDataCliente({
                            nombre: resp.data[0].nombre_completo,
                            dni: resp.data[0].dni,
                            telefono: resp.data[0].telefono1,
                            domicilio: resp.data[0].domicilio,
                            localidad: "-",
                        })
                        fetch(get.obtener_categorias_productos_venta + props.fkventa)
                        .then(r=>r.json())
                        .then((response)=>{
                            var _t = ""
                            response.data.forEach((r)=>{
                                _t += (_t == "" ? "" : ", ") + r.nombre_largo
                            })
                            setDetalleProducto(_t)
                        })
                    })
                }
            } 
        })
    }

    return <>
    <Button onClick={()=>{setOpen(true); onOpen()}}>
        Imprimir Pagar&eacute;
    </Button>
    <Modal width={"80%"} open={open} footer={null} onCancel={()=>{setOpen(false)}}>
        {modoPago==null||dataCliente==null ? <>Loading...<Spin /></> : <>
            {_pagare_()}
        </>}
    </Modal>
        
    </>
}

export default Pagare;