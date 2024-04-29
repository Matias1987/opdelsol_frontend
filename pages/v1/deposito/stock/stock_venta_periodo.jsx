import VentasTotalesSucursales from "@/components/admin/stock/VentasTotalesSucursales";
import globals from "@/src/globals";

export default function stock_venta_periodo(){
    return <>
        <h3>Ventas Stock</h3>
        <VentasTotalesSucursales idsucursal={globals.obtenerSucursal()}  />
    </>
}