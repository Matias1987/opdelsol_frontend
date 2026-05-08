//import TotalesVentasDiaEmpleado from "@/components/admin/dashboard_components/totales_ventas_dia_empleado";
//import Egreso from "@/components/caja_master/egreso";
//import EdicionVentas from "@/components/edicion_ventas/EdicionVentas";
//import TestGridCreation from "@/components/etc/testGridCreation";
import NuevoDescuento from "@/components/cliente/descuentos/nuevoDescuento";
import ListadoVentasTM from "@/components/forms/trabajo_multiple/listado/listadoTM";
import TrabajoMultiple from "@/components/forms/trabajo_multiple/venta_multiple";
import DetalleVentaTM from "@/components/forms/trabajo_multiple/vista/detalleVentaTM";
//import TrabajoRecetaStock from "@/components/forms/ventas/trabajo/trab_receta_stock";
import LayoutAdmin from "@/components/layout/layout_admin";
import { Divider } from "antd";
//import QRAccess from "@/components/qr_access/QRAccess";

export default function test() {
  return (
    <div>
      {/*<Egreso aCajaMaster={true} callback={()=>alert("Callback desde egreso")} />
       <QRAccess />
       <TestGridCreation />
        <TrabajoRecetaStock />
      <EdicionVentas idventa={69677} />
       <TotalesVentasDiaEmpleado />
       
       <ListadoVentasTM />

        <DetalleVentaTM />

        <TrabajoMultiple />
     */}
  
        
      <NuevoDescuento />
    
       
      
    </div>
  )
}

test.PageLayout = LayoutAdmin;
