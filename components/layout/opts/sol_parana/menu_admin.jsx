import {
  AreaChartOutlined,
  BoxPlotOutlined,
  CreditCardOutlined,
  DollarOutlined,
  HomeFilled,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import Link from "next/link";
import { public_urls } from "@/src/urls";
import { lista_precios_visible } from "@/src/config";
import CustomModal from "@/components/CustomModal";
import ListaPreciosV3 from "@/components/lista_precios/listaPreciosV3";
import BuscarVenta from "@/components/forms/ventas/BuscarVenta";

const items = [
  {
    label: (
      <Link
        style={{ fontWeight: "600", fontSize: "1.1em", color: "#102C3E" }}
        href={public_urls.dashboard_admin}
      >
        <HomeFilled /> Inicio
      </Link>
    ),
    key: "12",
  },
  {
    label: (
      <Link
        style={{ fontWeight: "600", fontSize: "1.1em", color: "#102C3E" }}
        href={public_urls.panel_ventas}
      >
        <AreaChartOutlined /> Ventas
      </Link>
    ),
    key: "ventas",
  },
    /*{
    label: (
      <Link
        style={{ fontWeight: "600", fontSize: "1.1em", color: "#102C3E" }}
        href={public_urls.lista_ventas_dia_vendedor}
      >
        <AreaChartOutlined /> Ventas D&iacute;a
      </Link>
    ),
    key: "14",
  },
    {
    label: (
      <Link
        style={{ fontWeight: "600", fontSize: "1.1em", color: "#102C3E" }}
        href={public_urls.totales_venta_vendedores}
      >
        <AreaChartOutlined /> Totales Venta Mes
      </Link>
    ),
    key: "10",
  },
  {
    label: (
      <Link
        style={{ fontWeight: "600", fontSize: "1.1em", color: "#102C3E" }}
        href={public_urls.ventas_medicos}
      >
        <AreaChartOutlined /> Ventas M&eacute;dicos
      </Link>
    ),
    key: "11",
  },*/
  {
    label: (
      <Link
        style={{ fontWeight: "600", fontSize: "1.1em", color: "#102C3E" }}
        href={public_urls.lista_cajas_admin}
      >
        <DollarOutlined /> Cajas
      </Link>
    ),
    key: "cajas",
  },
  
  {
    label: (
      <Link
        style={{ fontWeight: "600", fontSize: "1.1em", color: "#102C3E" }}
        href={public_urls.informe_cobros_tarjetas}
      >
        <CreditCardOutlined /> Monto Tarjetas
      </Link>
    ),
    key: "501",
  },
  /*{
    label: (
      <Link
        style={{ fontWeight: "600", fontSize: "1.1em", color: "#102C3E" }}
        href={public_urls.stock_admin}
      >
        <BoxPlotOutlined /> Stock
      </Link>
    ),
    key: "16",
  },*/
  {
    label: "Tablas",
    key: "SubMenu",
    icon: <MenuOutlined />,
    children: [
      /*{
        label: (
          <Menu.Item>
            <Link href={public_urls.listausuarios}>Usuarios</Link>
          </Menu.Item>
        ),
        key: "170",
      },*/
      {
        key: "100",
        label: (
          <Menu.Item>
            <Link href={public_urls.admin_sucursales}>Sucursales</Link>
          </Menu.Item>
        ),
      },
      {
        key: "200",
        label: (
          <Menu.Item>
            <Link href={public_urls.admin_medicos}>Medicos</Link>
          </Menu.Item>
        ),
      },
      {
        key: "300",
        label: (
          <Menu.Item>
            <Link href={public_urls.admin_bancos}>Bancos</Link>
          </Menu.Item>
        ),
      },
      {
        key: "400",
        label: (
          <Menu.Item>
            <Link href={public_urls.admin_tarjetas}>Tarjetas</Link>
          </Menu.Item>
        ),
      },
      {
        key: "500",
        label: (
          <Menu.Item>
            <Link href={public_urls.lista_conceptos_gastos}>
              Conceptos Gastos
            </Link>
          </Menu.Item>
        ),
      },
    ],
    
  },

  {
    label: <BuscarVenta />,
    key: "buscar_venta",
  },

];

if (lista_precios_visible != 0) {
  items.push({
    label: (
      <CustomModal
        width="100%"
        openButtonText={<>Lista de Precios</>}
        type="text"
      >
        <ListaPreciosV3 />
      </CustomModal>
    ),
    key: "1001",
  });
}
export default function MenuAdminSolParana() {
  const [current, setCurrent] = useState("12");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Menu
      style={{
        backgroundColor: "#41B79E" /*"#C4DD76""lightblue"*/,
        boxShadow: "0px 5px  30px #959A9A",
        borderTop: "3px solid #236254",
        borderEndEndRadius: "16px",
        borderEndStartRadius: "16px",
      }}
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}
