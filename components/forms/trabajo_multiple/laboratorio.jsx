import { Card, Col, Input, InputNumber, Row, Select } from "antd";
import { useEffect, useState } from "react";
import SelectDisenio from "./form_elements/SelectDisenio";
import { get, post } from "@/src/urls";
import SelectCodigoVenta from "../ventas/SelectCodigoVenta";
import globals from "@/src/globals";

const LaboratorioForm = ({ callback }) => {
  const [ojos, setOjos] = useState("ambos");
  const [tipos, setTipos] = useState([]);

  const [productos, setProductos] = useState({
    modo: "ambos",
    od_esf: "",
    od_cil: "",
    od_eje: "",
    od_add: "",
    od_fkBase: -1,
    od_fkTipo: -1,
    od_fkDisenio: -1,
    od_precio: 0,
    oi_esf: "",
    oi_cil: "",
    oi_eje: "",
    oi_add: "",
    oi_fkBase: -1,
    oi_fkTipo: -1,
    oi_fkDisenio: -1,
    oi_precio: 0,
  });

  const row_style = {
    padding: "4px",
  };

  const load = () => {
    const url = get.optionsforsubfamilia + 88904;
    //alert(url)
    fetch(url)
      .then((r) => r.json())
      .then((response) => {
        //alert(JSON.stringify(response));
        setTipos(response.data);
      });
  };

  useEffect(() => {
    callback?.(productos, 0);
    load();
  }, []);

  const onValueChange = (index, value) => {
    setProductos((p) => {
      const modif = { ...p, [index]: value };
      callback?.(modif, modif.od_precio + modif.oi_precio);
      return modif;
    });
  };

  const onchange_codigo = (key_idcodigo, key_precio, value) => {
    setProductos((p) => {
      const mod = {
        ...p,
        [key_idcodigo]: value.idcodigo,
        [key_precio]: value.precio,
      };
      callback?.(mod, mod.od_precio + mod.oi_precio);
      return mod;
    });
  };

  return (
    <>
      <Card
        title="Laboratorio"
        size="small"
        style={{ boxShadow: "-1px 1px 1px 1px #9e9c9c" }}
      >
        <Row style={row_style}>
          <Col span={24}>
            <Select
              style={{ width: "300px" }}
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
              border: "1px dotted #DFE9FF",
              borderRadius: "4px",
              padding: "8px",
            }}
          >
            <Row style={row_style}>
              <Col style={{width:"30px"}}></Col>
              <Col span={6} style={{fontWeight:"600", fontSize: "11px"}}>Tipo</Col>
              <Col span={6} style={{fontWeight:"600", fontSize: "11px"}}>Diseño</Col>
              <Col span={6} style={{fontWeight:"600", fontSize: "11px"}}>Precio</Col>
            </Row>
            {ojos == "oi" ? (
              <></>
            ) : (
              <Row style={{...row_style, backgroundColor:"#f1f1f1"}}>
                <Col
                  style={{
                    width:"30px",
                    color: "#0003af",
                    fontWeight: "600",
                    textAlign: "right",
                    paddingRight: "16px",
                    paddingTop: "4px",
                  }}
                >
                  OD
                </Col>
                <Col span={6}>
                  <Select
                    style={{ width: "100%" }}
                    onChange={(v) => {
                      onValueChange("od_fkTipo", v);
                    }}
                    options={tipos}
                  />
                </Col>
                <Col span={6}>
                  <SelectDisenio
                    callback={(v) => onValueChange("od_fkDisenio", v)}
                    idgrupo={productos.od_fkTipo}
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col span={6}>
                  <InputNumber
                    style={{ width: "150px" }}
                    onChange={(val) => {
                      onValueChange("od_precio", val);
                    }}
                  />
                </Col>
              </Row>
            )}
            {ojos == "od" ? (
              <></>
            ) : (
              <Row style={row_style}>
                <Col
                  style={{
                    width:"30px",
                    color: "#0003af",
                    fontWeight: "600",
                    textAlign: "right",
                    paddingRight: "16px",
                    paddingTop: "4px",
                  }}
                >
                  OI
                </Col>
                <Col span={6}>
                  <Select
                    style={{ width: "100%" }}
                    onChange={(v) => {
                      onValueChange("oi_fkTipo", v);
                    }}
                    options={tipos}
                  />
                </Col>
                <Col span={6}>
                  <SelectDisenio
                    callback={(v) => onValueChange("oi_fkDisenio", v)}
                    idgrupo={productos.oi_fkTipo}
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col span={6}>
                  <InputNumber
                    style={{ width: "150px" }}
                    onChange={(val) => {
                      onValueChange("oi_precio", val);
                    }}
                  />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card
              title="Prescripción"
              size="small"
              style={{ boxShadow: "-1px 1px 1px 1px #9e9c9c" }}
            >
              <Row>
                <Col span={24}>
                  <Row style={row_style}>
                    <Col style={{width:"30px"}}></Col>
                    <Col span={10}>Base</Col>
                    <Col span={3}>Esf</Col>
                    <Col span={3}>Cil</Col>
                    <Col span={3}>Eje</Col>
                    <Col span={3}>Add</Col>
                  </Row>
                  {ojos == "oi" ? (
                    <></>
                  ) : (
                    <Row style={{...row_style, backgroundColor:"#f1f1f1"}}>
                      <Col
                        style={{
                          width:"30px",
                          color: "#0003af",
                          fontWeight: "bold",
                          textAlign: "right",
                          paddingRight: "16px",
                          paddingTop: "4px",
                        }}
                      >
                        OD
                      </Col>
                      <Col span={10}>
                        {/*<Select style={{ width: "100%" }} onChange={e=>{onValueChange("od_fkBase", e.target.value);}}/>*/}
                        <SelectCodigoVenta
                          idfamilias={[globals.familiaIDs.CRISTALES]}
                          buttonText={"Seleccionar..."}
                          callback={v=>{onchange_codigo("od_fkBase","od_precio",v)}}
                        />
                      </Col>
                      <Col span={3}>
                        <Input
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            onValueChange("od_esf", e.target.value);
                          }}
                        />
                      </Col>
                      <Col span={3}>
                        <Input
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            onValueChange("od_cil", e.target.value);
                          }}
                        />
                      </Col>
                      <Col span={3}>
                        <Input
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            onValueChange("od_eje", e.target.value);
                          }}
                        />
                      </Col>
                      <Col span={3}>
                        <Input
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            onValueChange("od_add", e.target.value);
                          }}
                        />
                      </Col>
                    </Row>
                  )}
                  {ojos == "od" ? (
                    <></>
                  ) : (
                    <Row style={row_style}>
                      <Col
                        style={{
                          width:"30px",
                          color: "#0003af",
                          fontWeight: "bold",
                          textAlign: "right",
                          paddingRight: "16px",
                          paddingTop: "4px",
                        }}
                      >
                        OI
                      </Col>
                      <Col span={10}>
                        <SelectCodigoVenta
                          idfamilias={[globals.familiaIDs.CRISTALES]}
                          buttonText={"Seleccionar..."}
                          callback={v=>{onchange_codigo("oi_fkBase","oi_precio",v)}}
                        />
                      </Col>
                      <Col span={3}>
                        <Input
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            onValueChange("oi_esf", e.target.value);
                          }}
                        />
                      </Col>
                      <Col span={3}>
                        <Input
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            onValueChange("oi_cil", e.target.value);
                          }}
                        />
                      </Col>
                      <Col span={3}>
                        <Input
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            onValueChange("oi_eje", e.target.value);
                          }}
                        />
                      </Col>
                      <Col span={3}>
                        <Input
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            onValueChange("oi_add", e.target.value);
                          }}
                        />
                      </Col>
                    </Row>
                  )}
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
