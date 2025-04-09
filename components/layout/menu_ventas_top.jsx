import { MenuOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import Link from "next/link"
import { public_urls } from "@/src/urls";
import BuscarVenta from "../forms/ventas/BuscarVenta";
import ListaPrecios from "../informes/lista_precios/lista_precios";

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
  {
    label: (<ListaPrecios />),
    key: '601',
  }
];
export default function MenuVentasTop(){
  const [current, setCurrent] = useState('mail');
  const _style_ = {
    background: "rgb(34,193,195)",
    background: "linear-gradient(81deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
    color: "black",
    boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"
    //backgroundColor:"#6CA12B",
  }
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu  style={_style_} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};