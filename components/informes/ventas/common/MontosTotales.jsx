import { currency_format } from "@/src/helpers/string_helper";
import { Spin } from "antd"
import { useEffect, useState } from "react"

const MontosTotalesInf = (props) => {
	/*const [data, useData] = useState(null)
    useEffect(()=>{
        fetch("")
        .then(response=>response.json())
        .then((response)=>{

        })
    },[])*/
    return  <>
			<table width='100%' border='0' cellSpacing='0' cellPadding='0'>
				<tbody>
					<tr>
						<td style={{fontSize:".96em"}}>Importe</td>
						<td style={{textAlign:"right", fontSize:".96em"}}><b>${currency_format(props.data.subtotal)}</b></td>
					</tr>
					<tr>
						<td style={{fontSize:".96em"}}>Descuento</td>
						<td style={{textAlign:"right", fontSize:".96em"}}><b>${currency_format(props.data.descuento)}</b></td>
					</tr>
					<tr>
						<td style={{fontSize:".96em"}}>Subtotal</td>
						<td style={{textAlign:"right", fontSize:".96em"}}><b>${currency_format(parseFloat(props.data.subtotal) - parseFloat(props.data.descuento))}</b></td>
					</tr>
					<tr>
						<td style={{fontSize:".96em"}}>Se&ntilde;a</td>
						<td style={{textAlign:"right", fontSize:".96em"}}><b>${currency_format(props.data.total_haber)}</b></td>
					</tr>
					<tr>
						<td style={{fontSize:".96em"}}>Saldo</td>
						<td style={{textAlign:"right", fontSize:".96em"}}><b>${currency_format(parseFloat(props.data.subtotal) - parseFloat(props.data.descuento) - parseFloat(props.data.total_haber))}</b></td>
					</tr>
				</tbody>
            </table>
		</>
}

export default MontosTotalesInf;