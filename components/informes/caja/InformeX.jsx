import { useEffect, useState } from "react"

export default function InformeX(props){
    const [dataSucursal, setDataSucursal] = useState(null)
    const [dataCliente, setDataCliente] =  useState(null)
    const [dataPago, setDataPago] = useState(null)


    useEffect(()=>{
        //get pago data
        fetch("")
        .then(response=>response.json())
        .then((response)=>{
            setDataPago(response.data[0])
            /*now that I have the pago data, I can know the client id  */
            //get client data
            fetch("")
            .then(response=>response.json())
            .then((response)=>{
                setDataCliente(response.data[0])
            })
        })

        //get sucursal data
        fetch("")
        .then(response=>response.json())
        .then((response)=>{
            setDataSucursal(response.data[0])
        })

    },[])

    const data_cliente = () => {
        return dataCliente == null ? <Spin /> : <>
            Se&ntilde;or/es: {dataCliente.cliente}<br />
            Domicilio: {dataCliente.domicilio}<br />
            Condicion IVA: {dataCliente.condicion_iva}<br />   
        </>
    }

    const data_sucursal = () => {
        return dataSucursal == null ? <Spin /> : <>{data.sucursal_denominacion}</>
    }

    const recibo_copia = () => {
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
                    <td style='background-color: #000000; text-align: center;' ><span style='color: #ffffff;'><strong>RECIBO</strong></span></td>
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
                    <p>Nro Recibo: {dataPago.nro_recibo}<br />
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
                    <p>Recibi la suma de: <b>{dataPago.monto_texto}</b><br />
                    En concepto de: {dataPago.concepto}<br />
                    {dataPago.saldo_ctacte}</p>
                    <hr />
                    {dataPago.html_tarjeta_cheque}
                    </td>
                    <td>
                    <table style='width: 100%;'>
                    <tbody>
                    <tr>
                    <td>Efectivo:</td>
                    <td>{dataPago.efectivo}</td>
                    </tr>
                    <tr>
                    <td>Cheque:</td>
                    <td>{dataPago.cheque}</td>
                    </tr>
                    <tr>
                    <td>Tarjeta:</td>
                    <td>{dataPago.tarjeta}</td>
                    </tr>
                    <tr>
                    <td>Mutual:</td>
                    <td>{dataPago.mutual}</td>
                    </tr>
                    <tr>
                    <td>TOTAL:</td>
                    <td>{dataPago.total}</td>
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
                    <p>Operador: {dataPago.operador} &nbsp;Caja: {dataPago.caja} Turno {dataPago.turno}</p>
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