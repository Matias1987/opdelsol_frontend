//import TotalesVentasDiaEmpleado from "@/components/admin/dashboard_components/totales_ventas_dia_empleado";
//import Egreso from "@/components/caja_master/egreso";
//import EdicionVentas from "@/components/edicion_ventas/EdicionVentas";
//import TestGridCreation from "@/components/etc/testGridCreation";
//import TrabajoRecetaStock from "@/components/forms/ventas/trabajo/trab_receta_stock";
import ProcessIAResponse from "@/components/forms/ventas/common/processIAResponse";
import LayoutAdmin from "@/components/layout/layout_admin";
import { Button, Modal } from "antd";
import { useState } from "react";
//import QRAccess from "@/components/qr_access/QRAccess";

export default function test() {
  const [open, setOpen] = useState(false);
  const example = {
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
  };
  return (
    <div>
      <Button
        onClick={(_) => {
          setOpen(true);
        }}
      >
        Open
      </Button>
      <Modal
        open={open}
        onCancel={(_) => setOpen(false)}
        destroyOnClose
        width={"100%"}
        footer={null}
      >
        <ProcessIAResponse jsonServer={example} />
      </Modal>
    </div>
  );
}

test.PageLayout = LayoutAdmin;
