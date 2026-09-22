import { get, public_urls } from "@/src/urls";
import { Button, Layout } from "antd";
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

  useEffect(() => {
    if (!userLogedIn) {
      window.location.replace(public_urls.login);
    }
    if (!(globals.esUsuarioAdmin() || globals.esUsuarioAdminMin())) {
      window.location.replace(public_urls.modo);
    }
  }, [userLogedIn]);

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
