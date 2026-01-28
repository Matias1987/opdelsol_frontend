import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { Button, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import globals from "@/src/globals";
import HeaderSol from "./header";
import MenuAdminTop from "./menu_admin";
import { idf_optica } from "@/src/config";
import MenuAdminSolParana from "./opts/sol_parana/menu_admin";
import MenuAdminCOExp from "./opts/coexp/menu_admin";
import SideMenu from "./test/SideMenuTest";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import SideMenuAdmin from "./SideMenuAdmin";
import Logo from "./logo/logo";
const { Header, Content } = Layout;

export default function LayoutAdmin({ children }) {
    const [collapsed, setCollapsed] = useState(false);
  const { Content } = Layout;
  const { getItem } = useStorage();
  const validate_user = () => {
    const _token = getItem("token", "session");

    if (_token === typeof "undefined") {
      alert("Debe Iniciar Sesion");
      window.location.replace(public_urls.login);
    }

    var _t = setTimeout(() => {
      if (_t !== typeof "undefined") {
        //console.log("clear timeout")
        clearTimeout(_t);
      }
      fetch(get.check_login + _token)
        .then((response) => response.json())
        .then((response) => {
          if (response.data.logged == "0") {
            alert("Debe Iniciar Sesion");
            window.location.replace(public_urls.login);
          } else {
            //console.log("user validated")
            validate_user();
          }
        });
    }, 2000);
  };
  useEffect(() => {
    //console.log("run user effect")

    if (!globals.esUsuarioAdmin()) {
      window.location.replace(public_urls.modo);
    }

    validate_user();
  }, []);
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
      <SideMenuAdmin collapsed={collapsed} />
      <Layout style={{ minHeight: 1200, marginLeft: collapsed ? 80 : 200, transition: "all 0.2s" }}>
       <Header  style={{
            padding: "0 16px",
            position: "sticky",
            top: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // pushes left/right apart
            background: "#001529",  
            height: "52px",
          }}>
          <Button style={{color:"white"}} type="link" size="large" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Logo />
            <span style={{color:"white"}} className="main-logo">PulseGrid</span>
          </div>
     
        </Header>
       

        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
