import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Button, Col, Divider, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import EgresoModo from "./egreso_modo";

const Egreso = (props) => {
  const { callback, aCajaMaster } = props;
  const [motivos, setMotivos] = useState([]);

  const [egreso, setEgreso] = useState({
    idMotivo: -1,
    monto: 0,
    idcaja: null,
    modos: [],
  });

  const load = (_) => {
    fetch(get.conceptos_gasto)
      .then((response) => response.json())
      .then((response) => {
        setMotivos(
          response.data.map((r) => ({
            value: r.idconcepto_gasto,
            label: r.nombre,
          })),
        );
      });
  };

  useEffect(() => {
    load();
  }, []);

  const row_style = {
    padding: "6px",
  };

  const onGuardar = () => {
    // Aquí se implementaría la lógica para guardar el egreso
    console.log("Egreso guardado:", egreso);
    const url = aCajaMaster ? post.insert.egreso_cm : post.insert.egreso;
    post_method(url, egreso, (response) => {
      alert("Datos Guardados");
      callback?.();
    });
  };

  return (
    <>
      <Row style={row_style}>
        <Col span={24}>
          <Select
            prefix="Motivo: "
            style={{ width: "100%" }}
            options={motivos}
            placeholder="Seleccione Motivo"
            onChange={(value) => setEgreso({ ...egreso, idMotivo: value })}
          />
        </Col>
      </Row>
      <Row style={row_style}>
        <Col span={24}>
          <Input
            prefix="Monto: "
            placeholder="Ingrese Monto.."
            type="number"
            onChange={(e) => setEgreso({ ...egreso, monto: e.target.value })}
          />
        </Col>
      </Row>
      <Row style={{paddingLeft:"6px", paddingRight:"6px", paddingTop:"6px"}}>
        <Col span={24}>
          <EgresoModo callback={(modos) => setEgreso({ ...egreso, modos })} />
        </Col>
      </Row>
      <Divider />
      <Row style={{paddingLeft:"6px", paddingRight:"6px", paddingBottom:"6px"}}>
        <Col span={24}>
          <Button type="primary" onClick={onGuardar} disabled={egreso.idMotivo==-1 || egreso.monto<=0/* || egreso.modos.length==0*/} block>
            Guardar Egreso
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Egreso;
