import MyLayout from "@/components/layout/layout";

import dynamic from "next/dynamic";

const DescargarEnvio = dynamic(
  () => import("@/components/forms/deposito/DescargaEnvio"),
  {
    ssr: false,
    loading: () => <div style={{ width:"100px" }}>Cargando...</div>,
  },
);

export default function Importar(props) {
  return (
    <>
      <DescargarEnvio />
    </>
  );
}

Importar.PageLayout = MyLayout;
