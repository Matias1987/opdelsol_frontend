import globals from "@/src/globals";
import { public_urls } from "@/src/urls";
import { AppstoreOutlined, MenuOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import Link from "next/link";

const MenuVentasMobile = () => {
  const [current, setCurrent] = useState("");
  const menu_ventas = {
    label: "Ventas",
    key: "SubMenuVentas",
    children: [
      {
        key: "1",
        label: <><Link href={public_urls.venta_directa}>Venta Directa </Link></>,
      },
      {
        key: "2",
        label: <><Link href={public_urls.venta_recetastock}>Venta Receta Stock</Link></>,
      },
      {
        key: "3",
        label: <><Link href={public_urls.venta_monoflab}>
              Venta Monofocales Laboratorio
            </Link></>,
      },
      {
        key: "4",
        label: <><Link href={public_urls.venta_multilab}>
              Venta Multifocales Laboratorio
            </Link></>,
      },
      {
        key: "5",
        label: <><Link href={public_urls.venta_lcstock}>Venta L.C. Stock</Link></>,
      },
      {
        key: "6",
        label: <><Link href={public_urls.venta_lclab}>Venta L.C. Laboratorio</Link></>,
      },
    ],
  };
  const onClick = (k) => {
    setCurrent(k);
  };
  return (
    <Menu
      mode="inline"
      items={[menu_ventas]}
      onClick={onClick}
      selectedKeys={current}
      style={{ backgroundColor: '#f0f2f5 !important' }} 
    />
  );
};

export default MenuVentasMobile;
