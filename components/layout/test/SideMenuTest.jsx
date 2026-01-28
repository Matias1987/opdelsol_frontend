import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  LogoutOutlined,
  TeamOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideMenu = ({ collapsed }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ position: "fixed", height: "100vh", left: 0, top: 0 }}
    >
      <div className="logo" style={{ color: "#fff", padding: "16px", textAlign: "center" }}>
        {collapsed ? "DB" : "Dashboard"}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}   // highlight active route
        defaultOpenKeys={["sub1", "sub2"]} // keep submenus open if you want
      >
        <Menu.Item
          key="/v1/admin/overview"
          icon={<DashboardOutlined />}
          onClick={() => router.push("/v1/admin/overview")}
        >
          Overview
        </Menu.Item>

        <SubMenu key="sub1" icon={<UserOutlined />} title="Users">
          <Menu.Item
            key="/v1/admin/users"
            onClick={() => router.push("/v1/admin/users")}
          >
            All Users
          </Menu.Item>
          <Menu.Item
            key="/v1/admin/teams"
            icon={<TeamOutlined />}
            onClick={() => router.push("/v1/admin/teams")}
          >
            Teams
          </Menu.Item>
          <Menu.Item
            key="/v1/admin/roles"
            onClick={() => router.push("/v1/admin/roles")}
          >
            Roles & Permissions
          </Menu.Item>
        </SubMenu>

        <SubMenu key="sub2" icon={<FileTextOutlined />} title="Reports">
          <Menu.Item
            key="/v1/admin/ventas"
            icon={<BarChartOutlined />}
            onClick={() => router.push("/v1/admin/ventas")}
          >
            Sales Reports
          </Menu.Item>
          <Menu.Item
            key="/v1/admin/prov"
            onClick={() => router.push("/v1/admin/prov")}
          >
            Inventory Reports
          </Menu.Item>
          <Menu.Item
            key="/v1/admin/logs"
            onClick={() => router.push("/v1/admin/logs")}
          >
            Activity Logs
          </Menu.Item>
        </SubMenu>

        <Menu.Item
          key="/v1/admin/settings"
          icon={<SettingOutlined />}
          onClick={() => router.push("/v1/admin/settings")}
        >
          Settings
        </Menu.Item>
        <Menu.Item
          key="/logout"
          icon={<LogoutOutlined />}
          onClick={() => router.push("/logout")}
        >
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideMenu;
