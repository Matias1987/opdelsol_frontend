
import TestGridCreation from "@/components/etc/testGridCreation";
import LayoutLaboratorio from "@/components/layout/layout_laboratorio";
import DashboardTaller from "@/components/taller/dashboard";
import { idf_optica } from "@/src/config";
import { Divider } from "antd";

export default function Index(){
    return (<>
        {+idf_optica==3 ? <TestGridCreation />: <DashboardTaller />}
        
    </>)
}

Index.PageLayout = LayoutLaboratorio;