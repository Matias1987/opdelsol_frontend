import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Button, Card, Col, Divider, Row, Select } from "antd";
import { useEffect, useState } from "react";

const AgregarSubgrupoAGrupo = ({ subfamiliaId, subgrupoId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [grupos, setGrupos] = useState([]);
  const [selectedGrupo, setSelectedGrupo] = useState(null);
  const [btnEnabled, setBtnEnabled] = useState(true);

  const load_grupos = () => {
    setLoading(true);
    fetch(get.optionsforsubfamilia + subfamiliaId + "/1")
      .then((r) => r.json())
      .then((response) => {
        //alert(JSON.stringify(response))
        setGrupos(response.data)
        setLoading(false);
      })
      .catch((e) => {});
  };

  const on_aplicar = () => {
    if (!selectedGrupo) {
      alert("Seleccione Grupo");
      return;
    }

    const data = {
      idgrupo: selectedGrupo,
      idsubgrupo: subgrupoId,
    };
    setBtnEnabled(false);
    post_method(post.agregar_sg_a_g, data, (response) => {
      alert("Subgrupo agregado.");

      onClose?.();
    });
  };

  useEffect(() => {
    load_grupos();
  }, []);

  return (
    <>
      <Card size="small">
        <Row>
          <Col span={24}>Seleccione Grupo</Col>
        </Row>
        <Row>
          <Col span={24}>
            <Select
              onChange={(v) => {
                setSelectedGrupo(v);
              }}
              loading={loading}
              options={grupos}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <Button
              disabled={!btnEnabled}
              loading={loading}
              block
              onClick={on_aplicar}
            >
              Aplicar
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default AgregarSubgrupoAGrupo;
