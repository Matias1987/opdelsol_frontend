import globals from "@/src/globals";
import { Col, Row, Select } from "antd";
import { useEffect, useState } from "react";
import VMCristalesStock from "./stock";
import VMLC from "./lc";
import LaboratorioForm from "./laboratorio";

const VMTrabajo = ({callback, localId, tipo}) => {
    const CRISTALES_LABORATORIO= 0;
    const CRISTALES_STOCK=1;
    const LC=2;
  const [tipoTrabajo, setTipoTrabajo] = useState(-1);
  const [trabajo, setTrabajo] = useState({
    localId:0,
    nro:"1",
    tipo:"",
    items:null,
    monto_total: 0,
  });
  
  useEffect(()=>{
    onChange("localId", localId);
  },[]);

 const onChange = (key, value) =>{
    setTrabajo(t=>{
      const mod = {...t, [key]:value};
      callback?.(mod);
      return mod;
    });
 }

  const onItemsChanged = (_items, total) => {
    setTrabajo(t=>{
      const mod = {...t, items:_items, monto_total: total};
      callback?.(mod);
      return mod;
    })
  }

  const get_content = () => {
    switch (tipoTrabajo) {
      case CRISTALES_LABORATORIO:
        return <LaboratorioForm callback={onItemsChanged} />;
      case CRISTALES_STOCK:
        return <VMCristalesStock callback={onItemsChanged} />;
      case LC:
        return <VMLC callback={onItemsChanged} />;
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
            onChange("tipo", v == CRISTALES_LABORATORIO ? "laboratorio" : v == CRISTALES_STOCK ? "stock" : v == LC ? "LC" : "");
          }}
          style={{ width: "100%" }}
          options={[
            { label: "Cristales Laboratorio", value: CRISTALES_LABORATORIO },
            { label: "Cristales Stock", value: CRISTALES_STOCK }
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
