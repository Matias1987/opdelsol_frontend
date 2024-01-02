import BuscarVenta from "../forms/ventas/BuscarVenta";
import { Menu } from "antd";
const { default: globals } = require("@/src/globals");
const { public_urls } = require("@/src/urls");
const { MenuOutlined, StarOutlined } = require("@ant-design/icons");

const { useState, useEffect } = require("react");
import Link from "next/link"
import ListaPrecios from "../informes/lista_precios/lista_precios";



export default function MenuV2(props){
   const [current, setCurrent] = useState(globals.esUsuarioVentas() ? "SubMenuVentas" : "SubMenuCaja");
   const [itemsMenu, setItemsMenu] = useState([])
   const _menu_deposito_min = {
    label: 'Menú Depósito',
    key: 'SubMenuStockMin',
    icon: <MenuOutlined />,
    disabled: !globals.esUsuarioDepositoMin(),
    children: [{
      key: '201',
      label: (<Menu.Item><Link href={public_urls.bajar_envios}>Descargar Env&iacute;o  </Link></Menu.Item>),
    }
  ]
  }

  const menu_ventas = {
    label: 'Menú Ventas',
    key: 'SubMenuVentas',
    icon: <MenuOutlined />,
    disabled: !globals.esUsuarioVentas(),
    children: [
      {
        key: '1',
        label: (<Menu.Item><Link href={public_urls.venta_directa}>Venta Directa  </Link></Menu.Item>),
      },
      {
        key: '2',
        label: (<Menu.Item><Link href={public_urls.venta_recetastock}>Venta Receta Stock</Link></Menu.Item>),
      },
      {
        key: '3',
        label: (<Menu.Item><Link href={public_urls.venta_monoflab}>Venta Monofocales Laboratorio</Link></Menu.Item>),
      },
      {
        key: '4',
        label: (<Menu.Item><Link href={public_urls.venta_multilab}>Venta Multifocales Laboratorio</Link></Menu.Item>),
      },
      {
        key: '5',
        label: (<Menu.Item><Link href={public_urls.venta_lcstock}>Venta L.C. Stock</Link></Menu.Item>),
      },
      {
        key: '6',
        label: (<Menu.Item><Link href={public_urls.venta_lclab}>Venta L.C. Laboratorio</Link></Menu.Item>),
      },
      
    ],
  }

  const menu_caja = {
    label: 'Menú Caja',
    key: 'SubMenuCaja',
    icon: <MenuOutlined />,
    disabled: !globals.esUsuarioCaja1(),
    children: [
      {
        key: '100',
        label: (<Menu.Item><Link style={{color:"red"}} href={public_urls.ventas_ingresadas}>Operaciones Ingresadas  </Link></Menu.Item>)
      },
      {
        key: '101',
        label: (<Menu.Item><Link href={public_urls.lista_clientes_caja}>Clientes  </Link></Menu.Item>),
      },
      {
        key: '102',
        label: (<Menu.Item><Link href={public_urls.ventas_pendientes}>Operaciones Pendientes En Sucursal</Link></Menu.Item>),
      },
      {
        key: '113',
        label: (<Menu.Item><Link href={public_urls.ventas_pendientes_lab}>Operaciones Pendientes En Taller</Link></Menu.Item>),
      },
      {
        key: '103',
        label: (<Menu.Item><Link href={public_urls.ventas_terminadas}>Operaciones Terminadas</Link></Menu.Item>),
      },
      {
        key: '107',
        label: (<Menu.Item><Link href={public_urls.ventas_entregadas}>Operaciones Entregadas</Link></Menu.Item>),
      },
      {
        key: '108',
        label: (<Menu.Item><Link href={public_urls.ventas_anuladas}>Operaciones Anuladas</Link></Menu.Item>),
      },
      {
        key: '109',
        label: (<Menu.Item><Link href={public_urls.lista_cobros_sucursal}>Cobros</Link></Menu.Item>),
      },
      {
        key: '104',
        label: (<Menu.Item><Link href={public_urls.lista_gastos}>Gastos</Link></Menu.Item>),
      },
      {
        key: '105',
        label: (<Menu.Item><Link href={public_urls.caja_admin}>Caja</Link></Menu.Item>),
      },
      
      {
        key: '112',
        label: (<Menu.Item><Link href={public_urls.transferencias}>Transferencias</Link></Menu.Item>),
      },
     
      
    ],
  }
  
   
useEffect(()=>{
  
   const items = []/*
    menu_caja, 
    menu_ventas,
    _menu_deposito_min,
    {
      label: (<Link href={globals.esUsuarioCaja1() ? public_urls.lista_clientes_caja : public_urls.lista_clientes_ventas}>Clientes</Link>),
      key: '11',
      icon: <StarOutlined />,
    },
    {
      label: (<BuscarVenta />),
      key: '404',
    }
   ]*/

   

   if(globals.esUsuarioCaja1())
   {
      items.push(menu_caja)
   }
   if(globals.esUsuarioVentas())
   {
    items.push(menu_ventas)
   }

   if(globals.esUsuarioDepositoMin())
   {
    items.push(_menu_deposito_min)
   }

   if(globals.esUsuarioCaja1() || globals.esUsuarioVentas()){
    items.push(
      {
      label: (<Link href={globals.esUsuarioCaja1() ? public_urls.lista_clientes_caja : public_urls.lista_clientes_ventas}>Clientes</Link>),
      key: '11',
      icon: <StarOutlined />,
    },
    {
      label: (<BuscarVenta />),
      key: '404',
    }
    )
   }

   setItemsMenu(items)
  },[])

      /*const _style_ = {
        background: "rgb(34,193,195)",
        background: "linear-gradient(81deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
        color: "black",
      }*/
      const _style_ = {
        background: "rgb(34,193,195)",
        background: "linear-gradient(81deg, rgba(201,216,231,1)  0%, rgba(237,237,237,1) 100%)",
        color: "black",
      }

      const onClick = (e) => {
        //console.log('click ', e);
        setCurrent(e.key);
        //alert(e.key)
      };

      return <Menu  style={_style_}  onClick={onClick} selectedKeys={[current]} mode={ typeof props.mode === 'undefined' ? "horizontal" : props.mode} items={itemsMenu} />;
}
