import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row } from "antd";
import { useState } from "react";

const CargaStockIdeal = (props) => {
    const [codigo, setCodigo] = useState({
        idcodigo: props.idcodigo,
        stock_ideal:0
    })

    const onSave = () => {
        //alert(JSON.stringify(codigo))
        //alert(post.update.editar_cantidad_ideal)
        post_method(post.update.editar_cantidad_ideal,codigo,(resp)=>{
            alert("OK")
            props?.callback?.()
        })
    }

    return <>
        <Row>
            <Col span={24}>
            <h3>Establecer Cantidad Ideal</h3>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            <Input onChange={(e)=>{
                setCodigo(c=>({...c,stock_ideal:parseInt(e.target.value)}))
            }} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            <Button block onClick={onSave}>Guardar</Button>
            </Col>
        </Row>

    </>
}

export default CargaStockIdeal;