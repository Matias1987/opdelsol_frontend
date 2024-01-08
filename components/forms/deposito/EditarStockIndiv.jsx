import { parse_int_string } from "@/src/helpers/string_helper";
import { get } from "@/src/urls";
import { Button, Col, Input, Modal, Row, Spin } from "antd";
import { useState } from "react";

const EditarStockIndiv = (props) => {
    const [stock ,setStock] = useState(null)
    const [open, setOpen] = useState(false)
    const onOpen = () => {
        setOpen(true)
        fetch(get.obtener_stock_sucursal + `${props.idsucursal}/${props.idcodigo}`)
        .then(r=>r.json())
        .then((response)=>{
            setStock(response.data[0])
        })
    }
    const onClose = () => {
        setOpen(false)
    }
    return <>
    <Button onClick={onOpen}>{props.buttonText}</Button>
        <Modal open={open} onCancel={onClose} footer={null}>
            {stock==null ? <Spin /> : 
            <>
            <Row>
                <Col span={24}>
                    <Input prefix="Cantidad" value={stock.cantidad} onChange={(e)=>{
                        setStock(
                            s=>(
                                {...s,"cantidad":parse_int_string(((e.target?.value?.toString())||"").toString())}))
                    }} />  
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Button  block type="primary">Guardar Cambios</Button>
                </Col>
            </Row>
            </>
            }
        </Modal>
    </>
}

export default EditarStockIndiv;