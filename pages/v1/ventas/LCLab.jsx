import LCLabItems from "@/components/forms/ventas/lc_laboratorio/items";
import VentaBase from "../../../components/forms/ventas/VentaBase";
import LayoutVentas from "@/components/layout/layout_ventas";

export default function VentaLCLab(){
    return (
    <>
    <h3>Venta de Lentes de Contacto Laboratorio</h3>
    <VentaBase>
        <LCLabItems />
    </VentaBase>
    </>
    )
}

VentaLCLab.PageLayout = LayoutVentas;  