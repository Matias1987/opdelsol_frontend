import LayoutLaboratorio from "@/components/layout/layout_laboratorio";
import dynamic from "next/dynamic";

const ListaFacturas = dynamic(
  () => import("@/components/admin/factura/listaFacturas"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);

const lista_facturas_deposito = (props) => {
  return (
    <>
      <ListaFacturas />
    </>
  );
};
lista_facturas_deposito.PageLayout = LayoutLaboratorio;
export default lista_facturas_deposito;
