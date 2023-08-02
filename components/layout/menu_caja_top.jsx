import { MenuOutlined, PlusOutlined, SettingOutlined, StarOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import Link from "next/link"
import { public_urls } from "@/src/urls";

const items = [
 
  {
    label: 'Menú',
    key: 'SubMenu',
    icon: <MenuOutlined />,
    children: [
      {
        key: '0',
        label: (<Menu.Item><Link style={{color:"red"}} href={public_urls.ventas_ingresadas}>Operaciones Ingresadas  </Link></Menu.Item>)
      },
      {
        key: '1',
        label: (<Menu.Item><Link href={public_urls.lista_clientes}>Clientes  </Link></Menu.Item>),
      },
      {
        key: '2',
        label: (<Menu.Item><Link href={public_urls.ventas_pendientes}>Operaciones Pendientes</Link></Menu.Item>),
      },
      {
        key: '3',
        label: (<Menu.Item><Link href={public_urls.ventas_terminadas}>Operaciones Terminadas</Link></Menu.Item>),
      },
      {
        key: '7',
        label: (<Menu.Item><Link href={public_urls.ventas_entregadas}>Operaciones Entregadas</Link></Menu.Item>),
      },
      {
        key: '8',
        label: (<Menu.Item><Link href={public_urls.ventas_anuladas}>Operaciones Anuladas</Link></Menu.Item>),
      },
      {
        key: '9',
        label: (<Menu.Item><Link href={public_urls.lista_cobros_sucursal}>Cobros</Link></Menu.Item>),
      },
      {
        key: '4',
        label: (<Menu.Item><Link href={public_urls.lista_gastos}>Gastos</Link></Menu.Item>),
      },
      {
        key: '5',
        label: (<Menu.Item><Link href={public_urls.venta_lcstock}>Caja</Link></Menu.Item>),
      },
     
      
    ],
  },
  {
    label: (<Link href={public_urls.ventas_ingresadas}>Operaciones Ingresadas</Link>),
    key: '10',
    icon: <StarOutlined />,
  },
  {
    label: (<Link href={public_urls.lista_clientes}>Clientes</Link>),
    key: '11',
    icon: <StarOutlined />,
  },
];
export default function MenuCajaTop(){
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu style={{backgroundColor:"#FFEF85"}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};