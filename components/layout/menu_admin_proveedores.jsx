import { Menu } from "antd";
import { useState } from "react";
import Link from "next/link"
import { public_urls } from "@/src/urls";


const items = [
 {
  label: <Link href={public_urls.dashboard_adm_prov}>Inicio</Link>,
  key: '12',
 },
  
  {
    label: (<Link href={public_urls.adm_prov_facturas}>Facturas y Remitos</Link>),
    key: '13',
  },
  {
    label: (<>Contactos</>),
    key: '14',
    children: [
      {
        label: (<Link href={public_urls.adm_prov_lista_prov}>Proveedores</Link>),
        key: "170",
      },
      
      {
        label: (<Link href={public_urls.adm_prov_lista_prov}>Obras Sociales</Link>),
        key: "171",
      },
      {
        label: (<Link href={public_urls.adm_prov_lista_prov}>Publicidad</Link>),
        key: "172",
      },
      {
        label: (<Link href={public_urls.adm_prov_lista_prov}>Sueldos</Link>),
        key: "173",
      },
      
    ]
  },
];
export default function MenuAdminProveedores(){
  const [current, setCurrent] = useState('12');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu style={{backgroundColor:"#CCCCE4"/*"lightblue"*/}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};