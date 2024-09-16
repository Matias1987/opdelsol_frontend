import { Button, Col,  Input, Row } from "antd";
import SelectCodigoVenta from "../SelectCodigoVenta";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import globals from "@/src/globals";
import { parse_float_string } from "@/src/helpers/string_helper";

const RecStockCristal = (props) => {
    const [visible, setVisible] = useState(false);
 
    const [cristal , setCristal]= useState({
        idcodigo: -1,
        tipo: props.tipo,
        codigo: null,
        eje: "",
        precio: 0,
        cantidad:1,
    })


    const onchange_codigo = (value) => {
       
        setCristal(
            (cristal)=>{
                const _cristal = {...cristal, codigo: value.codigo, precio: value.precio, idcodigo: value.idcodigo}
                props?.callback(_cristal)
                return _cristal
            }
        )
        
    }
    const onchange_eje = (v) => {
        setCristal(
            (cristal)=>{
                const _cristal = {...cristal, eje: v}
                props?.callback(_cristal)
                return _cristal
            }
        )
    }
    const onchange_precio = (value) => {
        setCristal(
            (cristal)=>{
                const _cristal = {...cristal, precio: value.precio}
                props?.callback(_cristal)
                return _cristal
            }
        )

    }
    
    const onRemove = () => {
        onchange_codigo({precio:0, codigo:null, idcodigo: -1})
        setVisible(v=>{ props?.onVisibleChange?.(false); return false})
    }

    const _estilo_label = {
        /*padding: ".30em",*/
        textAlign: "right",
    }
      

    return (
        !visible ? <Button size="small" type="primary" onClick={()=>{setVisible(v=>{ props?.onVisibleChange?.(true); return true;});}}>{
            typeof props.buttonText === 'undefined' ?
            "Establecer Cristal"
            :
            props.buttonText
            }</Button> :
        <>
            <Row>
                <Col span={16}>
                    <SelectCodigoVenta idfamilias={[globals.familiaIDs.CRISTALES]} buttonText={"Seleccionar Código Cristal"} callback={onchange_codigo} />
                </Col>
                <Col span={1} style={_estilo_label}>
                    Eje:
                </Col>
                <Col span={2}>
                    <Input disabled={cristal.codigo==null} size="small" value={cristal.eje} onChange={(e)=>{onchange_eje(e.target.value)}}/>
                </Col>
                <Col span={4}>
                    <Input disabled={cristal.codigo==null} type="number" value={cristal.precio} readOnly={false} onChange={(e)=>{onchange_precio({precio: parse_float_string(e.target.value)})}} size="small" style={{backgroundColor:"rgba(131,137,150, 0.4)"}} prefix="Precio: " />
                </Col>
                <Col span={1}>
                    <Button danger  size="small" onClick={()=>{onRemove()}}><DeleteOutlined/></Button>
                </Col>
            </Row>

        </>
        )
}

export default RecStockCristal;