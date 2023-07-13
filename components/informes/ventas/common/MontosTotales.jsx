const MontosTotalesInf = (props) => {
	return <>
			<table width='100%' border='0' cellspacing='0' cellpadding='0'>
				<tbody>
					<tr>
						<td>Importe</td>
						<td class='money_field'>$${0}</td>
					</tr>
					<tr>
						<td>Descuento</td>
						<td class='money_field'>$${1}</td>
					</tr>
					<tr>
						<td>Subtotal</td>
						<td class='money_field'>$${2}</td>
					</tr>
					<tr>
						<td>Se&ntilde;a</td>
						<td class='money_field'>$${3}</td>
					</tr>
					<tr>
						<td>Saldo</td>
						<td class='money_field'>$${4}</td>
					</tr>
				</tbody>
            </table>
		</>
}

export default MontosTotalesInf;