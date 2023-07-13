const FechaEntregaInf = (props) => (
	<table width='100%'>
		<tbody>
		<tr>
			<td>Nro:</td>
			<td>@nro_operacion@</td>
		</tr>
		<tr>
			<td>Fecha:</td>
			<td>@fecha@</td>
		</tr>
		<tr>
			<td>Hora:</td>
			<td>@hora@</td>
		</tr>
		<tr>
			<td>Fecha Entrega:</td>
			<td>@fecha_entrega@</td>
		</tr>
		<tr>
			<td>Hora Entrega:</td>
			<td>@hora_entrega@</td>
		</tr>
		<tr>
			<td colspan='2'><hr /></td>
		</tr>
		</tbody>
	</table>
)

export default FechaEntregaInf;