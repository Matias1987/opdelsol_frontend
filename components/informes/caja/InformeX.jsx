import { get } from "@/src/urls"
import { Spin } from "antd"
import { useEffect, useState } from "react"
/**
 * 
 * @param idcobro  
 * @returns 
 */
export default function InformeX(props){
    const [dataSucursal, setDataSucursal] = useState(null)
    const [dataCliente, setDataCliente] =  useState(null)
    const [dataPago, setDataPago] = useState(null)
    const [modoPago, setModoPago] = useState({
        efectivo_monto: 0,
        tarjeta_monto: 0,
        tarjeta_tarjeta: 0,
        ctacte_monto: 0,
        ctacte_cuotas: 0,
        ctacte_monto_cuotas: 0,
        cheque_monto: 0,
        mutual_monto: 0,
        mutual_mutual: 0,
        total: 0,
    })

    useEffect(()=>{
        //get pago data
        //alert(get.detalle_cobro + props.idcobro)

        fetch(get.lista_mp_cobro + props.idcobro)
        .then(response=>response.json())
        .then((response)=>{
            const __temp = {
                efectivo_monto: 0,
                tarjeta_monto: 0,
                tarjeta_tarjeta: 0,
                ctacte_monto: 0,
                ctacte_cuotas: 0,
                ctacte_monto_cuotas: 0,
                cheque_monto: 0,
                mutual_monto: 0,
                mutual_mutual: 0,
                total: 0,
            }
            response.data.forEach(r=>{
                switch(r.modo_pago){
                    case "efectivo": 
                        __temp.efectivo_monto=r.monto;
                    break;
                    case "tarjeta": 
                        __temp.tarjeta_monto=r.monto;
                    break;
                    case "ctacte": 
                        __temp.ctacte_monto=r.monto;
                    break;
                    case "mutual": 
                        __temp.mutual_monto=r.monto;
                    break;
                    case "cheque": 
                        __temp.cheque_monto=r.monto;
                    break;
                }
            })

            setModoPago(mp=>__temp)

        })

        fetch(get.detalle_cobro + props.idcobro)
        .then(response=>response.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            setDataPago(response.data[0])
            
            /*now that I have the pago data, I can know the client id  */
            //get client data
            //alert(get.cliente_por_id + response.data[0].cliente_idcliente)
            fetch(get.cliente_por_id + response.data[0].cliente_idcliente)
            .then(_response=>_response.json())
            .then((_response)=>{
                //alert("CLIENTE::::: " + JSON.stringify(_response.data))
                setDataCliente(_response.data[0])
            })

            //get sucursal data
            fetch(get.sucursal_details + "6" /*response.data[0].sucursal_idsucursal*/)
            .then(__response=>__response.json())
            .then((__response)=>{
                //alert("SUCURSAL::::: " + JSON.stringify(__response.data))
                setDataSucursal(__response.data)
            })

        })



        

    },[])

    const tabla_modo_pago = _ => modoPago == null ? <Spin /> : <>
    <table style={{width: '100%'}}>
        <tbody>
            <tr>
                <td>Efectivo:</td>
                <td>{modoPago.efectivo_monto}</td>
            </tr>
            <tr>
                <td>Cheque:</td>
                <td>{modoPago.cheque_monto}</td>
            </tr>
            <tr>
                <td>Tarjeta:</td>
                <td>{modoPago.tarjeta_monto}</td>
            </tr>
            <tr>
                <td>Mutual:</td>
                <td>{modoPago.mutual_monto}</td>
            </tr>
            <tr>
                <td>TOTAL:</td>
                <td>{dataPago.monto}</td>
            </tr>
        </tbody>
    </table>
    </>

    const data_cliente = () => {
        return dataCliente == null ? <Spin /> : <>
            Se&ntilde;or/es: {dataCliente.apellido + ", " + dataCliente.nombre}<br />
            Domicilio: {dataCliente.direccion}<br />
            Condicion IVA: {"NO INSCRIPTO"}<br />   
        </>
    }

    const data_sucursal = () => {
        return dataSucursal == null ? <Spin /> : <>{"data.sucursal_denominacion"}</>
    }

    const html_cheque_tarjeta = () => {
        return modoPago == null ? <Spin /> : <>
            {modoPago.cheque_monto == 0 ? <></>: <p>Cheque: {"@nro_cheque@"} Banco: {"@cheque_banco@"} &nbsp;Fecha: {"cheque_fecha"}</p>}
            {modoPago.tarjeta_monto == 0 ? <></> : <p>Tarjeta: {modoPago.tarjeta_tarjeta} Numero: {"@tarjeta_nro@"} Cupon: {"@tarjeta_cupon@"}</p>}
        </>
    }

    const recibo_copia = (_tipo) => {
        return <>
        <table style={{width: '100%'}}>
                <tbody>
                    <tr>
                        <td>
                            <table style={{width: '100%'}}>
                                <tbody>
                                    <tr>
                                        <td style={{width: '33%'}}>
                                            <p>
                                                {data_sucursal()}<br />
                                                {data_cliente()}
                                            </p>
                                        </td>
                                        <td style={{width: '33%', paddingLeft: '6em', paddingRight: '6em'}}>
                                            <table style={{width:"100%"}}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{backgroundColor: 'gray', textAlign: 'center', color:"white", fontSize:".6em"}} ><span><b>{"RECIBO"}</b></span></td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{backgroundColor: '#ffffff', textAlign: 'center', fontSize:'42px'}}>
                                                        <span>X</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <p>Nro Recibo: {dataPago.idcobro}<br />
                                            Fecha: {dataPago.fecha}<br />
                                            &nbsp;</p>
                                            <p><b>{_tipo}</b></p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style={{width: '100%'}}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p>Recibi la suma de: <b>{"MONTO TEXTO"}</b><br />
                                            En concepto de: {dataPago.concepto}<br />
                                            {"SALDO CTA CTE"}</p>
                                            <hr />
                                            {html_cheque_tarjeta()}
                                        </td>
                                        <td>
                                            {tabla_modo_pago()}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Operador: {dataPago.usuario_idusuario} &nbsp;Caja: {dataPago.caja_idcaja} Turno {"dataPago.turno"}</p>
                            <br />
                            <p>Firma Cajero o Responsable: _______________________________</p>
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table>
        </>
    }

    return (
        dataPago == null ? <Spin /> : 
    <>
    <table style={{width: '100%'}}>
<tbody>
    <tr>
        <td>
            {recibo_copia("ORIGINAL")}
        </td>
    </tr>
    <tr>
        <td style={{padding:"0", margin:"0"}}>
            <hr style={{borderTop: 'dotted 1px'}} />
        </td>
    </tr>
    <tr>
        <td>
            {recibo_copia("DUPLICADO")}
        </td>
    </tr>
</tbody>
</table>
    
    </>)
}


