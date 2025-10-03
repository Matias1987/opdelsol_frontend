import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { ReloadOutlined, UserOutlined } from "@ant-design/icons";
import { Card, List, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import FichaProveedor from "../proveedor/fichaProveedor";

const Proveedores = (_) => {
  const [loading, setLoading] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [popupFichaOpen, setPopupFichaOpen] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  const alertColors = [
    "#eb0000ff", // 🔴 Extreme Alert – muted crimson
    "#A66A5E", // 🟥 High Alert – dusty red
    "#C49A6C", // 🟧 Moderate Alert – soft amber
    "#D6C27A", // 🟨 Low Alert – pale mustard
    "#A3B98B", // 🟩 Minimal Alert – gentle olive green
    "#7FAF9D", // ✅ OK Status – calm teal green
  ];

  const alertColors2 = [
    { level: "low", background: "#e0f7fa", border: "#80deea", text: "#006064" },
    {
      level: "medium",
      background: "#fff3e0",
      border: "#ffb74d",
      text: "#e65100",
    },
    {
      level: "high",
      background: "#ffebee",
      border: "#ef5350",
      text: "#b71c1c",
    },
    {
      level: "pending",
      background: "#ede7f6",
      border: "#9575cd",
      text: "#4527a0",
    },
    {
      level: "inactive",
      background: "#eceff1",
      border: "#b0bec5",
      text: "#37474f",
    },
  ];

  const get_color = (atraso) =>
    atraso > 100
      ? alertColors[0]
      : alertColors[
          Math.trunc(((100 - atraso) / 100) * (alertColors.length - 1))
        ];

  const load = (_) => {
    post_method(post.pagos_atrasados_proveedores, {}, (response) => {
      setData(
        response.data.map((prov) => ({
          idproveedor: prov.idproveedor,
          nombre: prov.nombre,
          ultimo_pago: prov.ultimo_pago,
          atraso: prov.atraso,
        }))
      );
    });
  };

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      `https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?page=${page}&limit=10`
    )
      .then((res) => res.json())
      .then((res) => {
        const results = Array.isArray(res) ? res : [];
        setData([...data, ...results]);
        setLoading(false);
        setPage(page + 1);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
    //loadMoreData();
  }, [reload]);

  return (
    <>
      <div
        style={{
          width: "500px",
          textAlign: "center",
          height: "100px",
          fontSize: "1.5em",
          fontWeight: "600",
          backgroundColor: alertColors2[3].background,
          borderColor: alertColors2[3].border,
          color: alertColors2[3].text,
          borderRadius: "16px",
        }}
      >
        llalalallalalalal

      </div>
      <Card
        extra={
          <>
            <Button type="link">
              <ReloadOutlined />
            </Button>
          </>
        }
        style={{
          borderRadius: "16px",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        }}
        styles={{
          header: {
            backgroundColor: "#ffffed",
            background:
              "linear-gradient(281deg,rgba(255, 255, 255, 1) 62%, rgba(233, 233, 233, 1) 95%)",

            borderRadius: "16px 16px 0 0",
          },
        }}
        title={
          <>
            <UserOutlined /> Proveedores
            {/*<Checkbox
              checked={soloDeudas}
              style={{ marginLeft: "16px" }}
              onChange={(e) => {
                setSoloDeudas(!soloDeudas);
                if (e.target.checked) {
                  load();
                }
              }}
            >
              Solo con pagos atrasados
            </Checkbox>*/}
          </>
        }
        size="default"
      >
        <div
          id="scrollableDiv"
          style={{
            borderRadius: "16px",
            height: 400,
            overflow: "auto",
            padding: "0",
            backgroundColor: "rgba(0,0,0,.05)",
            border: "1px solid rgba(140, 140, 140, 0)",
          }}
        >
          <List
            size="small"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item
                key={item.idproveedor}
                style={{
                  border: `2px solid ${get_color(+item.atraso)}`,
                  backgroundColor: "white",
                  borderRadius: "16px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
              >
                <List.Item.Meta
                  avatar={
                    <>
                      <UserOutlined />
                    </>
                  }
                  title={
                    <>
                      <span
                        style={{ fontSize: "1.2em" }}
                        href="https://ant.design"
                      >
                        {item.nombre}
                      </span>
                      &nbsp;&nbsp;&nbsp;
                      {
                        <i
                          style={{
                            color: "black",
                            fontWeight: "400",
                            fontSize: "0.95em",
                          }}
                        >
                          Ultimo pago: &nbsp;
                          {item.ultimo_pago.length < 1 ||
                          item.ultimo_pago.includes("1970")
                            ? "N/A"
                            : item.ultimo_pago}
                        </i>
                      }
                    </>
                  }
                />
                <div>
                  <Button
                    onClick={(_) => {
                      setSelectedProveedor(item.idproveedor);
                      setPopupFichaOpen(true);
                    }}
                    type="text"
                    size="large"
                    style={{ color: "black" }}
                  >
                    Ver Ficha
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </div>
      </Card>
      <Modal
        destroyOnClose={true}
        open={popupFichaOpen}
        footer={null}
        onCancel={(_) => {
          setReload(!reload);
          setPopupFichaOpen(false);
        }}
        width={"1050px"}
      >
        <FichaProveedor
          idproveedor={selectedProveedor}
          callback={(_) => {
            setReload(!reload);
            setPopupFichaOpen(false);
          }}
        />
      </Modal>
    </>
  );
};
export default Proveedores;
