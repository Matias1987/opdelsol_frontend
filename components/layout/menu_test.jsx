import { idf_optica, local_base_url } from "@/src/config";
import ArrowDownOutlined from "@ant-design/icons/ArrowDownOutlined";
import BarsOutlined from "@ant-design/icons/BarsOutlined";
//import BoxPlotFilled from "@ant-design/icons/BoxPlotFilled";
import FileTextOutlined from "@ant-design/icons/FileTextOutlined";
//import HomeOutlined from "@ant-design/icons/HomeOutlined";
//import InfoOutlined from "@ant-design/icons/InfoOutlined";
//import PartitionOutlined from "@ant-design/icons/PartitionOutlined";
//import PrinterOutlined from "@ant-design/icons/PrinterOutlined";
//import RocketOutlined from "@ant-design/icons/RocketOutlined";
import SnippetsOutlined from "@ant-design/icons/SnippetsOutlined";
//import TableOutlined from "@ant-design/icons/TableOutlined";
//import UserOutlined from "@ant-design/icons/UserOutlined";
import DownOutlined from "@ant-design/icons/DownOutlined";

import { Button, Flex, Menu } from "antd";
import Link from "next/link";
import SucursalLabel from "../sucursal_label";
import { get, public_urls } from "@/src/urls";
import { useEffect, useState } from "react";
import globals from "@/src/globals";

//import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

export default function TestMenu() {
  const get_url_to = (_target) => local_base_url + _target;
  const [usuario, setUsuario] = useState("");

  useEffect(() => {
    setUsuario(globals.obtenerUserName());
  }, []);

  return (
    <Flex
      justify="space-between"
      align="center"
      className="flex-menuv3"
    >
      <Menu onClick={() => {}} mode="horizontal">
        <Menu.Item key="100">
          <Link href={get_url_to("deposito/")}>Inicio </Link>
        </Menu.Item>
        <SubMenu
          key="sub20"
          title={
            <span>
              <DownOutlined />
              &nbsp; Stock
            </span>
          }
        >
          <Menu.Item key="110">
            <Link href={get_url_to("deposito/stock/listados/lista_stockv3")}>
              Ver o Editar Cantidades
            </Link>
          </Menu.Item>
          <Menu.Item key="sub2_32">
            <Link href={get_url_to("deposito/agregar_armazones")}>
              Agregar Armazones
            </Link>
          </Menu.Item>
          <Menu.Item key="sub2_33">
            <Link
              href={
                idf_optica === 1
                  ? get_url_to("deposito/stock/agregar_stock_lote_v3")
                  : get_url_to("deposito/stock/agregar_stock")
              }
            >
              Agregar Productos...
            </Link>
          </Menu.Item>
          <Menu.Item key="sub2_34">
            <Link href={get_url_to("deposito/stock/modif_cant_cat")}>
              Modificar Cant. Categor&iacute;a
            </Link>
          </Menu.Item>
         { /*<Menu.Item key="sub2_35">
            <Link href={get_url_to("deposito/stock/crsv2/stock_cristales")}>
              Stock Cristales
            </Link>
          </Menu.Item>*/}
          <SubMenu key={"baja_desp"} title={<span>Baja por Desperfecto </span>}>
            <Menu.Item key="sub2_41">
              <Link href={get_url_to("deposito/stock/baja_desperfecto")}>
                Nueva Baja
              </Link>
            </Menu.Item>
            <Menu.Item key="sub2_410">
              <Link
                href={get_url_to("deposito/stock/listados/lista_desperfectos")}
              >
                Listado
              </Link>
            </Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub1"
          title={
            <span>
              <DownOutlined />
              &nbsp; Envios
            </span>
          }
        >
          <Menu.Item key="sub1_1">
            <Link href={get_url_to("deposito/envio/nuevo_envio")}>
              <SnippetsOutlined />
              &nbsp;Nuevo Envio{" "}
            </Link>
          </Menu.Item>
          <Menu.Item key="sub1_3">
            <Link href={get_url_to("deposito/envio/lista_envios")}>
              <BarsOutlined />
              &nbsp;Lista de Envios{" "}
            </Link>
          </Menu.Item>
          <Menu.Divider></Menu.Divider>
          <Menu.Item key="sub1_101">
            <ArrowDownOutlined />
            <Link href={get_url_to("deposito/envio/descargar_envio")}>
              &nbsp;Bajar Env&iacute;o
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="13">
          <Link href={get_url_to("deposito/imprimir_codigos")}>
            &nbsp;Imprimir C&oacute;digos
          </Link>
        </Menu.Item>

        <SubMenu
          key={"submenu_tablas"}
          title={
            <span>
              <DownOutlined />
              &nbsp; Tablas
            </span>
          }
        >
          <Menu.Item key="subsub125">
            <BarsOutlined />
            <Link href={get_url_to("deposito/stock/listados/lista_codigos")}>
              C&oacute;digos
            </Link>
          </Menu.Item>
          <Menu.Item key="subsub121">
            <BarsOutlined />
            <Link href={get_url_to("deposito/stock/listados/lista_familia")}>
              Familias
            </Link>
          </Menu.Item>
          <Menu.Item key="subsub122">
            <BarsOutlined />
            <Link href={get_url_to("deposito/stock/listados/lista_subfamilia")}>
              Sub Familias
            </Link>
          </Menu.Item>
          <Menu.Item key="subsub123">
            <BarsOutlined />
            <Link href={get_url_to("deposito/stock/listados/lista_grupos")}>
              Grupos
            </Link>
          </Menu.Item>
          <Menu.Item key="subsub124">
            <BarsOutlined />
            <Link href={get_url_to("deposito/stock/listados/lista_subgrupos")}>
              Sub Grupos
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key={"inf_title"}
          title={
            <span>
              <DownOutlined />
              &nbsp;Informes
            </span>
          }
        >
          <Menu.Item key="sub8_30">
            <FileTextOutlined />
            <Link href={get_url_to("deposito/stock/stock_venta_periodo")}>
              Stock Ventas
            </Link>
          </Menu.Item>
          <Menu.Item key="inf_1_">
            <BarsOutlined />
            <Link href={get_url_to("informes/stock/stock_sucursal")}>
              Totales por Sucursal
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key={"etc"}
          title={
            <span>
              <DownOutlined />
              &nbsp;Otros
            </span>
          }
        >
          <Menu.Item key="sub4_29">
            <Link href={get_url_to("deposito/proveedores/lista_proveedores")}>
              Proveedores
            </Link>
          </Menu.Item>
          <Menu.Item key="sub6_30">
            <Link href={get_url_to("deposito/facturas/lista_facturas")}>
              Facturas
            </Link>
          </Menu.Item>
          <Menu.Item key="sub2_42">
            <Link href={get_url_to("deposito/arbol_codigos")}>
              &Aacute;rbol de C&oacute;digos
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>

      <div>
        <span style={{color:"white"}}>{usuario}</span>&nbsp;|
        <SucursalLabel color="white" />

        <Button
          size="small"
          type="text"
          style={{ color: "#f09e9e", paddingTop: "8px" }}
          onClick={() => {
            const _token = globals.getToken();

            fetch(get.logout + _token)
              .then((response) => response.json())
              .then((response) => {
                window.location.replace(public_urls.login);
              })
              .catch((err) => {
                console.log("error");
              });
          }}
        >
          Salir
        </Button>
      </div>
    </Flex>
  );
}
