import {MenuOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import Link from "next/link"
import { public_urls } from "@/src/urls";
import BuscarVenta from "../forms/ventas/BuscarVenta";
import CustomModal from "../CustomModal";
import ListaPrecios from "../lista_precios/listaPrecios";
import ListaPreciosV3 from "../lista_precios/listaPreciosV3";

const items = [
  
 {
  label: <Link href={public_urls.dashboard_admin}>Inicio</Link>,
  key: '12',

 },
  {
    label: (<Link href={public_urls.totales_venta_vendedores}>Totales Venta Mes</Link>),
    key: '10',

  },
  {
    label: (<Link href={public_urls.ventas_medicos}>Ventas M&eacute;dicos</Link>),
    key: '11',

  },
  {
    label: (<Link href={public_urls.lista_ventas_dia_vendedor}>Ventas D&iacute;a</Link>),
    key: '14',

  },
  
  {

    label: (<Link href={public_urls.stock_admin}>Stock</Link>),
    key: '16',
  },
  /*{
    label: (<Link href={public_urls.eventos_admin}>Eventos</Link>),
    key: '15',
  },*/
  
  {
    label: (<BuscarVenta textButton="Buscar Venta" />),
    key: '404',
  },
  {
    label: 'Tablas',
    key: 'SubMenu',
    icon: <MenuOutlined />,
    children: [
      {
        label: (<Menu.Item><Link href={public_urls.listausuarios}>Usuarios</Link></Menu.Item>),
        key: '170',
      },
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
  {
    label: (<CustomModal openButtonText="Lista de Precios" type="primary"><ListaPreciosV3 /></CustomModal>),
    key: '1001'
  }
  
];
export default function MenuAdminTop(){
  const [current, setCurrent] = useState('12');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu style={{backgroundColor:"#41B79E"/*"#C4DD76""lightblue"*/}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};