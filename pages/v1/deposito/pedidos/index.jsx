import MyLayout from "@/components/layout/layout";
import AdminPedidos from "@/components/pedidos/lista_pedidos";

export default function PedidosDeposito() {
  return (
    <>
      <AdminPedidos />
    </>
  );
}

PedidosDeposito.PageLayout = MyLayout;
