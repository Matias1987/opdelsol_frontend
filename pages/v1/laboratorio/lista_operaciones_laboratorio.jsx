import LayoutLaboratorio from "@/components/layout/layout_laboratorio";
import EditarSobre from "@/components/taller/EditarSobre";
import { Modal } from "antd";
import { useState } from "react";

const { default: ListaVentas } = require("@/components/informes/ventas/ListaVentas")

export default function  ListaOperacionesLab(){
    const [idventa, setIdVenta] = useState(-1)
    const [open, setOpen] = useState(false)

    return <>
        <ListaVentas ignoreSucursal enviar_a_sucursal en_laboratorio={1} estado={"PENDIENTE"} onEditLaboratorioClick={(id)=>{setIdVenta(id), setOpen(true)}} />
        <Modal open={open} footer={null} onCancel={()=>{setOpen(false)}} key={idventa} width={"80%"}>
            <EditarSobre idventa={idventa} />
        </Modal>
    </>
}

ListaOperacionesLab.PageLayout = LayoutLaboratorio;