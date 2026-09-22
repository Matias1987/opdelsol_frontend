import { get, public_urls } from "@/src/urls";
import { Alert, Layout } from "antd";
import { useEffect, useState } from "react";
import globals from "@/src/globals";
import HeaderSol from "./header";
import MenuV2 from "./menu_v2";
import { useUserStatus } from "../providers/UserContext";

export default function LayoutDepositoMin(props) {
  const { Content } = Layout;
  const [alerta, setAlerta] = useState("");
  const { userLogedIn } = useUserStatus();
  
  useEffect(() => {
    if (!userLogedIn) {
      window.location.replace(public_urls.login);
    }
    if (!globals.esUsuarioVentas()) {
      window.location.replace(public_urls.modo);
    }
  }, [userLogedIn]);
  return (
    <Layout style={{ padding: 0 }} className="layout">
      <HeaderSol
        tipoCuenta="Deposito"
        displaymodechange={(__c) => {
          props?.displaymodechange?.(__c);
        }}
      />

      <MenuV2 />
      <Content
        style={{
          margin: "40px 100px",
          padding: 24,
          borderRadius: "15px",
          minHeight: "100hv",
        }}
      >
        {alerta != "" ? (
          <>
            <Alert key={alerta} message={alerta} type="error" showIcon />
          </>
        ) : (
          <></>
        )}
        {props.children}
      </Content>
    </Layout>
  );
}
