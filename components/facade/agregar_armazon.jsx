import { Button, Col, Input, Row } from "antd";
import SelectArmazonMarca from "./select_marca";
import { useState } from "react";

const AgregarArmazon = props => {

    const [disabled, setDisabled] = useState(true)

    const [armazon, setArmazon] = useState({
        codigo:"",
        descripcion:"",
        fksubgrupo:-1,
        precio:0,
        cantidad:0,
    })

    const onValueChange = (idx, value) => {
        setArmazon(_arm=>({
            ..._arm,
            [idx]:value
        }))
    } 

    const onMarcaSelected = (v) => {
        if(+v<1)
        {
            setDisabled(true)
        }
    }

    const input_style = {
        width:"300px"
    }

    const row_style = {
        padding:"4px"
    }

    return <>
    <Row>
        <Col span={24}>
            Tipo y Marca:
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <SelectArmazonMarca callback={onMarcaSelected} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input 
            prefix={<>C&oacute;digo</>} 
            value={armazon.codigo} 
            style={input_style} 
            onChange={e=>{onValueChange("codigo", e.target.value)}} 
            allowClear />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input 
            prefix={<>C&oacute;digo</>} 
            value={armazon.descripcion} 
            style={input_style} 
            onChange={e=>{onValueChange("descripcion", e.target.value)}} 
            allowClear />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input 
            type="number" 
            min={0} 
            step={0.01} 
            prefix={<>Precio</>} 
            value={armazon.precio||"0"} 
            style={input_style} 
            onChange={e=>{onValueChange("precio", parseFloat(e.target.value||"0"))}} 
            allowClear />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input 
            type="number" 
            min={0} 
            prefix={<>Cantidad</>} 
            value={armazon.cantidad||"0"} 
            style={input_style} 
            onChange={e=>{onValueChange("cantidad", parseInt(e.target.value||"0"))}} 
            allowClear />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Button disabled={disabled} type="primary" block>Guardar</Button>
        </Col>
    </Row>
    </>
}

export default AgregarArmazon;