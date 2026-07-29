import MyLayout from "@/components/layout/layout";
import LayoutVentas from "@/components/layout/layout_caja";
import globals from "@/src/globals";
import dynamic from "next/dynamic";

const ModificarStock = dynamic(
  () => import("@/components/deposito/modificarStock"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>Cargando...</div>,
  },
);

export default function ListaStockV3() {
  return (
    <ModificarStock
      dataDef={{
        title: "Armazones",
        idInicial: globals.familiaIDs.ARMAZON,
        tipoInicial: "familia",
        nombreInicial: "ARMAZONES",
      }}
      defIdFamilia={globals.familiaIDs.ARMAZON}
      familiaEnabled={false}
    />
  );
}

ListaStockV3.PageLayout = globals.esUsuarioDepositoMin()
  ? LayoutVentas
  : MyLayout;
