const { useState } = require("react")
const { default: VentaDirectaItems } = require("./VentaDirectaItems")
const { default: RecStockItems } = require("./RecStockItems")
const { default: LCLabItems } = require("./LCLabItems")
const { default: LCStockItems } = require("./LCStockItems")
const { default: MultifLabItems } = require("./MultifLabItems")
const { default: MonofLabItems } = require("./MonofLabItems")
const { default: FechaEntregaInf } = require("./common/FechaRetiroInf")
const { default: MontosTotalesInf } = require("./common/MontosTotales")
const { default: ModoPagoInf } = require("./common/ModoPago")

const InformeVenta = (props) => {

    const [venta, setVenta] = useState(null)

    
    const productos = () => {
        switch(venta.tipo)
        {
            case 1: return <VentaDirectaItems /> ;
            case 2: return <RecStockItems /> ;
            case 3: return <LCLabItems /> ;
            case 4: return  <LCStockItems />;
            case 5: return  <MultifLabItems />;
            case 6: return  <MonofLabItems />;
        }
    }

    return (
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
														<u><span style={{fontWeight:'bold',}}>{data.denominacion}</span></u><br /> 
														{data.direccion}<br /> 
														{data.telefono}<br /> 
													</td>
												</tr>
											</tbody>
										</table>
										Nombre: <span style={{fontWeight: 'bold'}}>{data.cliente}</span><br />
										<br />
										<div style={{fontSize: '9px', fontWeight:'bold', border:'1px', borderStyle:'solid', borderColor:'black'}}>
										No se entregar&aacute;n trabajos sin esta boleta. Pasados los 30 d&iacute;as de la fecha
										estipulada los precios podr&aacute;n ser actualizados al d&iacute;a. Transcurridos los 
										60 d&iacute;as a partir de la fecha, no se aceptar&aacute;n reclamos.<br />
										</div>
										<br />
										Vendedor: {data.vendedor}
									</td>
									<td style={{textAlign: 'center'}}>
									{data.tipo_operacion}
									</td>
									<td width='250px'>
									
										<FechaEntregaInf />
										
										<MontosTotalesInf />
										
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
									<p>
									<u><span style={{fontWeight: 'bold'}}>{data.denominacion}</span></u><br />
									<span style={{fontWeight: 'bold'}}>RESPONSABLE:</span><br /> 
									Ap. y Nombre: {data.nombre_r}<br /> 
									Nro. Cliente: {data.id_r}&nbsp;&nbsp;<span style={{fontWeight: 'bold'}}>DNI:{data.dni_r}&nbsp;&nbsp;</span>Tel.:{data.telefono_r}<br /> 
									Fecha de Nac: {data.fnac_r}&nbsp;&nbsp;Direcci&oacute;n:{data.dir_r}<br />
									<span style={{fontWeight: 'bold'}}>DESTINATARIO:</span><br /> 
									Ap. y Nombre: {data.nombre_d}<br />
									<hr />
									Obra Social: {data.obra_social}<br />Medico: {data.medico} <br />Fecha de Entrega: {data.fecha_entrega}
									</p>
									</td>
									<td width='250px'>
										<FechaEntregaInf />
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
				<tr>
					<td style={{textAlign: 'center'}}><img src='{data.barcode}' /></td>
				</tr>
					{data.status}
				<tr>
					<td>
						{data.items}
					</td>
				</tr>
				<tr>
					<td>
						<table width='100%' border='0' cellspacing='0' cellpadding='0'>
							<tbody>
								<tr>
									<td>
										<ModoPagoInf />
									</td>
									<td>&nbsp;&nbsp;</td>
									<td width='250px'>
										<MontosTotalesInf />
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