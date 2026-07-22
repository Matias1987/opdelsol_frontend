import {
  BoxPlotOutlined,
  HomeFilled,
  LogoutOutlined,
  StarOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Flex, Menu } from "antd";
import { useState } from "react";
import Link from "next/link";
import { get, public_urls } from "@/src/urls";
import globals from "@/src/globals";
import { getItem } from "localforage";
import SucursalLabel from "../sucursal_label";

const items = [
  {
    label: (
      <Link href={public_urls.dashboard_distribuidora}>
        <HomeFilled /> Inicio
      </Link>
    ),
    key: "9",
  },
  {
    label: (
      <Link href={public_urls.nueva_venta_distribuidora}>
        Nueva Operaci&oacute;n
      </Link>
    ),
    key: "10",
    icon: <StarOutlined />,
  },
  {
    label: (
      <Link href={public_urls.lista_operaciones_distribuidora}>
        Lista de Operaciones
      </Link>
    ),
    key: "11",
    icon: <UnorderedListOutlined />,
  },
  {
    label: (
      <Link href={public_urls.lista_clientes_distribuidora}>Clientes</Link>
    ),
    key: "12",
    icon: <UserOutlined />,
  },
  {
    label: (
      <Link href={public_urls.productos_distribuidora}>Productos</Link>
    ),
    key: "13",
    icon: <BoxPlotOutlined />,
  },
];
export default function MenuDistribuidora() {
  const [current, setCurrent] = useState("9");
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Flex
      style={{ width: "100%", padding: "0 16px" }}
      justify="space-between"
      align="center"
    >
      <div
        style={{ marginRight: "24px", display: "flex", alignItems: "center", color:"white" }}
      >
        Universal Lens
        
      </div>
      <Menu
        style={{ width: "650px" }}
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
            const _token = getItem("token", "session");

            fetch(get.logout + _token)
              .then((response) => response.json())
              .then((response) => {
                registrar_evento(
                  "USER_LOGOUT",
                  "Cierre de sesion",
                  globals.obtenerUID(),
                );
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
