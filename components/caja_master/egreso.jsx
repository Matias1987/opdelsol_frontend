import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Button, Col, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";

const Egreso = (props) => {
  const {callback, aCajaMaster} = props;
  const [motivos, setMotivos] = useState([]);

  const [egreso, setEgreso] = useState({
    idMotivo: -1,
    monto: 0,
    idcaja: 3252,
  });

  const load = (_) => {
     
    fetch(get.conceptos_gasto)
      .then((response) => response.json())
      .then((response) => {
        //alert(JSON.stringify(response))
        setMotivos(
          response.data.map((r) => ({
            value: r.idconcepto_gasto,
            label: r.nombre,
          }))
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
    //alert(JSON.stringify(egreso))
    // Aquí se implementaría la lógica para guardar el egreso
    console.log("Egreso guardado:", egreso);
    const url = aCajaMaster ? post.insert.egreso_cm : post.insert.egreso;
    post_method(url, egreso, response=>{
        alert("Datos Guardados");
        callback?.();

    })
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
      <Row style={row_style}>
        <Col span={24}>
          <Button type="primary" onClick={onGuardar}>
            Agregar Egreso
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Egreso;
