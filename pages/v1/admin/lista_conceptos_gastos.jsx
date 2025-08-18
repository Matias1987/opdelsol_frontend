import  ListaConceptosGastos from "@/components/admin/listaConceptosGastos";
import LayoutAdmin from "@/components/layout/layout_admin";
import { Col, Row } from "antd";

export default function ListaConceptosGastosAdm() {
  return (
    <div>
      <Row>
        <Col span={24}>
        <ListaConceptosGastos />
        </Col>
      </Row>
      
    </div>
  );
}

ListaConceptosGastosAdm.PageLayout = LayoutAdmin;  