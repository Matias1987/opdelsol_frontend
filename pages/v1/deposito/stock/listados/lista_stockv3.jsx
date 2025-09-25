import ModificarStock from "@/components/deposito/modificarStock";
import MyLayout from "@/components/layout/layout";
import LayoutVentas from "@/components/layout/layout_caja";
import globals from "@/src/globals";

export default function ListaStockV3() {
    return <ModificarStock />
}

ListaStockV3.PageLayout = globals.esUsuarioDepositoMin()
  ? LayoutVentas
  : MyLayout;