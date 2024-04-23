import { get } from "@/src/urls"
import {Row, Col, Input, Button} from "antd"
import { useEffect, useState } from "react"

const AMUsuario = (props) => {
 
    const [usuario, setUsuario] = useState({
        nombre:"",
        usuario:"",
        password:"",
        idusuario:-1
    })

    useEffect(()=>{
        load_usuario()
    },[])

    


    const load_usuario = () => {
        fetch(get.cliente_por_id + props.idcliente||"-1")
        .then(r=>r.json())
        .then((response)=>{

            if(response.data.length<1)
            {
                return
            }
            
            setUsuario(_=>({
                idusuario: response.data[0].idusuario,
                nombre: response.data[0].nombre,
                usuario: response.data[0].usuario,
                password:"****",
            }))
        })
    }

    const onChange = (idx,v) => {

        setUsuario(u=>({...u,[idx]:v}))
    }

    const guardar = () => {
        if(usuario.nombre.trim().length<1)
        {
            return;
        }
        if(usuario.usuario.trim().length<1)
        {
            return;
        }
        if(usuario.password.trim().length<1)
        {
            return;
        }
    }

    return <>
        <Row>
            <Col span={24}>
                Agregar o Editar Usuario
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Input prefix="Usuario" value={usuario.usuario} onChange={(e)=>{onChange("usuario", e.target.value)}} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Input prefix="Nombre" value={usuario.nombre} onChange={(e)=>{onChange("nombre", e.target.value)}} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Input prefix="Contraseña" value={usuario.password} onChange={(e)=>{onChange("password", e.target.value)}} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button block onClick={guardar}>Guardar</Button>
            </Col>
        </Row>
    </>
}

export default AMUsuario;