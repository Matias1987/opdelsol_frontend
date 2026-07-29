import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";

import { useEffect, useState } from "react";
import globals from "@/src/globals";
import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";
import { Button, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import dynamic from "next/dynamic";

const SideMenuAdmin = dynamic(() => import("./SideMenuAdmin"), {
  ssr: false,
  loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
});

const SideMenuAdminMin = dynamic(() => import("./SideMenuAdminMin"), {
  ssr: false,
  loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
});

export default function LayoutAdmin({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { getItem } = useStorage();
  const [esAdminMin, setEsAdminMin] = useState(false);
  const validate_user = () => {
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
        });
    }, 10000);
  };
  useEffect(() => {
    if (!(globals.esUsuarioAdmin() || globals.esUsuarioAdminMin())) {
      window.location.replace(public_urls.modo);
    }
    if (globals.esUsuarioAdminMin()) {
      setEsAdminMin(true);
    }
    validate_user();
  }, []);

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
