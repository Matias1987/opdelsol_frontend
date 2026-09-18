import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Ingreso = (props) => {
  const { callback, cm } = props;
  const postIdRef = useRef(uuidv4());
  const [btnEnabled, setBtnEnabled] = useState(true);
  const [ingreso, setIngreso] = useState({
    fuente: "",
    monto: 0,
    idcaja: null,
    cm: cm ? cm : 0,
  });

  const row_style = {
    padding: "6px",
  };

  const onSave = (_) => {
    setBtnEnabled(false);
    post_method(
      post.insert.ingreso,
      { ...ingreso, uid: postIdRef.current },
      (response) => {
        setBtnEnabled(true);
        alert("Datos Guardados");
        callback?.();
      },
    );
  };

  return (
    <>
      <Row style={row_style}>
        <Col span={24}>
          <Input
            value={ingreso.fuente}
            onChange={(e) => setIngreso({ ...ingreso, fuente: e.target.value })}
            prefix="Detalle: "
            placeholder="Ingrese Detalle..."
            type="text"
          />
        </Col>
      </Row>
      <Row style={row_style}>
        <Col span={24}>
          <Input
            value={ingreso.monto}
            onChange={(e) => setIngreso({ ...ingreso, monto: e.target.value })}
            prefix="Monto: "
            placeholder="Ingrese Monto.."
            type="number"
          />
        </Col>
      </Row>
      <Row style={row_style}>
        <Col span={24}>
          <Button type="primary" onClick={onSave} disabled={!btnEnabled}>
            Agregar Ingreso
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Ingreso;
