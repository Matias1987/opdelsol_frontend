import CodeSelect from "../CodeSelect";

import { Row, Col, Button, Input, Divider, InputNumber } from "antd";
import SubGroupSelectV2 from "../SubGrupoSelectV2";
import { useState } from "react";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { convertInputToUpper } from "@/src/helpers/string_helper";


const AddStockQuick = ({callback}) => {
    const [codigo, setCodigo] = useState({
        codigo: "",
        descripcion:"",
        precio: 0,
        idsubgrupo: -1,
    })

    const onChange = (key,value) => {
        setCodigo(c=>({
            ...c,
            [key]:value
        }))
    }

    const onSave = ()=>{
        post_method(post.agregar_stock_quick,codigo,(response)=>{
            //alert(JSON.stringify(response))
            if((response.data.msg??"").includes("DUPLICATED"))
            {
                alert("El código ya existe.");
                return;
            }
            callback?.({
                idcodigo: response.data.idcodigo,
                codigo: response.data.codigo,
                descripcion: codigo.descripcion,
                costo: codigo.precio,
            })
        })
    }

    return <>
    
    <Row style={{padding:"8px"}}>
        <Col span={24}><Input onInput={convertInputToUpper} prefix={<span style={{fontWeight:"bold"}}>C&oacute;digo: </span>} allowClear onChange={e=>{onChange("codigo", e.target.value)}} /></Col>
    </Row>
    <Row style={{padding:"8px"}}>
        <Col span={24}><Input onInput={convertInputToUpper} prefix={<span style={{fontWeight:"bold"}}>Descripci&oacute;n: </span>} allowClear onChange={e=>{onChange("descripcion", e.target.value)}}  /></Col>
    </Row>
    <Row style={{padding:"8px"}}>
        <Col span={24}>
        <InputNumber style={{width:"300px"}} decimalSeparator="." prefix={<span style={{fontWeight:"bold"}} onChange={value=>{onChange("precio", value??"0")}} value={codigo.precio} >Precio: </span>} />
        </Col>
    </Row>
    <Row style={{padding:"8px"}}>
        <Col>
        <SubGroupSelectV2 callback={_id=>{onChange("idsubgrupo", _id)}} />
        </Col>
    </Row>
    <Divider />
    <Row style={{padding:"8px"}}>
        <Col span={24} style={{display:"flex", justifyContent:"end"}}>
            <Button type="primary" onClick={onSave}>Guardar</Button>
        </Col>
    </Row>
    </>
}

export default AddStockQuick;