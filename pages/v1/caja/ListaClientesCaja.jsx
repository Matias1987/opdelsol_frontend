import CodeGridHTML from "@/components/etc/CodeGridHTML";
import LayoutCaja from "@/components/layout/layout_caja";
import ListaClientes from "@/components/ListaClientes";

export default function ListaClientesCaja() {
  return (
    <>
      <ListaClientes ficha />
      {/*<CodeGridHTML />*/}
    </>
  );
}

ListaClientesCaja.PageLayout = LayoutCaja;
