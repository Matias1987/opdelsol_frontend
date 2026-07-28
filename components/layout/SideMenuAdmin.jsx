import React from "react";
import { Menu } from "antd";
import DashboardOutlined from "@ant-design/icons/DashboardOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import SettingOutlined from "@ant-design/icons/SettingOutlined";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import DollarOutlined from "@ant-design/icons/DollarOutlined";
import CreditCardTwoTone from "@ant-design/icons/CreditCardTwoTone";
import ArrowDownOutlined from "@ant-design/icons/ArrowDownOutlined";
import OrderedListOutlined from "@ant-design/icons/OrderedListOutlined";
import BoxPlotOutlined from "@ant-design/icons/BoxPlotOutlined";
import { useRouter } from "next/router";
import { get } from "@/src/urls";
import useStorage from "@/useStorage";
import Sider from "antd/es/layout/Sider";
import SubMenu from "antd/es/menu/SubMenu";

const SideMenuAdmin = ({ collapsed }) => {
  const router = useRouter();
  const { pathname } = router;

  const logout = () => {
    const { getItem } = useStorage();
    const _token = getItem("token", "session");

    fetch(get.logout + _token)
      .then((response) => response.json())
      .then((response) => {
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
        defaultOpenKeys={["sub1", "sub2"]} // keep submenus open if you want
      >
        <Menu.Item
          key="/v1/admin/"
          icon={<DashboardOutlined />}
          onClick={() => router.push("/v1/admin/")}
        >
          Inicio
        </Menu.Item>
        <Menu.Item
          key="/v1/admin/custm/dsolch/panel_admin_caja/"
          icon={<DollarOutlined />}
          onClick={() =>
            router.push("/v1/admin/custm/dsolch/panel_admin_caja/")
          }
        >
          Cajas
        </Menu.Item>
        {
          <Menu.Item
            key="/v1/admin/lista_precios/"
            icon={<DollarOutlined />}
            onClick={() => router.push("/v1/admin/lista_precios/")}
          >
            Lista de Precios
          </Menu.Item>
        }
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
        <Menu.Item
          key="/v1/admin/panel_proveedores/"
          icon={<UserOutlined />}
          onClick={() => router.push("/v1/admin/panel_proveedores/")}
        >
          Proveedores
        </Menu.Item>
        <Menu.Item
          key="/v1/admin/stock_sucursal_admin/"
          icon={<BoxPlotOutlined />}
          onClick={() => router.push("/v1/admin/stock_sucursal_admin/")}
        >
          Stock
        </Menu.Item>
        <SubMenu
          key="submenu_clientes"
          icon={<UserOutlined />}
          title="Clientes"
        >
          <Menu.Item
            key="/v1/admin/clientes/"
            icon={<OrderedListOutlined />}
            onClick={() => router.push("/v1/admin/clientes/")}
          >
            Listado
          </Menu.Item>
          <Menu.Item
            key="/v1/admin/descuentos/"
            icon={<ArrowDownOutlined />}
            onClick={() => router.push("/v1/admin/descuentos/")}
          >
            Descuentos
          </Menu.Item>
        </SubMenu>

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

export default SideMenuAdmin;
