import CodeSelect from "../CodeSelect";

import { Row, Col, Button, Input, Divider, InputNumber, Card } from "antd";
import SubGroupSelectV2 from "../SubGrupoSelectV2";
import { useState } from "react";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { convertInputToUpper } from "@/src/helpers/string_helper";

const AddStockQuick = ({ callback }) => {
  const [codigo, setCodigo] = useState({
    codigo: "",
    descripcion: "",
    precio: 0,
    idsubgrupo: -1,
  });

  const onChange = (key, value) => {
    setCodigo((c) => ({
      ...c,
      [key]: value,
    }));
  };

  const onSave = () => {
    if((codigo.codigo.trim()).length<1)
    {
        alert("Código no válido")
        return
    }
    if((codigo.descripcion.trim()).length<1)
    {
        alert("Descripción no válida")
        return
    }
    if(+codigo.idsubgrupo<1)
    {
        alert("Seleccione categoría")
        return
    }
    post_method(post.agregar_stock_quick, codigo, (response) => {
      //alert(JSON.stringify(response))
      if ((response.data.msg ?? "").includes("DUPLICATED")) {
        alert("El código ya existe.");
        return;
      }
      callback?.({
        idcodigo: response.data.idcodigo,
        codigo: response.data.codigo,
        descripcion: codigo.descripcion,
        costo: codigo.precio,
      });
    });
  };

  return (
    <>
    <Card title="Agregar Stock" size="small" style={{maxWidth:"800px"}}>
      <Row style={{ padding: "8px" }}>
        <Col>
          <SubGroupSelectV2
            callback={(_id) => {
              onChange("idsubgrupo", _id);
            }}
          />
          <Divider />
        </Col>
      </Row>
      <Row style={{ padding: "8px" }}>
        <Col span={24}>
          <Input
            style={{maxWidth:"600px"}}
            value={codigo.codigo}
            onInput={convertInputToUpper}
            prefix={<span style={{ fontWeight: "bold" }}>C&oacute;digo: </span>}
            allowClear
            onChange={(e) => {
              onChange("codigo", e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row style={{ padding: "8px" }}>
        <Col span={24}>
          <Input
            style={{maxWidth:"600px"}}
            value={codigo.descripcion}
            onInput={convertInputToUpper}
            prefix={
              <span style={{ fontWeight: "bold" }}>Descripci&oacute;n: </span>
            }
            allowClear
            onChange={(e) => {
              onChange("descripcion", e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row style={{ padding: "8px" }}>
        <Col span={24}>
          <InputNumber
            value={codigo.precio}
            style={{ width: "300px" }}
            decimalSeparator="."
            prefix={
              <span
                style={{ fontWeight: "bold" }}
                onChange={(value) => {
                  onChange("precio", value ?? "0");
                }}
                value={codigo.precio}
              >
                Precio:{" "}
              </span>
            }
          />
        </Col>
      </Row>

      <Divider />
      <Row style={{ padding: "8px" }}>
        <Col span={24} style={{ display: "flex", justifyContent: "left" }}>
          <Button type="primary" onClick={onSave}>
            Guardar
          </Button>
        </Col>
      </Row>
      </Card>
    </>
  );
};

export default AddStockQuick;
