import LayoutDistribuidora from "@/components/layout/layout_distribuidora";
import { Col, Divider, Row } from "antd";

export default function DashboardDistribuidora() {
  return (
    <>
      <Row>
        <Col>
          <div>Bienvenido</div>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </>
  );
}

DashboardDistribuidora.PageLayout = LayoutDistribuidora;
