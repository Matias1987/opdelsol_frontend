import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { Alert, Layout, Row, Col, Input, Card, Button, Grid } from "antd";
import { useEffect, useState } from "react";
import globals from "@/src/globals";
import HeaderSol from "./header";
import MenuV2 from "./menu_v2";
import PopupResultadoBusqueda from "../precios/PopupResultadoBusqueda";
import BarraResumenCaja from "../forms/caja/BarraResumenCaja";
import { SearchOutlined } from "@ant-design/icons";
import MenuVentasMobile from "./mobile_menu_ventas";
import MenuV3 from "./menu_v3";
const { useBreakpoint } = Grid;

export default function LayoutVentasV2(props) {
  const { Content } = Layout;
  const [alerta, setAlerta] = useState("");
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

  useEffect(() => {
    validate_user();
  }, []);

  return (
    <Layout style={{ padding: 0 }} className="layout">
      {/*<HeaderSol
        tipoCuenta="VENTAS"
        displaymodechange={(__c) => {
          props?.displaymodechange?.(__c);
        }}
      />*/}
      {!screens.md ? (
        <MenuVentasMobile />
      ) : (
        <MenuV3
          onChangeSearch={(e) => {
            setBusqueda(e.target.value);
          }}
          onSearch={onSearch}
        />
      )}

      {globals.esUsuarioCaja1() ? <BarraResumenCaja /> : <></>}
      <Content
        style={!screens.md ? content_style_mobile : content_style_desktop}
      >
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
      </Content>
    </Layout>
  );
}
