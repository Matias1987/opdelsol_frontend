import { public_urls } from "@/src/urls";
import { HomeOutlined,  StarOutlined,  WarningFilled } from "@ant-design/icons";

import { Menu } from "antd";
import Link from "next/link"

export default function MenuSideDepositoMin(){
    
    return (
        <Menu
          onClick={()=>{}}
          style={{ width: 220 }}
          mode="inline"
        >
          
          <Menu.Item key="100"><Link href={public_urls.dashboard_deposito_min}><HomeOutlined />&nbsp;Inicio  </Link></Menu.Item>
          <Menu.Item key="101" ><WarningFilled /> 
              <Link href={public_urls.bajar_envios}>&nbsp;Bajar Env&iacute;o</Link>
          </Menu.Item>
          <Menu.Item key="40"><Link href={public_urls.nuevo_envio}><StarOutlined />&nbsp;Nuevo Envio  </Link></Menu.Item>
          
          <Menu.Item key="13"><Link href={public_urls.imprimir_codigos}><StarOutlined />&nbsp; Imprimir C&oacute;digos</Link></Menu.Item>
          
          
        </Menu>
      );
}