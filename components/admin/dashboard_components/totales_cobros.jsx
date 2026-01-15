import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { ArrowUpOutlined, DollarOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";

const TotalesCobros = (props) => {
  const [dataDia, setDataDia] = useState(null);
  const [dataMes, setDataMes] = useState(null);
  const [totalDia, setTotalDia] = useState(0);
  const [totalMes, setTotalMes] = useState(0);

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
      }
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
      }
    );
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Row gutter={16} style={{ padding: "16px" }}>
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
              title="Total Cobros Día Efvo."
              value={totalDia}
              precision={2}
              valueStyle={{
                color: "#3f8600",
                fontWeight: "bolder",
                fontSize: "1.2em",
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
              title="Total Cobros Mes Efvo."
              value={totalMes}
              precision={2}
              valueStyle={{
                color: "#3f8600",
                fontWeight: "bolder",
                fontSize: "1.2em",
              }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TotalesCobros;
