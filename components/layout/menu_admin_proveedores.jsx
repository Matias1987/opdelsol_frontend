import { Menu } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";
import { get, public_urls } from "@/src/urls";
import { useNetworkStatus } from "../providers/NetworkContext";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import globals from "@/src/globals";
import SucursalLabel from "../sucursal_label";

export default function MenuAdminProveedores() {
  const [usuario, setUsuario] = useState("");
  const [current, setCurrent] = useState("12");
  const { isOnline } = useNetworkStatus();

  
const items = [
  {
    label: <Link href={public_urls.dashboard_adm_prov}>Inicio</Link>,
    key: "12",
  },

  {
    label: <Link href={public_urls.adm_prov_facturas}>Facturas y Remitos</Link>,
    key: "13",
  },
  {
    label: <>Contactos</>,
    key: "14",
    children: [
      {
        label: <Link href={public_urls.adm_prov_lista_prov}>Proveedores</Link>,
        key: "170",
      },

      {
        label: (
          <Link href={public_urls.adm_prov_lista_prov}>Obras Sociales</Link>
        ),
        key: "171",
      },
      {
        label: <Link href={public_urls.adm_prov_lista_prov}>Publicidad</Link>,
        key: "172",
      },
      {
        label: <Link href={public_urls.adm_prov_lista_prov}>Sueldos</Link>,
        key: "173",
      },
    ],
  },
  {
    label: (
      <>
        <span style={{ color: "#B35100" }}>
          <UserOutlined />
        </span>
        {usuario} <span style={{ fontWeight: "400" }}>|</span>
        <SucursalLabel color="#fdfdfd" />
      </>
    ),
    key: "user",
    children: [
      {
        label: "Salir",
        key: "salir",
        icon: <LogoutOutlined />,
      },
    ],
  },
];

  useEffect(() => {
    setUsuario(globals.obtenerUserName());
    //alert("gg")
  }, []);

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    if (e.key === "salir") {
      const _token = globals.getToken();

      fetch(get.logout + _token)
        .then((response) => response.json())
        .then((response) => {
          window.location.replace(public_urls.login);
        })
        .catch((err) => {
          console.log("error");
        });

      return;
    }
  };
  return (
    <Menu
      style={{
        backgroundColor: "#CCCCE4",
        pointerEvents: !isOnline ? "none" : "auto",
        opacity: !isOnline ? 0.6 : 1 /*"lightblue"*/,
      }}
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}
