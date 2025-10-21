import  Proveedores  from "@/components/admin/dashboard_components/proveedores";
import  ListaProveedores  from "@/components/admin/proveedor/ListaProveedores";
import LayoutAdmin from "@/components/layout/layout_admin";
import { Row, Col } from "antd";

export default function panel_proveedores(){

    return <>
    <Row gutter={12}>
        <Col style={{width:"50%", minWidth:"400px"}}>
            <ListaProveedores />    
        </Col>
        <Col style={{width:"50%", minWidth:"400px"}}>
            <Proveedores />    
        </Col>

    </Row>
    
    </>
}

panel_proveedores.PageLayout = LayoutAdmin;  