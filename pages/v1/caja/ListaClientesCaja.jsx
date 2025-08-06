import CodeGridHTML from "@/components/etc/CodeGridHTML";
import LayoutCaja from "@/components/layout/layout_caja";
import ListaClientes from "@/components/ListaClientes";
import RemoteCodeImporter from "@/components/remoto/deposito/code_importer";

export default function ListaClientesCaja() {
  return (
    <>
      {/*<ListaClientes ficha />*/}
      <RemoteCodeImporter />
     
    </>
  );
}

ListaClientesCaja.PageLayout = LayoutCaja;
