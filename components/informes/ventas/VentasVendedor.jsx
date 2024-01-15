import { Col, Row } from "antd"
import { useState } from "react"

const VentasVendedor = (props) => {

    const [datos_vendedor, setDatosVendedor] = useState(null)
    const [ventas_vendedor, setVentasVendedor] = useState(null)

    const load = _ => { 
        //get user data
        fetch("" + props.idusuario )
        .then(resp=>resp.json())
        .then((resp)=>{
            setDatosVendedor(
                {
                    nombre: resp.data[0].nombre,
                    usuario: resp.data[0].usuario,
                    contraseña: "***"
                }
            )
        })

        fetch("" + props.idusuario)
        .then(resp=>resp.json())
        .then((resp)=>{
            setVentasVendedor(resp.data.map(r=>({
                idventa: r.idventa,
                fecha: r.fecha,
                sucursal: r.sucursal, 
                monto: r.monto,
                tipo: r.tipo
            })))
        })
    }

    const _datos_vendedor = _ => (datos_vendedor==null?<></>:<></>)
    const _ventas_vendedor = _=> (ventas_vendedor==null?<></>:<></>)


    return <>
    <Row>
        <Col span={24}>
            <div style={{border:"1px dotted", borderRadius:"32px", width:"100%", padding:"1em"}} >
                {_datos_vendedor()}
            </div>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <div style={{border:"1px dotted", borderRadius:"32px", width:"100%", padding:"1em"}} >
                {_ventas_vendedor()}
            </div>
        </Col>
    </Row>
    
    </>
}

export default VentasVendedor;