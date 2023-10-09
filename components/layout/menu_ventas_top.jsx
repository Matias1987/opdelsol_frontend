import { MenuOutlined, PlusOutlined, SettingOutlined, StarOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import Link from "next/link"
import { public_urls } from "@/src/urls";
import BuscarVenta from "../forms/ventas/BuscarVenta";

const items = [
 
  {
    label: 'Menú Ventas',
    key: 'SubMenu',
    icon: <MenuOutlined />,
    children: [
      {
        key: '1',
        label: (<Menu.Item><Link href={public_urls.venta_directa}>Venta Directa  </Link></Menu.Item>),
      },
      {
        key: '2',
        label: (<Menu.Item><Link href={public_urls.venta_recetastock}>Venta Receta Stock</Link></Menu.Item>),
      },
      {
        key: '3',
        label: (<Menu.Item><Link href={public_urls.venta_monoflab}>Venta Monofocales Laboratorio</Link></Menu.Item>),
      },
      {
        key: '4',
        label: (<Menu.Item><Link href={public_urls.venta_multilab}>Venta Multifocales Laboratorio</Link></Menu.Item>),
      },
      {
        key: '5',
        label: (<Menu.Item><Link href={public_urls.venta_lcstock}>Venta L.C. Stock</Link></Menu.Item>),
      },
      {
        key: '6',
        label: (<Menu.Item><Link href={public_urls.venta_lclab}>Venta L.C. Laboratorio</Link></Menu.Item>),
      },
      
    ],
  },
  {
    label: (<BuscarVenta />),
    key: '404',
  },
  {
    label: (<Link href={public_urls.lista_clientes_ventas}>Clientes</Link>),
    key: '11',
    
  },
];
export default function MenuVentasTop(){
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu  style={{backgroundColor:"#6CA12B", padding:'0', lineHeight:'auto'}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};