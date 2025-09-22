import SubGroupSelectV2 from "@/components/SubGrupoSelectV2";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import {
  Row,
  Col,
  Checkbox,
  Modal,
  Button,
  Input,
  Radio,
  Table,
  Card,
} from "antd";
import { useState, useEffect } from "react";

const EditarCodigoGrupo = ({ codigos, callback }) => {
  const [editarSubgrupo, setEditarSubgrupo] = useState(false);
  const [editarModoPrecio, setEditarModoPrecio] = useState(false);
  const [modoPrecio, setModoPrecio] = useState(0);
  const [idsubgrupo, setIdSubgrupo] = useState(-1);
  const [modificarPrecio, setModificarPrecio] = useState(false);
  const [precio, setPrecio] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);
  const [vistaPreviaOpen, setVistaPreviaOpen] = useState(false);
  const [redondeo, setRedondeo] = useState(100);

  useEffect(() => {
    setEditarModoPrecio(false);
    setEditarSubgrupo(false);
  }, []);

  const onSave = (_) => {
    const params = {
      //precio: modificarPrecio ? precio : -1,
      idsubgrupo: editarSubgrupo ? idsubgrupo : -1,
      modoPrecio: !editarModoPrecio ? -1 : modoPrecio,
      idcodigos: (codigos || []).map((c) => c.idcodigo),
      //porcentaje: modificarPrecio ? porcentaje : -1,
      //redondeo: modificarPrecio ? redondeo : -1,
      //modificarPrecio: modificarPrecio ? 1 : 0,
    };

    if (!confirm("Confirmar cambios")) {
      return;
    }

    post_method(post.update.editar_lote_codigos, params, (response) => {
      alert("OK");
      setVistaPreviaOpen(false);
      callback?.();
    });
  };

  return (
    <>
      <Card title="Editar Lote">
        <>
          <Row>
            <Col span={24}>
              <Input.TextArea
                rows={2}
                disabled
                value={(codigos || []).map((c) => c.codigo + "\r\n").toString()}
                readOnly
                style={{ backgroundColor: "lightyellow", color: "darkblue" }}
              ></Input.TextArea>
            </Col>
          </Row>

          <Row style={{ padding: "1em" }}>
            <Col span={24}>
              <Row>
                <Col span={24} style={{padding:"3px"}}>
                  <Checkbox
                    onChange={() => {
                      setEditarSubgrupo(!editarSubgrupo);
                    }}
                    checked={editarSubgrupo}
                  >
                    Cambiar Subgrupo
                  </Checkbox>
                </Col>
                <Col span={24}>
                  <SubGroupSelectV2
                    callback={(id) => {
                      setIdSubgrupo(id);
                    }}
                    disabled={!editarSubgrupo}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ padding: "1em" }}>
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <Checkbox
                    onChange={() => {
                      setEditarModoPrecio(!editarModoPrecio);
                    }}
                    checked={editarModoPrecio}
                  >
                    Cambiar Modo Precio
                  </Checkbox>
                </Col>
                <Col span={12}>
                  <Radio.Group
                    disabled={!editarModoPrecio}
                    value={modoPrecio}
                    onChange={(e) => {
                      setModoPrecio((v) => {
                        switch (e.target.value) {
                          case 0:
                            break;
                          case 1:
                            break;
                        }
                        return e.target.value;
                      });
                    }}
                  >
                    <Radio value={1}>Precio Subgrupo</Radio>
                    <Radio value={2}>Precio Individual</Radio>
                  </Radio.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          {/*<Row style={{ padding: "1em" }}>
            <Col span={4}>
              <Checkbox
                onChange={() => {
                  setModificarPrecio(!modificarPrecio);
                }}
                checked={modificarPrecio}
              >
                Aumentar Precio (Individual){" "}
              </Checkbox>
            </Col>
            <Col span={20}>
              <Input
                disabled={!modificarPrecio}
                prefix={"Valor: "}
                type="number"
                value={precio}
                onChange={(e) => {
                  setPrecio(parseFloat(e.target.value || "0"));
                }}
                allowClear
              />
              <Button
                type="link"
                size="small"
                onClick={() => {
                  setPorcentaje("-100");
                  setRedondeo(1);
                }}
              >
                Reemplazar Precio
              </Button>
              <Input
                allowClear
                disabled={!modificarPrecio}
                prefix={"Porcentaje: "}
                suffix="%"
                onChange={(e) => {
                  setPorcentaje(parseFloat(e.target.value || "0"));
                }}
                value={parseFloat(porcentaje || "0")}
              />
              <Input
                disabled={!modificarPrecio}
                min={1}
                prefix={"Redondeo: "}
                type="number"
                onChange={(e) => {
                  setRedondeo(
                    parseFloat(e.target.value || "1") < 1
                      ? 1
                      : parseFloat(e.target.value)
                  );
                }}
                value={parseFloat(redondeo || "0")}
              />
            </Col>
          </Row>*/}

          <Row style={{ padding: "1em" }}>
            <Col span={24}>
              <Button
                type="primary"
                disabled={modificarPrecio&&false}
                block
                onClick={onSave}
              >
                Aplicar
              </Button>
              {/*<Button
                type="primary"
                disabled={!modificarPrecio}
                block
                onClick={() => {
                  setVistaPreviaOpen(true);
                }}
              >
                Vista Previa
              </Button>*/}
            </Col>
          </Row>
        </>
      </Card>
      <Modal
        open={vistaPreviaOpen}
        title=" "
        onCancel={() => {
          setVistaPreviaOpen(false);
        }}
        destroyOnClose
        width={"70%"}
        footer={null}
      >
        <>
          <Row>
            <Col span={24}>
              <Table
                columns={[
                  { title: "Codigo", dataIndex: "codigo" },
                  { title: "Precio Ant.", dataIndex: "precio_ant" },
                  { title: "Precio Nuevo", dataIndex: "precio_n" },
                ]}
                dataSource={codigos.map((c) => ({
                  codigo: c.codigo,
                  precio_ant: c.precio,
                  precio_n:
                    precio +
                    Math.trunc(
                      (c.precio * (1 + parseFloat(porcentaje) / 100.0)) /
                        redondeo
                    ) *
                      redondeo,
                }))}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Button type="primary" block onClick={onSave}>
                Aplicar
              </Button>
            </Col>
          </Row>
        </>
      </Modal>
    </>
  );
};

export default EditarCodigoGrupo;
