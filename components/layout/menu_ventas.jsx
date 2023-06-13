import { local_base_url, remote_base_url } from "@/src/urls";
import { AlertFilled, BarsOutlined, BoxPlotOutlined, CheckOutlined, DollarCircleFilled, EditOutlined, FileTextOutlined, HomeOutlined, PlusCircleOutlined, PrinterOutlined, RocketOutlined, SnippetsOutlined, StarOutlined, UserOutlined, WarningFilled } from "@ant-design/icons";

import { Divider, Menu } from "antd";
import Link from "next/link"

//import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default function TestMenu(){
    const get_url_to = (_target) => local_base_url +_target

    return (
        <Menu
          onClick={()=>{}}
          style={{ width: 220 , backgroundColor: "rgb(255,255,255,1)"}}
          mode="inline"
        >
          
          <Menu.Item key="100"><Link href={get_url_to("deposito/")}><HomeOutlined />&nbsp;Inicio  </Link></Menu.Item>
          
          <Menu.Item key="40"><Link href={get_url_to("deposito/envio/nuevo_envio")}><StarOutlined />&nbsp;Nueva Venta Directa  </Link></Menu.Item>
          <Menu.Item key="40"><Link href={get_url_to("deposito/envio/nuevo_envio")}><StarOutlined />&nbsp;Nueva Venta L.C. Lab.  </Link></Menu.Item>
          <Menu.Item key="40"><Link href={get_url_to("deposito/envio/nuevo_envio")}><StarOutlined />&nbsp;Nueva Venta L.C. Stock  </Link></Menu.Item>
          <Menu.Item key="40"><Link href={get_url_to("deposito/envio/nuevo_envio")}><StarOutlined />&nbsp;Nueva Venta Monof. Lab.  </Link></Menu.Item>
          <Menu.Item key="40"><Link href={get_url_to("deposito/envio/nuevo_envio")}><StarOutlined />&nbsp;Nueva Venta Multif. Lab.  </Link></Menu.Item>
          <Menu.Item key="40"><Link href={get_url_to("deposito/envio/nuevo_envio")}><StarOutlined />&nbsp;Nueva Venta Receta Stock  </Link></Menu.Item>
          <Menu.Divider />
          <Menu.Item key="40"><Link href={get_url_to("deposito/envio/nuevo_envio")}><StarOutlined />&nbsp;Buscar Venta</Link></Menu.Item>
          
        </Menu>
      );
}