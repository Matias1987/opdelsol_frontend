import dynamic from "next/dynamic";

const ListaFacturas = dynamic(
  () => import("@/components/admin/factura/listaFacturas"),
  {
    ssr: false,
    loading: () => <div style={{ width:"100px" }}>Cargando...</div>,
  },
);
const lista_facturas_deposito = (props) => {
  return (
    <>
      <ListaFacturas />
    </>
  );
};

export default lista_facturas_deposito;
