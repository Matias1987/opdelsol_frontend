import AgregarFacturaV2 from "@/components/admin/factura/agregarFacturaV2";
import AgregarFacturaV3 from "@/components/admin/factura/agregarFacturaV3";
import LayoutLaboratorio from "@/components/layout/layout_laboratorio";
import { Card } from "antd";

const AgregarFactura = () =>{
    return (
        <>
        <Card
        size="small"
        title="Agregar Factura"
        >
            <AgregarFacturaV3 callback={()=>{}} />
        </Card>
        </>
    
    )
}
AgregarFactura.PageLayout = LayoutLaboratorio;
export default AgregarFactura;