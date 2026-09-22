import { public_urls } from "@/src/urls";
import { Alert, Layout, Row, Col, Grid } from "antd";
import { useEffect, useState } from "react";
import globals from "@/src/globals";
import dynamic from "next/dynamic";
import { useUserStatus } from "../providers/UserContext";
const { useBreakpoint } = Grid;

const BarraResumenCaja = dynamic(
  () => import("../forms/caja/BarraResumenCaja"),
  {
    ssr: false,
    loading: () => <div style={{ height: "30px" }}>&#9203;</div>,
  },
);

const MenuVentasMobile = dynamic(() => import("./mobile_menu_ventas"), {
  ssr: false,
  loading: () => <div style={{ height: "30px" }}>&#9203;</div>,
});
const MenuV3 = dynamic(() => import("./menu_v3"), {
  ssr: false,
  loading: () => <div style={{ height: "30px" }}>&#9203;</div>,
});

const PopupResultadoBusqueda = dynamic(
  () => import("../precios/PopupResultadoBusqueda"),
  {
    ssr: false,
    loading: () => <div style={{ height: "30px" }}>&#9203;</div>,
  },
);

export default function LayoutVentasV2(props) {
  const { Content, Footer } = Layout;
  const [alerta, setAlerta] = useState("");
  const [esUsuaroCaja1, setEsUsuarioCaja1] = useState(false);
  const [popupBusquedaOpen, setPopupBusquedaOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const screens = useBreakpoint();
  const { userLogedIn } = useUserStatus();

  const onSearch = () => {
    if (busqueda.trim().length < 1) {
      return;
    }
    setPopupBusquedaOpen(true);
  };
 
  const content_style_desktop = {
    margin: "10px 50px",
    padding: 6,
    borderRadius: "15px",
    minHeight: 580,
  };
  const content_style_mobile = {
    margin: "0",
    padding: 0,
    borderRadius: "4px",
    minHeight: 580,
  };

  const getAlerta = () => {
    return alerta != "" ? (
      <>
        <Alert
          style={{ fontSize: ".9em", padding: "1px 50px " }}
          key={alerta}
          message={alerta}
          type="warning"
          showIcon
        />
        <br />
      </>
    ) : (
      <></>
    );
  };

  useEffect(() => {
    if (!userLogedIn) {
      window.location.replace(public_urls.login);
    }
    setEsUsuarioCaja1(globals.esUsuarioCaja1());
  }, [userLogedIn]);

  return (
    <Layout className="layout">
      <div>
        {!screens.md ? (
          <div>
            <MenuVentasMobile />
          </div>
        ) : (
          <div>
            <MenuV3
              onChangeSearch={(e) => {
                setBusqueda(e.target.value);
              }}
              onSearch={onSearch}
            />
          </div>
        )}
      </div>
      <div>
        {esUsuaroCaja1 ? (
          <div>
            <BarraResumenCaja alerta={getAlerta()} />
          </div>
        ) : (
          <div>{getAlerta()}</div>
        )}
      </div>
      <Content
        style={!screens.md ? content_style_mobile : content_style_desktop}
      >
        <Row>
          <Col span={24}>{props.children}</Col>
        </Row>
        <div>
          <PopupResultadoBusqueda
            open={popupBusquedaOpen}
            busqueda={busqueda}
            callback={() => {
              setPopupBusquedaOpen(false);
              setBusqueda("");
            }}
          />
        </div>
      </Content>
      <Footer
        style={{
          background: "#c2c0c0",
          padding: "16px 24px",
          color: "#1b1b1b",
          fontSize: "13px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {/* Left Side: Copyright */}

          {/* Right Side: Links and Icons */}
        </div>
      </Footer>
    </Layout>
  );
}
