import ListaSucursales from "@/components/admin/listaSucursales";
import ListaOpticas from "@/components/admin/opticas/listaOpticas";
import LayoutAdmin from "@/components/layout/layout_admin";
import { Col, Row } from "antd";

export default function lista_sucursales( ){
    return <>
    <Row>
        <Col span={24}>
            <ListaOpticas />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <ListaSucursales />
        </Col>
    </Row>
        
    </>
}

lista_sucursales.PageLayout = LayoutAdmin;  