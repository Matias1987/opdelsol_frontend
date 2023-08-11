import { InfoCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";

const VentaDetallePopup = (props)=> {
    const [open, setOpen] = useState(false)
    return <>
        <Button onClick={()=>{setOpen(true)}}>
            <InfoCircleFilled />
        </Button>
        <Modal
            open={open}
            onCancel={()=>{setOpen(false)}}
            footer={null}
            title={"Detalle Venta"}
            width={"80%"}
        >


        </Modal>
    </>
}

export default VentaDetallePopup;