import { DollarOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";

const TotalTarjetas = (props) => {
  const [dataDia, setDataDia] = useState(null);
  const [dataMes, setDataMes] = useState(null);
  const [totalDia, setTotalDia] = useState(600000000);
  const [totalMes, setTotalMes] = useState(600000000);
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
        title="Totales Tarjeta"
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
                backgroundColor: "#9ffadc",
                borderRadius: "8px",
                border: "1px solid #0fbe84",
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
                  color: "#0fbe84",
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
                backgroundColor: "#9ffadc",
                borderRadius: "8px",
                border: "1px solid #0fbe84",
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
                value={totalMes}
                precision={2}
                valueStyle={{
                  color: "#0fbe84",
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

export default TotalTarjetas;
