import ListaCobrosAdmin from "@/components/admin/listaCobrosAdmin";
import ListaEnviosAdmin from "@/components/admin/listaEnviosAdmin";
import ListaGastosAdmin from "@/components/admin/listaGastosAdmin";
import ListaVentasAdmin from "@/components/admin/listaVentasAdmin";
import LayoutAdmin from "@/components/layout/layout_admin";
import { Col, Row } from "antd";

export default function dashboard_admin(){
    return <>
    <Row>
        <Col span={12}>
            <ListaVentasAdmin />
        </Col>
        <Col span={12}>
            <ListaEnviosAdmin />
        </Col>
    </Row>
    <Row>
        <Col span={12}>
            <ListaGastosAdmin />
        </Col>
        <Col span={12}>
            <ListaCobrosAdmin />
        </Col>
    </Row>
    </>
}

dashboard_admin.PageLayout = LayoutAdmin;  