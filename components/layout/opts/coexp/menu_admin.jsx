import AreaChartOutlined from "@ant-design/icons/AreaChartOutlined";
import BoxPlotOutlined from "@ant-design/icons/BoxPlotOutlined";
import CreditCardOutlined from "@ant-design/icons/CreditCardOutlined";
import DollarOutlined from "@ant-design/icons/DollarOutlined";
import HomeFilled from "@ant-design/icons/HomeFilled";
import MenuOutlined from "@ant-design/icons/MenuOutlined";
import { Button, Menu, Modal } from "antd";
import { useState } from "react";
import Link from "next/link";
import { public_urls } from "@/src/urls";
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
    key: "mtj",
  },
  {
    label: (
      <Link
        style={{ fontWeight: "601", fontSize: "1.1em", color: "#102C3E" }}
        href={public_urls.custom.copex.monto_ventas_mes}
      >
        <CreditCardOutlined /> Montos Mes
      </Link>
    ),
    key: "mvm",
  },
  {
    label: (
      <Link
        style={{ fontWeight: "600", fontSize: "1.1em", color: "#102C3E" }}
        href={public_urls.lista_ventas_dia_vendedor}
      >
        <AreaChartOutlined /> Ventas D&iacute;a
      </Link>
    ),
    key: "vdv",
  },
  {
    label: (
      <Link
        style={{ fontWeight: "600", fontSize: "1.1em", color: "#102C3E" }}
        href={public_urls.stock_admin}
      >
        <BoxPlotOutlined /> Stock
      </Link>
    ),
    key: "16",
  },
  {
    label: "Tablas",
    key: "SubMenu",
    icon: <MenuOutlined />,
    children: [

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
    label: (
      <>
        <Button onClick={(_) => setModalBuscarVentaOpen(true)}>
          Buscar Venta
        </Button>
      </>
    ),
    key: "buscar_venta",
  },
];

export default function MenuAdminCOExp() {
  const [modalBuscarVentaOpen, setModalBuscarVentaOpen] = useState(false);
  const [current, setCurrent] = useState("12");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <>
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
      <Modal
        open={modalBuscarVentaOpen}
        onCancel={(_) => setModalBuscarVentaOpen(false)}
        destroyOnClose
        width={"100%"}
        footer={null}
      >
        <BuscarVenta />
      </Modal>
    </>
  );
}
