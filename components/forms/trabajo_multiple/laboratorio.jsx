import { Card, Col, Divider, Input, InputNumber, Row, Select } from "antd";
import { useEffect, useState } from "react";
import SelectDisenio from "./form_elements/SelectDisenio";
import { get, post } from "@/src/urls";
import SelectCodigoVenta from "../ventas/SelectCodigoVenta";
import globals from "@/src/globals";

const LaboratorioForm = ({ callback, idCliente }) => {
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
    armazon:"",
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
        style={{ boxShadow: "-1px 1px 1px 1px #d4d3d3" }}
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
            <Row style={{ ...row_style, borderBottom: "1px dotted #d8d7d7" }}>
              <Col style={{ width: "30px" }}></Col>
              <Col span={6} style={{ fontWeight: "600", fontSize: "11px" }}>
                Tipo
              </Col>
              <Col span={6} style={{ fontWeight: "600", fontSize: "11px" }}>
                Diseño
              </Col>
              <Col span={6} style={{ fontWeight: "600", fontSize: "11px" }}>
                Precio
              </Col>
            </Row>
            {ojos == "oi" ? (
              <></>
            ) : (
              <Row style={{ ...row_style, borderBottom: "1px dotted #dddada" }}>
                <Col
                  style={{
                    width: "30px",
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
                    idcliente={idCliente}
                    callback={(v) => {
                      //alert(JSON.stringify(v));
                      setProductos((p) => {
                        const dto = v.descuento || 0;
                        const modif = { 
                          ...p, 
                          "od_fkDisenio": v.idsubgrupo, 
                          od_descuento: dto, 
                          od_precio: parseFloat(v.precio) - parseFloat(v.precio) * dto * .01 ,
                          od_iddescuento: v.iddescuento,
                        };
                        callback?.(modif, modif.od_precio + modif.oi_precio);
                        return modif;
                      });
                    }}
                    idgrupo={productos.od_fkTipo}
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col span={6}>
                  <InputNumber
                    value={productos.od_precio}
                    addonBefore={ productos.od_descuento && productos.od_descuento> 0 ?  <span style={{ color: "red" }}>-{productos.od_descuento}%</span> : <></>}
                    style={{ width: "200px" }}
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
                    width: "30px",
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
                  idcliente={idCliente}
                    callback={(v) => 
                    {
                      setProductos((p) => {
                        const dto = v.descuento || 0;
                        const modif = { 
                          ...p, 
                          "oi_fkDisenio": v.idsubgrupo, 
                          oi_descuento: dto, 
                          oi_precio: parseFloat(v.precio) - parseFloat(v.precio) * dto * .01,
                          oi_iddescuento: v.iddescuento,
                        };
                        callback?.(modif, modif.od_precio + modif.oi_precio);
                        return modif;
                      });
                    }
                    }
                    idgrupo={productos.oi_fkTipo}
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col span={6}>
                  <InputNumber
                    value={productos.oi_precio}
                    addonBefore={ productos.oi_descuento && productos.oi_descuento> 0 ?  <span style={{ color: "red" }}>-{productos.oi_descuento}%</span> : <></>}
                    style={{ width: "200px" }}
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
             
              size="small"
              style={{ boxShadow: "-1px 1px 1px 1px white" }}
              styles={{header:{fontSize:"11px", fontWeight:"600", fontStyle:"oblique", color:"darkblue"}}}
            >
              <Row>
                <Col span={24}>
                <span style={{fontWeight:"600", fontSize:"12px"}}>Prescripci&oacute;n</span>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Row style={{ ...row_style, borderBottom: "1px dotted #d8d7d7" }}>
                    <Col style={{ width: "30px" }}></Col>
                    <Col style={{fontWeight:"600", fontSize:"11px"}} span={10}>Base</Col>
                    <Col style={{fontWeight:"600", fontSize:"11px"}} span={3}>Esf</Col>
                    <Col style={{fontWeight:"600", fontSize:"11px"}} span={3}>Cil</Col>
                    <Col style={{fontWeight:"600", fontSize:"11px"}} span={3}>Eje</Col>
                    <Col style={{fontWeight:"600", fontSize:"11px"}} span={3}>Add</Col>
                  </Row>
                  {ojos == "oi" ? (
                    <></>
                  ) : (
                    <Row style={{ ...row_style, borderBottom: "1px solid #d8d7d7" }}>
                      <Col
                        style={{
                          width: "30px",
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
                          callback={(v) => {
                            onValueChange("od_fkBase", v.idcodigo);
                          }}
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
                          width: "30px",
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
                          callback={(v) => {
                            onValueChange("oi_fkBase", v.idcodigo);
                          }}
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
          <Row style={{backgroundColor:"#f1f1f1", padding:"8px"}}>
            <Col span={24}>
              <Input style={{width:"100%"}} prefix={<span style={{fontWeight:"600"}}>Armaz&oacute;n</span>} value={productos.armazon} onChange={e=>onValueChange("armazon",e.target.value)} />
            </Col>
          </Row>
      </Card>
    </>
  );
};

export default LaboratorioForm;
