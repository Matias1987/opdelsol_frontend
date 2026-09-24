import { public_urls } from "@/src/urls";
import { Layout } from "antd";
import { useEffect } from "react";
import { useUserStatus } from "../providers/UserContext";
export default function LayoutSingleLogedIn(props) {
  const { Content } = Layout;

  const { userLogedIn } = useUserStatus();

  useEffect(() => {
    if (!userLogedIn) {
      window.location.replace(public_urls.login);
    }
  }, [userLogedIn]);

  return (
    <Layout className="layout">
      <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
        {props.children}
      </Content>
    </Layout>
  );
}
