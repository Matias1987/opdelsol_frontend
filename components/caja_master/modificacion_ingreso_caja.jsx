import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Divider, Input, Row } from "antd";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ModifIngresoCaja = (props) => {
  const { callback, selectedRow, idCajaOrigen } = props;
  const [btnEnabled, setBtnEnabled] = useState(true);
  const postIdRef = useRef(uuidv4());
  const [modifIngreso, setModifIngreso] = useState({
    comentarios: `Transferencia de caja ${selectedRow.sucursal} del día: ${selectedRow.fecha}`,
    montoSist: selectedRow.s,
    montoFisico: selectedRow.s,
    idCajaOrigen: selectedRow.idcaja,
    idCajaDestino: null,
  });

  const onSave = (_) => {
    setBtnEnabled(false);
    post_method(
      post.insert.modificacion_ingreso_caja,
      { ...modifIngreso, uid: postIdRef.current },
      (response) => {
        setBtnEnabled(true);
        alert("Datos Guardados");
        callback?.();
      },
    );
  };

  const onChange = (field, value) => {
    setModifIngreso({
      ...modifIngreso,
      [field]: value,
    });
  };

  const row_style = {
    padding: "6px",
  };


  return (
    <>
      <Row style={row_style}>
        <Col span={24}>
          <Input
            readOnly
            value={modifIngreso.montoSist}
            prefix="Monto en Sistema: "
            placeholder="Monto registrado en el sistema"
            onChange={(e) => onChange("montoSist", e.target.value)}
          />
        </Col>
      </Row>
      <Row style={row_style}>
        <Col span={24}>
          <Input
            value={modifIngreso.montoFisico}
            prefix="Monto Físico: "
            placeholder="Monto registrado físicamente"
            type="number"
            onChange={(e) => onChange("montoFisico", e.target.value)}
          />
        </Col>
      </Row>
      <Row style={row_style}>
        <Col span={24}>
          <Input
            value={modifIngreso.comentarios}
            prefix="Comentarios: "
            placeholder="Comentarios sobre la modificación"
            type="text"
            onChange={(e) => onChange("comentarios", e.target.value)}
          />
        </Col>
      </Row>
      <Divider />
      <Row style={row_style}>
        <Col span={24}>
          <Button type="primary" onClick={onSave} disabled={!btnEnabled}>
            Guardar
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ModifIngresoCaja;
