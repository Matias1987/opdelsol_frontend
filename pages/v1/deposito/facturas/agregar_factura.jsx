import FacturaForm from "@/components/forms/FacturaForm";

const AgregarFactura = () =>{
    return (
        <>
        <h3>Agregar Factura</h3>
        <FacturaForm  action="ADD" />
        </>
    
    )
}

export default AgregarFactura;