import { Card, Col, Input, InputNumber, Row, Select } from "antd";
import { useEffect, useState } from "react";
import SelectDisenio from "./form_elements/SelectDisenio";

const LaboratorioForm = ({callback}) => {
  const [ojos, setOjos] = useState("ambos");

  const [productos, setProductos] = useState({
    modo:"ambos",
    od_esf:"",
    od_cil:"",
    od_eje:"",
    od_add:"",
    od_fkBase:-1,
    od_fkTipo:-1,
    od_fkDisenio:-1,
    od_precio:0,
    oi_esf:"",
    oi_cil:"",
    oi_eje:"",
    oi_add:"",
    oi_fkBase:-1,
    oi_fkTipo:-1,
    oi_fkDisenio:-1,
    oi_precio:0,
  });

  const row_style = {
    padding:"4px"
  }

  useEffect(()=>{
    callback?.(productos,0);
  },[]);

  const onValueChange = (index, value) => {
    setProductos(p=>{
      const modif = {...p,[index]:value};
      callback?.(modif, modif.od_precio + modif.oi_precio);
      return modif;
    })
  }
  return (
    <>
      <Card title="Laboratorio" size="small" style={{ boxShadow: "-1px 1px 1px 1px #9e9c9c" }}>
        <Row style={row_style}>
          <Col span={24}>
            <Select
              style={{width:"300px"}}
              prefix="Ojos: "
              options={[
                { label: "Ambos", value: "ambos" },
                { label: "Derecho", value: "od" },
                { label: "Izquierdo", value: "oi" },
              ]}
              value={ojos}
              onChange={(value) => {
                setOjos(value);
                onValueChange("modo", value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            style={{
              border: "1px solid #DFE9FF",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <Row style={row_style}>
              <Col span={2}></Col>
              <Col span={6}>
                Tipo
              </Col>
              <Col span={6}>
                Diseño
              </Col>
              <Col span={6}>
                Precio
              </Col>
            </Row>
            {ojos == "oi" ? <></> : <Row style={row_style}>
              <Col span={2} style={{color: "#0003af", fontWeight: "600", textAlign:"right", paddingRight:"16px", paddingTop:"4px"}}>OD</Col>
              <Col span={6}>
                <Select style={{ width: "100%" }} onChange={e=>{onValueChange("od_fkTipo", e.target.value);}}/>
              </Col>
              <Col span={6}>
                <SelectDisenio callback={v=>onValueChange("od_fkDisenio", v)} idgrupo={productos.od_fkTipo} style={{width:"100%"}} />
              </Col>
              <Col span={6}>
                <InputNumber style={{ width: "100%" }} onChange={val=>{onValueChange("od_precio", val);}}/>
              </Col>
            </Row>}
            {ojos == "od" ? <></> : <Row style={row_style}>
              <Col span={2} style={{color: "#0003af", fontWeight: "600", textAlign:"right", paddingRight:"16px", paddingTop:"4px"}}>OI</Col>
              <Col span={6}>
                <Select style={{ width: "100%" }} onChange={e=>{onValueChange("oi_fkTipo", e.target.value);}}/>
              </Col>
              <Col span={6}>
                <SelectDisenio callback={v=>onValueChange("oi_fkDisenio", v)} idgrupo={productos.oi_fkTipo} style={{width:"100%"}} />
              </Col>
              <Col span={6}>
                <InputNumber style={{ width: "100%" }} onChange={val=>{onValueChange("oi_precio", val);}}/>
              </Col>
            </Row>}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card title="Prescripción" size="small" style={{ boxShadow: "-1px 1px 1px 1px #9e9c9c" }}>
              <Row>
                <Col
                  span={24}
                >
                  <Row style={row_style}>
                    <Col span={2}></Col>
                    <Col span={10}>
                      Base
                    </Col>
                    <Col span={3}>
                      Esf
                    </Col>
                    <Col span={3}>
                      Cil
                    </Col>
                    <Col span={3}>
                      Eje
                    </Col>
                    <Col span={3}>
                      Add
                    </Col>
                  </Row>
                  {ojos == "oi" ? <></> : <Row style={row_style}>
                    <Col span={2} style={{color: "#0003af", fontWeight: "bold", textAlign:"right", paddingRight:"16px", paddingTop:"4px"}}>OD</Col>
                    <Col span={10}>
                      <Select style={{ width: "100%" }} onChange={e=>{onValueChange("od_fkBase", e.target.value);}}/>
                    </Col>
                    <Col span={3}>
                      <Input style={{ width: "100%" }} onChange={e=>{onValueChange("od_esf", e.target.value);}}/>
                    </Col>
                    <Col span={3}>
                      <Input style={{ width: "100%" }} onChange={e=>{onValueChange("od_cil", e.target.value);}}/>
                    </Col>
                    <Col span={3}>
                      <Input style={{ width: "100%" }} onChange={e=>{onValueChange("od_eje", e.target.value);}}/>
                    </Col>
                    <Col span={3}>
                      <Input style={{ width: "100%" }} onChange={e=>{onValueChange("od_add", e.target.value);}}/>
                    </Col>
                  </Row>}
                  {ojos == "od" ? <></> : <Row style={row_style}>
                    <Col span={2} style={{color: "#0003af", fontWeight: "bold", textAlign:"right", paddingRight:"16px", paddingTop:"4px"}}>OI</Col>
                    <Col span={10}>
                      <Select style={{ width: "100%" }} onChange={e=>{onValueChange("oi_fkBase", e.target.value);}}/>
                    </Col>
                    <Col span={3}>
                      <Input style={{ width: "100%" }} onChange={e=>{onValueChange("oi_esf", e.target.value);}}/>
                    </Col>
                    <Col span={3}>
                      <Input style={{ width: "100%" }} onChange={e=>{onValueChange("oi_cil", e.target.value);}}/>
                    </Col>
                    <Col span={3}>
                      <Input style={{ width: "100%" }} onChange={e=>{onValueChange("oi_eje", e.target.value);}}/>
                    </Col>
                    <Col span={3}>
                      <Input style={{ width: "100%" }} onChange={e=>{onValueChange("oi_add", e.target.value);}}/>
                    </Col>
                  </Row>}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
};


export default LaboratorioForm;