import DashboardCajaV2 from "@/components/forms/caja/caja_dashboard";
import LayoutVentasV2 from "@/components/layout/layout_ventas_v2";
import { Divider, Row, Input, Col } from "antd";

export default function Index(){
    return (<>
      
        <DashboardCajaV2 />
        <br />
        
    </>)
}

Index.PageLayout = LayoutVentasV2;