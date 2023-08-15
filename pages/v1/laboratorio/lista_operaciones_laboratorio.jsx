import LayoutLaboratorio from "@/components/layout/layout_laboratorio";

const { default: ListaVentas } = require("@/components/informes/ventas/ListaVentas")

export default function  ListaOperacionesLab(){
    return <>
        <ListaVentas enviar_a_sucursal en_laboratorio={1} estado={"PENDIENTE"} />
    </>
}

ListaOperacionesLab.PageLayout = LayoutLaboratorio;