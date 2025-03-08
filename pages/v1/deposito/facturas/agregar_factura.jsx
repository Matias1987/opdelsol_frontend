import AgregarFacturaV2 from "@/components/admin/factura/agregarFacturaV2";
import { Card } from "antd";

const AgregarFactura = () =>{
    return (
        <>
        <Card
        size="small"
        title="Agregar Factura"
        headStyle={{backgroundColor:"#F07427", color:"white"}}>
            <AgregarFacturaV2 callback={()=>{}} />
        </Card>
        </>
    
    )
}

export default AgregarFactura;