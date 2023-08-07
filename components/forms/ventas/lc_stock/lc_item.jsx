import { Button, Col, Input, InputNumber, Row } from "antd";
import SelectCodigoVenta from "../SelectCodigoVenta";
import { useRef, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import globals from "@/src/globals";

const LCItem = (props) => {
    const [visible, setVisible] = useState(false);
    const precioRef = useRef(null)

    const [lc, setLC] = useState({
        idcodigo: -1,
        tipo: props.tipo,
        codigo: null,
        eje: -1,
        precio: 0,
        cantidad: 1,
        total: 0,
        max: 9999,
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
            const _lc = {...lc,cantidad:value, total: (lc.precio * value)};
            props?.callback?.(_lc);
            return _lc;
        });
    }

    const onPrecioChange = (value) => {
        setLC((lc)=>{
            const _lc = {...lc,precio:value, total: (lc.cantidad * value)};
            props?.callback?.(_lc);
            return _lc;
        });
    }

    const onRemove = () => {
        onCodigoChange({precio:0, codigo:null, idcodigo: -1})

        setVisible(v=>{ props?.onVisibleChange?.(false); return false;})
    }

    
    return (
        !visible ? <Button size="small" onClick={()=>{setVisible(v=>{ props?.onVisibleChange?.(true); return true;})}}>{
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
                    <InputNumber value={lc.precio} onChange={(v)=>{onPrecioChange(v)}}/>
                </Col>
                <Col span={4}>
                    <InputNumber addonBefore="Cant.:" addonAfter={"/"+lc.max} max={lc.max} value={lc.cantidad} onChange={(v)=>{onCantidadChange(v)}} />
                </Col>
                <Col span={4}>
                    <Input addonBefore={"Total:"} value={lc.cantidad * lc.precio} />&nbsp;
                </Col>
                <Col span={1}>
                    <Button danger  onClick={()=>{onRemove()}}><DeleteOutlined/></Button>
                </Col>
            </Row>

        </>
        )
}

export default LCItem;