import globals from "@/src/globals"
import { get } from "@/src/urls"
import { useEffect, useState } from "react"

const BarraResumenCaja = props => {
    const [data, setData] = useState(null)
    const [update, setUpdate] = useState(false)
    const load = _ => {

        fetch(get.resumen_caja + globals.obtenerSucursal())
        .then(r=>r.json())
        .then(response=>{
            //alert(JSON.stringify(response))
            const rows = []
            let saldo =0
            const result = (response?.data)||[]
           //alert(JSON.stringify(result))
            result.forEach(row=>{
                
                saldo += (row.tipo=='ingreso' ?  parseFloat(row.monto||"0") : -parseFloat(row.monto||"0"))
                //alert(saldo)
                rows.push({
                    tipo: row.tipo,
                    detalle: row.detalle,
                    valor: row.monto,
                })
            })

            rows.push({
                tipo: '',
                detalle: 'Neto',
                valor: saldo,
            })

            setData(rows)
        })

    }

    useEffect(() => {
        load()
        // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
        const timeoutId = setTimeout(() => {
          
          setUpdate(!update)
        }, 5000);
        
        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
      }, [update]);

    return data ? <div style={{width:"100%", height:"20px", fontSize:"11px", paddingTop:"2px", paddingLeft:"34px" ,backgroundColor:"#FFFFB8", color:"#00306E"}}>
        {
            data.map(_row=><span style={{paddingLeft:"200px"}}>
                                <span>{_row.detalle||""}:&nbsp;&nbsp;</span>
                                <span style={{fontWeight:"bold"}}>{parseFloat(_row.valor||"0").toLocaleString(2)}</span>
                            </span>)
        }
       
    </div>: <></>
}

export default BarraResumenCaja