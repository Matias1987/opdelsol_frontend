import {HomeFilled, StarOutlined, DollarOutlined, MenuOutlined, BoxPlotTwoTone, BoxPlotFilled } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import Link from "next/link"
import { public_urls } from "@/src/urls";
import BuscarVenta from "../forms/ventas/BuscarVenta";

const items = [
  
 {
  label: <Link href={public_urls.dashboard_admin}>Inicio</Link>,
  key: '12',
  icon:<HomeFilled />,
 },
  {
    label: (<Link href={public_urls.totales_venta_vendedores}>Totales Venta</Link>),
    key: '10',
    icon: <StarOutlined />,
  },
  {
    label: (<Link href={public_urls.ventas_medicos}>Ventas M&eacute;dicos</Link>),
    key: '11',
    icon: <StarOutlined />,
  },
  {
    label: (<Link href={public_urls.lista_ventas_dia_vendedor}>Ventas D&iacute;a</Link>),
    key: '14',
    icon: <StarOutlined />,
  },
  
  {
    icon: <BoxPlotFilled />,
    label: (<Link href={public_urls.stock_admin}>Stock</Link>),
    key: '16',
  },
  {
    label: (<Link href={public_urls.eventos_admin}>Eventos</Link>),
    key: '15',
  },
  /*{
    label: (<Link href={public_urls.listausuarios}>Usuarios</Link>),
    key: '17',
  },*/
  {
    label: (<BuscarVenta textButton="Ventas" />),
    key: '404',
  },
  {
    label: 'Tablas Auxiliares',
    key: 'SubMenu',
    icon: <MenuOutlined />,
    children: [
      {
        key: '100',
        label: (<Menu.Item><Link href={public_urls.admin_sucursales}>Sucursales</Link></Menu.Item>),
      },
      {
        key: '200',
        label: (<Menu.Item><Link href={public_urls.admin_medicos}>Medicos</Link></Menu.Item>),
      },
      {
        key: '300',
        label: (<Menu.Item><Link href={public_urls.admin_bancos}>Bancos</Link></Menu.Item>),
      },
      {
        key: '400',
        label: (<Menu.Item><Link href={public_urls.admin_tarjetas}>Tarjetas</Link></Menu.Item>),
      },
      
    ],
  },
  
];
export default function MenuAdminTop(){
  const [current, setCurrent] = useState('12');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu style={{backgroundColor:"#CCCCE4"/*"lightblue"*/}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};