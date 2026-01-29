import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import {
  ArrowUpOutlined,
  DollarOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";

const TotalesCobros = (props) => {
  const [dataDia, setDataDia] = useState(null);
  const [dataMes, setDataMes] = useState(null);
  const [totalDia, setTotalDia] = useState(0);
  const [totalMes, setTotalMes] = useState(0);
  const [reload, setReload] = useState(false);
  const load = () => {
    const date = new Date();
    const date_str = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    post_method(
      post.total_cobros_tipo_periodo,
      { fecha_desde: date_str, fecha_hasta: date_str },
      (response) => {
        setDataDia(response.data);
        response.data.forEach((row) => {
          if (row.modo_pago === "efectivo") {
            setTotalDia(row.total);
          }
        });
      },
    );

    post_method(
      post.total_cobros_tipo_periodo,
      {
        fecha_desde: `${date.getFullYear()}-${date.getMonth() + 1}-01`,
        fecha_hasta: date_str,
      },

      (response) => {
        setDataMes(response.data);
        response.data.forEach((row) => {
          if (row.modo_pago === "efectivo") {
            setTotalMes(row.total);
          }
        });
      },
    );
  };

  useEffect(() => {
    load();
  }, [reload]);

  return (
    <>
      <Card
        style={{ boxShadow: "0px 5px 15px #888888" }}
        title="Totales Cobros"
        size="small"
        extra={
          <>
            <Button type="link" size="small" onClick={_=>{setReload(!reload)}}>
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
                backgroundColor: "#dcfcd6",
                borderRadius: "8px",
                border: "1px solid #61be0f",
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
                  color: "#3f8600",
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

export default TotalesCobros;
