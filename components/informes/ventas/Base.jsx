const { useState } = require("react")
const { default: VentaDirectaItems } = require("./VentaDirectaItems")
const { default: RecStockItems } = require("./RecStockItems")
const { default: LCLabItems } = require("./LCLabItems")
const { default: LCStockItems } = require("./LCStockItems")
const { default: MultifLabItems } = require("./MultifLabItems")
const { default: MonofLabItems } = require("./MonofLabItems")

const InformeVenta = (props) => {

    const [venta, setVenta] = useState(null)

    const cabecera = () => {
        
    }
    const modo_pago = () => {

    }

    const productos = () => {
        switch(venta.tipo)
        {
            case 1: return <VentaDirectaItems /> ;
            case 2: return <RecStockItems /> ;
            case 3: return <LCLabItems /> ;
            case 4: return  <LCStockItems />;
            case 5: return  <MultifLabItems />;
            case 6: return  <MonofLabItems />;
        }
    }

    return (
    <>
    {cabecera()}
    {productos()}
    {modo_pago()}
    </>
    )
}