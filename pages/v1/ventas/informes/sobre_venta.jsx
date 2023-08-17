import InformeVenta from "@/components/informes/ventas/Base";
import PrinterWrapper from "@/components/PrinterWrapper";
import { PrinterFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function ImprimirSobreVenta(props){
    const [open, setOpen] = useState(false)
    useEffect(()=>{
        alert(props.idventa)
    },[])
    return (
        <>
            <Button onClick={()=>{setOpen(true)}}><PrinterFilled /></Button>
            <Modal width={"80%"} open={open} onCancel={()=>{setOpen(false)}} footer={null} title={"Detalle Venta"}>
                <PrinterWrapper>
                    <InformeVenta idventa={props.idventa} />
                </PrinterWrapper>
            </Modal>
        </>)
}


