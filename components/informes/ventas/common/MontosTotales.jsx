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
						<td style={{fontSize:".8em"}}>Importe</td>
						<td style={{textAlign:"right", fontSize:".8em"}}>${currency_format(props.data.subtotal)}</td>
					</tr>
					<tr>
						<td style={{fontSize:".8em"}}>Descuento</td>
						<td style={{textAlign:"right", fontSize:".8em"}}>${currency_format(props.data.descuento)}</td>
					</tr>
					<tr>
						<td style={{fontSize:".8em"}}>Subtotal</td>
						<td style={{textAlign:"right", fontSize:".8em"}}>${currency_format(props.data.monto_total)}</td>
					</tr>
					<tr>
						<td style={{fontSize:".8em"}}>Se&ntilde;a</td>
						<td style={{textAlign:"right", fontSize:".8em"}}>${currency_format(props.data.total_haber)}</td>
					</tr>
					<tr>
						<td style={{fontSize:".8em"}}>Saldo</td>
						<td style={{textAlign:"right", fontSize:".8em"}}>${currency_format(props.data.monto_total - props.data.total_haber)}</td>
					</tr>
				</tbody>
            </table>
		</>
}

export default MontosTotalesInf;