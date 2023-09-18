const FechaEntregaInf = (props) => (
	<table width='100%'>
		<tbody>
		<tr>
			<td style={{padding:"0", fontSize:".85em"}}>Nro:</td>
			<td style={{padding:"0", fontSize:".85em"}}>{props.data.idventa}</td>
		</tr>
		<tr>
			<td style={{padding:"0", fontSize:".85em"}}>Fecha:</td>
			<td style={{padding:"0", fontSize:".85em"}}>{props.data.fecha_formated}</td>
		</tr>
		<tr>
			<td style={{padding:"0", fontSize:".85em"}}>Hora:</td>
			<td style={{padding:"0", fontSize:".85em"}}>{props.data.hora == null ? "-" : props.data.hora}</td>
		</tr>
		<tr>
			<td style={{padding:"0", fontSize:".85em"}}>Fecha Entrega:</td>
			<td style={{padding:"0", fontSize:".85em"}}>{props.data.fecha_entrega_formated}</td>
		</tr>
		<tr>
			<td style={{padding:"0", fontSize:".85em"}}>Hora Entrega:</td>
			<td style={{padding:"0", fontSize:".85em"}}>{props.data.hora_retiro == "null" ? "-" : props.data.hora_retiro  }</td>
		</tr>
		<tr>
			<td colspan='2' style={{padding:"0", fontSize:".85em"}}></td>
		</tr>
		</tbody>
	</table>
)

export default FechaEntregaInf;