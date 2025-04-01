import AgregarFacturaV2 from "@/components/admin/factura/agregarFacturaV2";
import { Card } from "antd";

const AgregarFactura = () =>{
    return (
        <>
        <Card
        size="small"
        title="Agregar Factura"
        >
            <AgregarFacturaV2 callback={()=>{}} />
        </Card>
        </>
    
    )
}

export default AgregarFactura;