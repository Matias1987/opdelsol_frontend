import AgregarFacturaV2 from "@/components/admin/factura/agregarFacturaV2";
import AgregarFacturaV3 from "@/components/admin/factura/agregarFacturaV3";
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

export default AgregarFactura;