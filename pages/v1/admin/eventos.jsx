import {Row, Col} from "antd";
import LayoutAdmin from "@/components/layout/layout_admin";
import Eventos from "@/components/admin/eventos";

export default function ListaVentasDiaVendedor(){
    return <Row>
                <Col span={24}>
                    <Eventos />
                </Col>
            </Row>
}


ListaVentasDiaVendedor.PageLayout = LayoutAdmin;  