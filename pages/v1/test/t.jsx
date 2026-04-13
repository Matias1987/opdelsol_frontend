import Egreso from "@/components/caja_master/egreso";
import EdicionVentas from "@/components/edicion_ventas/EdicionVentas";
import TestGridCreation from "@/components/etc/testGridCreation";
import TrabajoMultiple from "@/components/forms/trabajo_multiple/venta_multiple";
import TrabajoRecetaStock from "@/components/forms/ventas/trabajo/trab_receta_stock";
import LayoutAdmin from "@/components/layout/layout_admin";
import QRAccess from "@/components/qr_access/QRAccess";

export default function test() {
  return (
    <div>
      {/*<Egreso aCajaMaster={true} callback={()=>alert("Callback desde egreso")} />
       <QRAccess />
       <TestGridCreation />
        <TrabajoRecetaStock />
      
      

      <EdicionVentas idventa={69677} />*/}
      <TrabajoMultiple />
    
      
    </div>
  )
}

test.PageLayout = LayoutAdmin;
