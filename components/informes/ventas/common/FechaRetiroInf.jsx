const FechaEntregaInf = (props) => (
	<table width='100%'>
		<tbody>
		<tr>
			<td style={{padding:"0", fontSize:".85em"}}>NRO.:</td>
			<td style={{padding:"0", fontSize:".85em"}}><b>{props.data.idventa}</b></td>
		</tr>
		<tr>
			<td style={{padding:"0", fontSize:".85em"}}>FECHA:</td>
			<td style={{padding:"0", fontSize:".85em"}}><b>{props.data.fecha_formated}</b></td>
		</tr>
		{/*<tr>
			<td style={{padding:"0", fontSize:".85em"}}>Hora:</td>
			<td style={{padding:"0", fontSize:".85em"}}>{props.data.hora == null ? "-" : props.data.hora}</td>
		</tr>*/}
		<tr>
			<td style={{padding:"0", fontSize:".85em"}}>FECHA ENTREGA:</td>
			<td style={{padding:"0", fontSize:".85em"}}><b>{props.data.fecha_entrega_formated}</b></td>
		</tr>
		<tr>
			<td style={{padding:"0", fontSize:".85em"}}>HORA ENTREGA:</td>
			<td style={{padding:"0", fontSize:".85em"}}><b>{props.data.hora_retiro == "null" ? "-" : props.data.hora_retiro  }</b></td>
		</tr>
		<tr>
			<td colspan='2' style={{padding:"0", fontSize:".85em"}}></td>
		</tr>
		</tbody>
	</table>
)

export default FechaEntregaInf;