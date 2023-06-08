import LCLabItems from "@/components/forms/ventas/lc_laboratorio/items";
import VentaBase from "./VentaBase";

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