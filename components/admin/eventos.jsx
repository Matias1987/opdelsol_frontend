import { DollarCircleFilled, DollarCircleOutlined, DollarCircleTwoTone, LogoutOutlined, UserAddOutlined } from "@ant-design/icons"
import { Avatar, Col, List, Row } from "antd"
import VentaDetallePopup from "../VentaDetalle"
import InformeX from "../informes/caja/InformeX"

const { get } = require("@/src/urls")
const { useState, useEffect } = require("react")

const Eventos = (props) => {
    const [eventos, setEventos] = useState([])
    const [count, setCount] = useState(0)
    const update = () => {
        fetch(get.eventos)
        .then(r=>r.json())
        .then((response)=>{
            setEventos(response.data.map(r=>({
                tipo: r.tipo,
                title: r.tipo,
                body: `${r.usuario}  - ${r.detalle} en ${r.sucursal}` ,
                sucursal: r.sucursal,
                id: r.ref_id,

            })))
        })
    }
    const buttons = (tipo, id) => {
        switch(tipo){
            case "USER_LOGIN": return <></>
            case "VENTA": return <VentaDetallePopup idventa={id} />
            case "COBRO": return <></>
            case "GASTO": return <></>
        }
        return <></>
    }

    const icon = (tipo) => {
        switch(tipo){
            case "USER_LOGIN": return <UserAddOutlined />
            case "USER_LOGOUT": return <LogoutOutlined />
            case "VENTA": return <DollarCircleTwoTone />
            case "COBRO": return <DollarCircleFilled />
            case "GASTO": return <DollarCircleOutlined />
        }
    }
    useEffect(()=>{
        const interval = setInterval(() => { 
            update()
            setCount(count + 1); 
            
        }, 5000);

        return () => clearInterval(interval); 

    },[count]) 

    return <div>
    <Row>
        <Col span={24}>
            Eventos
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <div style={{overflow:"scroll", width:"100%", height:"500px"}}>
                <List
                    itemLayout="horizontal"
                    dataSource={eventos}
                    renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={icon(item.tipo)}
                        title={item.title}
                        description={<div style={{color:"blue"}}>{item.body} {buttons(item.tipo, item.id)}</div>}
                        />
                    </List.Item>
                    )}
            />
            </div>
        </Col>
    </Row>
    
    
  
  </div>

}

export default Eventos