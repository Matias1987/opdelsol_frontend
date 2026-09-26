import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";

import { useEffect, useState } from "react";
import globals from "@/src/globals";
import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";
import { Button, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import dynamic from "next/dynamic";
import { useUserStatus } from "../providers/UserContext";

const SideMenuAdmin = dynamic(() => import("./SideMenuAdmin"), {
  ssr: false,
  loading: () => <div style={{ height: "30px" }}></div>,
});

const SideMenuAdminMin = dynamic(() => import("./SideMenuAdminMin"), {
  ssr: false,
  loading: () => <div style={{ height: "30px" }}></div>,
});

export default function LayoutAdmin({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [esAdminMin, setEsAdminMin] = useState(false);
  const { userLogedIn } = useUserStatus();

  useEffect(() => {
    if (!userLogedIn) {
      window.location.replace(public_urls.login);
    }

    if (!(globals.esUsuarioAdmin() || globals.esUsuarioAdminMin())) {
      window.location.replace(public_urls.modo);
    }
    if (globals.esUsuarioAdminMin()) {
      setEsAdminMin(true);
    }
  }, [userLogedIn]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {esAdminMin ? (
        <SideMenuAdminMin collapsed={collapsed} />
      ) : (
        <SideMenuAdmin collapsed={collapsed} />
      )}
      <Layout
        style={{
          minHeight: "100vh",
          marginLeft: collapsed ? 80 : 200,
          transition: "all 0.2s",
        }}
      >
        <div
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
        </div>

        <Content
          style={{ margin: "24px 16px", padding: 24, background: "#fff" }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
