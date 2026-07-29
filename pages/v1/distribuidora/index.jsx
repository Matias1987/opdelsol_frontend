import LayoutDistribuidora from "@/components/layout/layout_distribuidora";
import { Col, Row } from "antd";

export default function DashboardDistribuidora() {
  return (
    <>
      <Row>
        <Col>
          <div>Bienvenido</div>
        </Col>
      </Row>
    </>
  );
}

DashboardDistribuidora.PageLayout = LayoutDistribuidora;
