import MultifLabItems from "@/components/forms/ventas/multif_lab/Items";
import VentaBase from "../../../components/forms/ventas/VentaBase";

export default function VentaMultifocalesLab(){
    return (<>
    <h3>Venta de Multifocales Laboratorio</h3>
    <VentaBase>
        <MultifLabItems />
    </VentaBase>
    </>)
}