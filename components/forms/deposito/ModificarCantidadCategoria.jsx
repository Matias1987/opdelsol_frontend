import GrupoSelect from "@/components/GrupoSelect";
import SubFamiliaSelect from "@/components/SubFamiliaSelect";
import SubGroupSelect from "@/components/SubGroupSelect";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row, Select } from "antd";
import { useState } from "react";

const ModificarCantidadCategoria = (props) => {
    const [selection, setSelection] = useState({
        tipo: "subgrupo",
        id: -1,
        cantidad: 0
    })
    const [_options, setOptions] = useState(<></>)

    const onAplicar = _ => {
        post_method(post.update.modificar_cantidad_categoria,selection,(response)=>{

        })
    }

    const onChange = (v) => {
        
        switch(v)
        {
            case "familia": setOptions(<></>); break;
            case "subfamilia": setOptions(<><SubFamiliaSelect callback={(id)=>{setSelection({id:id,tipo:"subfamilia"})}}/></>); break;
            case "grupo": setOptions(<><GrupoSelect callback={(id)=>{setSelection({id:id,tipo:"grupo"})}}/></>); break;
            case "subgrupo": setOptions(<><SubGroupSelect callback={(id)=>{setSelection({id:id,tipo:"subgrupo"})}}/></>); break;
        }
    }
    const row_style={
        padding:".7em",
        backgroundColor: "#DBE6FC"
    }
    return <>
    <h3>Modificar Cantidad Categor&iacute;a</h3> 
    <Row style={row_style}>
        <Col span={2}>
            <b>Categor&iacute;a:</b>
        </Col>
        <Col span={6}>
            <Select 
            
            style={{width:"100%"}} 
            options={[
                {label:"FAMILIA", value:"familia"},
                {label:"SUBFAMILIA", value:"subfamilia"},
                {label:"GRUPO", value:"grupo"},
                {label:"SUBGRUPO", value:"subgrupo"},
                ]} 
            
                onChange={onChange}
            
            />
        </Col>
        <Col span={16}>
        &nbsp;&nbsp;<b>Valor:</b>&nbsp;&nbsp;{_options}
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input style={{backgroundColor:"lightblue"}} prefix={"Cantidad"} type="number" value={selection.cantidad} onChange={(e)=>{setSelection(s=>({...s,cantidad:parseInt(e.target.value)}))}} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Button onClick={onAplicar} type="primary">Aplicar</Button>
        </Col>
    </Row>
        
    </>
}

export default ModificarCantidadCategoria;