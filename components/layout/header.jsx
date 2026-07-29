import globals from "@/src/globals";
import { Button, Col, Layout, Row } from "antd";
import useStorage from "@/useStorage";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";

import { get, public_urls } from "@/src/urls";
import { useEffect, useState } from "react";
import { registrar_evento } from "@/src/helpers/evento_helper";
import { cambio_sucursal_habilitado } from "@/src/config";
import dynamic from "next/dynamic";

const CustomModal = dynamic(() => import("../CustomModal"), {
  ssr: false,
  loading: () => <div style={{ height: "30px" }}>Espere...</div>,
});

const VentasVendedor = dynamic(
  () => import("../informes/ventas/VentasVendedor"),
  {
    ssr: false,
    loading: () => <div style={{ height: "30px" }}>Espere...</div>,
  },
);

const SucursalLabel = dynamic(() => import("../sucursal_label"), {
  ssr: false,
  loading: () => <div style={{ height: "30px" }}>Espere...</div>,
});



/**
 * Componente para el encabezado de la aplicación
 * @param tipoCuenta
 * @returns
 */
const HeaderSol = (props) => {
  const { Header } = Layout;
  const { getItem } = useStorage();
  const [uname, setUName] = useState("");
  const [soloVtasCaja, setCambiarModo] = useState(true);
  useEffect(() => {
    setCambiarModo(globals.obtenerSoloVtaCajaUser());
    setUName(globals.obtenerUserName());
  }, []);
  return (
    <Header
      style={{
        background: "#131313",
        color: "white",
        paddingTop: "4px",
        lineHeight: "6px",
        margin: "0",
        fontSize: ".70em",
        height: "42px",
      }}
    >
      <Row gutter={8}>
        <Col>
          {props.tipoCuenta && props.tipoCuenta == "ADMIN" ? null : (
            <>
              <SucursalLabel
                changeSucursalEnabled={cambio_sucursal_habilitado}
              />
            </>
          )}
          </Col>
          <Col>
          <CustomModal
            title={<h2 style={{ color: "darkred" }}>{uname}</h2>}
            width="500px"
            type="text"
            openButtonText={
              <>
                <span style={{ color: "white" }}>
                  <UserOutlined size={"small"} />
                  {uname}
                </span>
              </>
            }
          >
            <VentasVendedor />
          </CustomModal>
        </Col>
        <Col>
          <Button
            size="small"
            type="text"
            style={{ color: "white", paddingTop: "8px" }}
            onClick={() => {
              const _token = getItem("token", "session");

              fetch(get.logout + _token)
                .then((response) => response.json())
                .then((response) => {
                  registrar_evento(
                    "USER_LOGOUT",
                    "Cierre de sesion",
                    globals.obtenerUID(),
                  );
                  window.location.replace(public_urls.login);
                })
                .catch((err) => {
                  console.log("error");
                });
            }}
          >
            <LogoutOutlined />
            Salir
          </Button>
        </Col>
        <Col>
          {soloVtasCaja ? (
            <></>
          ) : (
            <Button
              type="link"
              style={{ color: "white" }}
              onClick={(e) => {
                window.location.replace(public_urls.modo);
              }}
            >
              Cambiar Modo
            </Button>
          )}
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderSol;
