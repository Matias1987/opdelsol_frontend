import { MenuOutlined, PlusOutlined, SettingOutlined, StarOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import Link from "next/link"
import { public_urls } from "@/src/urls";

const items = [
 
  
  {
    label: (<Link href={public_urls.venta_directa}>M&eacute;dicos</Link>),
    key: '10',
    icon: <StarOutlined />,
  },
  {
    label: (<Link href={public_urls.venta_directa}>Ventas</Link>),
    key: '11',
    icon: <StarOutlined />,
  },
];
export default function MenuAdminTop(){
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu style={{backgroundColor:"lightblue"}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};