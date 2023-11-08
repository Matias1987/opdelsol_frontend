import { get } from "@/src/urls"
import { Spin, Tag } from "antd"
import Barcode from "react-barcode"

const { useState, useEffect } = require("react")
const { default: VentaDirectaItems } = require("./VentaDirectaItems")
const { default: RecStockItems } = require("./RecStockItems")
const { default: LCLabItems } = require("./LCLabItems")
const { default: LCStockItems } = require("./LCStockItems")
const { default: MultifLabItems } = require("./MultifLabItems")
const { default: MonofLabItems } = require("./MonofLabItems")
const { default: FechaEntregaInf } = require("./common/FechaRetiroInf")
const { default: MontosTotalesInf } = require("./common/MontosTotales")
const { default: ModoPagoInf } = require("./common/ModoPago")
const { default: DestinatarioInf } = require("./common/Destinatario")
const { default: ResponsableInf } = require("./common/Responsable")
const { default: DataSucursalInf } = require("./common/DataSucursalInf")

const InformeVenta = (props) => {

    const [data, setData] = useState(null)
	const [mp, setMP] = useState([])
	const [haber, setHaber] = useState(null)

	useEffect(()=>{
		const url= get.venta;
		const url_mp = get.get_venta_mp;
		//alert(url_mp + props.idventa)
		//get venta
		fetch(url+props.idventa)
		.then(response=>response.json())
		.then((response)=>{

			fetch(url_mp + props.idventa)
			.then(_response=>_response.json())
			.then((_response)=>{

				setMP(_response.data)

				var total_haber=0;

				_response.data.forEach(r=>{
					if(r.modo_pago!='ctacte')
					{
						total_haber += parseFloat(r.monto)
					}
				})

				//alert("data venta: " + JSON.stringify(response))

				setData({...response.data[0], total_haber: total_haber})
				
			})	
		})
	},[])

	
    
    const productos = () => {
		//alert(data.tipo)
        switch(+data.tipo)
        {
            case 1: return <VentaDirectaItems idventa={data.idventa} /> ;
            case 2: return <RecStockItems idventa={data.idventa} /> ;
            case 6: return <LCLabItems idventa={data.idventa} /> ;
            case 3: return  <LCStockItems idventa={data.idventa} />;
            case 5: return  <MultifLabItems idventa={data.idventa} />;
            case 4: return  <MonofLabItems idventa={data.idventa} />;
        }
    }
	const tipo_venta = (tipo) => {
		switch(+tipo)
		{
			case 1: return "VENTA DIRECTA"; 
			case 2: return "RECETA STOCK"; 
			case 3: return "LENTES DE CONTACTO STOCK"; 
			case 4: return "MONOFOCALES LABORATORIO"; 
			case 5: return "MULTIFOCALES LABORATORIO"; 
			case 6: return "LENTES DE CONTACTO LABORATORIO"; 
		}
	}
    return (
		data === null ? <Spin /> :
        <>
			<div style={{width: '100%', paddingLeft: '12px', paddingRight: '12px', paddingTop: '20px'}}> 
			<table style={{height: '78px', width:'96%', border:'1', cellspacing:'0', cellpadding:'0', fontSize:"16px", padding:"0"}}>
				<tbody>
					<tr>
						<td>
							<table style={{height: '21px', width:'100%', border:'1', cellspacing:'0', cellpadding:'0',}}>
								<tbody>
									<tr>
										<td width='250px'>
											<table border='0' cellspacing='0' cellpadding='0'>
												<tbody>
													<tr>
														<td width='40px'>
														<img src=""/>
														</td>
														<td>
															<DataSucursalInf idsucursal={data.sucursal_idsucursal} />
														</td>
													</tr>
												</tbody>
											</table>
											Nombre: <span style={{fontWeight: 'bold'}}>{data.cliente_nombre}</span><br />
											<div style={{fontSize: '.7em', fontWeight:'bold', border:'1px', borderStyle:'dotted', borderColor:'black', padding:".25em"}}>
											No se entregar&aacute;n trabajos sin esta boleta. Pasados los 30 d&iacute;as de la fecha
											estipulada los precios podr&aacute;n ser actualizados al d&iacute;a. Transcurridos los 
											60 d&iacute;as a partir de la fecha, no se aceptar&aacute;n reclamos.<br />
											</div>
											
											Vendedor: <b>{data.usuario_nombre}</b>
										</td>
										<td style={{textAlign: 'center'}}>
											{
											 tipo_venta(data.tipo)
											}
											<br />
											{
												//<Barcode value={data.idventa}  displayValue={false} width={2} height={6}/>
											}
										</td>
										<td width='250px'>

											
										
											<FechaEntregaInf data={data} />
											
											<MontosTotalesInf data={data}/>
											
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr><td style={{padding:"0"}}><hr style={{border:"dotted"}} /></td></tr>
					<tr>
						<td>
							<table style={{height: '21px', width:'100%'}} >
								<tbody>
									<tr>
										<td>
											<ResponsableInf id={data.cliente_idcliente}/>
											<DestinatarioInf id={data.fk_destinatario} />
											<hr />
           									Obra Social: {data.obra_social}<br />Medico: {data.medico} <br />Fecha de Entrega: {data.fecha_entrega}
										</td>
										<td width='250px'>
										<DataSucursalInf idsucursal={data.sucursal_idsucursal} />
											<FechaEntregaInf data={data} />
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr >
						<td style={{textAlign: 'center', padding:"0"}}>
						{
							//<Barcode value={data.idventa}  displayValue={false} width={2} height={6}/>
						}
						</td>
					</tr>
					<tr>
						<td>
							{productos()}
							<hr />
						</td>
					</tr>
					<tr>
						<td>
							<table width='100%' border='0' cellspacing='0' cellpadding='0'>
								<tbody>
									<tr>
										<td>
											<ModoPagoInf idventa={data.idventa} />
										</td>
										<td>&nbsp;&nbsp;</td>
										<td width='250px'>
											<MontosTotalesInf data={data} />
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<b>Comentarios: </b><br />
							{data.comentarios}
						</td>
					</tr>
				</tbody>
			</table>
			</div>
		</>
    )
}

export default InformeVenta;