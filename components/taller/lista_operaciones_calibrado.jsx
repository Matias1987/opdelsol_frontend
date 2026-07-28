import ListaVentas from "@/components/informes/ventas/ListaVentas";
import EditarSobre from "@/components/taller/EditarSobre";
import { Col, Modal, Row } from "antd";
import { useEffect, useState } from "react";

export default function LisaOperacionesCalibrado() {
  const [idventa, setIdVenta] = useState(-1);
  const [idTrabajo, setIdTrabajo] = useState(-1);
  const [idBusqueda, setIdBusqueda] = useState(-1);
  const [idSucursal, setIdSucursal] = useState(-1);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(() => {}, []);
  return (
    <>
      <Row>
        <Col span={24}>
          <ListaVentas
            idsucursal={idSucursal}
            titulo="Calibrado"
            id={idBusqueda}
            estado_taller="CALIBRADO"
            estado_trabajo="CALIBRADO"
            mostrarEstado="0"
            ignoreSucursal
            laboratorio_modificar
            enviar_a_sucursal
            en_laboratorio={1}
            ignoreSucursalEntrega
            estado={"PENDIENTE"}
            onEditLaboratorioClick={(id, _idTrabajo) => {
              setIdVenta(id);
              setIdTrabajo(_idTrabajo ? _idTrabajo : -1);
              setOpen(true);
            }}
            key={reload}
          />
        </Col>
      </Row>
      <Modal
        destroyOnClose
        open={open}
        footer={null}
        onCancel={() => {
          setOpen(false);
        }}
        key={idventa}
        width={"100%"}
      >
        <EditarSobre
          readonly={false}
          idventa={idventa}
          idtrabajo={idTrabajo}
          callback={() => {
            (setReload(!reload), setOpen(false));
          }}
        />
      </Modal>
    </>
  );
}
