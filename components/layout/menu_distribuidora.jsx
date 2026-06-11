import { StarOutlined, UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import Link from "next/link"
import { public_urls } from "@/src/urls";

const items = [
  {
    label: (<Link href={public_urls.nueva_venta_distribuidora}>Nueva Operaci&oacute;n</Link>),
    key: '10',
    icon: <StarOutlined />,
  },
  {
    label: (<Link href={public_urls.lista_operaciones_distribuidora}>Lista de Operaciones</Link>),
    key: '11',
    icon: <UnorderedListOutlined />,
  },
  {
    label: (<Link href={public_urls.lista_clientes_distribuidora}>Clientes</Link>),
    key: '12',
    icon: <UserOutlined />,
  },
];
export default function MenuDistribuidora(){
  const [current, setCurrent] = useState('10');
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return <Menu className="custom-menu-distribuidora" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};