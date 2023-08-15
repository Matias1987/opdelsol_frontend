import { public_urls } from "@/src/urls";
import { StarOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Menu } from "antd";
import Link from "next/link"

const MenuLaboratorioTop = (props)=>{
    const [current, setCurrent] = useState('mail');
    const items = [
        
        {
          label: (<Link href={public_urls.lista_operaciones_laboratorio}>Lista de Operaciones</Link>),
          key: '10',
          icon: <StarOutlined />,
        },
        
      ];

      
      const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
      };
      return <Menu style={{backgroundColor:"#FFEF85"}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}

export default MenuLaboratorioTop;