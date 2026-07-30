import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { Alert, Layout, Row, Col, Grid } from "antd";
import { useEffect, useState } from "react";
import globals from "@/src/globals";
import dynamic from "next/dynamic";
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
  const { Content } = Layout;
  const [alerta, setAlerta] = useState("");
  const [esUsuaroCaja1, setEsUsuarioCaja1] = useState(false);
  const { getItem } = useStorage();
  const [popupBusquedaOpen, setPopupBusquedaOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const screens = useBreakpoint();

  const onSearch = () => {
    if (busqueda.trim().length < 1) {
      return;
    }
    setPopupBusquedaOpen(true);
  };

  const validate_user = () => {
    console.log("validating user");
    const _token = getItem("token", "session");

    if (_token === typeof "undefined") {
      window.location.replace(public_urls.login);
    }

    var _t = setTimeout(() => {
      if (_t !== typeof "undefined") {
        console.log("clear timeout");
        clearTimeout(_t);
      }
      fetch(get.check_login + _token)
        .then((response) => response.json())
        .then((response) => {
          if (response.data.logged == "0") {
            window.location.replace(public_urls.login);
          } else {
            validate_user();
          }
        });

      //check if caja is closed, if so, then check whether it is open now
      fetch(get.caja_abierta + globals.obtenerSucursal())
        .then((r) => r.json())
        .then((response) => {
          if (typeof response.data !== "undefined") {
            if (response.data != null) {
              if (+response.data.abierta == 1) {
                globals.setCajaOpen(true);
                setAlerta(
                  +response.data.current == 1 ? "" : "Caja Desactualizada",
                );
              } else {
                setAlerta("CAJA CERRADA");
              }
            }
          }
        });
    }, 10000);
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
          type="error"
          showIcon
        />
        <br />
      </>
    ) : (
      <></>
    );
  };

  useEffect(() => {
    setEsUsuarioCaja1(globals.esUsuarioCaja1());
    validate_user();
  }, []);

  return (
    <Layout style={{ padding: 0 }} className="layout">
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
            <BarraResumenCaja alerta={getAlerta()}/>
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
    </Layout>
  );
}
