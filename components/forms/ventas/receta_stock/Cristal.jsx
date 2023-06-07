import { Button, Col, Form, Input, Row } from "antd";
import SelectCodigoVenta from "../SelectCodigoVenta";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

const RecStockCristal = (props) => {
    const [codigo, setCodigo] = useState(null);
    const [visible, setVisible] = useState(false);
    return (
        !visible ? <Button size="small" onClick={()=>{setVisible(true)}}>{
            typeof props.buttonText === 'undefined' ?
            "Establecer Cristal"
            :
            props.buttonText
            }</Button> :
        <>
            <Row>
                <Col span={8}>
                    <SelectCodigoVenta />
                </Col>
                <Col span={4}>
                    <Input addonBefore={"Eje:"} />
                </Col>
                <Col span={4}>
                    <Input addonBefore={"Precio:"} />
                </Col>
                <Col span={8}>
                    <Button danger onClick={()=>{setVisible(false)}}><DeleteOutlined/></Button>
                </Col>
            </Row>

        </>
        )
}

export default RecStockCristal;