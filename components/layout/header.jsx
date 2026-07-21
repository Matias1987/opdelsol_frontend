import globals from "@/src/globals";
import { Button, Col, Layout, Row } from "antd";
import SucursalLabel from "../sucursal_label";
import useStorage from "@/useStorage";
import { LeftOutlined, LogoutOutlined, MehOutlined, UserOutlined } from "@ant-design/icons";
import { get, public_urls } from "@/src/urls";
import { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import VentasVendedor from "../informes/ventas/VentasVendedor";
import { registrar_evento } from "@/src/helpers/evento_helper";
import { cambio_sucursal_habilitado, idf_optica } from "@/src/config";

/**
 * Componente para el encabezado de la aplicación
 * @param tipoCuenta
 * @returns
 */
const HeaderSol = (props) => {
  const { Header, Sider, Content } = Layout;
  const { getItem } = useStorage();
  const [uname, setUName] = useState("");
  const [soloVtasCaja, setCambiarModo] = useState(true);
  useEffect(() => {
    //alert(globals.obtenerSoloVtaCajaUser())
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
        height:"42px"
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
          <CustomModal
            title={<h2 style={{ color: "darkred" }}>{uname}</h2>}
            width="500px"
            type="text"
            openButtonText={
              <>
                <span style={{ color: "white" }}>
                  <UserOutlined size={"small"} />
                  &nbsp;{uname}
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
            style={{ color: "white", paddingTop:"8px" }}
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
