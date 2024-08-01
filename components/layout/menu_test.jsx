import { local_base_url, public_urls, remote_base_url } from "@/src/urls";
import { AlertFilled, BarsOutlined, BoxPlotOutlined, CheckOutlined, DollarCircleFilled, EditOutlined, FileAddOutlined, FileTextOutlined, HomeOutlined, PartitionOutlined, PlusCircleOutlined, PrinterOutlined, RocketOutlined, SnippetsOutlined, StarOutlined, UserOutlined, WarningFilled } from "@ant-design/icons";

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
          <Menu.Item key="110" ><StarOutlined /> 
                <Link href={get_url_to("deposito/stock/listados/lista_codigos")}>&nbsp;Lista C&oacute;digos</Link>
          </Menu.Item>
          {/*<Menu.Item key="107"><Link href={public_urls.editar_precios}><StarOutlined />&nbsp; Editar Precios de SubGrupos</Link></Menu.Item>*/}
          <Menu.Item key="13"><Link href={get_url_to("deposito/imprimir_codigos")}><StarOutlined />&nbsp; Imprimir C&oacute;digos</Link></Menu.Item>
          
          <SubMenu key="sub1" title={<span><RocketOutlined /><span>Envios</span></span>}>
            <Menu.Item key="sub1_1"><Link href={get_url_to("deposito/envio/nuevo_envio")}><SnippetsOutlined />&nbsp;Nuevo Envio  </Link></Menu.Item>
            <Menu.Item key="sub1_3"><Link href={get_url_to("deposito/envio/lista_envios")}><BarsOutlined />&nbsp;Lista de Envios  </Link></Menu.Item>
            <Menu.Divider></Menu.Divider>
            <Menu.Item key="sub1_101" ><WarningFilled /> 
              <Link href={get_url_to("deposito/envio/descargar_envio")}>&nbsp;Bajar Env&iacute;o</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><BoxPlotOutlined /><span>Stock</span></span>}>
            <Menu.Item key="sub2_32" ><PlusCircleOutlined /> 
              <Link href={get_url_to("deposito/stock/agregar_stock_lote")}>&nbsp;Agregar Lote Stock</Link>
            </Menu.Item>
            <Menu.Divider></Menu.Divider>
            <Menu.Item key="sub2_41" ><WarningFilled /> 
              <Link href={get_url_to("deposito/stock/baja_desperfecto")}>&nbsp;Bajas por Desperfecto</Link>
            </Menu.Item>
            <Menu.Divider></Menu.Divider>
            <Menu.Item key="sub2_42" ><PartitionOutlined /> 
              <Link href={get_url_to("deposito/arbol_codigos")}>&nbsp;&Aacute;rbol de C&oacute;digos</Link>
            </Menu.Item>
            {/*<Menu.Item key="43" ><PartitionOutlined /> 
              <Link href={get_url_to("deposito/stock/modif_cant_cat")}>&nbsp;Modificar Cantidad Categor&iacute;a;</Link>
            </Menu.Item>*/}
            
            <Menu.Divider></Menu.Divider>
            <Menu.Item key="sub2_15" ><PlusCircleOutlined /> 
              <Link href={get_url_to("deposito/stock/agregar_familia")}>&nbsp;Agregar Familias</Link>
            </Menu.Item>
            <Menu.Item key="sub2_16" ><PlusCircleOutlined /> 
              <Link href={get_url_to("deposito/stock/agregar_subfamilia")}>&nbsp;Agregar Sub Familias</Link>
            </Menu.Item>
            <Menu.Item key="sub2_17" ><PlusCircleOutlined /> 
              <Link href={get_url_to("deposito/stock/agregar_grupo")}>&nbsp;Agregar Grupos</Link>
            </Menu.Item>
            <Menu.Item key="sub2_18" ><PlusCircleOutlined /> 
              <Link href={get_url_to("deposito/stock/agregar_subgrupo")}>&nbsp;Agregar Sub Grupos</Link>
            </Menu.Item>
            <Menu.Item key="sub2_19" ><PlusCircleOutlined /> 
              <Link href={get_url_to("deposito/stock/agregar_codigo")}>&nbsp;Agregar Codigos</Link>
            </Menu.Item>
            <SubMenu key={"subsub1"} title={<>Listados</>}>
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
              <Menu.Item key="subsub125" ><BarsOutlined /> 
                <Link href={get_url_to("deposito/stock/listados/lista_codigos")}>Codigos</Link>
              </Menu.Item>
              <Menu.Item key="subsub126" ><BarsOutlined /> 
                <Link href={get_url_to("deposito/stock/listados/lista_stock")}>Stock</Link>
              </Menu.Item>
              <Divider />
              <Menu.Item key="subsub127" ><BarsOutlined /> 
                <Link href={get_url_to("deposito/stock/listados/lista_desperfectos")}>Lista Desperfectos</Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub7" title={<span><AlertFilled /><span>Control De Stock</span></span>}>
            <Menu.Item key="sub7_1"><Link href={get_url_to("deposito/control_stock/lista")}><FileTextOutlined />&nbsp;Lista  </Link></Menu.Item>
            <Menu.Item key="sub7_2"><Link href={get_url_to("deposito/control_stock/carga")}><FileAddOutlined />&nbsp;Nuevo Control  </Link></Menu.Item>
          </SubMenu>
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
          <SubMenu key="sub8" title={<span><FileTextOutlined /><span>Informes</span></span>}>
            <Menu.Item key="sub8_30"><FileTextOutlined />
             <Link href={get_url_to("deposito/stock/stock_venta_periodo")}>Stock Ventas</Link>
            </Menu.Item>
          </SubMenu>
          
        </Menu>
      );
}