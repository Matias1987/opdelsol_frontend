import { DollarOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";

const TotalesMP = (props) => {
  const [dataDia, setDataDia] = useState(null);
  const [dataMes, setDataMes] = useState(null);
  const [totalDia, setTotalDia] = useState(0);
  const [totalMes, setTotalMes] = useState(0);
  const [reload, setReload] = useState(false);

  const load = () => {
    setDataDia([]);
    setDataMes([]);
  };

  useEffect(() => {
    load();
  }, [reload]);

  return (
    <>
      <Card
        style={{ boxShadow: "0px 5px 15px #888888" }}
        title="Totales MP"
        size="small"
        extra={
          <>
            <Button
              type="link"
              size="small"
              onClick={(_) => {
                setReload(!reload);
              }}
            >
              <ReloadOutlined />
            </Button>
          </>
        }
      >
        <Row gutter={[16, 16]} style={{ padding: "0px" }}>
          <Col>
            <Card
              variant="borderless"
              style={{
                backgroundColor: "#8fb7f3",
                borderRadius: "8px",
                border: "1px solid #0f55be",
                cursor: "default",
              }}
            >
              <Statistic
                loading={dataDia == null}
                title={
                  <span style={{ fontWeight: "bolder", color: "black" }}>
                    {"Total Cobros Día Efvo."}
                  </span>
                }
                value={totalDia}
                precision={2}
                valueStyle={{
                  color: "#0f55be",
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
                backgroundColor: "#8fb7f3",
                borderRadius: "8px",
                border: "1px solid #0f55be",
                cursor: "default",
              }}
            >
              <Statistic
                loading={dataMes == null}
                title={
                  <span style={{ fontWeight: "bolder", color: "black" }}>
                    {"Total Cobros Mes Efvo."}
                  </span>
                }
                value={0}
                precision={2}
                valueStyle={{
                  color: "#0f55be",
                  fontWeight: "bolder",
                  fontSize: "1.4em",
                }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default TotalesMP;
