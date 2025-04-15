import FoodLoader from "@/components/etc/loader/foodLoader"
import globals from "@/src/globals"
import { post_method } from "@/src/helpers/post_helper"
import { get, post } from "@/src/urls"
import { Col,  Progress, Row} from "antd"
import { useEffect, useState } from "react"

const VentasVendedor = (props) => {

    const [datos_vendedor, setDatosVendedor] = useState(null)
    const [ventas_vendedor, setVentasVendedor] = useState(null)
    const [cant_ventas_dia, setCantVentasDia] = useState(0)
    const [ventas, setVentas] = useState([])
    const d = new Date();

    //const columns = [ 
    //    {dataIndex: 'usuario', title: "usuario"},
    //    {dataIndex: 'efectivo', title: "efectivo" , render:(_,{efectivo})=><div style={money_style}>{  currency_format(efectivo)  }</div>},
    //    {dataIndex: 'tarjeta', title: "tarjeta" , render:(_,{tarjeta})=><div style={money_style}>{  currency_format(tarjeta)  }</div>},
    //    {dataIndex: 'cheque', title: "cheque" , render:(_,{cheque})=><div style={money_style}>{  currency_format(cheque)  }</div>},
    //    {dataIndex: 'ctacte', title: "ctacte" , render:(_,{ctacte})=><div style={money_style}>{  currency_format(ctacte)  }</div>},
    //    {dataIndex: 'mutual', title: "mutual" , render:(_,{mutual})=><div style={money_style}>{  currency_format(mutual)  }</div>},
    //    {dataIndex: 'total', title: "total" , render:(_,{total})=><div style={money_style}>{   currency_format(total)  }</div>},
    //    { title: "", render:(_,{idusuario})=>{
    //        return <></>
    //    }},
    //]

    const columns = [
        {dataIndex: "idventa", title: "Nro."},
        {dataIndex: "cliente", title: "Cliente"},
        {dataIndex: "estado", title: "Estado"},
        {dataIndex: "tipo", title: "Tipo"},

    ]



    const load = _ => { 
        //get user data
        fetch(get.detalle_usuario + globals.obtenerUID() )
        .then(resp=>resp.json())
        .then((resp)=>{
            setDatosVendedor(
                {
                    nombre: resp.data.nombre,
                    usuario: resp.data.usuario,
                    contraseña: "***"
                }
            )
        })
        let today = new Date()
        let target = 2_000_000
        
        post_method(post.obtener_totales_ventas_vendedor_dia,
            {
                fecha:`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
                idsucursal: globals.obtenerSucursal()
            },(response)=>{
                let resp = (response?.data)||[]
                
                setVentas(resp.map(r=>({
                    usuario: r.usuario,
                    monto: r.monto,
                    per: r.monto >= target ? 100 : ((r.monto / target) * 100).toFixed(2)
                })))
            })
        post_method(post.obtener_ventas_dia_vendedor,
            {
                fecha:`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
                idsucursal: globals.obtenerSucursal(),
                idusuario: globals.obtenerUID()
            },
            (response)=>{
                let resp = (response?.data)||[]
                setCantVentasDia(resp.length)
            }
            )
        
    }

    const money_style = {
        textAlign:"right",
    }


    const _datos_vendedor = _ => (datos_vendedor==null?<></>:<>
        <Row>
            <Col span={24}>Nombre Usuario: <b>{datos_vendedor.nombre}</b></Col>
        </Row>
        <Row>
            <Col span={24}>Cant. Ventas d&iacute;a: <b>{cant_ventas_dia}</b></Col>
        </Row>
    </>)
    //const _ventas_vendedor = _=> (ventas_vendedor==null?<></>:<><Table dataSource={ventas_vendedor} columns={columns} /></>)


    useEffect(()=>{
        load()
    },[])

    return <>
    <Row>
        <Col span={24}>
        {_datos_vendedor()}
        </Col>
        </Row>
        <Row>
        <Col span={24}>
            <Row>
                <Col span={24}>
                    <i>Objetivo d&iacute;a 2 millones:</i>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{padding:".8em"}}>
                    {
                        ventas.map(r=>(<>
                            <Row>
                                <Col span={6}>
                                    {r.usuario}
                                </Col>
                                <Col span={18}>
                                    <Progress percent={r.per} />
                                </Col>
                            </Row>
                        </>))
                    }
                    
                </Col>
            </Row>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        <br />
            <b>Objetivo Mensual Sucursal</b>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <FoodLoader />
        </Col>
    </Row>
    
    </>
}

export default VentasVendedor;