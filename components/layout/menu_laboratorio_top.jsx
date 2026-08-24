import { get, public_urls } from "@/src/urls";
import { useEffect, useState } from "react";
import { Menu, Modal } from "antd";
import Link from "next/link";
import SearchOutlined from "@ant-design/icons/SearchOutlined";

import BuscarVentaV3 from "../forms/ventas/BuscarVentasV3";
import {
  InfoCircleOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import SucursalLabel from "../sucursal_label";
import globals from "@/src/globals";

const MenuLaboratorioTop = (props) => {
  const [usuario, setUsuario] = useState("");
  const [current, setCurrent] = useState("mail");
  const [buscarVentaOpen, setBuscarVentaOpen] = useState(false);

  const items = [
    {
      label: (
        <Link href={public_urls.lista_operaciones_total}>Operaciones</Link>
      ),
      key: "10",
    },
    /*
        {
          label: (<Link href={public_urls.lista_operaciones_laboratorio}>Lista de Operaciones en Laboratorio</Link>),
          key: '16',
        },
        {
          label: (<Link href={public_urls.lista_operaciones_pedidos}>Lista de Pedidos</Link>),
          key: '11',
        },
        {
          label: (<Link href={public_urls.lista_operaciones_calibrado}>Lista de Operaciones en Calibrado</Link>),
          key: '12',
        },
        {
          label: (<Link href={public_urls.lista_operaciones_terminadas_taller}>Lista de Operaciones Terminadas</Link>),
          key: '13',
        },
*/
    {
      label: <Link href={public_urls.lista_stock_taller}>Stock</Link>,
      key: "14",
    },
    {
      label: (
        <Link href={public_urls.laboratorio_lista_facturas}>Facturas</Link>
      ),
      key: "15",
    },
    {
      label: <>Buscar Venta</>,
      icon: <SearchOutlined />,
      key: "buscar_venta",
    },

    {
      label: (
        <>
          <span style={{ color: "#B35100" }}>
            <UserOutlined />
          </span>{" "}
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

  const _style_ = {
    background: "rgba(255, 255, 255, 1)",
    backgroundColor: "rgba(255, 230, 121, 1) !important",

    /*backgroundColor:"#FFEF85" */
  };

  useEffect(() => {
    setUsuario(globals.obtenerUserName());
  }, []);

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    if (e.key === "buscar_venta") {
      setBuscarVentaOpen(true);
    }
    if(e.key === "salir"){
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
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <Modal
        destroyOnClose
        width={"100%"}
        open={buscarVentaOpen}
        onCancel={() => setBuscarVentaOpen(false)}
        title="Buscar Venta"
        footer={null}
      >
        <BuscarVentaV3 />
      </Modal>
    </>
  );
};

export default MenuLaboratorioTop;
