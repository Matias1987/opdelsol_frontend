import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { ArrowUpOutlined, DollarOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";

const CantidadesEstadoTaller = () => {
    return (
        <Row gutter={[16,16]} style={{ padding: "16px" }}>
        <Col>
          <Card
            variant="borderless"
            style={{
              backgroundColor: "#dcfcd6",
              borderRadius: "8px",
              border: "1px solid #61be0f",
              cursor: "default",
              boxShadow:"0px 2px 2px #888888"
            }}
          >
            <Statistic
              loading={dataDia == null}
              title={<span style={{fontWeight:"bolder", color:"black"}}>{"Total Cobros Día Efvo."}</span>}
              value={totalDia}
              precision={2}
              valueStyle={{
                color: "#3f8600",
                fontWeight: "bolder",
                fontSize: "1.4em",
              }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        <Col>
          <Card
            variant="borderless"
            style={{
              backgroundColor: "#dcfcd6",
              borderRadius: "8px",
              border: "1px solid #61be0f",
              cursor: "default",
              boxShadow:"0px 2px 2px #888888"
            }}
          >
            <Statistic
              loading={dataMes == null}
              title={<span style={{fontWeight:"bolder", color:"black"}}>{"Total Cobros Mes Efvo."}</span>}
              value={totalMes}
              precision={2}
              valueStyle={{
                color: "#3f8600",
                fontWeight: "bolder",
                fontSize: "1.4em",
              }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
      </Row>)
    }
export default CantidadesEstadoTaller;