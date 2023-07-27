import { get } from "@/src/urls"
import { Spin } from "antd"
import { useEffect, useState } from "react"

export default function InformeX(props){
    const [dataSucursal, setDataSucursal] = useState(null)
    const [dataCliente, setDataCliente] =  useState(null)
    const [dataPago, setDataPago] = useState(null)


    useEffect(()=>{
        //get pago data
        fetch(get.detalle_cobro + props.idcobro)
        .then(response=>response.json())
        .then((response)=>{
            setDataPago("COBRO::::: " + response.data)
            /*now that I have the pago data, I can know the client id  */
            //get client data
            fetch(get.cliente_por_id + response.data.cliente_idcliente)
            .then(_response=>_response.json())
            .then((_response)=>{
                console.log("CLIENTE::::: " + JSON.stringify(_response.data))
                setDataCliente(_response.data)
            })

            //get sucursal data
            fetch(get.sucursal_details + response.data.sucursal_idsucursal)
            .then(__response=>__response.json())
            .then((__response)=>{
                setDataSucursal("SUCURSAL::::: " + __response.data[0])
            })

        })

        

    },[])

    const data_cliente = () => {
        return dataCliente == null ? <Spin /> : <>
            Se&ntilde;or/es: {dataCliente.nombre}<br />
            Domicilio: {dataCliente.direccion}<br />
            Condicion IVA: {"condicion iva"}<br />   
        </>
    }

    const data_sucursal = () => {
        return dataSucursal == null ? <Spin /> : <>{data.sucursal_denominacion}</>
    }

    const html_cheque_tarjeta = () => {
        return <>
            <p>Cheque: {"@nro_cheque@"} Banco: {"@cheque_banco@"} &nbsp;Fecha: {"cheque_fecha"}</p>
            <p>Tarjeta: {"@tarjeta_nombre@"} Numero: {"@tarjeta_nro@"} Cupon: {"@tarjeta_cupon@"}</p>
        </>
    }

    const recibo_copia = (_tipo) => {
        return <>
        <table style='width: 100%;'>
                <tbody>
                    <tr>
                    <td>
                    <table style='width: 100%;' class='noborder'>
                    <tbody>
                    <tr >
                    <td class='noborder' style='width: 33%;'>
                    <p>
                    {data_sucursal()}<br />
                    {data_cliente()}
                    </p>
                    </td>
                    <td align='center' class='noborder' style='width: 33%;'>
                    <table>
                    <tbody>
                    <tr>
                    <td style='background-color: #000000; text-align: center;' ><span style='color: #ffffff;'><strong>{_tipo}</strong></span></td>
                    </tr>
                    <tr>
                    <td style='background-color: #ffffff; text-align: center; font-size:42px;' valign='middle'>
                    <strong><span style='color: #000000;'>X</span></strong>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    <td class='noborder'>
                    <p>Nro Recibo: {dataPago.idcobro}<br />
                    Fecha: {dataPago.fecha}<br />
                    &nbsp;</p>
                    <p><b>ORIGINAL</b></p>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    <tr>
                    <td>
                    <table style='width: 100%;'>
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
                    <table style='width: 100%;'>
                    <tbody>
                    <tr>
                    <td>Efectivo:</td>
                    <td>{"dataPago.efectivo"}</td>
                    </tr>
                    <tr>
                    <td>Cheque:</td>
                    <td>{"dataPago.cheque"}</td>
                    </tr>
                    <tr>
                    <td>Tarjeta:</td>
                    <td>{"dataPago.tarjeta"}</td>
                    </tr>
                    <tr>
                    <td>Mutual:</td>
                    <td>{"dataPago.mutual"}</td>
                    </tr>
                    <tr>
                    <td>TOTAL:</td>
                    <td>{dataPago.monto}</td>
                    </tr>
                    </tbody>
                    </table>
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
    <table style='width: 100%;'>
<tbody>
    <tr>
        <td>
            {recibo_copia("ORIGINAL")}
        </td>
    </tr>
    <tr>
        <td>
            {recibo_copia("COPIA")}
        </td>
    </tr>
</tbody>
</table>
    
    </>)
}