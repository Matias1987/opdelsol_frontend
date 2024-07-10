import { post_method } from "@/src/helpers/post_helper"
import { get, post } from "@/src/urls"
import { Button, Col, Input, Row } from "antd"
import { useEffect, useState } from "react"

const AgregarMedicoForm = (props) => {
    const [loading, setLoading] = useState(false)
    const [medico, setMedico] = useState({
        nombre:"",
        matricula:"",
        direccion:"",
        telefono:"",
    })

    useEffect(()=>{
        if(typeof props.editar !== 'undefined'){
            if(+props.editar==1)
            {
                //load
                setLoading(true)
                fetch(get.obtener_medico + props.idmedico)
                .then(r=>r.json())
                .then(response=>{
                    //alert(JSON.stringify(response))
                    setLoading(false)
                    setMedico(m=>({
                        ...m,
                        nombre:response.data[0].nombre,
                        matricula:response.data[0].matricula,
                        direccion:response.data[0].direccion,
                        telefono:response.data[0].telefono,
                    }))
                })
            }
        }
    },[])

    const setVal = (idx, val) => { setMedico(_m=>({..._m,[idx]:val})) }

    const onGuardarClick = () => {
        const isvalid = str => (str||"").trim().length>0
        
        if(!isvalid(medico.nombre))
        {
            alert("Valor no válido para nombre")
            return
        }
        /*if(!isvalid(medico.matricula))
        {
            alert("Valor no válido para matricula")
            return
        }*/
        if(!isvalid(medico.direccion))
        {
            alert("Valor no válido para direccion")
            return
        }
        if(!isvalid(medico.telefono))
        {
            alert("Valor no válido para telefono")
            return
        }
        post_method(post.insert.medico,medico,(resp)=>{
            alert("OK")
            props?.callback?.()
        })
    }

    return <>
    <Row>
        <Col span={24}>
        <h3>Formulario M&eacute;dico</h3>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input disabled={loading} value={medico.nombre} prefix="Nombre" onChange={(e)=>{setVal("nombre", e.target.value)}} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input disabled={loading} value={medico.direccion} prefix={<>Direcci&oacute;n</>} onChange={(e)=>{setVal("direccion", e.target.value)}} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input disabled={loading} value={medico.telefono} prefix={<>Tel&eacute;fono</>} onChange={(e)=>{setVal("telefono", e.target.value)}} />
        </Col>
    </Row>
    <Row style={{padding:"1em"}}>
        <Col span={24}>
        <Button disabled={loading} type="primary" onClick={onGuardarClick} block>Agregar</Button>
       </Col>
    </Row>
    <Row>
        <Col span={24}>
        </Col>
    </Row>
    </>
}

export default AgregarMedicoForm