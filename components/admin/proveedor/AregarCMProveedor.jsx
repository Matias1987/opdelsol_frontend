import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, DatePicker, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const AgregarCMProveedor = (props) => {
  const [uid, setUID] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [cargaManual, setCargaManual] = useState({
    monto: "",
    comentarios: "",
    fecha: "",
    moneda: props.moneda,
  });

  const guardar = (_) => {
    if (isNaN(cargaManual.monto)) {
      alert("Ingrese un monto válido");
      return;
    }

    if (cargaManual.monto == 0) {
      alert("El monto debe ser distino a 0");
      return;
    }
    if (cargaManual.fecha == "") {
      alert("Debe ingresar una fecha");
      return;
    }
    setEnabled(false);
    post_method(
      post.insert.cm_proveedor,
      {
        ...cargaManual,
        modo: props.modo,
        fk_proveedor: props.idproveedor,
        uid: uid,
      },
      () => {
        alert("Datos Guardados");
        props?.callback?.();
      },
    );
  };

  useEffect(() => {
    setUID(uuidv4());
  }, []);

  return (
    <>
      <Row style={{ padding: "1em" }}>
        <Col span={24}>
          <DatePicker
            prefix="Fecha: "
            format={"DD-MM-YYYY"}
            onChange={(value) => {
              const _fecha = value ? value.format("YYYY-MM-DD") : "";
              //onChange("fecha", _fecha);
              setCargaManual((cm) => ({ ...cm, fecha: _fecha }));
            }}
          />
        </Col>
      </Row>
      <Row style={{ padding: "1em" }}>
        <Col span={24}>
          <Input
            prefix="Monto: "
            value={cargaManual.monto}
            onChange={(e) => {
              setCargaManual((cm) => ({ ...cm, monto: e.target.value }));
            }}
          />
        </Col>
      </Row>
      <Row style={{ padding: "1em" }}>
        <Col span={24}>
          <Input
            prefix="Comentarios: "
            value={cargaManual.comentarios}
            onChange={(e) => {
              setCargaManual((cm) => ({
                ...cm,
                comentarios: e.target.value || "",
              }));
            }}
          />
        </Col>
      </Row>
      <Row style={{ padding: "1em" }}>
        <Col span={24}>
          <Button block type="primary" onClick={guardar} disabled={!enabled}>
            Agregar
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default AgregarCMProveedor;
