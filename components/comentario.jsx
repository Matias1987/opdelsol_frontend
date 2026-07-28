import globals from "@/src/globals";
import { useEffect, useState } from "react";

import { Row, Col, Input } from "antd";

const { TextArea } = Input || {};
const Comentario = (props) => {
  const [comentario, setComentario] = useState({
    idusuario: globals.obtenerUID(),
    tipo: props.tipo,
    comentario: "",
    idsucursal: globals.obtenerSucursal(),
  });

  useEffect(() => {
    setComentario({
      idusuario: globals.obtenerUID(),
      tipo: props.tipo,
      comentario: "",
      idsucursal: globals.obtenerSucursal(),
    });
  }, []);

  const onChange = (idx, val) => {
    setComentario((c) => {
      const _c = { ...c, [idx]: val };
      props?.callback?.(_c);
      return _c;
    });
  };

  const _row_style = {
    padding: ".5em",
  };

  return (
    <>
      <Row style={_row_style}>
        <Col span={24}>
          <h3>Comentario</h3>
        </Col>
      </Row>

      <Row style={_row_style}>
        <Col span={24}>
          <TextArea
            rows={4}
            placeholder="Max Length is 255"
            maxLength={255}
            onChange={(e) => {
              onChange("comentario", e.target.value);
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default Comentario;
