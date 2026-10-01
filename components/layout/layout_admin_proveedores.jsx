import { public_urls } from "@/src/urls";
import { Layout } from "antd";
import { useEffect } from "react";
import globals from "@/src/globals";
//import HeaderSol from "./header";
import { useUserStatus } from "../providers/UserContext";
import dynamic from "next/dynamic";
  const MenuAdminProveedores = dynamic(
    () => import("./menu_admin_proveedores"),
    {
      ssr: false,
      loading: () => <div style={{ width: "100px" }}></div>,
    },
  );
export default function layout_admin_proveedores({ children }) {
  const { Content } = Layout;
  const { userLogedIn } = useUserStatus();



  useEffect(() => {
    if (!userLogedIn) {
      window.location.replace(public_urls.login);
    }

    if (!globals.esUsuarioAdminProv()) {
      window.location.replace(public_urls.modo);
    }
  }, [userLogedIn]);
  return (
    <Layout style={{ minHeight: 1200 }}>
      <MenuAdminProveedores />
      <Content style={{ margin: "40px 100px", padding: 24 }}>
        {children}
      </Content>
    </Layout>
  );
}
