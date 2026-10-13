import CategoriaSelect from "@/components/CategoriaSelect";
import SelectTag from "@/components/etiquetas/selectTag";
import SucursalSelect from "@/components/SucursalSelect";
import { Button, Col, Input, Row } from "antd";
import { useState } from "react";

const FiltroCodigos = (props) => {
  const { callback, hideTags, showSucursal } = props;
  const [applyPending, setApplyPending] = useState(false);
  const [filtros, setFiltros] = useState({
    idfamilia: "-1",
    idsubfamilia: "-1",
    idgrupo: "-1",
    idsubgrupo: "-1",
    codigo: "",
    etiquetas: [],
    idsucursal: -1,
  });
  const categoria_select_callback = (cat, id) => {
    setApplyPending(true);
    setFiltros((f) => ({
      ...f,
      idfamilia: cat == "familia" ? id : "-1",
      idsubfamilia: cat == "subfamilia" ? id : "-1",
      idgrupo: cat == "grupo" ? id : "-1",
      idsubgrupo: cat == "subgrupo" ? id : "-1",
    }));
  };

  const onCodigoChange = (v) => {
    setFiltros((f) => ({ ...f, codigo: v }));
  };

  return (
    <div style={{ borderRadius: "15px" }}>
      <Row style={{ padding: ".2em" }}>
        <Col span={23}>
          <Row>
            <Col
              span={24}
              style={{ backgroundColor: "#E5E8E7", padding: "4px" }}
            >
              <CategoriaSelect callback={categoria_select_callback} />
            </Col>
          </Row>
          {hideTags ? (
            <></>
          ) : (
            <Row>
              <Col span={24}>
                <SelectTag
                  callback={(v) => {
                    setFiltros((f) => ({ ...f, etiquetas: v }));
                    setApplyPending(true);
                  }}
                />
              </Col>
            </Row>
          )}
          {!showSucursal ? (
            <></>
          ) : (
            <>
              <Row>
                <Col span={24}>
                  <SucursalSelect
                    callback={(id, label) => {
                      setFiltros((f) => ({ ...f, idsucursal: id, sucursal_label: label }));
                      setApplyPending(true);
                    }}
                  />
                </Col>
              </Row>
            </>
          )}
          <Row style={{ borderBottomLeftRadius: "15px" }}>
            <Col span={18}>
              <Input
                size="small"
                allowClear
                prefix="Codigo: "
                style={{ backgroundColor: "#E5E8E7" }}
                value={filtros.codigo}
                onChange={(e) => {
                  setApplyPending(true);
                  onCodigoChange(e.target.value ?? "");
                }}
              />
            </Col>
            <Col style={{ width: "80px" }}>
              <Button
                block
                disabled={!applyPending}
                type={"primary"}
                onClick={() => {
                  setApplyPending(false);

                  callback?.(filtros);
                }}
              >
                Aplicar
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default FiltroCodigos;
