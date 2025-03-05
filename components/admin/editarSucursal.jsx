import { post_method } from "@/src/helpers/post_helper"

const { get, post } = require("@/src/urls")
const { Col, Row, Spin, Input, Button, Select } = require("antd")
const { useState, useEffect } = require("react")

const EditarSucursal = (props) => {

    const {idsucursal, callback} = props

    const [sucursalData, setSucursalData] =  useState({})
    const [opticasData, setOpticaData] = useState(null)

    const load = ( ) => {
        //get opticas
        fetch(get.opticas)
        .then(r=>r.json())
        .then(response=>{
            
            setOpticaData(
                response.data.map(r=>({
                    label:r.nombre,
                    value:r.idoptica
                }))
            )
        })
        //load sucursal data
        fetch(get.sucursal_details + idsucursal)
        .then(r=>r.json())
        .then(response=>{
            //alert(JSON.stringify(response.data))
            setSucursalData(response.data[0])
        })
        .catch(e=>{console.log(e)})
    }

    useEffect(()=>{load()},[])

    const onchange = (idx, value) => {
        setSucursalData(od=>({...od,[idx]:value}))
    }

    const onSave = () => {

        //alert(JSON.stringify(sucursalData))

        post_method(post.update.sucursal,sucursalData,(response)=>{
            //alert(JSON.stringify(response))
            if((response?.data?.message||"")=="ERR")
            {
                alert("Error. Ya existe.")
            }
            callback?.()
        })

       
    }

    const row_style = {
        padding:"6px"
    }

    return sucursalData==null || opticasData==null? <Spin /> : <>
    <Row>
        <Col span={24}>
        <h3>Editar &Oacute;ptica</h3>
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input value={sucursalData.nombre} prefix="Nombre" onChange={(e)=>{onchange("nombre", e.target.value)}}/>
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            &Oacute;ptica: <Select value={sucursalData.fkoptica} options={opticasData} onChange={v=>{onchange("fkoptica",v)}} style={{width:"100%"}} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input value={sucursalData.direccion} prefix="Dirección" onChange={(e)=>{onchange("direccion", e.target.value)}}/>
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input value={sucursalData.telefono} prefix="Teléfono" onChange={(e)=>{onchange("telefono", e.target.value)}}/>
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input value={sucursalData.whatsapp} prefix="Whatsapp" onChange={(e)=>{onchange("whatsapp", e.target.value)}}/>
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input value={sucursalData.instagram} prefix="Instagram" onChange={(e)=>{onchange("instagram", e.target.value)}}/>
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input value={sucursalData.facebook} prefix="Facebook" onChange={(e)=>{onchange("facebook", e.target.value)}}/>
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Button type="primary" block onClick={onSave}>Guardar</Button>
        </Col>
    </Row>
   
    </>
}

export default EditarSucursal