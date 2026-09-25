import LayoutAdmin from "@/components/layout/layout_admin";
import { Tabs } from "antd";
import dynamic from "next/dynamic";

const CuotasPendientesTarjetas = dynamic(
  () => import("@/components/informes/caja/cuotasPendientesTarjetas"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);
const InformeTarjetas = dynamic(
  () => import("@/components/informes/cobros/informeTarjetas"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);
const CobrosTarjetaDia = dynamic(
  () => import("@/components/informes/caja/cobrosTarjetaDia"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);

const InformeCobrosTarjetas = () => {
  const items = [
    {
      key: "1",
      label: "Cuotas",
      children: <CuotasPendientesTarjetas />,
    },
    {
      key: "2",
      label: "Totales Tarjetas",
      children: <InformeTarjetas />,
    },

    {
      key: "3",
      label: "Operaciones del Día",
      children: <CobrosTarjetaDia />,
    },
  ];

  const onChange = (key) => {};

  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
      type="card"
      size="large"
    />
  );
};

export default InformeCobrosTarjetas;

InformeCobrosTarjetas.PageLayout = LayoutAdmin;
