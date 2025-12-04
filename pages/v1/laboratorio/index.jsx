
import LayoutLaboratorio from "@/components/layout/layout_laboratorio";
import DashboardTaller from "@/components/taller/dashboard";
import { Divider } from "antd";

export default function Index(){
    return (<>
        <DashboardTaller />
        
    </>)
}

Index.PageLayout = LayoutLaboratorio;