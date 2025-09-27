import { public_urls } from "@/src/urls";
import { useState } from "react";
import { Menu } from "antd";
import Link from "next/link"

const MenuLaboratorioTop = (props)=>{
    const [current, setCurrent] = useState('mail');
    const items = [
        
        {
          label: (<Link href={public_urls.lista_operaciones_laboratorio}>Lista de Operaciones</Link>),
          key: '10',
        },
        {
          label: (<Link href={public_urls.lista_operaciones_pedidos}>Lista de Pedidos</Link>),
          key: '11',
        },
        {
          label: (<Link href={public_urls.lista_operaciones_calibrado}>Lista de Operaciones en Calibrado</Link>),
          key: '12',
        },
        {
          label: (<Link href={public_urls.lista_operaciones_terminadas_taller}>Lista de Operaciones Terminadas</Link>),
          key: '13',
        },
        {
          label: (<Link href={public_urls.lista_stock_taller}>Stock</Link>),
          key: '14',
        },
        {
          label: (<Link href={public_urls.laboratorio_lista_facturas}>Facturas</Link>),
          key: '15',
        },
        
        
      ];

      const _style_ = {
        background: "rgb(238,174,202)",
        background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
        /*backgroundColor:"#FFEF85" */
      }

      
      const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
      };
      return <Menu style={_style_} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}

export default MenuLaboratorioTop;