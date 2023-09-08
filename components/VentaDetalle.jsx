import { InfoCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import InformeVenta from "./informes/ventas/Base";
import InformeVentaMin from "./informes/ventas/InformeVentasMin";

const VentaDetallePopup = (props)=> {
    const [open, setOpen] = useState(false)
    return <>
        <Button type="ghost" onClick={()=>{setOpen(true)}}>
            <InfoCircleFilled />
        </Button>
        <Modal
            open={open}
            onCancel={()=>{setOpen(false)}}
            footer={null}
            title={"Detalle Venta"}
            width={"80%"}
        >
            <InformeVentaMin idventa={props.idventa} />

        </Modal>
    </>
}

export default VentaDetallePopup;