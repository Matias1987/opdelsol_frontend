import MyLayout from "@/components/layout/layout";
import LayoutVentas from "@/components/layout/layout_ventas";
import globals from "@/src/globals";

import dynamic from "next/dynamic";

const EnvioForm = dynamic(
  () => import("@/components/forms/EnvioForm"),
  {
    ssr: false,
    loading: () => <div style={{ width:"100px" }}>Cargando...</div>,
  },
);


export default function NuevoEnvio() {
  return (
    <>
      <EnvioForm action="NONE" />
    </>
  );
}

NuevoEnvio.PageLayout = globals.esUsuarioDepositoMin()
  ? LayoutVentas
  : MyLayout;
