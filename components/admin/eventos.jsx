import { DollarCircleFilled, DollarCircleOutlined, DollarCircleTwoTone, LogoutOutlined, UserAddOutlined } from "@ant-design/icons"
import { Avatar, Col, List, Row, Select } from "antd"
import VentaDetallePopup from "../VentaDetalle"
import InformeX from "../informes/caja/InformeX"
import { post_method } from "@/src/helpers/post_helper"

const { get, post } = require("@/src/urls")
const { useState, useEffect } = require("react")

const Eventos = (props) => {
    const [eventos, setEventos] = useState([])
    const [enventos_filtro , setEventosFiltro] = useState([])
    const [sucursales, setSucursales] = useState([])
    const [filtros, setFiltros] = useState({
        fksucursal:-1,
        fkusuario:-1,
        fecha:"-1"
    })
    const update = _ => {
        const date = new Date()
        post_method(post.eventos,{fecha:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`},(response)=>{
            if(response==null)
            {
                //error
                return
            }
            
            if(response.data==null)
            {
                //error
                return
            }
            
            setEventos(

                response.data.map(r=>({
                tipo: r.tipo,
                title: r.tipo,
                body: `${r.usuario}  - ${r.detalle} en ${r.sucursal}` ,
                sucursal: r.sucursal,
                id: r.ref_id,
                visible:true,
                idsucursal: r.fk_sucursal,
                idusuario: r.fk_usuario,

            }))
            
            
            )
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

        fetch(get.sucursales)
        .then(r=>r.json())
        .then((response)=>{
            setSucursales(
                [
                    ...[{label:"Todas las sucursales", value:"-1"}]
                    ,
                    ...response.data.map(
                        r=>({
                            label: r.nombre,
                            value: r.idsucursal
                        })
                    )
                ]
                )
        })
        .catch(e=>{console.log("smth")})

        const interval = setInterval(() => { 
            update()

            
        }, 2000 );

        return () => clearInterval(interval); 

    },[]) 

    const onChange = (key,val)=> { setFiltros(f=>({...f,[key]:val}))  }

    const isvisible = (row) => {
        let visible = true

        visible = filtros.fksucursal!=-1 ? row.idsucursal== filtros.fksucursal : visible

        return visible
    }

    return <div>
    <Row>
        <Col span={24}>
            Eventos
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Select options={sucursales} style={{width:"80%"}} onChange={(v)=>{onChange('fksucursal',v)}} defaultValue={"-1"} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <div style={{overflow:"scroll", width:"100%", height:"500px"}}>
                <List
                    itemLayout="horizontal"
                    dataSource={eventos}
                    renderItem={(item, index) => isvisible(item) ?
                    <List.Item>
                        <List.Item.Meta
                        
                        avatar={icon(item.tipo)}
                        title={item.title}
                        description={<div style={{color:"blue"}}>{item.body} {buttons(item.tipo, item.id)}</div>}
                        />
                    </List.Item> : <></>
                    }
            />
            </div>
        </Col>
    </Row>
    
    
  
  </div>

}

export default Eventos