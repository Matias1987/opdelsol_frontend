import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  DollarOutlined,
  CreditCardTwoTone,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { get } from "@/src/urls";
import useStorage from "@/useStorage";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideMenuAdminMin = ({ collapsed }) => {
  const router = useRouter();
  const { pathname } = router;

  const logout = () => {
    const { getItem } = useStorage();
    const _token = getItem("token", "session");

    fetch(get.logout + _token)
      .then((response) => response.json())
      .then((response) => {
        //registrar_evento("USER_LOGOUT", "Cierre de sesion",globals.obtenerUID() )
        //window.location.replace(public_urls.login);
        router.push("/v1/usuario/login/login");
      })
      .catch((err) => {
        console.log("error");
      });
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ position: "fixed", height: "100vh", left: 0, top: 0 }}
    >
      <div
        className="logo"
        style={{ color: "#fff", padding: "16px", textAlign: "center" }}
      >
        {collapsed ? "DB" : "Dashboard"}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]} // highlight active route
        defaultOpenKeys={["sub2"]} // keep submenus open if you want
      >
        <Menu.Item
          key="/v1/admin/"
          icon={<DashboardOutlined />}
          onClick={() => router.push("/v1/admin/")}
        >
          Overview
        </Menu.Item>
        <Menu.Item
          key="/v1/admin/lista_cajas/"
          icon={<DollarOutlined />}
          onClick={() =>
            router.push("/v1/admin/lista_cajas/")
          }
        >
          Cajas
        </Menu.Item>
        <Menu.Item
          key="/v1/admin/ventas/"
          icon={<DollarOutlined />}
          onClick={() => router.push("/v1/admin/ventas/")}
        >
          Ventas
        </Menu.Item>
        <Menu.Item
          key="/v1/admin/ict/"
          icon={<CreditCardTwoTone />}
          onClick={() => router.push("/v1/admin/ict/")}
        >
          Tarjetas
        </Menu.Item>
        <SubMenu key="sub2" icon={<SettingOutlined />} title="Tablas">
          <Menu.Item
            key="/v1/admin/lista_sucursales"
            onClick={() => router.push("/v1/admin/lista_sucursales")}
          >
            Sucursales
          </Menu.Item>
          <Menu.Item
            key="/v1/admin/lista_medicos"
            onClick={() => router.push("/v1/admin/lista_medicos")}
          >
            Medicos
          </Menu.Item>
          <Menu.Item
            key="/v1/admin/lista_bancos"
            onClick={() => router.push("/v1/admin/lista_bancos")}
          >
            Bancos
          </Menu.Item>
          <Menu.Item
            key="/v1/admin/lista_tarjetas"
            onClick={() => router.push("/v1/admin/lista_tarjetas")}
          >
            Tarjetas
          </Menu.Item>
          <Menu.Item
            key="/v1/admin/lista_mutuales"
            onClick={() => router.push("/v1/admin/lista_mutuales")}
          >
            Mutuales
          </Menu.Item>
          <Menu.Item
            key="/v1/admin/lista_conceptos_gastos"
            onClick={() => router.push("/v1/admin/lista_conceptos_gastos")}
          >
            Conceptos Gastos
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="/logout"
          icon={<LogoutOutlined />}
          onClick={() => logout()}
        >
          Salir
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideMenuAdminMin;
