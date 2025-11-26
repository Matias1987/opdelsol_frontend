import ListaVentasDia from "@/components/admin/listaVentasDia";
import LayoutVentas from "@/components/layout/layout_ventas";
import globals from "@/src/globals";


export default function VentasDiasVendedores() {
  const date = new Date();
  return (
    <ListaVentasDia
      dia={date.getDate()}
      mes={date.getMonth() + 1}
      anio={date.getFullYear()}
      sucursal={globals.obtenerSucursal()}
      sucursalReadOnly={true}
    />
  );
}

VentasDiasVendedores.PageLayout = LayoutVentas;
