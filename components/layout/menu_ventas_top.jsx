import { FloatButton, Menu, Modal } from "antd";
import {
  DollarOutlined,
  MenuOutlined,
  SearchOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useState, useEffect } from "react";
import Link from "next/link";
import { public_urls } from "@/src/urls";
import globals from "@/src/globals";
import ListaPreciosV3 from "../lista_precios/listaPreciosV3";
import { lista_precios_visible } from "@/src/config";
import BuscarVentaV3 from "../forms/ventas/BuscarVentasV3";

export default function MenuVentasTop(props) {
  const [current, setCurrent] = useState(null);
  const [itemsMenu, setItemsMenu] = useState([]);
  const [lpOpen, setLPOpen] = useState(false);
  const [buscarVentaOpen, setBuscarVentaOpen] = useState(false);
 

  const menu_ventas = {
    label: "Ventas",
    key: "SubMenuVentas",
    icon: <MenuOutlined />,
    disabled: !globals.esUsuarioVentas(),
    children: [
      {
        key: "1",
        label: (
          <Menu.Item>
            <Link href={public_urls.venta_directa}>Venta Directa </Link>
          </Menu.Item>
        ),
      },
      {
        key: "2",
        label: (
          <Menu.Item>
            <Link href={public_urls.venta_recetastock}>Venta Receta Stock</Link>
          </Menu.Item>
        ),
      },
      {
        key: "3",
        label: (
          <Menu.Item>
            <Link href={public_urls.venta_monoflab}>
              Venta Monofocales Laboratorio
            </Link>
          </Menu.Item>
        ),
      },
      {
        key: "4",
        label: (
          <Menu.Item>
            <Link href={public_urls.venta_multilab}>
              Venta Multifocales Laboratorio
            </Link>
          </Menu.Item>
        ),
      },
      {
        key: "5",
        label: (
          <Menu.Item>
            <Link href={public_urls.venta_lcstock}>Venta L.C. Stock</Link>
          </Menu.Item>
        ),
      },
      {
        key: "6",
        label: (
          <Menu.Item>
            <Link href={public_urls.venta_lclab}>Venta L.C. Laboratorio</Link>
          </Menu.Item>
        ),
      },
    ],
  };

 
  useEffect(() => {
    const items = []; 

    if (globals.esUsuarioVentas()) {
      items.push(menu_ventas);
    }



    /*if (globals.esUsuarioCaja1() || globals.esUsuarioVentas()) {
      items.push(
        {
          label: (
            <Link
              href={
                globals.esUsuarioCaja1()
                  ? public_urls.lista_clientes_caja
                  : public_urls.lista_clientes_ventas
              }
            >
              Clientes
            </Link>
          ),
          key: "11",
          icon: <UserOutlined />,
        },
        {
          //label: (<BuscarVentaV2 />),
          label: <>Buscar Venta</>,
          icon: <SearchOutlined />,
          key: "buscar_venta",
        }
      );
    }*/
    if (lista_precios_visible != 0) {
      items.push({
        label: <>Lista de Precios</>,
        icon: <DollarOutlined />,
        key: "lista_precios",
      });
    }

    setItemsMenu(items);
  }, []);

  const onClick = (e) => {
    //console.log('click ', e);
    if (typeof e.key === "undefined") {
      return;
    }
    setCurrent(e.key);

    switch (e.key) {
      case "lista_precios":
        setLPOpen(true);
        break;
      case "buscar_venta":
        setBuscarVentaOpen(true);
        break;
    }
  };

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode={typeof props.mode === "undefined" ? "horizontal" : props.mode}
        items={itemsMenu}
        
      />
      <Modal
        width={"100%"}
        open={lpOpen}
        onCancel={() => setLPOpen(false)}
       
        footer={null}
      >
        <ListaPreciosV3 />
      </Modal>
      <Modal
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
}
