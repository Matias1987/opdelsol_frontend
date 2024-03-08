import LayoutLaboratorio from "@/components/layout/layout_laboratorio";
import EditarSobre from "@/components/taller/EditarSobre";
import { Modal } from "antd";
import { useEffect, useState } from "react";

const { default: ListaVentas } = require("@/components/informes/ventas/ListaVentas")

export default function  ListaOperacionesLab(){
    const [idventa, setIdVenta] = useState(-1)
    const [open, setOpen] = useState(false)
    const [reload, setReload] = useState(false)
    useEffect(()=>{},[])
    return <>
        <ListaVentas ignoreSucursal laboratorio_modificar enviar_a_sucursal en_laboratorio={1}  estado={"PENDIENTE"} onEditLaboratorioClick={(id)=>{setIdVenta(id), setOpen(true)}} key={reload} />
        <Modal open={open} footer={null} onCancel={()=>{setOpen(false)}} key={idventa} width={"80%"}>
            <EditarSobre idventa={idventa} callback={()=>{setReload(!reload), setOpen(false)}} />
        </Modal>
    </>
}

ListaOperacionesLab.PageLayout = LayoutLaboratorio;