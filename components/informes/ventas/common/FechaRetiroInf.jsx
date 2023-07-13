const FechaEntregaInf = (props) => (
	<table width='100%'>
		<tbody>
		<tr>
			<td>Nro:</td>
			<td>{props.data.idventa}</td>
		</tr>
		<tr>
			<td>Fecha:</td>
			<td>{props.data.fecha}</td>
		</tr>
		<tr>
			<td>Hora:</td>
			<td>{props.data.fecha}</td>
		</tr>
		<tr>
			<td>Fecha Entrega:</td>
			<td>{props.data.fecha_retiro}</td>
		</tr>
		<tr>
			<td>Hora Entrega:</td>
			<td>{props.data.hora_retiro}</td>
		</tr>
		<tr>
			<td colspan='2'><hr /></td>
		</tr>
		</tbody>
	</table>
)

export default FechaEntregaInf;