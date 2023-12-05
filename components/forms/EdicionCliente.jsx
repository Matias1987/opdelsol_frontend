import { EditOutlined } from "@ant-design/icons"
import { Button, Col, Input, Row, Space } from "antd"
import Modal from "antd/es/modal/Modal"

const { useState } = require("react")

const EdicionClientePopup = (props) => {
    const [open, setOpen] = useState(false)
    const [cliente, setCliente] = useState({
        nombre: '',
        cliente: '',
        telefono: '',

    })
    const [fechaNac, setFechaNac] = useState({
        dia:"",
        mes:"",
        anio:""
    })
    const onOpen = () => {
        fetch(url)
        .then(r=>r.json())
        .then((response)=>{
            setOpen(true)
        })
        .catch(err=>{console.log("error")})
    }
    const onClose = () => {

    }
    
    return <>
    <Button onClick={onOpen} ><EditOutlined /></Button>
    <Modal title="Editar Cliente">
    <Row>
        <Col span={24}>
            <Input prefix={"Apellido"} onChange={cliente.apellido} value={cliente.apellido} />
        </Col>
        <Col span={24}>
            <Input prefix={"Nombre"} onChange={cliente.nombre} value={cliente.nombre} />
        </Col>
        <Col span={24}>
            <Input prefix={"Telefono"} onChange={cliente.telefono} value={cliente.telefono} />
        </Col>
        <Col span={20}>
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
        </Col>
    </Row>
    </Modal>
    </>
}

export default EdicionClientePopup