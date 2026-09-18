import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Button, Col, Divider, Input, Row, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import EgresoModo from "./egreso_modo";
import { v4 as uuidv4 } from "uuid";
const Egreso = (props) => {
  const { callback, aCajaMaster } = props;
  const postIdRef = useRef(uuidv4()); 
  const [motivos, setMotivos] = useState([]);
  const [btnEnabled, setBtnEnabled] = useState(true);
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
    setBtnEnabled(false);
    const url = aCajaMaster ? post.insert.egreso_cm : post.insert.egreso;
    post_method(url, {...egreso, uid: postIdRef.current }, (response) => {
      setBtnEnabled(true);
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
      {/*<Row style={{paddingLeft:"6px", paddingRight:"6px", paddingTop:"6px"}}>
        <Col span={24}>
          <EgresoModo callback={(modos) => setEgreso({ ...egreso, modos })} />
        </Col>
      </Row>*/}
      <Divider />
      <Row style={{paddingLeft:"6px", paddingRight:"6px", paddingBottom:"6px"}}>
        <Col span={24}>
          <Button type="primary" onClick={onGuardar} disabled={egreso.idMotivo==-1 || egreso.monto<=0 || !btnEnabled/* || egreso.modos.length==0*/} block>
            Guardar Egreso
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Egreso;
