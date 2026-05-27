import ListadoVentasTM from "@/components/forms/trabajo_multiple/listado/listadoTM";
import TrabajoMultiple from "@/components/forms/trabajo_multiple/venta_multiple"
import BuscarVentaV3 from "@/components/forms/ventas/BuscarVentasV3";
import LayoutDistribuidora from "@/components/layout/layout_distribuidora";

export default function listado_trabajos() {
    return  <><ListadoVentasTM /></>
}

listado_trabajos.PageLayout = LayoutDistribuidora;