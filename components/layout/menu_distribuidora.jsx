import BoxPlotOutlined from "@ant-design/icons/BoxPlotOutlined";
import HomeFilled from "@ant-design/icons/HomeFilled";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import StarOutlined from "@ant-design/icons/StarOutlined";
import UnorderedListOutlined from "@ant-design/icons/UnorderedListOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";

import { Badge, Button, Flex, Menu } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";
import { get, public_urls } from "@/src/urls";
import globals from "@/src/globals";
import { getItem } from "localforage";
import SucursalLabel from "../sucursal_label";
import { usePathname } from "next/navigation";

export default function MenuDistribuidora({ onNuevaVentaClick,showBadge }) {
  const [current, setCurrent] = useState("9");
  const pathname = usePathname(); // Gets the current URL path
  const items = [
    {
      label: (
        <Link href={public_urls.dashboard_distribuidora}>
          <HomeFilled /> Inicio
        </Link>
      ),
      key: "/v1/trabajos/",
    },

    {
      label: (
        <Link href={public_urls.lista_operaciones_distribuidora}>
          Lista de Operaciones
        </Link>
      ),
      key: "/v1/trabajos/listado",
      icon: <UnorderedListOutlined />,
    },
    {
      label: (
        <Link href={public_urls.lista_clientes_distribuidora}>Clientes</Link>
      ),
      key: "/v1/distribuidora/clientes",
      icon: <UserOutlined />,
    },
    {
      label: <Link href={public_urls.productos_distribuidora}>Productos</Link>,
      key: "/v1/distribuidora/productos",
      icon: <BoxPlotOutlined />,
    },

    {
      label: (
        <Badge dot count={showBadge ? 1 : 0} size="default">
          <Button onClick={onNuevaVentaClick}>
            <StarOutlined /> Nueva Operaci&oacute;n
          </Button>
        </Badge>
      ),
      key: "10",
    },
  ];
  const onClick = (e) => {
    if (e.key != "10") {
      setCurrent(e.key);
    }
  };

  useEffect(() => {
    setCurrent(pathname);
  }, []);
  return (
    <Flex
      style={{ width: "100%", padding: "0 16px" }}
      justify="space-between"
      align="center"
    >
      <div
        style={{
          marginRight: "24px",
          display: "flex",
          alignItems: "center",
          color: "white",
        }}
      >
        Universal Lens
      </div>
      <Menu
        style={{ width: "700px" }}
        styles={{
          root: { padding: "2px" }, // Custom padding for the main wrapper
        }}
        className="custom-menu-distribuidora"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />

      <div>
        <SucursalLabel />
        <Button
          size="small"
          type="text"
          style={{ color: "white", paddingTop: "8px" }}
          onClick={() => {
            const _token = globals.getToken();

            fetch(get.logout + _token)
              .then((response) => response.json())
              .then((response) => {
                
                window.location.replace(public_urls.login);
              })
              .catch((err) => {
                console.log("error");
              });
          }}
        >
          <LogoutOutlined />
          Salir
        </Button>
      </div>
    </Flex>
  );
}
