//import TotalesVentasDiaEmpleado from "@/components/admin/dashboard_components/totales_ventas_dia_empleado";
//import Egreso from "@/components/caja_master/egreso";
//import EdicionVentas from "@/components/edicion_ventas/EdicionVentas";
//import TestGridCreation from "@/components/etc/testGridCreation";
import NuevoDescuento from "@/components/cliente/descuentos/nuevoDescuento";
import TestGridCreation from "@/components/etc/testGridCreation";
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

              <TrabajoMultiple />

      <DetalleVentaTM />
  <NuevoDescuento />
        
     */}
    <TestGridCreation />
        
    
    </div>
  );
}

test.PageLayout = LayoutAdmin;
