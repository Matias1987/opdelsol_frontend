import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import DollarOutlined from "@ant-design/icons/DollarOutlined";
import ReloadOutlined from "@ant-design/icons/ReloadOutlined";
import { Button, Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
const TotalesProveedores = () => {
  const [totales, setTotales] = useState(null);
  const [loading, setLoading] = useState(null);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const fetchTotales = async () => {
      post_method(post.inf_saldo_total_proveedores, {}, (response) => {
        setLoading(false);
        setTotales(response.data);
      });
    };
    fetchTotales();
  }, []);

  return (
    <>
      <Card
        style={{ boxShadow: "0px 5px 15px #888888" }}
        title="Totales Proveedores"
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
          {totales.map((t) => (
            <Col>
              <Card
                variant="borderless"
                style={{
                  backgroundColor: "#109618",
                  borderRadius: "8px",
                  cursor: "default",
                  color: "white",
                }}
              >
                <Statistic
                  loading={loading}
                  title={
                    <span style={{ fontWeight: "bolder", color: "white" }}>
                      {"Saldo"}
                    </span>
                  }
                  value={t.monto}
                  precision={2}
                  valueStyle={{
                    color: "#ffff",
                    fontWeight: "bolder",
                    fontSize: "1.4em",
                  }}
                  prefix={t.moneda}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
};

export default TotalesProveedores;
