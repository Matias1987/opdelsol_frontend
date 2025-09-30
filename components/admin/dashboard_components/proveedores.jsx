import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { ReloadOutlined, UserOutlined } from "@ant-design/icons";
import {
  Badge,
  Card,
  Avatar,
  Divider,
  List,
  Skeleton,
  Button,
  Modal,
  Checkbox,
} from "antd";
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
    "#8B4C4C", // 🔴 Extreme Alert – muted crimson
    "#A66A5E", // 🟥 High Alert – dusty red
    "#C49A6C", // 🟧 Moderate Alert – soft amber
    "#D6C27A", // 🟨 Low Alert – pale mustard
    "#A3B98B", // 🟩 Minimal Alert – gentle olive green
    "#7FAF9D", // ✅ OK Status – calm teal green
  ];

  const load = (_) => {
    post_method(post.pagos_atrasados_proveedores, {}, (response) => {
      //alert(JSON.stringify(response))
      setData(
        response.data.map((prov) => ({
          idproveedor: prov.idproveedor,
          nombre: prov.nombre,
          ultimo_pago: prov.ultimo_pago,
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
      <Card
        extra={
          <>
            <Button type="link">
              <ReloadOutlined />
            </Button>
          </>
        }
        style={{ width: "500px" }}
        styles={{ header: { backgroundColor: "#ffffed", background: "linear-gradient(281deg,rgba(255, 255, 154, 1) 62%, rgba(208, 255, 0, 1) 95%)" } }}
        title={
          <>
            <UserOutlined /> Proveedores
            <Checkbox
              checked={false}
              style={{ marginLeft: "16px" }}
              onChange={(e) => {
                if (e.target.checked) {
                  load();
                }
              }}
            >
              Solo con pagos atrasados
            </Checkbox>
          </>
        }
        size="small"
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
                  border: `4px solid ${
                    alertColors[index % alertColors.length]
                  }`,
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
                      {/*<i
                          style={{
                            color: "black",
                            fontWeight: "400",
                            fontSize: "0.9em",
                           
                          }}
                        >
                          Ultimo pago: 00/00/0000
                        </i>*/}
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
