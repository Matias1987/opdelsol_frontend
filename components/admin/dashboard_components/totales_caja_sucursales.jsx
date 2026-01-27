import { post_method } from "@/src/helpers/post_helper";
import InformeCajaV3 from "@/components/informes/caja/InformeCajaV3";
import { post } from "@/src/urls";
import {
  DollarOutlined,
  EyeFilled,
  InfoCircleOutlined,
  InfoOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Modal, Row, Statistic } from "antd";
import { useEffect, useState } from "react";

const TotalesCajasSucursales = ({ style = "green" }) => {
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedCaja, setSelectedCaja] = useState(null);
  const styles = {
    cardStyles: {
      green: {
        backgroundColor: "#dcfcd6",
        borderRadius: "8px",
        border: "1px solid #61be0f",
        cursor: "default",
      },
      black: {
        backgroundColor: "#6868684b",
        borderRadius: "8px",
        border: "1px solid #1f1f1f",
        cursor: "default",
      },
      danger: {
        backgroundColor: "#ffd6d6",
        borderRadius: "8px",
        border: "1px solid #ff4d4f",
        cursor: "default",
      },
      blue: {
        backgroundColor: "#d6e4ff",
        borderRadius: "8px",
        border: "1px solid #597ef7",
        cursor: "default",
      },
    },
    valueStyles: {
      green: {
        color: "#3f8600",
        fontWeight: "bolder",
        fontSize: "1.2em",
      },
      black: {
        color: "#1f1f1f",
        fontWeight: "bolder",
        fontSize: "1.2em",
      },
      danger: {
        color: "#ff4d4f",
        fontWeight: "bolder",
        fontSize: "1.2em",
      },
      blue: {
        color: "#597ef7",
        fontWeight: "bolder",
        fontSize: "1.2em",
      },
    },
  };
  const [cajas, setCajas] = useState([]);
  const load = () => {
    post_method(
      post.obtener_cajas_fecha,
      { fecha: new Date(2026, 0, 5).toISOString().slice(0, 10) },
      (response) => {
        if (response.data.status == "error") return;
        setCajas(response.data || []);
      },
    );
  };

  useEffect(() => {
    load();
  }, []);

  const total_caja = ({ title, totalDia, idcaja }) => (
    <Col>
      <Card
        variant="borderless"
        style={styles.cardStyles[style] || styles.cardStyles.green}
      >
        <Statistic
          title={
            <span style={{ fontWeight: "bolder", color: "black" }}>
              <Button type="link" size="small" onClick={_=>{
                setSelectedCaja(idcaja);
                setPopupOpen(true);
              }}>
                {title}
              </Button>
            </span>
          }
          value={totalDia}
          precision={2}
          valueStyle={styles.valueStyles[style] || styles.valueStyles.green}
          prefix={<DollarOutlined />}
        />
      </Card>
    </Col>
  );

  return (
    <>
      <Row gutter={[16, 16]}>
        {cajas.map((c) =>
          c.idcaja > 0
            ? total_caja({ title: c.sucursal, totalDia: c.saldo, idcaja: c.idcaja })
            : null,
        )}
      </Row>
      <Modal
        width={"1300px"}
        open={popupOpen}
        onCancel={() => {
          setPopupOpen(false);
        }}
        footer={null}
        title="Informe de Caja"
        destroyOnClose
      >
        <InformeCajaV3 idcaja={selectedCaja} />
      </Modal>
    </>
  );
};

export default TotalesCajasSucursales;
