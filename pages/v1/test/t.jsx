//import TotalesVentasDiaEmpleado from "@/components/admin/dashboard_components/totales_ventas_dia_empleado";
//import Egreso from "@/components/caja_master/egreso";
//import EdicionVentas from "@/components/edicion_ventas/EdicionVentas";
//import TestGridCreation from "@/components/etc/testGridCreation";
//import TrabajoRecetaStock from "@/components/forms/ventas/trabajo/trab_receta_stock";
import DashboardCajaV2 from "@/components/forms/caja/caja_dashboard";
import LayoutAdmin from "@/components/layout/layout_admin";
import AdminPedidos from "@/components/pedidos/lista_pedidos";
//import QRAccess from "@/components/qr_access/QRAccess";

export default function test() {
 
  return (
    <div>
     <AdminPedidos />
    </div>
  );
}

test.PageLayout = LayoutAdmin;
