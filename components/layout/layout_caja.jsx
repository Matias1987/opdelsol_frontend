import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { Alert, Layout, Row, Col, Input, Card, Button } from "antd";
import { useEffect, useState } from "react";
import globals from "@/src/globals";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import { Content } from "antd/es/layout/layout";
import dynamic from "next/dynamic";

const MenuV2 = dynamic(() => import("./menu_v2"), {
  ssr: false,
  loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
});

const PopupResultadoBusqueda = dynamic(
  () => import("../precios/PopupResultadoBusqueda"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
  },
);

const BarraResumenCaja = dynamic(
  () => import("../forms/caja/BarraResumenCaja"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
  },
);

const HeaderSol = dynamic(() => import("./header"), {
  ssr: false,
  loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
});

export default function LayoutVentas(props) {
  const [alerta, setAlerta] = useState("");
  const { getItem } = useStorage();
  const [popupBusquedaOpen, setPopupBusquedaOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [esUCaja1, setEsUCaja1] = useState(false)
  const onSearch = () => {
    if (busqueda.trim().length < 1) {
      return;
    }
    setPopupBusquedaOpen(true);
  };

  const validate_user = () => {
    const _token = getItem("token", "session");

    if (_token === typeof "undefined") {
      //alert("Debe Iniciar Sesion")
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
            //alert("Debe Iniciar Sesion")
            window.location.replace(public_urls.login);
          } else {
            //_t  = validate_user();
            validate_user();
          }
        });

      //check if caja is closed, if so, then check whether it is open now
      fetch(get.caja_abierta + globals.obtenerSucursal())
        .then((r) => r.json())
        .then((response) => {
          //if caja is open, set this value in local
          if (typeof response.data !== "undefined") {
            //alert(JSON.stringify(response))
            if (response.data != null) {
              if (+response.data.abierta == 1) {
                globals.setCajaOpen(true);
                setAlerta(
                  +response.data.current == 1 ? "" : "Caja Desactualizada",
                );
              } else {
                //alert("caja cerrada")
                setAlerta("CAJA CERRADA");
              }
            }
          }
        });
    }, 10000);
  };
  useEffect(() => {
    setEsUCaja1(globals.esUsuarioCaja1());
    if (!globals.esUsuarioCaja1()) {
      window.location.replace(public_urls.modo);
    }
    validate_user();
  }, []);

  const card_style2 = {
    header: {
      background: "#E7E9EB",
      //borderTop:"2px solid #663F4C",
      //borderTop:"2px solid #3A5C79",
    },
    body: {
      backgroundColor: "#ffffffff",
      padding: "0",
    },
  };

  const card_style = {
    header: {
      background: "#ADD8E6",
      background:
        "linear-gradient(39deg, rgba(173, 216, 230, 1) 62%, rgba(128, 164, 230, 1) 95%)",
      borderTop: "3px solid #4589A0",
    },
    body: { backgroundColor: "#FAFBFF", padding: "0" },
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
        { esUCaja1 ? <div> <BarraResumenCaja /> </div> : <div></div>}
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
