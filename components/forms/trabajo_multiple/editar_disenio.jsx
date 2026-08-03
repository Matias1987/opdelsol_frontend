import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Button, Card, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

const EditarDisenio = ({ idsubgrupo, callback }) => {
  const [btnEnabled, setBtnEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const row_style = { padding: "8px" };
  const [uid, setUID] = useState("");
  const [sg, setSG] = useState({
    idsubgrupo: idsubgrupo,
    comentarios: "",
    precio_defecto_mayorista: 0,
    nombre_largo: "",
    uid: uid,
  });

  const onChange = (index, value) => {
    setSG((prev) => {
      const newSG = { ...prev };
      newSG[index] = value;
      return newSG;
    });
  };

  const validateField = () => {
    if (sg.nombre_largo.trim() === "") {
      alert("El nombre largo no puede estar vacío");
      return false;
    }
    if (sg.precio_defecto_mayorista < 0) {
      alert("El precio no puede ser negativo");
      return false;
    }
    return true;
  };

  const actualizar = () => {
    if (!validateField()) return;
    setBtnEnabled(false);
    post_method(post.update.subgrupo_2, sg, (resp) => {
      alert("Datos actualizados correctamente");
      setBtnEnabled(true);
      callback?.();
    });
  };

  const load = () => {
    setLoading(true);
    fetch(get.obtener_detalle_subgrupo + idsubgrupo)
      .then((r) => r.json())
      .then((response) => {
        setSG({
          ...sg,
          comentarios: response.data[0].comentarios,
          precio_defecto_mayorista: parseFloat(response.data[0].precio_defecto_mayorista) || 0,
          nombre_largo: response.data[0].nombre_largo,
        });
        setLoading(false);
      })
      .catch((e) => {
        console.log("error");
      });
  };

  useEffect(() => {
    setUID(uuidv4());
    load();
  }, []);
  return (
    <>
      <Card title="Modificar Prod. Mayorista" size="small" loading={loading}>
        <Row style={row_style}>
          <Col span={24}>
            <Input
              addonBefore="Nombre: "
              value={sg.nombre_largo}
              onChange={(e) => onChange("nombre_largo", e.target.value)}
            />
          </Col>
        </Row>
        {/*<Row style={row_style}>
          <Col span={24}>
            <Input
              addonBefore="Descripción: "
              value={sg.comentarios}
              onChange={(e) => onChange("comentarios", e.target.value)}
            />
          </Col>
        </Row>*/}
        <Row style={row_style}>
          <Col span={24}>
            <Input
              addonBefore="Precio: "
              value={sg.precio_defecto_mayorista}
              onChange={(e) =>
                onChange(
                  "precio_defecto_mayorista",
                  parseFloat(e.target.value) || 0,
                )
              }
            />
          </Col>
        </Row>
        <Row style={row_style}>
          <Col span={24}>
            <Button
              block
              type="primary"
              onClick={actualizar}
              disabled={!btnEnabled}
            >
              Guardar
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default EditarDisenio;
