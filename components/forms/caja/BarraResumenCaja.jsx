import globals from "@/src/globals"
import { formatFloat } from "@/src/helpers/formatters"
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

      const style = {
        display:"flex",
        justifyContent:"flex-end",
        width:"100%", 
        height:"20px", 
        fontSize:"11px", 
        paddingTop:"2px", 
        paddingLeft:"34px" ,
        //backgroundColor:"#FFFFB8", 
        //background: "#f8f8eaff", 
        background: "linear-gradient(45deg, rgb(255, 255, 255) 20%, rgba(248, 248, 234, 1) 95%)",
        color:"#5c5705"
        //color: "#663F4C"
        }

    return data ? <div style={style}>
        {
            data.map(_row=><div style={{paddingLeft:"50px", width:"150px"}}>
                                <span style={{whiteSpace:"nowrap"}}>{_row.detalle||""}:&nbsp;&nbsp;</span>
                                <span style={{fontWeight:"bold"}}>{formatFloat( parseFloat(_row.valor||"0"))}</span>
                            </div>)
        }
        
       {/*<span style={{paddingLeft:"100px"}}><ContadoresEstadoTaller /></span>*/}
       
    </div>: <></>
}

export default BarraResumenCaja