import { post_method } from "@/src/helpers/post_helper";
import { Button, Checkbox, Col, Input, Row } from "antd";
import { useState } from "react";

const AgregarUsuarioForm = (props) =>{
    const {usuario, setUsuario} = useState({
        nombre:"",
        usuario: "",
        password: "",
        venta:"0",
        caja:"0",
        deposito_min:"0",
        deposito:"0",
        caja2:"0",
        admin:"0",
        admin2:"0",
        admin3:"0",
        laboratorio:"0",
    })

    const options = [
        {label: "venta", label:"venta"},
        {label: "caja", label:"caja"},
        {label: "deposito_min", label:"deposito_min"},
        {label: "deposito", label:"deposito"},
        {label: "caja2", label:"caja2"},
        {label: "admin", label:"admin"},
        {label: "admin2", label:"admin2"},
        {label: "admin3", label:"admin3"},
        {label: "laboratorio", label:"laboratorio"},
    ]

    const setValue = (idx,value) => {
        setUsuario(_u => ({
            ..._u,[idx]:value
        }))
    }

    const guardar = () => {
        post_method("",usuario,(resp)=>{
            alert("OK")
        })
    }

    const onChangePermisos = (checkedValues) => {
        let temp = {...usuario}

        options.forEach(o=>{
            temp[o.value]="0";
        })

        checkedValues.forEach(v=>{
            temp = {...temp,[v]:"1"}
        })
        
        setUsuario(temp)
    }

    return <>
    <Row>
        <Col span={24}>
            <h3>Agregar Usuario</h3>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input prefix="Nombre" onChange={(e)=>{setValue("nombre",e.target.value)}} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input prefix="Usuario" onChange={(e)=>{setValue("usuario",e.target.value)}} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input prefix="Contraseña" type="password" onChange={(e)=>{setValue("password",e.target.value)}} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Checkbox.Group options={options} onChange={onChangePermisos} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Button onClick={guardar}>Agregar</Button>
        </Col>
    </Row>
    
    </>
}

export default AgregarUsuarioForm;