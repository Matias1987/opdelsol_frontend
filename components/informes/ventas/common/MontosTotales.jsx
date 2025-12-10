import { formatFloat } from "@/src/helpers/formatters";
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
						<td style={{fontSize:".96em"}}>IMPORTE</td>
						<td style={{textAlign:"right", fontSize:".96em"}}><b>${formatFloat(props.data.subtotal)}</b></td>
					</tr>
					<tr>
						<td style={{fontSize:".96em"}}>DESCUENTO</td>
						<td style={{textAlign:"right", fontSize:".96em"}}><b>${formatFloat(props.data.descuento)}</b></td>
					</tr>
					<tr>
						<td style={{fontSize:".96em"}}>SUBTOTAL</td>
						<td style={{textAlign:"right", fontSize:".96em"}}><b>${formatFloat(parseFloat(props.data.subtotal) - parseFloat(props.data.descuento))}</b></td>
					</tr>
					<tr>
						<td style={{fontSize:".96em"}}>SE&Ntilde;A</td>
						<td style={{textAlign:"right", fontSize:".96em"}}><b>${formatFloat(props.data.total_haber)}</b></td>
					</tr>
					<tr>
						<td style={{fontSize:".96em"}}>SALDO</td>
						<td style={{textAlign:"right", fontSize:".96em"}}><b>${formatFloat(parseFloat(props.data.subtotal) - parseFloat(props.data.descuento) - parseFloat(props.data.total_haber))}</b></td>
					</tr>
				</tbody>
            </table>
		</>
}

export default MontosTotalesInf;