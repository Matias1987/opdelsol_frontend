import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"
import { Col, Row } from "antd"

const { useState, useEffect } = require("react")

const ListaVentasSucursalPeriodo = (props) => {
    const [ventas, setVentas] = useState([])
    const [totales, setTotales] = useState({cant_total:0, monto_total:0})
    const [loading, setLoading] = useState(false)
    
    const load = () => {
        post_method(
            post.obtener_lista_ventas_sucursal_periodo,
            {
                mes: props.mes,
                anio:props.anio,
                sucursal: props.fksucursal,
            },
            (response)=>{
                
                let _monto_total =0

                response.data.forEach(r=>{
                    _monto_total+=parseFloat(r.monto)
                })
            
                setTotales(t=>({...t,cant_total:response.data.length, monto_total:_monto_total}))
            
                setVentas(response.data)
            }

        )
    }

    const _style = {
        width:"100%",
        border: "1px solid black"
    }

    useEffect(()=>{
        load()
    },[])

    const html_totales = _ => <span style={{fontWeight:"bold"}}>Cant Total: {totales.cant_total}   Monto total: ${totales.monto_total}</span>

    const html_table = _ => ventas.length<1 ?  <>
    </> : <>
        <table style={_style}>
            <thead>
                <th>Nro.</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Vendedor</th>
                <th>Monto</th>
            </thead>
            <tbody>
                {
                    ventas.map(r=>(<tr>
                        <td>{r.idventa}</td>
                        <td>{r.fecha_retiro_f}</td>
                        <td>{r.cliente}</td>
                        <td>{r.vendedor}</td>
                        <td style={{textAlign:"right"}}>$&nbsp;{r.monto}</td>
                    </tr>))
                }
            </tbody>
        </table>
    </>
    
    return <>
    <Row>
        <Col span={24}>Ventas Periodo: {props.mes} / {props.anio}</Col>
    </Row>
    <Row>
        <Col span={24}>{html_totales()}</Col>
    </Row>
    <Row>
        <Col span={24}>{html_table()}</Col>
    </Row>
    <Row>
        <Col span={24}>{html_totales()}</Col>
    </Row>
    </>
}

export default ListaVentasSucursalPeriodo;