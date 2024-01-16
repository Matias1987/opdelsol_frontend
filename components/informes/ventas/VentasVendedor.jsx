import globals from "@/src/globals"
import { post_method } from "@/src/helpers/post_helper"
import { currency_format, parse_int_string } from "@/src/helpers/string_helper"
import { get, post } from "@/src/urls"
import { Col, Row, Table } from "antd"
import { useEffect, useState } from "react"
import { global } from "styled-jsx/css"

const VentasVendedor = (props) => {

    const [datos_vendedor, setDatosVendedor] = useState(null)
    const [ventas_vendedor, setVentasVendedor] = useState(null)
    const d = new Date();

    const columns = [ 
        {dataIndex: 'usuario', title: "usuario"},
        {dataIndex: 'efectivo', title: "efectivo" , render:(_,{efectivo})=><div style={money_style}>{  currency_format(efectivo)  }</div>},
        {dataIndex: 'tarjeta', title: "tarjeta" , render:(_,{tarjeta})=><div style={money_style}>{  currency_format(tarjeta)  }</div>},
        {dataIndex: 'cheque', title: "cheque" , render:(_,{cheque})=><div style={money_style}>{  currency_format(cheque)  }</div>},
        {dataIndex: 'ctacte', title: "ctacte" , render:(_,{ctacte})=><div style={money_style}>{  currency_format(ctacte)  }</div>},
        {dataIndex: 'mutual', title: "mutual" , render:(_,{mutual})=><div style={money_style}>{  currency_format(mutual)  }</div>},
        {dataIndex: 'total', title: "total" , render:(_,{total})=><div style={money_style}>{   currency_format(total)  }</div>},
        { title: "", render:(_,{idusuario})=>{
            return <></>
        }},
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

        post_method(post.totales_venta_vendedor,
            {
                mes: d.getMonth() + 1,
                anio: d.getFullYear(),
                fkvendedor: globals.obtenerUID(),
            },
            (response)=>{
                setVentasVendedor(
                    response.data.map(
                        r=>(
                            {
                                usuario: r.usuario,
                                idusuario: r.usuario_idusuario,
                                efectivo: r.efectivo,
                                tarjeta: r.tarjeta,
                                cheque: r.cheque,
                                ctacte: r.ctacte,
                                mutual: r.mutual,
                                total: r.total,
                            }
                        )
                    )
                )
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
    </>)
    const _ventas_vendedor = _=> (ventas_vendedor==null?<></>:<><Table dataSource={ventas_vendedor} columns={columns} /></>)


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
        Totales Ventas
        {_ventas_vendedor()}
        </Col>
    </Row>
    
    </>
}

export default VentasVendedor;