import globals from "@/src/globals"
import { get } from "@/src/urls"
import { useEffect, useState } from "react"

const BarraResumenCaja = props => {
    const [data, setData] = useState(null)

    const load = _ => {

        fetch(get.resumen_caja + globals.obtenerSucursal())
        .then(r=>r.json())
        .then(response=>{
            //alert(JSON.stringify(response))
            const rows = []
            response.data.forEach(row=>{
                rows.push({
                    tipo: row.tipo,
                    valor: row.monto,
                })
            })
            setData(rows)
        })

    }

    useEffect(_=>{load()},[])

    return data ? <div style={{width:"100%", height:"20px", fontSize:"11px", paddingTop:"2px", paddingLeft:"34px" ,backgroundColor:"yellow"}}>
        {
            data.map(_row=><span style={{paddingLeft:"200px"}}>
                                <span>{_row.tipo||"0"}:&nbsp;&nbsp;</span>
                                <span style={{fontWeight:"bold"}}>{_row.valor||"0"}</span>
                            </span>)
        }
    </div>: <></>
}

export default BarraResumenCaja