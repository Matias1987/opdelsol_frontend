import ModificarStock from "@/components/deposito/modificarStock";
import LayoutLaboratorio from "@/components/layout/layout_laboratorio";
import globals from "@/src/globals";

export default function stock_taller() {
  return (
    <ModificarStock

    />
  );
}

stock_taller.PageLayout = LayoutLaboratorio;
/*

      dataDef={{
        title: "Armazones",
        idInicial: globals.familiaIDs.CRISTALES,
        tipoInicial: "familia",
        nombreInicial: "CRISTALES",
      }}
      defIdFamilia={globals.familiaIDs.CRISTALES}
      familiaEnabled={false}*/