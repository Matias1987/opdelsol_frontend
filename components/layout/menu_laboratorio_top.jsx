import { public_urls } from "@/src/urls";
import { useState } from "react";
import { Menu, Modal } from "antd";
import Link from "next/link"
import { SearchOutlined } from "@ant-design/icons";
import BuscarVentaV3 from "../forms/ventas/BuscarVentasV3";

const MenuLaboratorioTop = (props)=>{
    const [current, setCurrent] = useState('mail');
    const [buscarVentaOpen, setBuscarVentaOpen] = useState(false);
    const items = [
        
        {
          label: (<Link href={public_urls.lista_operaciones_total}>Operaciones</Link>),
          key: '10',
        },
/*
        {
          label: (<Link href={public_urls.lista_operaciones_laboratorio}>Lista de Operaciones en Laboratorio</Link>),
          key: '16',
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
*/
        {
          label: (<Link href={public_urls.lista_stock_taller}>Stock</Link>),
          key: '14',
        },
        {
          label: (<Link href={public_urls.laboratorio_lista_facturas}>Facturas</Link>),
          key: '15',
        },
        {
          label: <>Buscar Venta</>,
          icon: <SearchOutlined />,
          key: "buscar_venta",
        }
        
      ];

      const _style_ = {
        background: "rgba(255, 255, 255, 1)",
        background: "radial-gradient(circle, rgba(255, 230, 121, 1) 0%, hsla(41, 100%, 80%, 1.00) 100%)",
        /*backgroundColor:"#FFEF85" */
      }

      
      const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        if(e.key === "buscar_venta"){
          setBuscarVentaOpen(true);
        }
      };
      return <><Menu style={_style_} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      <Modal
        destroyOnClose
        width={"100%"}
        open={buscarVentaOpen}
        onCancel={() => setBuscarVentaOpen(false)}
        title="Buscar Venta"
        footer={null}
      >
        <BuscarVentaV3 />
      </Modal>
      </>;
}

export default MenuLaboratorioTop;