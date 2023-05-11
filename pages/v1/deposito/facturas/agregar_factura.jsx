const { default: FacturaForm } = require("@/components/forms/FacturaForm")

const AgregarFactura = () =>{
    return (
        <>
        <h1>Agregar Factura</h1>
        <FacturaForm  action="ADD" />
        </>
    
    )
}

export default AgregarFactura;