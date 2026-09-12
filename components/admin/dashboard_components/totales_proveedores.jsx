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
      fetch(post.inf_saldo_total_proveedores)
        .then((r) => r.json())
        .then((response) => {
          setTotales(response.data);
          setLoading(false);
        });
    };
    fetchTotales();
  }, []);

  return (
    <>
      <Card
        style={{ boxShadow: "1px 1px 2px #888888" }}
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
        {loading ? (
          <div style={{ height: "300px" }}>&#9203;</div>
        ) : (
          <Row gutter={[16, 16]} style={{ padding: "0px" }}>
            {totales?.map((t) => (
              <Col>
                <Card
                  variant="borderless"
                  style={{
                    backgroundColor: "#7e807e",
                    borderRadius: "8px",
                    cursor: "default",
                    color: "white",
                  }}
                >
                  <Statistic
                    loading={loading}
                    title={
                      <span style={{ fontWeight: "bolder", color: "white" }}>
                        {"Saldo " + t.moneda}
                      </span>
                    }
                    value={t.amnt}
                    precision={2}
                    valueStyle={{
                      color: "#ffff",
                      fontWeight: "bolder",
                      fontSize: "1.4em",
                    }}
                    prefix={<DollarOutlined style={{ color: "white" }} />}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card>
    </>
  );
};

export default TotalesProveedores;
