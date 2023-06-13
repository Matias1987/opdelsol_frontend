import MultifLabItems from "@/components/forms/ventas/multif_lab/Items";
import VentaBase from "../../../components/forms/ventas/VentaBase";
import LayoutVentas from "@/components/layout/layout_ventas";

export default function VentaMultifocalesLab(){
    return (<>
    <h3>Venta de Multifocales Laboratorio</h3>
    <VentaBase>
        <MultifLabItems />
    </VentaBase>
    </>)
}
VentaMultifocalesLab.PageLayout = LayoutVentas;  