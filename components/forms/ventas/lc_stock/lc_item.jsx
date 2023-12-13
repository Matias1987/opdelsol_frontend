import { Button, Col, Input, InputNumber, Row } from "antd";
import SelectCodigoVenta from "../SelectCodigoVenta";
import { useRef, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import globals from "@/src/globals";
import { parse_float_string, parse_int_string, round_float } from "@/src/helpers/string_helper";

const LCItem = (props) => {
    const [visible, setVisible] = useState(false);
    const precioRef = useRef(null)

    const [lc, setLC] = useState({
        idcodigo: -1,
        tipo: props.tipo,
        codigo: null,
        eje: "",
        precio: 0,
        cantidad: 1,
        total: 0,
        max: 0,
    })

    const onCodigoChange = (value) => {
        setLC((lc)=>{
            const _lc = {...lc,codigo:value.codigo, precio: value.precio, total: value.precio, cantidad: 1, max: value.cantidad, idcodigo: value.idcodigo};
            props?.callback?.(_lc);
            return _lc;
        });
    }


    const onCantidadChange = (value) => {
        setLC((lc)=>{
            const _lc = {...lc,cantidad:value, total: round_float(lc.precio * value)};
            props?.callback?.(_lc);
            return _lc;
        });
    }

    const onPrecioChange = (value) => {
        setLC((lc)=>{
            const _lc = {...lc,precio:value, total: round_float(lc.cantidad * value)};
            props?.callback?.(_lc);
            return _lc;
        });
    }

    const onRemove = () => {
        onCodigoChange({precio:0, codigo:null, idcodigo: -1})

        setVisible(v=>{ props?.onVisibleChange?.(false); return false;})
    }

    
    return (
        !visible ? <Button size="small" type="primary"onClick={()=>{setVisible(v=>{ props?.onVisibleChange?.(true); return true;})}}>{
            typeof props.buttonText === 'undefined' ?
            "Propio"
            :
            props.buttonText
            }</Button> :
        <>
            <Row>
                <Col span={11}>
                    <SelectCodigoVenta idfamilias={[globals.familiaIDs.LC]} buttonText={"Seleccionar Codigo LC"} callback={(codigo)=>{onCodigoChange(codigo)}} />
                </Col>
                
                <Col span={4}>
                    <Input size="small" type="number" addonBefore="Precio: " readOnly={false} value={lc.precio} onChange={(v)=>{onPrecioChange(parse_float_string(v.target.value))}}/>
                </Col>
                <Col span={4}>
                    <InputNumber size="small" addonBefore="Cant.:" addonAfter={"/"+(typeof lc.max === 'undefined' ? 0 : lc.max)} max={typeof lc.max === 'undefined' ? 0 : lc.max } value={lc.cantidad} onChange={(v)=>{onCantidadChange(parse_int_string(v))}} />
                </Col>
                <Col span={4}>
                    <Input style={{backgroundColor:"rgba(131,137,150, 0.4)"}} size="small" readOnly prefix={"Total:"} value={lc.total} />&nbsp;
                </Col>
                <Col span={1}>
                    <Button size="small" danger  onClick={()=>{onRemove()}}><DeleteOutlined/></Button>
                </Col>
            </Row>

        </>
        )
}

export default LCItem;