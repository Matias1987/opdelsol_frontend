import AgregarFacturaV2 from "@/components/admin/factura/agregarFacturaV2";

const AgregarFactura = () =>{
    return (
        <>
        <h3>Agregar Factura</h3>
        <AgregarFacturaV2 callback={()=>{}} />
        </>
    
    )
}

export default AgregarFactura;