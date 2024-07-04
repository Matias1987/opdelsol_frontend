import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"
import { InfoCircleFilled } from "@ant-design/icons"
import { Button, Col, Modal, Row, Table } from "antd"
import VentaDetallePopup from "../VentaDetalle"
import InformeVentaMinV3 from "../informes/ventas/InformeVentasMinV3"

const { useState, useEffect } = require("react")

const ListaVentasSucursalPeriodo = (props) => {
    const [ventas, setVentas] = useState([])
    const [totales, setTotales] = useState({cant_total:0, monto_total:0})
    const [loading, setLoading] = useState(false)
    const [selectedId, setSelectedId] = useState(-1)
    const [popupOpen, setPopupOpen] = useState(false)

    const columns = [
        {dataIndex:"idventa", title:"Nro."},
        {dataIndex:"fecha_retiro_f", title:"Fecha Retiro"},
        {dataIndex:"cliente", title:"Cliente"},
        {dataIndex:"vendedor", title:"Vendedor"},
        {dataIndex:"monto", title:"Monto"},
        {render:(_,{idventa})=><><Button onClick={()=>{
            setSelectedId(idventa);
            setPopupOpen(true)
        }}><InfoCircleFilled /></Button></>},
    ]
    
    const load = () => {
        
        post_method(
            post.obtener_lista_ventas_sucursal_periodo,
            {
                mes: props.mes,
                anio:props.anio,
                fksucursal: props.fksucursal,
                fkusuario: props.fkusuario,
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
                        <td><Button><InfoCircleFilled /></Button></td>
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
        <Table dataSource={ventas} columns={columns} scroll={{y:"800px"}} />
    </Row>
    <Row>
        <Col span={24}>{html_totales()}</Col>
    </Row>
    <Modal destroyOnClose width={"90%"} open={popupOpen} onCancel={()=>{setPopupOpen(false)}}>
        <InformeVentaMinV3  idventa={selectedId} />
    </Modal>
    </>
}

export default ListaVentasSucursalPeriodo;