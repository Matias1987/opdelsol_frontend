import { Spin } from "antd"
import { useEffect, useState } from "react"

const MontosTotalesInf = (props) => {
	const [data, useData] = useState(null)
    useEffect(()=>{
        fetch("")
        .then(response=>response.json())
        .then((response)=>{

        })
    },[])
    return data == null ? <Spin /> : <>
			<table width='100%' border='0' cellspacing='0' cellpadding='0'>
				<tbody>
					<tr>
						<td>Importe</td>
						<td class='money_field'>$${props.data.importe}</td>
					</tr>
					<tr>
						<td>Descuento</td>
						<td class='money_field'>$${props.data.descuento}</td>
					</tr>
					<tr>
						<td>Subtotal</td>
						<td class='money_field'>$${props.data.subtotal}</td>
					</tr>
					<tr>
						<td>Se&ntilde;a</td>
						<td class='money_field'>$${props.data.senia}</td>
					</tr>
					<tr>
						<td>Saldo</td>
						<td class='money_field'>$${props.data.saldo}</td>
					</tr>
				</tbody>
            </table>
		</>
}

export default MontosTotalesInf;