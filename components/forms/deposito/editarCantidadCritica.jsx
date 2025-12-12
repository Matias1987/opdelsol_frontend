import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row } from "antd";
import { useState } from "react";
import DetalleCodigoHeader from "../DetalleCodigoHeader";

const EditarCantidadCritica = (props) => {
  const [codigo, setCodigo] = useState({
    idcodigo: props.idcodigo,
    stock_ideal: 0,
  });

  const onSave = () => {
    alert("...to do")
    return;
    post_method(post.update.editar_cantidad_ideal, codigo, (resp) => {
      alert("OK");
      props?.callback?.();
    });
  };
  const row_style = {
    padding: "8px",
  };

  return (
    <>
      <Row style={row_style}>
        <Col span={24}>
          <h3>Establecer Cantidad Cr&iacute;tica</h3>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DetalleCodigoHeader
            idcodigo={props.idcodigo}
            size={"small"}
            hideImage
          />
        </Col>
      </Row>
      <Row style={row_style}>
        <Col span={24}>
          <Input
            type="number"
            step={1}
            min={0}
            prefix="Cantidad Crítica: "
            onChange={(e) => {
              setCodigo((c) => ({
                ...c,
                stock_ideal: parseInt(e.target.value),
              }));
            }}
          />
        </Col>
      </Row>
      <Row style={row_style}>
        <Col span={24}>
          <Button type="primary" onClick={onSave}>
            Guardar
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default EditarCantidadCritica;
