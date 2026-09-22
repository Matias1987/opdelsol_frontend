import { public_urls } from "@/src/urls";
import { Alert, Layout, Row, Col, Input, Card, Button } from "antd";
import { useEffect, useState } from "react";
import globals from "@/src/globals";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import { Content } from "antd/es/layout/layout";
import dynamic from "next/dynamic";
import { useUserStatus } from "../providers/UserContext";

const MenuV2 = dynamic(() => import("./menu_v2"), {
  ssr: false,
  loading: () => <div style={{ height: "30px" }}></div>,
});

const PopupResultadoBusqueda = dynamic(
  () => import("../precios/PopupResultadoBusqueda"),
  {
    ssr: false,
    loading: () => <div style={{ height: "30px" }}></div>,
  },
);

const BarraResumenCaja = dynamic(
  () => import("../forms/caja/BarraResumenCaja"),
  {
    ssr: false,
    loading: () => <div style={{ height: "30px" }}></div>,
  },
);

const HeaderSol = dynamic(() => import("./header"), {
  ssr: false,
  loading: () => <div style={{ height: "30px" }}></div>,
});

export default function LayoutVentas(props) {
  const [alerta, setAlerta] = useState("");
  const [popupBusquedaOpen, setPopupBusquedaOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [esUCaja1, setEsUCaja1] = useState(false);
  const { userLogedIn } = useUserStatus();
  const onSearch = () => {
    if (busqueda.trim().length < 1) {
      return;
    }
    setPopupBusquedaOpen(true);
  };
 
  useEffect(() => {
    if (!userLogedIn) {
      window.location.replace(public_urls.login);
    }
    setEsUCaja1(globals.esUsuarioCaja1());
    if (!globals.esUsuarioCaja1()) {
      window.location.replace(public_urls.modo);
    }
  }, [userLogedIn]);

  const card_style2 = {
    header: {
      background: "#E7E9EB",
    },
    body: {
      backgroundColor: "#ffffffff",
      padding: "0",
    },
  };

  return (
    <Layout style={{ padding: 0 }} className="layout">
      <HeaderSol
        tipoCuenta="CAJA"
        displaymodechange={(__c) => {
          props?.displaymodechange?.(__c);
        }}
      />

      <Card
        styles={card_style2}
        extra={
          <div>
            <Input
              style={{
                borderRadius: "16px",
                backgroundColor: "rgb(255, 255, 255)",
              }}
              suffix={
                <div>
                  <Button type="link" onClick={onSearch}>
                    <SearchOutlined />
                  </Button>
                </div>
              }
              prefix={<span style={{ fontWeight: "600" }}>Buscar Código:</span>}
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
            />
          </div>
        }
        title={
          <>
            <MenuV2 />
          </>
        }
      >
        {esUCaja1 ? (
          <div>
            {" "}
            <BarraResumenCaja />{" "}
          </div>
        ) : (
          <div></div>
        )}
        <Content
          style={{
            margin: "0px 10px",
            padding: 10,
            borderRadius: "15px",
            minHeight: 580,
          }}
        >
          {alerta != "" ? (
            <>
              <Alert
                style={{ fontSize: ".9em", padding: "1px 50px " }}
                key={alerta}
                message={alerta}
                type="error"
                showIcon
              />
              <br />
            </>
          ) : (
            <></>
          )}
          <Row>
            <Col span={24}>{props.children}</Col>
          </Row>

          <PopupResultadoBusqueda
            open={popupBusquedaOpen}
            busqueda={busqueda}
            callback={() => {
              setPopupBusquedaOpen(false);
              setBusqueda("");
            }}
          />
        </Content>
      </Card>
    </Layout>
  );
}
