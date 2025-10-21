import { Row, Col, Spin } from "antd";
import { useEffect, useState } from "react";
import { get } from "@/src/urls";
import TagsSmall from "@/components/etiquetas/tagsSmall";
import DefaultImageProduct from "@/components/etc/imagen/default_image_prod";

const DetalleCodigoHeader = (props) => {
  const [codigo, setCodigo] = useState(null);
  const { idcodigo } = props;

  useEffect(() => {
    fetch(get.detalle_codigo + idcodigo)
      .then((r) => r.json())
      .then((response) => {
        setCodigo(response.data[0]);
      });
  }, []);

  return codigo == null ? (
    <Spin />
  ) : (
    <>
      <div style={{ padding: "8px", borderRadius: "16px" }}>
        <Row gutter={8} style={{ backgroundColor:"#f1f1f1ff", borderRadius:"16px", padding:"6px", maxWidth:"900px"}}>
          <Col style={{ width: "232px", paddingLeft:"16px", border:"1px solid #a3a3a3ff", margin:"4px", backgroundColor:"white", borderRadius:"8px" }}>
            <DefaultImageProduct idproduct={idcodigo} width="200px"/>
          </Col>

          <Col style={{ width: "60%", padding:"16px", }}>
            <Row gutter={16}>
              <Col span={24}>
                <div>
                  <span style={{ fontWeight: "600", fontSize: "1.2em" }}>
                    C&oacute;digo:
                  </span>
                  &nbsp;&nbsp;
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "2em",
                      color: "#000000ff",
                    }}
                  >
                    {codigo.codigo}{" "}
                    <TagsSmall idcodigo={codigo.idcodigo} readOnly={"1"} />{" "}
                  </span>
                </div>
              </Col>

              <Col span={24} style={{paddingTop:"16px"}}>
                <div>
                  <span style={{ fontWeight: "600", fontSize: "1.1em" }}>
                    Descripci&oacute;n:
                  </span>
                  &nbsp;&nbsp;
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "1.3em",
                      color: "#02005e",
                    }}
                  >
                    <i>{codigo.descripcion}</i>
                  </span>{" "}
                </div>
              </Col>
            </Row>
            <Row style={{paddingTop:"16px"}}>
              <Col span={24}>
                <div>
                  <span style={{ fontWeight: "600", fontSize: "1.1em" }}>
                    Precio:
                  </span>
                  &nbsp;&nbsp;
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "1.3em",
                      color: "#02005e",
                    }}
                  >
                    <i>$&nbsp;{codigo.precio}</i>
                  </span>{" "}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DetalleCodigoHeader;
