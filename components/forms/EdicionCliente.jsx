import { post_method } from "@/src/helpers/post_helper"
import { get, post } from "@/src/urls"
import { EditOutlined } from "@ant-design/icons"
import { Button, Col, Input, Modal, Row, Space } from "antd"

const { useState } = require("react")

const EdicionClientePopup = (props) => {
    const [open, setOpen] = useState(false)
    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        direccion: '',
        idcliente: '',

    })
    const [fechaNac, setFechaNac] = useState({
        dia:"",
        mes:"",
        anio:""
    })
    const onOpen = () => {
        fetch(get.cliente_por_id + props.idcliente)
        .then(r=>r.json())
        .then((response)=>{
            setOpen(true)
            if(response?.data==null || response?.data?.length<1)
            {
                alert("Error")
                return
            }
            setCliente({
                nombre: response.data[0].nombre,
                apellido: response.data[0].apellido,
                telefono: response.data[0].telefono1,
                direccion: response.data[0].direccion,
                idcliente: props.idcliente,
            })
        })
        .catch(err=>{console.log("error")})
    }
    const onClose = () => {
        setOpen(false)
        setCliente({
            nombre: '',
            apellido: '',
            telefono: '',
            idcliente: '',
            direccion: '',
        })
    }

    const onPost = _ => {
        const is_invalid = (_v) => (_v.trim()).match(/^[ñÑa-zA-Z\s0-9]{1,}$/g) == null
        if(is_invalid(cliente.nombre))
        {
            alert("Nombre no válido")
            return;
        }
        if(is_invalid(cliente.apellido))
        {
            alert("Apellido no válido")
            return;
        }
        if(is_invalid(cliente.telefono))
        {
            alert("Teléfono no válido")
            return;
        }
        post_method(post.update.update_cliente,cliente,(resp)=>{
            alert("OK")
            setOpen(false)
            props?.callback?.()
        })
    }
    
    return <>
    <Button onClick={onOpen} ><EditOutlined /></Button>
    <Modal open={open} title="Editar Cliente" onCancel={()=>{onClose()}} onOk={onPost}>
    <Row>
        <Col span={24}>
            <Input style={{backgroundColor:"rgba(110,127,128,0.3)"}} prefix={"Apellido:"} onChange={(e)=>{setCliente((__c)=>({...__c,apellido:e.target.value}))}} value={cliente.apellido} />
        </Col>
        <Col span={24}>
            <Input style={{backgroundColor:"rgba(110,127,128,0.3)"}} prefix={"Nombre:"} onChange={(e)=>{setCliente((__c)=>({...__c, nombre:e.target.value}))}} value={cliente.nombre} />
        </Col>
        <Col span={24}>
            <Input style={{backgroundColor:"rgba(110,127,128,0.3)"}} prefix={"Telefono:"} onChange={(e)=>{setCliente((__c)=>({...__c,telefono:e.target.value}))}} value={cliente.telefono} />
        </Col>
        <Col span={24}>
            <Input style={{backgroundColor:"rgba(110,127,128,0.3)"}} prefix={"Dirección:"} onChange={(e)=>{setCliente((__c)=>({...__c,direccion:e.target.value}))}} value={cliente.direccion} />
        </Col>
        {/*<Col span={20}>
            <Space>
                <Space.Compact>
                    <Input 
                        onChange={(e)=>{
                        
                        let d= parseInt(e.target.value||0); 
                        
                        setFechaNac(_d=>({..._d,dia:(d<1?1 : (d>31?31:d))}))
                        
                        }} 
                        value={fechaNac.dia} 
                        type="number" 
                        prefix="Día" 
                        min="1" 
                        max="31"/>
                    <Input 
                    onChange={(e)=>{
                        
                        let m= parseInt(e.target.value||0); 
                        
                        setFechaNac(_d=>({..._d,mes:(m<1?1 : (m>12?12:m))}))
                        
                        }} 
                    value={fechaNac.mes} 
                    type="number" 
                    prefix="Mes" 
                    min="1" 
                    max="12"
                    />
                    <Input 
                    onChange={(e)=>{
                        
                        let a= parseInt(e.target.value||0); 
                        
                        setFechaNac(_d=>({..._d,anio:(a<1900?1900 : a)}))
                        
                        }} 
                    value={fechaNac.anio} 
                    type="number" 
                    prefix="Año" 
                    min="1900" />
                </Space.Compact>
            </Space>
        </Col>*/}
    </Row>
    </Modal>
    </>
}

export default EdicionClientePopup