import { get } from "@/src/urls"
import { Spin } from "antd"

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

	useEffect(()=>{
		const url= get.venta;
		//get venta
		fetch(url+props.idventa)
		.then(response=>response.json())
		.then((response)=>{
			setData(response.data)
		})
	})

    
    const productos = () => {
        switch(data.tipo)
        {
            case 1: return <VentaDirectaItems idventa={data.idventa} /> ;
            case 2: return <RecStockItems idventa={data.idventa} /> ;
            case 3: return <LCLabItems idventa={data.idventa} /> ;
            case 4: return  <LCStockItems idventa={data.idventa} />;
            case 5: return  <MultifLabItems idventa={data.idventa} />;
            case 6: return  <MonofLabItems idventa={data.idventa} />;
        }
    }

    return (
		data === null ? <Spin /> :
        <>
			<table style={{height: '78px', width:'100%', border:'1', cellspacing:'0', cellpadding:'0',}}>
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
															<img src='{data.icon}' width='36px' height='36px' />
														</td>
														<td>
															<DataSucursalInf idsucursal={data.sucursal_idsucursal} />
														</td>
													</tr>
												</tbody>
											</table>
											Nombre: <span style={{fontWeight: 'bold'}}>{data.cliente_nombre}</span><br />
											<br />
											<div style={{fontSize: '9px', fontWeight:'bold', border:'1px', borderStyle:'solid', borderColor:'black'}}>
											No se entregar&aacute;n trabajos sin esta boleta. Pasados los 30 d&iacute;as de la fecha
											estipulada los precios podr&aacute;n ser actualizados al d&iacute;a. Transcurridos los 
											60 d&iacute;as a partir de la fecha, no se aceptar&aacute;n reclamos.<br />
											</div>
											<br />
											Vendedor: {"NOMBRE VENDEDOR"}
										</td>
										<td style={{textAlign: 'center'}}>
											{
											 "TIPO DE VENTA"
											}
										</td>
										<td width='250px'>
										
											<FechaEntregaInf data={data} />
											
											<MontosTotalesInf idventa={data.idventa}/>
											
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td style={{textAlign: 'center',}}><img src='{data.barcode}' /></td>
					</tr>
					{data.status}
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
											<FechaEntregaInf data={data} />
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td style={{textAlign: 'center'}}>
							<img src='{data.barcode}' />
						</td>
					</tr>
						{data.estado}
					<tr>
						<td>
							{productos()}
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
											<MontosTotalesInf idventa={data.idventa} />
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		</>
    )
}

export default InformeVenta;