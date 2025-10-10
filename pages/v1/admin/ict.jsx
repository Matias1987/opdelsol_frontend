import CobrosTarjetaDia from "@/components/informes/caja/cobrosTarjetaDia";
import CuotasPendientesTarjetas from "@/components/informes/caja/cuotasPendientesTarjetas";
import InformeTarjetas from "@/components/informes/cobros/informeTarjetas";
import LayoutAdmin from "@/components/layout/layout_admin";
import { Tabs } from "antd";

/**informe cobros tarjetas */
const InformeCobrosTarjetas = () => {
  //return <><InformeTarjetas /></>
  const items = [
    {
      key: "1",
      label: "Cuotas",
      children: <CuotasPendientesTarjetas/>,
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

  const onChange = (key) => {}

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default InformeCobrosTarjetas;

InformeCobrosTarjetas.PageLayout = LayoutAdmin;
