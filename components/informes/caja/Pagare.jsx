import PrinterWrapper from "@/components/PrinterWrapper";
import { convertToWords } from "@/src/helpers/string_helper";
import { get } from "@/src/urls";
import { Modal } from "antd";
import { useEffect, useState } from "react";

/**
 * @param fkventa references the sales operation
 * 
 */
const Pagare = (props) => {
    /**
        `id_modopago` INT(10) NOT NULL AUTO_INCREMENT,
        `venta_idventa` INT(10) NOT NULL,
        `modo_pago_idmodo_pago` INT(10) NULL DEFAULT NULL,
        `banco_idbanco` INT(10) NULL DEFAULT NULL,
        `mutual_idmutual` INT(10) NULL DEFAULT NULL,
        `fk_tarjeta` INT(10) NULL DEFAULT NULL,
        `modo_pago` VARCHAR(16) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
        `monto` DECIMAL(20,6) NULL DEFAULT '0.000000',
        `monto_int` DECIMAL(20,6) NULL DEFAULT '0.000000',
        `cant_cuotas` INT(10) NULL DEFAULT '0',
        `monto_cuota` DECIMAL(20,6) NULL DEFAULT '0.000000',
        `pagare_impreso` TINYINT(3) NULL DEFAULT '0',
     */
    const [modoPago, setModoPago] = useState(null)
    const [dataCliente, setDataCliente] = useState(null)
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        //get modo de pago y data del cliente
        const url = ""
        fetch(url)
        .then(resp=>resp.json())
        .then((response)=>{
            if(response.data != null)
            {
                if(response.data.length>0)
                {
                    setModoPago({})
                    //get cliente data
                    fetch(get.detalle_cliente)
                    .then(r=>r.json())
                    .then((resp)=>{
                        setDataCliente({
                            nombre: "",
                            dni: "",
                            telefono: "",
                            domicilio: "",
                            localidad: "",
                        })
                    })
                }
            }
            //FOR TEST ONLY!
            setModoPago({
                id_modopago: 0,
                fkoperacion: 0,
                monto: 0,
                monto_int: 0,
                cant_cuotas: 0,
                monto_cuota: 0,
                monto_venta: 0, //<-- this one should be added to the query
                producto_adquirido: "-",//<--this one too...
                monto_venta_int: 0,//<--and this
                entrega: 0,//<--and this
            })
           
            
        })
    },[])
    return modoPago == null || dataCliente == null ? <></> : <>
    <Button>
        Imprimir Pagar&eacute;
    </Button>
    <Modal open={open} footer={null} onCancel={()=>{setOpen(false)}}>

    </Modal>
        <PrinterWrapper>
        Pagare
        <table style = {{textAlign: 'left', width: '100%',}} border='0' cellpadding='2' cellspacing='2'>
            <tbody>
                <tr>
                    <td style = {{verticalAlign: 'top', fontWeight: 'bold',}} > Vence el {10}</td>
                    <td style = {{verticalAlign: 'top', fontWeight: 'bold',}} > Por $ {modoPago.monto_int}<br />
                    </td>
                </tr>
                <tr>
                    <td style = {{verticalAlign: 'top', textAlign:'right'}} colspan='2'>
                        Resistencia, Provincia del Chaco, <span style={{fontWeight: 'bold'}}>&nbsp;{"FALTA FECHA"}</span>
                    </td>
                </tr>
                <tr>
                    <td  style = {{verticalAlign: 'top'}} colspan='2'>
                        <p>El dia <span style={{fontWeight: 'bold'}}>&nbsp;{1}</span> Pagar&eacute; al Sr. ROVNER, Fernando 
                        Jos&eacute; y/u OPTICA MIDAS S.R.L, o a su orden, 'SIN PROTESTO' &#40;Art. 50 Dcto.Ley 5965/63&#41; la cantidad de Pesos <span
                        style={{fontWeight: 'bold'}}>&nbsp;{convertToWords(modoPago.monto_int)}</span> <b> {13}/100  </b>
                        pagaderos en calle Col&oacute;n 98 de la ciudad de Resistencia, Provincia del
                        Chaco.</p>
                        <p>El bien y/o servicio adquirido es: <span
                        style = {{fontWeight: 'bold'}} >&nbsp;{modoPago.producto_adquirido}</span></p>
                        <p>El precio de<span style={{fontWeight: 'bold'}}> CONTADO</span>
                        del producto adquirido es de: <span style = {{fontWeight: 'bold'}} >&nbsp;{modoPago.monto_venta}</span></p>
                        <p>El monto de Venta FINANCIADO es de:&nbsp;<span
                        style = {{fontWeight: 'bold'}} >&nbsp;{modoPago.monto_venta_int}</span></p>
                        <p>El importe desembolsado inicialmente en concepto de entrega
                        fue de: <span style = {{fontWeight: 'bold'}} >&nbsp;{modoPago.entrega}</span></p>
                        <p>El saldo a financiar es de: <span style = {{fontWeight: 'bold'}} >&nbsp;{modoPago.monto_int}</span>
                        en<span style={{fontWeight: 'bold'}}>&nbsp;{modoPago.cant_cuotas}</span> cuotas mensuales, iguales
                        y consejutivas de<span style={{fontWeight: 'bold'}}>&nbsp;&nbsp;{modoPago.monto_cuota}</span> cada una,
                        que totalizan en el monto por el cual se suscribe el siguiente pagar&eacute;.</p>
                        <p>La Tasa de Inter&eacute;s Efectiva Anual &#40;T.E.A.&#41; aplicada es del:&nbsp;<span
                        style = {{fontWeight: 'bold'}} >&nbsp;{/* CALCULAR INTERES!! */ "TO DO"}%</span></p>
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
        </PrinterWrapper>
    </>
}

export default Pagare;