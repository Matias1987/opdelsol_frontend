import { ArrowUpOutlined, DollarOutlined } from "@ant-design/icons"
import {Card, Col, Row, Statistic} from "antd"

const TotalesCobros  = props => {

    return <>
    <Row>
        <Col span={24}>
            <span style={{fontWeight:"600"}}>Cobros</span>
        </Col>
    </Row>
    <Row gutter={16}>
    <Col span={12}>
      <Card variant="borderless">
        <Statistic
          title="Total Día"
          value={0}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<DollarOutlined />}
        />
      </Card>
    </Col>
    <Col span={12}>
      <Card variant="borderless">
        <Statistic
          title="Total Mes"
          value={0}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<DollarOutlined />}
        />
      </Card>
    </Col>
  </Row>
  </>
}

export default TotalesCobros;