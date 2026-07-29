import dynamic from "next/dynamic";

const ListaFacturas = dynamic(
  () => import("@/components/admin/factura/listaFacturas"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
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
