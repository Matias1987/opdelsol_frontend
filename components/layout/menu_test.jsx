import { local_base_url, public_urls, remote_base_url } from "@/src/urls";
import { AlertFilled, BarsOutlined, BoxPlotOutlined, CheckOutlined, DollarCircleFilled, EditOutlined, FileTextOutlined, HomeOutlined, PartitionOutlined, PlusCircleOutlined, PrinterOutlined, RocketOutlined, SnippetsOutlined, StarOutlined, UserOutlined, WarningFilled } from "@ant-design/icons";

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
          <Menu.Item key="40"><Link href={get_url_to("deposito/envio/nuevo_envio")}><StarOutlined />&nbsp;Nuevo Envio  </Link></Menu.Item>
          <Menu.Item key={"31"}><Link href={get_url_to("deposito/stock/listados/lista_stock")}><StarOutlined />&nbsp;Lista Stock</Link></Menu.Item>
          {/*<Menu.Item key="27"><Link href={get_url_to("deposito/stock/modificar_precios_categoria")}><StarOutlined />&nbsp; Editar Multiplicadores Por Categor&iacute;a</Link></Menu.Item>*/}
          <Menu.Item key="107"><Link href={public_urls.editar_precios}><StarOutlined />&nbsp; Editar Precios de SubGrupos</Link></Menu.Item>
          <Menu.Item key="13"><Link href={get_url_to("deposito/imprimir_codigos")}><StarOutlined />&nbsp; Imprimir C&oacute;digos</Link></Menu.Item>
          
          <SubMenu key="sub1" title={<span><RocketOutlined /><span>Envios</span></span>}>
            <Menu.Item key="1"><Link href={get_url_to("deposito/envio/nuevo_envio")}><SnippetsOutlined />&nbsp;Nuevo Envio  </Link></Menu.Item>
            <Menu.Item key="3"><Link href={get_url_to("deposito/envio/lista_envios")}><BarsOutlined />&nbsp;Lista de Envios  </Link></Menu.Item>
            <Menu.Divider></Menu.Divider>
            <Menu.Item key="101" ><WarningFilled /> 
              <Link href={get_url_to("deposito/envio/descargar_envio")}>&nbsp;Bajar Env&iacute;o</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><BoxPlotOutlined /><span>Stock</span></span>}>
            <Menu.Item key="32" ><PlusCircleOutlined /> 
              <Link href={get_url_to("deposito/stock/agregar_stock_lote")}>&nbsp;Agregar Lote Stock</Link>
            </Menu.Item>
            <Menu.Divider></Menu.Divider>
            <Menu.Item key="41" ><WarningFilled /> 
              <Link href={get_url_to("deposito/stock/baja_desperfecto")}>&nbsp;Bajas por Desperfecto</Link>
            </Menu.Item>
            <Menu.Divider></Menu.Divider>
            <Menu.Item key="42" ><PartitionOutlined /> 
              <Link href={get_url_to("deposito/arbol_codigos")}>&nbsp;&Aacute;rbol de C&oacute;digos</Link>
            </Menu.Item>
            {/*<Menu.Item key="43" ><PartitionOutlined /> 
              <Link href={get_url_to("deposito/stock/modif_cant_cat")}>&nbsp;Modificar Cantidad Categor&iacute;a;</Link>
            </Menu.Item>*/}
            
            <Menu.Divider></Menu.Divider>
            <Menu.Item key="15" ><PlusCircleOutlined /> 
              <Link href={get_url_to("deposito/stock/agregar_familia")}>&nbsp;Agregar Familias</Link>
            </Menu.Item>
            <Menu.Item key="16" ><PlusCircleOutlined /> 
              <Link href={get_url_to("deposito/stock/agregar_subfamilia")}>&nbsp;Agregar Sub Familias</Link>
            </Menu.Item>
            <Menu.Item key="17" ><PlusCircleOutlined /> 
              <Link href={get_url_to("deposito/stock/agregar_grupo")}>&nbsp;Agregar Grupos</Link>
            </Menu.Item>
            <Menu.Item key="18" ><PlusCircleOutlined /> 
              <Link href={get_url_to("deposito/stock/agregar_subgrupo")}>&nbsp;Agregar Sub Grupos</Link>
            </Menu.Item>
            <Menu.Item key="19" ><PlusCircleOutlined /> 
              <Link href={get_url_to("deposito/stock/agregar_codigo")}>&nbsp;Agregar Codigos</Link>
            </Menu.Item>
            <SubMenu key={"subsub1"} title={<>Listados</>}>
              <Menu.Item key="21" ><BarsOutlined /> 
              <Link href={get_url_to("deposito/stock/listados/lista_familia")}>Familias</Link>
              </Menu.Item>
              <Menu.Item key="22" ><BarsOutlined /> 
                <Link href={get_url_to("deposito/stock/listados/lista_subfamilia")}>Sub Familias</Link>
              </Menu.Item>
              <Menu.Item key="23" ><BarsOutlined /> 
                <Link href={get_url_to("deposito/stock/listados/lista_grupos")}>Grupos</Link>
              </Menu.Item>
              <Menu.Item key="24" ><BarsOutlined /> 
                <Link href={get_url_to("deposito/stock/listados/lista_subgrupos")}>Sub Grupos</Link>
              </Menu.Item>
              <Menu.Item key="25" ><BarsOutlined /> 
                <Link href={get_url_to("deposito/stock/listados/lista_codigos")}>Codigos</Link>
              </Menu.Item>
              <Menu.Item key="26" ><BarsOutlined /> 
                <Link href={get_url_to("deposito/stock/listados/lista_stock")}>Stock</Link>
              </Menu.Item>
              <Divider />
              <Menu.Item key="26" ><BarsOutlined /> 
                <Link href={get_url_to("deposito/stock/listados/lista_desperfectos")}>Lista Desperfectos</Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><UserOutlined /><span>Proveedores</span></span>}>
            <Menu.Item key="29"><FileTextOutlined />
             <Link href={get_url_to("deposito/proveedores/lista_proveedores")}>Lista</Link>
            </Menu.Item>
            <Menu.Item key="28"><PlusCircleOutlined />
             <Link href={get_url_to("deposito/proveedores/agregar_proveedor")}>Agregar Proveedor</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub6" title={<span><FileTextOutlined /><span>Facturas</span></span>}>
            <Menu.Item key="30"><FileTextOutlined />
             <Link href={get_url_to("deposito/facturas/lista_facturas")}>Lista</Link>
            </Menu.Item>
            <Menu.Item key="31"><PlusCircleOutlined />
             <Link href={get_url_to("deposito/facturas/agregar_factura")}>Agregar Factura</Link>
            </Menu.Item>
          </SubMenu>
          
        </Menu>
      );
}