import { BarsOutlined, BoxPlotOutlined, CheckOutlined, DollarCircleFilled, FileTextOutlined, HomeOutlined, PrinterOutlined, RocketOutlined, SnippetsOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";
import { Menu } from "antd";

//import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default function TestMenu(){
    const get_url_to = (_target) => "http://localhost:3001" + "/v1/" +_target

    return (
        <Menu
          onClick={()=>{}}
          style={{ width: 220 , backgroundColor: "rgb(255,255,255,1)"}}
          mode="inline"
        >
          
          <Menu.Item>Stock</Menu.Item>
          <SubMenu key="sub1" title={<span><RocketOutlined /><span>Envios</span></span>}>
            <Menu.Item key="1" onClick = {()=>{window.location.replace(get_url_to("deposito/envio/nuevo_envio"))}}><SnippetsOutlined />&nbsp;Nuevo Envio  </Menu.Item>
            <Menu.Item key="3" onClick = {()=>{window.location.replace(get_url_to("deposito/envio/nuevo_envio"))}}><BarsOutlined />&nbsp;Lista de Envios  </Menu.Item>
            <Menu.Item key="2" onClick = {()=>{window.location.replace(get_url_to("deposito/imprimir_codigos"))}}><PrinterOutlined />&nbsp;Imprimir C&oacute;digos Env&iacute;o</Menu.Item>
            <Menu.Item key="13" onClick = {()=>{window.location.replace(get_url_to("deposito/imprimir_codigos"))}}><PrinterOutlined />&nbsp; Imprimir C&oacute;digos</Menu.Item>
            <Menu.Item key="14" onClick = {()=>{window.location.replace(get_url_to("deposito/imprimir_codigos"))}}><PrinterOutlined />&nbsp;Imprimir Env&iacute;o</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><BoxPlotOutlined /><span>Stock</span></span>}>
            <Menu.Item key="15" onClick = {()=>{window.location.replace(get_url_to("stock/listados/lista_codigo"))}}><BarsOutlined /> Stock</Menu.Item>
            <Menu.Item key="5" onClick = {()=>{window.location.replace(get_url_to("deposito/stock/listados/lista_familia"))}}><BarsOutlined /> Familias</Menu.Item>
            <Menu.Item key="16" onClick = {()=>{window.location.replace(get_url_to("deposito/stock/listados/lista_subfamilia"))}}><BarsOutlined /> SubFamilias</Menu.Item>
            <Menu.Item key="17" onClick = {()=>{window.location.replace(get_url_to("deposito/stock/listados/lista_grupos"))}}><BarsOutlined /> Grupos</Menu.Item>
            <Menu.Item key="18" onClick = {()=>{window.location.replace(get_url_to("deposito/stock/listados/lista_subgrupos"))}}><BarsOutlined /> SubGrupos</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title={<span><FileTextOutlined /><span>Informes</span></span>}>
            <Menu.Item key="9"><FileTextOutlined /> Informe Cantidad</Menu.Item>
          </SubMenu>
        </Menu>
      );
}