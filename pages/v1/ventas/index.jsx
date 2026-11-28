import OperacionesMovilPendientes from "@/components/forms/ventas/common/OperacionesMovilPendientes";
import OperacionesMovilTable from "@/components/forms/ventas/common/OperacionesMovilTable";
import LayoutVentasV2 from "@/components/layout/layout_ventas_v2";
import { useRouter } from "next/navigation";
export default function Index() {
  const router = useRouter();
  /*const _test = [
    {
      id: 1,
      codigo: "AB7K9",
      clienteNombre: "Juan Perez",
      vendedorNombre: "Bruno",
      sucursalNombre: "Resistencia Centro",
      datosDni: {
        numeroDocumento: "35222110",
        apellido: "Perez",
        nombre: "Juan",
      },
      datosReceta: {
        success: true,
        data: {
          paciente_nombre: null,
          medico_nombre: "Maria Laura Campi",
          graduacion_lejos: {
            ojo_derecho: {
              esfera: "-2.50",
              cilindro: "-1.00",
              eje: "90",
            },
            ojo_izquierdo: {
              esfera: "-3.75",
              cilindro: "-1.00",
              eje: "80",
            },
            dp: null,
          },
          graduacion_cerca: {
            ojo_derecho: {
              esfera: null,
              cilindro: null,
              eje: null,
            },
            ojo_izquierdo: {
              esfera: null,
              cilindro: null,
              eje: null,
            },
            dp: null,
          },
          adicion: "+1.50",
          tipo_lente: null,
          observaciones: null,
        },
      },
      estado: "PENDIENTE",
      fechaCreacion: "20/11/2026 14:35",
    },
  ];*/
  return (
    <>
      {/*<OperacionesMovilTable
        data={_test}
        onContinuar={(record) => {
          //const url = `/v1/ventas/VentaM?id=${record.id}`
          //alert(url)
          router.push(`/v1/ventas/VentaM?id=${record.id}`);
        }}
      />*/}
      <OperacionesMovilPendientes
        onContinuar={(record) => {
          router.push(`/v1/ventas/VentaM?id=${record.id}`);
        }}
      />
    </>
  );
}

Index.PageLayout = LayoutVentasV2;
