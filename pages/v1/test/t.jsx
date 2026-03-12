import Egreso from "@/components/caja_master/egreso";
import TestGridCreation from "@/components/etc/testGridCreation";
import LayoutAdmin from "@/components/layout/layout_admin";

export default function test() {
  return (
    <div>
      <Egreso aCajaMaster={true} callback={()=>alert("Callback desde egreso")} />
      <TestGridCreation />
      
    </div>
  )
}

test.PageLayout = LayoutAdmin;
