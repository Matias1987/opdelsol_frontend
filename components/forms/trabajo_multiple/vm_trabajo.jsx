import globals from "@/src/globals";
import { Col, Row, Select } from "antd";
import { useState } from "react";
import VMCristalesLaboratorio from "./laboratorio";
import VMCristalesStock from "./stock";
import VMLC from "./lc";

const VMTrabajo = (props) => {
    const CRISTALES_LABORATORIO= 0;
    const CRISTALES_STOCK=1;
    const LC=2;
  const [tipoTrabajo, setTipoTrabajo] = useState(-1);

  const get_content = () => {
    switch (tipoTrabajo) {
      case CRISTALES_LABORATORIO:
        return <VMCristalesLaboratorio />;
      case CRISTALES_STOCK:
        return <VMCristalesStock />;
      case LC:
        return <VMLC />;
    }
  };

  return tipoTrabajo < 0 ? (
    <Row>
      <Col span={24}>
        <Select
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
  ) : (
    get_content()
  );
};

export default VMTrabajo;
