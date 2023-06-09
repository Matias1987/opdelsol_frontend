import MonofLabItems from "@/components/forms/ventas/monof_lab/items";
import VentaBase from "../../../components/forms/ventas/VentaBase";

export default function VentaMonofocalesLab(){
    return (<>
    <h3>Venta de Monofocales Laboratorio</h3>
    <VentaBase>
        <MonofLabItems />
    </VentaBase>
    </>)
}