import { Col, Row, Select } from "antd";
import { useEffect, useState } from "react";
import TipoMonofocalesLab from "./tipos/monofocales_lab";
import TipoMultifocalesLab from "./tipos/multifocales_lab";
import TipoRecetaStock from "./tipos/receta_stock";
import TipoLCStock from "./tipos/lc_stock";
import TipoLCLab from "./tipos/lc_lab";

const SelectTrabajo = ({
  callback,
  localId,
  idCliente,
  onTipoTrabajoSelected,
  path,
  trabajoObject
}) => {
  const DIRECTA = 0;
  const RECETA_STOCK = 1;
  const MONOF_LAB = 2;
  const MULTIF_LAB = 3;
  const LC_STOCK = 4;
  const LC_LAB = 5;
  const [tipoTrabajo, setTipoTrabajo] = useState(-1);

  const onChange = (data) => {
    callback?.({...data, localId: localId});
  }

  useEffect(()=>{
  },[trabajoObject]);

  const get_tipo_trabajo_nombre = (val) => {
    switch (+val) {
      case DIRECTA:
        return "DIRECTA";
      case RECETA_STOCK:
        return "RECETA STOCK";
      case MONOF_LAB:
        return "MONOF. LAB.";
      case MULTIF_LAB:
        return "MULTIF. LAB.";
      case LC_STOCK:
        return "LC. STOCK";
      case LC_LAB:
        return "LC. LAB";
    }
  };
  const get_tipo_trabajo_nombre_corto = (val) => {
    switch (+val) {
      case DIRECTA:
        return "dir";
      case RECETA_STOCK:
        return "rec_st";
      case MONOF_LAB:
        return "monof_lab";
      case MULTIF_LAB:
        return "multi_lab";
      case LC_STOCK:
        return "lc_st";
      case LC_LAB:
        return "lc_lab";
    }
  };


  const get_content = () => {
    switch (tipoTrabajo) {
      case DIRECTA:
        return (
          <TipoMonofocalesLab
            callback={onChange}
            idCliente={idCliente}
            path={[...path, "items"]}
            trabajoObject={trabajoObject}
          />
        );
      case RECETA_STOCK:
        return (
          <TipoRecetaStock
            callback={onChange}
            idCliente={idCliente}
            path={[...path, "items"]}
            trabajoObject={trabajoObject}
          />
        );
      case MONOF_LAB:
        return (
          <TipoMonofocalesLab
            callback={onChange}
            path={[...path, "items"]}
            trabajoObject={trabajoObject}
          />
        );
      case MULTIF_LAB:
        return (
          <TipoMultifocalesLab
            callback={onChange}
            path={[...path, "items"]}
            trabajoObject={trabajoObject}
          />
        );
      case LC_STOCK:
        return (
          <TipoLCStock
            callback={onChange}
            path={[...path, "items"]}
            trabajoObject={trabajoObject}
          />
        );
      case LC_LAB:
        return (
          <TipoLCLab
            callback={onChange}
            path={[...path, "items"]}
            trabajoObject={trabajoObject}
          />
        );
    }
  };

  return +tipoTrabajo<0 ? (
    <div>
      <Row style={{ paddingLeft: "32px" }}>
        <Col span={24}>
          <h3 style={{ color: "#3A5C79" }}>Tipo de trabajo: </h3>
        </Col>
      </Row>
      <Row
        style={{
          paddingLeft: "32px",
          paddingRight: "32px",
          paddingBottom: "32px",
        }}
      >
        <Col span={24}>
          <Select
            prefix="Seleccione: "
            placeholder="Seleccione tipo de Trabajo..."
            onChange={(v) => {
              setTipoTrabajo(v);
              const _tipo = get_tipo_trabajo_nombre(v);
              onTipoTrabajoSelected(localId, _tipo.toLocaleUpperCase(), get_tipo_trabajo_nombre_corto(v));
            }}
            style={{ width: "100%" }}
            options={[
              //  { label: "Venta Directa", value: DIRECTA },
              { label: "Receta Stock", value: RECETA_STOCK },
              { label: "Monofocales Laboratorio", value: MONOF_LAB },
              { label: "Multifocales Laboratorio", value: MULTIF_LAB },
              { label: "LC Stock", value: LC_STOCK },
              { label: "LC Laboratorio", value: LC_LAB },
            ]}
          />
        </Col>
      </Row>
    </div>
  ) : (
    get_content()
  );
};

export default SelectTrabajo;
