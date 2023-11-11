import { get } from "@/src/urls";
import { Button, Col, Modal, Row, Spin } from "antd";
import { useState } from "react";
import EditableVtaItemRow from "./edit_vta_select_item_row";
import { EditFilled } from "@ant-design/icons";

const EditarVentaItems = (props)=> {
    const [items, setItems] = useState(null)
    const [popupOpen, setPopupOpen] = useState(false)
    const onOpen = () => {
        setPopupOpen(true)
        fetch(get.obtener_venta_items+props.idventa)
        .then(resp=>resp.json())
        .then((resp)=>{
            setItems(resp.data)
        })
    }

    const _rows_ = _ => items==null ? <><Spin /></>:<>
        {
            items.map(i=>(<>
                <Row>
                    <Col span={24} >
                        <EditableVtaItemRow item={i} />
                    </Col>
                </Row>
            </>))
        }
    </>

    return <>
    <Button onClick={onOpen}><EditFilled /></Button>
    <Modal width={"80%"} open={popupOpen} onCancel={()=>{setPopupOpen(false)}} footer={null}>
        <>
            <h3>Editar Venta Items</h3>
            {_rows_()}
        </>
        <Button type="primary" block>Confirmar Cambios</Button>
    </Modal>
    </>
}

export default EditarVentaItems;