import PrinterWrapper from "@/components/PrinterWrapper"
import globals from "@/src/globals"
import { currency_format } from "@/src/helpers/string_helper"
import { get } from "@/src/urls"
import { Col,  Row, Spin } from "antd"
import { useEffect, useState } from "react"

export default function InformeCajaV2(props){
    const[dataOperaciones, setDataOperaciones] = useState(null)
    const[dataGastos, setDataGastos] = useState(null)
    const[dataSucursal, setDataSucursal] = useState(null)
    const [dataTransfEnviadas, setDataTransfEnviadas] = useState(null)
    const [dataTransfRecibidas, setDataTransfRecibidas] = useState(null)
    const[dataCaja, setDataCaja] = useState(null)
    const[fecha, setFecha] = useState("")
    const[hora, setHora] = useState("")

    
    const [totales, setTotales] = useState({
        ventas:0,
        cuotas: 0,
        cheques: 0,
        tarjetas: 0,
        mutual: 0,
        ctacte: 0,
        gastos: 0,
        transferido: 0, //entre sucursales
        recibido: 0,
		transferencias: 0,
    })


    const init = () => {
         //get caja by id
         var d = new Date();
         setFecha(d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear())
         setHora(d.getHours() + ":" + d.getMinutes());
 
         fetch(get.caja_id + props.idcaja)
         .then(response=>response.json())
         .then((response)=>{
             
             //get data sucursal
			 if((response?.data||[]).length<1)
			 {
				return 
			 }
             setDataCaja(response.data[0])

             fetch(get.sucursal_details + response.data[0].sucursal_idsucursal)
             .then(__response=>__response.json())
             .then((__response)=>{
                
                 setDataSucursal(__response.data[0])
             })
         })
 
 
         
         fetch(get.informe_caja + props.idcaja)
         .then(response=>response.json())
         .then((response)=>{
			if(typeof response.data === 'undefined' || response.data==null)
			{
				return
			}
           
            setDataOperaciones(response.data)
            
            var totalVentas=0;
            var totalCuotas=0;
            var totalCheques=0;
            var totalTarjetas=0;
            var totalMutual=0;
            var totalCtaCte=0;
			var totalMercadoPago=0;
			var totalTransferencias=0;

            response.data.forEach(r=>{
				totalVentas += parseFloat(r.efectivo);
				totalCuotas += parseFloat(r.cuotas);
				totalCheques += parseFloat(r.cheque);
				totalTarjetas += parseFloat(r.tarjeta);
				totalMutual += parseFloat(r.mutual);
				totalCtaCte += parseFloat(r.ctacte);
				totalMercadoPago += parseFloat(r.mercadopago);
				totalTransferencias += parseFloat(r.transferencia);
			})

            setTotales(t=>({
				...t,
				ventas: totalVentas,
				cuotas: totalCuotas,
				cheques: totalCheques,
				tarjetas: totalTarjetas,
				mutual: totalMutual,
				ctacte: totalCtaCte,
				mercadopago: totalMercadoPago,
				transferencias: totalTransferencias,

			}))
             
         })
 
         fetch(get.lista_gastos_caja + props.idcaja)
         .then(response=>response.json())
         .then((response)=>{
			if(typeof response.data === 'undefined' || response.data==null)
			{
				return
			}
            setDataGastos(response.data)
            var total = 0;
			response.data.forEach(r=>{
				total+=parseFloat(r.monto)
			})
            setTotales(t=>({
				...t,
				gastos: total,
			}))
         })
 
         //lista de transferencias ENTRE SUCURSALES
         fetch(get.transferencias_enviadas + globals.obtenerSucursal() + "/" + props.idcaja)
         .then(response=>response.json())
         .then((response)=>{
			if(typeof response.data === 'undefined' || response.data==null)
			{
				return
			}
             setDataTransfEnviadas(
            response.data.map(r=>({
                 idtransferencia: r.idtransferencia,
                 fecha: r.fecha,
                 destino: r.sucursal_destino,
                 monto: r.monto,
                 comentarios: r.comentarios,
             })))

            var total = 0;
			response.data.forEach(r=>{
				total+=parseFloat(r.monto)
			})
            setTotales(t=>({
				...t,
				transferido: total,
				
			}))

         })
 
         fetch(get.transferencias_recibidas + globals.obtenerSucursal() + "/" + props.idcaja)
         .then(response=>response.json())
         .then((response)=>{
			if(typeof response.data === 'undefined' || response.data==null)
			{
				return
			} 
             setDataTransfRecibidas(response.data.map(r=>({
                 idtransferencia: r.idtransferencia,
                 fecha: r.fecha,
                 origen: r.sucursal_origen,
                 monto: r.monto,
                 comentarios: r.comentarios,
             })))
            var total = 0;
			response.data.forEach(r=>{
				total+=parseFloat(r.monto)
			})
            setTotales(t=>({
				...t,
				recibido: total,
				
			}))
         })
 
    }

 

    useEffect(()=>{
        init()
    },[])

    const data_sucursal = _ => dataSucursal == null ? <></> : <> 
        Sucursal: {dataSucursal.nombre}
    </>
    const header = _ => (
        dataCaja == null ? <></> :
        <>
        <Row>
            <Col span={8}>
                {data_sucursal()}
            </Col>
            <Col span={8}>
                LISTADO DE CAJA DIARIA
            </Col>
            <Col span={8}>
                Fecha de emisi&oacute;n: {fecha} &nbsp;&nbsp;&nbsp;
                Hora de emisi&oacute;n: {hora}
            </Col>
        </Row>
        <Row>
            <Col  span={24}>
                Caja: N1 Fecha: <b>{dataCaja.fecha_f}</b> &nbsp;&nbsp;&nbsp;Turno: M Estado: <b>{dataCaja.estado}</b> &nbsp;&nbsp;&nbsp;Inicio de Caja: <b>{dataCaja.monto_inicial}</b>
            </Col>
        </Row>
        </>
    )

    const footer = _ => (
        dataCaja == null ? <></> :
        <>
        <Row>
            <Col span={6}>Total Ventas + Cuotas:&nbsp;{currency_format(totales.ventas + totales.cuotas)}&nbsp;</Col>
            <Col span={6}>Total Gastos:&nbsp;{currency_format(totales.gastos)}&nbsp;</Col>
            {/*<Col span={6}>Monto Transferido:&nbsp;{currency_format(totales.transferido)} &nbsp;Recibido:&nbsp;{totales.recibido}&nbsp;</Col>*/}
            <Col span={6}>NETO CAJA:&nbsp;{currency_format(parseFloat(totales.ventas) + parseFloat(totales.cuotas) - parseFloat(totales.gastos) - parseFloat(totales.transferido) + parseFloat(totales.recibido))}</Col>
        </Row>
        </>
    )
    const body =_=>{
        return <>
        {header()}
        <Row>
	<Col span={24}>
    <table className="tabla-informe-caja">
        <thead>
            <tr>
                <th>Oper.</th>
                <th>Detalle</th>
                <th>Cliente</th>
                <th>Recibo</th>
                <th>Ventas</th>
                <th>Cuotas</th>
                <th>Cheques</th>
                <th>Tarjetas</th>
                <th>Mutual</th>
                <th>Cta.Cte.</th>
                <th>Mercado Pago</th>
                <th>Transferencia</th>
            </tr>
        </thead>
        <tbody>
            {dataOperaciones.map((row,idx)=><tr key={idx}>
                <td>
                    {row["operacion"]}
                </td>
                <td>
                    {row["detalle"]}
                </td>
                <td>
                    {row["cliente"]}
                </td>
                <td>
                    {row["recibo"]}
                </td>
                <td className="money-cell">
                    $&nbsp;{currency_format(row["efectivo"])}
                </td>
                <td className="money-cell">
                    $&nbsp;{currency_format(row["cuotas"])}
                </td>
                <td className="money-cell">
                    $&nbsp;{currency_format(row["cheque"])}
                </td>
                <td className="money-cell">
                    $&nbsp;{currency_format(row["tarjeta"])}
                </td>
                <td className="money-cell">
                    $&nbsp;{currency_format(row["mutual"])}
                </td>
                <td className="money-cell">
                    $&nbsp;{currency_format(row["ctacte"])}
                </td>
                <td className="money-cell">
                    $&nbsp;{currency_format(row["mercadopago"])}
                </td>
                <td className="money-cell">
                    $&nbsp;{currency_format(row["transferencia"])}
                </td>
            </tr>)}
        </tbody>
        <tfoot>
            <tr>
                <th colSpan={"4"}>
                    Totales:
                </th>
                <th className="money-cell">
                    $&nbsp;{currency_format(totales["ventas"])}
                </th>
                <th className="money-cell">
                    $&nbsp;{currency_format(totales["cuotas"])}
                </th>
                <th className="money-cell">
                    $&nbsp;{currency_format(totales["cheques"])}
                </th>
                <th className="money-cell">
                    $&nbsp;{currency_format(totales["tarjetas"])}
                </th>
                <th className="money-cell">
                    $&nbsp;{currency_format(totales["mutual"])}
                </th>
                <th className="money-cell">
                    $&nbsp;{currency_format(totales["ctacte"])}
                </th>
                <th className="money-cell">
                    $&nbsp;{currency_format(totales["mercadopago"])}
                </th>
                <th className="money-cell">
                    $&nbsp;{currency_format(totales["transferencias"])}
                </th>
            </tr>
    
        </tfoot>
    </table>
		
	</Col>
	</Row>
	<Row>
	<Col span={24} style={{padding:"1em"}}>
		<b>Gastos</b>
        <table  className="tabla-informe-caja">
            <thead>
                <tr>
                    <th>Rec.</th>
                    <th>Detalle</th>
                    <th>Importe</th>
                </tr>
            </thead>
            <tbody>
                {
                    dataGastos.map(row=><tr>
                        <td>{row["idgasto"]}</td>
                        <td>{row["concepto_gasto"]}</td>
                        <td className="money-cell">$&nbsp;{currency_format(row["monto"])}</td>
                    </tr>)
                }
            </tbody>
            <tfoot>
                <tr>
                    <th colSpan={2}></th>
                    <th className="money-cell">$&nbsp;{currency_format(totales.gastos)}</th>
                </tr>
            </tfoot>
        </table>
		
		</Col>
		</Row>
        <Row>
		{dataTransfEnviadas.length<1 ? <></>:
		<Col span={12} style={{padding:"1em"}}>
		<b>Monto Transferido</b>
        <table  className="tabla-informe-caja">
            <thead>
                <th>Sucursal Destino</th>
                <th>Importe</th>
            </thead>
            <tbody>
                {
                    dataTransfEnviadas.map(row=><tr>
                        <td>{row["destino"]}</td>
                        <td className="money-cell">$&nbsp;{currency_format(row["monto"])}</td>
                    </tr>)
                }
            </tbody>
            <tfoot>
                <tr>
                <th></th>
                <th className="money-cell">$&nbsp;{currency_format(totales.transferido)}</th>
                </tr>
                
            </tfoot>
        </table>
		
		</Col>}
        {
            dataTransfRecibidas.length<1 ? <></> :
            <Col span={12} style={{padding:"1em"}}>
            <b>Monto Recibido</b>
            <table  className="tabla-informe-caja">
                <thead>
                    <tr>
                        <th>Sucursal Origen</th>
                        <th>Importe</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataTransfRecibidas.map((row,idx)=><tr key={idx}>
                            <td>{row["origen"]}</td>
                            <td className="money-cell">$&nbsp;{currency_format(row["monto"])}</td>
                        </tr>)
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td className="money-cell">$&nbsp;{currency_format(totales.recibido)}</td>
                    </tr>
                </tfoot>
            </table>
            
        </Col>
    }
</Row>
        </>
    }
    return (
    <>
        
            <PrinterWrapper>
            <>
            {
                dataOperaciones==null || 
                dataGastos == null || 
                dataTransfEnviadas==null || 
                dataTransfRecibidas == null ? <Spin /> : 
                body()
            }
           
            
            {
                footer()
            }
            </>
        </PrinterWrapper>
        
    </>)
}