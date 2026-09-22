import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import { Layout } from "antd";
import { useEffect } from "react";
import globals from "@/src/globals";
import { idf_optica } from "@/src/config";
import dynamic from "next/dynamic";
import { useUserStatus } from "../providers/UserContext";

const MenuLaboratorioTop = dynamic(() => import("./menu_laboratorio_top"), {
  ssr: false,
  loading: () => <div style={{ height: "30px" }}>...</div>,
});

const MenuTallerCOExp = dynamic(() => import("./opts/coexp/menu_taller"), {
  ssr: false,
  loading: () => <div style={{ height: "30px" }}>...</div>,
});

const HeaderSol = dynamic(() => import("./header"), {
  ssr: false,
  loading: () => <div style={{ height: "30px" }}>...</div>,
});

export default function LayoutLaboratorio(props) {
  const { Content } = Layout;
  const { userLogedIn } = useUserStatus();

  useEffect(() => {
    if (!userLogedIn) {
      window.location.replace(public_urls.login);
    }
    if (!globals.esUsuarioLaboratorio()) {
      window.location.replace(public_urls.modo);
    }
  }, [userLogedIn]);
  return (
    <Layout className="layout">
      {+idf_optica != 3 ? <MenuLaboratorioTop /> : <MenuTallerCOExp />}
      <Content style={{ margin: "20px 10px", padding: 10, minHeight: 280 }}>
        {props.children}
      </Content>
    </Layout>
  );
}
