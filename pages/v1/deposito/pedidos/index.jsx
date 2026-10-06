import MyLayout from "@/components/layout/layout";
import AdminPedidos from "@/components/pedidos/lista_pedidos";

export default function PedidosDeposito() {
  return (
    <>
      <AdminPedidos modo="interno" recibidos={1} />
    </>
  );
}

PedidosDeposito.PageLayout = MyLayout;
