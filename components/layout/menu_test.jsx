import { local_base_url, public_urls, remote_base_url } from "@/src/urls";
import { AlertFilled, BarsOutlined, BoxPlotOutlined, CheckOutlined, DollarCircleFilled, EditOutlined, ExclamationOutlined, FileAddOutlined, FileTextOutlined, HomeOutlined, PartitionOutlined, PlusCircleOutlined, PrinterOutlined, RocketOutlined, SnippetsOutlined, StarOutlined, UserOutlined, WarningFilled } from "@ant-design/icons";

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
          style={{ width: 220 }}
          mode="inline"
        >
          
          <Menu.Item key="100"><Link href={get_url_to("deposito/")}><HomeOutlined />&nbsp;Inicio  </Link></Menu.Item>
          <Menu.Item style={{backgroundColor:"lightgoldenrodyellow"}} key="40"><Link href={get_url_to("deposito/envio/nuevo_envio")}><StarOutlined />&nbsp;Nuevo Envio  </Link></Menu.Item>
          <Menu.Item key={"31"}><Link href={get_url_to("deposito/stock/listados/lista_stock")}>Lista Stock</Link></Menu.Item>
          <Menu.Item key="sub2_32" >
              <Link href={get_url_to("deposito/stock/agregar_stock_lote")}>&nbsp;Agregar Stock</Link>
          </Menu.Item>
          <Menu.Item key="110" >
                <Link href={get_url_to("deposito/stock/listados/lista_codigos")}>C&oacute;digos</Link>
          </Menu.Item>
          <SubMenu key={"submenu_tablas"} title={"Tablas"} style={{backgroundColor:"lightblue"}}>
              <Menu.Item key="subsub121" ><BarsOutlined /> 
                <Link href={get_url_to("deposito/stock/listados/lista_familia")}>Familias</Link>
              </Menu.Item>
              <Menu.Item key="subsub122" ><BarsOutlined /> 
                <Link href={get_url_to("deposito/stock/listados/lista_subfamilia")}>Sub Familias</Link>
              </Menu.Item>
              <Menu.Item key="subsub123" ><BarsOutlined /> 
                <Link href={get_url_to("deposito/stock/listados/lista_grupos")}>Grupos</Link>
              </Menu.Item>
              <Menu.Item key="subsub124" ><BarsOutlined /> 
                <Link href={get_url_to("deposito/stock/listados/lista_subgrupos")}>Sub Grupos</Link>
              </Menu.Item>
          </SubMenu>

          {/*<Menu.Item key="107"><Link href={public_urls.editar_precios}><StarOutlined />&nbsp; Editar Precios de SubGrupos</Link></Menu.Item>*/}
          <Menu.Item key="13"><Link href={get_url_to("deposito/imprimir_codigos")}><PrinterOutlined />&nbsp; Imprimir C&oacute;digos</Link></Menu.Item>
          
          <SubMenu key="sub1" title={<span><RocketOutlined /><span>Envios</span></span>}>
            <Menu.Item key="sub1_1"><Link href={get_url_to("deposito/envio/nuevo_envio")}><SnippetsOutlined />&nbsp;Nuevo Envio  </Link></Menu.Item>
            <Menu.Item key="sub1_3"><Link href={get_url_to("deposito/envio/lista_envios")}><BarsOutlined />&nbsp;Lista de Envios  </Link></Menu.Item>
            <Menu.Divider></Menu.Divider>
            <Menu.Item key="sub1_101" ><WarningFilled /> 
              <Link href={get_url_to("deposito/envio/descargar_envio")}>&nbsp;Bajar Env&iacute;o</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="sub2_42" ><PartitionOutlined /> 
              <Link href={get_url_to("deposito/arbol_codigos")}>&nbsp;&Aacute;rbol de C&oacute;digos</Link>
            </Menu.Item>
          
          
          {/*<SubMenu key="sub7" title={<span><ExclamationOutlined /> Control De Stock</span>}>
            <Menu.Item key="sub7_1"><Link href={get_url_to("deposito/control_stock/lista")}><FileTextOutlined />&nbsp;Lista  </Link></Menu.Item>
            <Menu.Item key="sub7_2"><Link href={get_url_to("deposito/control_stock/carga")}><FileAddOutlined />&nbsp;Nuevo Control  </Link></Menu.Item>
          </SubMenu>*/}
          <SubMenu key="sub4" title={<span><UserOutlined /><span>Proveedores</span></span>}>
            <Menu.Item key="sub4_29"><FileTextOutlined />
             <Link href={get_url_to("deposito/proveedores/lista_proveedores")}>Lista</Link>
            </Menu.Item>
            <Menu.Item key="sub4_28"><PlusCircleOutlined />
             <Link href={get_url_to("deposito/proveedores/agregar_proveedor")}>Agregar Proveedor</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub6" title={<span><FileTextOutlined /><span>Facturas</span></span>}>
            <Menu.Item key="sub6_30"><FileTextOutlined />
             <Link href={get_url_to("deposito/facturas/lista_facturas")}>Lista</Link>
            </Menu.Item>
            <Menu.Item key="sub6_31"><PlusCircleOutlined />
             <Link href={get_url_to("deposito/facturas/agregar_factura")}>Agregar Factura</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="sub2_41" ><WarningFilled /> 
              <Link href={get_url_to("deposito/stock/baja_desperfecto")}>&nbsp;Bajas por Desperfecto</Link>
            </Menu.Item>
          <SubMenu key="sub8" title={<span><FileTextOutlined /><span>Informes</span></span>}>
            <Menu.Item key="sub8_30"><FileTextOutlined />
             <Link href={get_url_to("deposito/stock/stock_venta_periodo")}>Stock Ventas</Link>
            </Menu.Item>
          </SubMenu>
          
        </Menu>
      );
}