import { Layout } from "antd";
import { useEffect, useState } from "react";
import { public_urls } from "@/src/urls";
import globals from "@/src/globals";
import { Content } from "antd/es/layout/layout";
import dynamic from "next/dynamic";
import { useUserStatus } from "../providers/UserContext";

const TestMenu = dynamic(() => import("./menu_test"), {
  ssr: false,
  loading: () => <div style={{ height: "30px" }}></div>,
});
const MenuV2 = dynamic(() => import("./menu_v2"), {
  ssr: false,
  loading: () => <div style={{ height: "30px" }}></div>,
});

export default function MyLayout(props) {
  const [uDepositoMin, setUDepositoMin] = useState(false);
  const [uDeposito, setUDeposito] = useState(false);
  const { userLogedIn } = useUserStatus();
  
  useEffect(() => {
    if (!userLogedIn) {
      window.location.replace(public_urls.login);
    }
    setUDepositoMin(globals.esUsuarioDepositoMin());
    setUDeposito(globals.esUsuarioDeposito());
  }, [userLogedIn]);

  return (
    <Layout className="layout">
      {uDeposito ? (
        <>
          <TestMenu />
        </>
      ) : uDepositoMin ? (
        <>
          <MenuV2 />
        </>
      ) : (
        <></>
      )}

      <Content style={{ margin: "24px 16px", padding: 24, minHeight: "100hv" }}>
        {props.children}
      </Content>
    </Layout>
  );
}
