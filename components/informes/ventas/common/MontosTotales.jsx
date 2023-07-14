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
			<table width='100%' border='0' cellspacing='0' cellpadding='0'>
				<tbody>
					<tr>
						<td style={{fontSize:".8em"}}>Importe</td>
						<td style={{textAlign:"right", fontSize:".8em"}}>${props.data.subtotal}</td>
					</tr>
					<tr>
						<td style={{fontSize:".8em"}}>Descuento</td>
						<td style={{textAlign:"right", fontSize:".8em"}}>${props.data.descuento}</td>
					</tr>
					<tr>
						<td style={{fontSize:".8em"}}>Subtotal</td>
						<td style={{textAlign:"right", fontSize:".8em"}}>${props.data.monto_total}</td>
					</tr>
					<tr>
						<td style={{fontSize:".8em"}}>Se&ntilde;a</td>
						<td style={{textAlign:"right", fontSize:".8em"}}>${0}</td>
					</tr>
					<tr>
						<td style={{fontSize:".8em"}}>Saldo</td>
						<td style={{textAlign:"right", fontSize:".8em"}}>${0}</td>
					</tr>
				</tbody>
            </table>
		</>
}

export default MontosTotalesInf;