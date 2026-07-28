import DollarOutlined from "@ant-design/icons/DollarOutlined";
import UpOutlined from "@ant-design/icons/UpOutlined";
import { Card, Col, Row, Statistic } from "antd";

const TotalesVentas = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <span style={{ fontWeight: "600" }}>Nuevas Ventas</span>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card variant="borderless">
            <Statistic
              title="Cantidad día"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<UpOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card variant="borderless">
            <Statistic
              title="Monto Total"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <span style={{ fontWeight: "600" }}>Ventas Entregadas</span>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card variant="borderless">
            <Statistic
              title="Cantidad día"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<UpOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card variant="borderless">
            <Statistic
              title="Monto Total"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TotalesVentas;
