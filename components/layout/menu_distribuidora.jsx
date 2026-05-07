import { StarOutlined } from "@ant-design/icons";
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
];
export default function MenuDistribuidora(){
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu style={{backgroundColor:"lightblue"}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};