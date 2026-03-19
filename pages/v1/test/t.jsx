import Egreso from "@/components/caja_master/egreso";
import TestGridCreation from "@/components/etc/testGridCreation";
import LayoutAdmin from "@/components/layout/layout_admin";
import QRAccess from "@/components/qr_access/QRAccess";

export default function test() {
  return (
    <div>
      {/*<Egreso aCajaMaster={true} callback={()=>alert("Callback desde egreso")} />
      <TestGridCreation />*/}
      <QRAccess />
      
    </div>
  )
}

test.PageLayout = LayoutAdmin;
