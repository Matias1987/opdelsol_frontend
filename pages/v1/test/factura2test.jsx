import AgregarFacturaV2 from "@/components/admin/factura/agregarFacturaV2";
import CambioSobre from "@/components/cambio/cambio";
import ModificarCantidadesEdicion from "@/components/cambio/modificar_cantidades";
import MyLayout from "@/components/layout/layout";
import AnimacionSorteo from "@/components/sorteo/animacion_sorteo/animacion";
import SorteoForm from "@/components/sorteo/sorteo_form";

export default function factura2Test(){
    return <>
    <AnimacionSorteo />
    
    </>
}

factura2Test.PageLayout = MyLayout;