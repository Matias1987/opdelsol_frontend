import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { Button, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import globals from "@/src/globals";
import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";

import SideMenuAdminMin from "./SideMenuAdminMin";
import { useUserStatus } from "../providers/UserContext";
const { Header } = Layout;

export default function LayoutAdminMin({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { userLogedIn } = useUserStatus();
  const { Content } = Layout;
  /*const validate_user = () => {
    const _token = getItem("token", "session");

    if (_token === typeof "undefined") {
      alert("Debe Iniciar Sesion");
      window.location.replace(public_urls.login);
    }

    var _t = setTimeout(() => {
      if (_t !== typeof "undefined") {
        clearTimeout(_t);
      }
      fetch(get.check_login + _token)
        .then((response) => response.json())
        .then((response) => {
          if (response.data.logged == "0") {
            alert("Debe Iniciar Sesion");
            window.location.replace(public_urls.login);
          } else {
            validate_user();
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          //alert("Debe Iniciar Sesion");
          //window.location.replace(public_urls.login);
        });
    }, 10000);
  };*/
  useEffect(() => {
    if (!userLogedIn) {
      window.location.replace(public_urls.login);
    }
    if (!(globals.esUsuarioAdmin() || globals.esUsuarioAdminMin())) {
      window.location.replace(public_urls.modo);
    }
  }, [userLogedIn]);
  /*
  const menu = (_) => {
    switch (idf_optica) {
      case 1:
        return <MenuAdminTop />;
      case 2:
        return <MenuAdminSolParana />;
      case 3:
        return <MenuAdminCOExp />;
    }
  };
*/
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideMenuAdminMin collapsed={collapsed} />
      <Layout
        style={{
          minHeight: 1200,
          marginLeft: collapsed ? 80 : 200,
          transition: "all 0.2s",
        }}
      >
        <Header
          style={{
            padding: "0 16px",
            position: "sticky",
            top: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // pushes left/right apart
            background: "#001529",
            height: "51px",
          }}
        >
          <Button
            style={{ color: "white" }}
            type="link"
            size="large"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/*<Logo />
            <span style={{color:"white"}} className="main-logo">PulseGrid</span>*/}
          </div>
        </Header>

        <Content
          style={{ margin: "24px 16px", padding: 24, background: "#fff" }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
