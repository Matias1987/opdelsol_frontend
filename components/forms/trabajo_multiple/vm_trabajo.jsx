import globals from "@/src/globals";
import { Col, Row, Select } from "antd";
import { useState } from "react";
import VMCristalesStock from "./stock";
import VMLC from "./lc";
import LaboratorioForm from "./laboratorio";

const VMTrabajo = (props) => {
    const CRISTALES_LABORATORIO= 0;
    const CRISTALES_STOCK=1;
    const LC=2;
  const [tipoTrabajo, setTipoTrabajo] = useState(-1);

  const get_content = () => {
    switch (tipoTrabajo) {
      case CRISTALES_LABORATORIO:
        return <LaboratorioForm />;
      case CRISTALES_STOCK:
        return <LaboratorioForm />;
      case LC:
        return <VMLC />;
    }
  };

  return tipoTrabajo < 0 ? (
    <div style={{ backgroundColor:"#faf6e7", borderRadius:"16px"}}>
    <Row style={{paddingLeft:"32px"}}>
      <Col span={24}>
        <h3 style={{color:"#3A5C79"}}>Tipo de trabajo: </h3>
      </Col>
    </Row>
    <Row style={{paddingLeft:"32px", paddingRight:"32px", paddingBottom:"63px"}}>
      <Col span={24}>
        <Select
          prefix="Seleccione: "
          placeholder="Seleccione tipo de Trabajo..."
          onChange={(v) => {
            setTipoTrabajo(v);
          }}
          style={{ width: "100%" }}
          options={[
            { label: "Cristales Laboratorio", value: CRISTALES_LABORATORIO },
            { label: "Cristales Stock", value: CRISTALES_STOCK },
            { label: "LC", value: LC },
          ]}
        />
      </Col>
    </Row>
    </div>
  ) : (
    get_content()
  );
};

export default VMTrabajo;
