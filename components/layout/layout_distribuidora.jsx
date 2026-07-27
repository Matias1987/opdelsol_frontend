import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { Alert, Layout, Row, Col, Card, Modal } from "antd";
import { useEffect, useState } from "react";
import globals from "@/src/globals";
import MenuDistribuidora from "./menu_distribuidora";
import TrabajoMultiple from "../forms/trabajo_multiple/venta_multiple";

export default function LayoutDistribuidora(props) {
  const [modalOpen, setModalOpen] = useState(false)
  const { Content } = Layout;
  const [alerta, setAlerta] = useState("");
  const { getItem } = useStorage();
  const card_style2 = {
    header: {
      backgroundColor: "#262D42",
      
    },
    body: {
      backgroundColor: "#FAFAFA",
      padding: "0",
    },
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

      fetch(get.caja_abierta + globals.obtenerSucursal())
        .then((r) => r.json())
        .then((response) => {
          if (typeof response.data !== "undefined") {
            if (response.data != null) {
              if (+response.data.abierta == 1) {
                globals.setCajaOpen(true);
              } else {
                setAlerta("CAJA CERRADA");
              }
            }
          }
        });
    }, 10000);
  };

  useEffect(() => {
    validate_user();
  }, []);

  return (
    <Layout style={{ padding: 0 }} className="layout">
      <Card
        size="small"
        styles={card_style2}
        title={<div>{<MenuDistribuidora onNuevaVentaClick={_=>{setModalOpen(true)}} />}</div>}
        style={{
          borderLeft:"#262D42",
          borderRight:"#262D42",
        }}
      >
        <Content
          style={{
            margin: "10px 50px",
            padding: 6,
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
        </Content>
      </Card>
      <Modal open={modalOpen} onCancel={_=>{setModalOpen(false)}} width={"100%"}>
        <TrabajoMultiple />
    </Modal>
    </Layout>
  );
}
