//import TotalesVentasDiaEmpleado from "@/components/admin/dashboard_components/totales_ventas_dia_empleado";
//import Egreso from "@/components/caja_master/egreso";
//import EdicionVentas from "@/components/edicion_ventas/EdicionVentas";
//import TestGridCreation from "@/components/etc/testGridCreation";
//import TrabajoRecetaStock from "@/components/forms/ventas/trabajo/trab_receta_stock";
import BranchSelector from "@/components/etc/BranchSelector";
import ProcessIAResponse from "@/components/forms/trabajo_multiple/minorista/common/processIAResponse";
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

  // Datos de ejemplo
const MOCK_BRANCHES = [
  {
    id: 1,
    code: 'SUC-01',
    name: 'Casa Central - Centro',
    address: 'Av. Sarmiento 450',
    city: 'Resistencia',
    active: true,
    statusText: 'Operativa • Turno Mañana',
  },
  {
    id: 2,
    code: 'SUC-02',
    name: 'Sucursal Shopping',
    address: 'Av. Ávalos 1200, Local 14',
    city: 'Resistencia',
    active: true,
    statusText: 'Operativa',
  },
  {
    id: 3,
    code: 'SUC-03',
    name: 'Sucursal Corrientes Capital',
    address: 'Junín 1120',
    city: 'Corrientes',
    active: true,
    statusText: 'Operativa',
  },
  {
    id: 4,
    code: 'SUC-04',
    name: 'Depósito Norte',
    address: 'Ruta 11 Km 1008',
    city: 'Resistencia',
    active: false,
    statusText: 'En mantenimiento',
  },
];
  return (
    <div>
      <BranchSelector branches={MOCK_BRANCHES} loading={false} nSelectBranch={_=>{}}/>
      {/*<Button
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
      </Modal>*/}
    </div>
  );
}

test.PageLayout = LayoutAdmin;
