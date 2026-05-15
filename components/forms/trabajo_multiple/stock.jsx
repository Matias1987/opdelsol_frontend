import globals from "@/src/globals";
import {
  Card,
  Col,
  Divider,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import SelectCodigoVenta from "../ventas/SelectCodigoVenta";

const VMCristalesStock = ({ callback }) => {
  const [trabajoStock, setTrabajoStock] = useState({
    od_idcodigo: "",
    od_eje: "",
    od_precio: "",
    oi_idcodigo: "",
    oi_eje: "",
    oi_precio: "",
    idtratamiento: "",
    tratamiento_precio: "",
    tratamiento_descuento: "",
    armazon: "",
  });

  const onChange = (key, value) => {
    setTrabajoStock((t) => {
      const modif = { ...t, [key]: value };
      callback?.(modif, modif.od_precio + modif.oi_precio + modif.tratamiento_precio);
      return modif;
    });
  };

    const onchange_codigo = (key_idcodigo, key_precio, key_descuento, value) => {
      if(value === null || value?.codigo === null){
        setTrabajoStock((p) => {
          const mod = {
            ...p,
            [key_idcodigo]: "",
            [key_precio]: 0,
            [key_descuento]: 0,
          };
          callback?.(mod, mod.od_precio + mod.oi_precio + mod.tratamiento_precio);
          return mod;
        });
        return;
      }
    setTrabajoStock((p) => {
      const mod = {
        ...p,
        [key_idcodigo]: value.idcodigo,
        [key_precio]: parseFloat(value.precio_defecto_mayorista) - (parseFloat(value.precio_defecto_mayorista) * parseFloat(value.descuento||"0") * .01),
        [key_descuento]: value.descuento||"0",
      };

      callback?.(mod, mod.od_precio + mod.oi_precio + mod.tratamiento_precio);
      return mod;
    });
  };

  useEffect(()=>{
    callback?.(trabajoStock, trabajoStock.od_precio + trabajoStock.oi_precio + trabajoStock.tratamiento_precio);
  },[]);

  return (
    <Card
      size="small"
      title="Stock"
      style={{ boxShadow: "-1px 1px 1px 1px #9e9c9c" }}
    >
      <Row>
        <Col span={24}>
          <Row>
            <Col style={{width:"100px"}}></Col>
            <Col span={8}></Col>
            <Col span={3} style={{fontWeight:"600"}}>Eje</Col>
            <Col span={6} style={{fontWeight:"600"}}>Precio</Col>
          </Row>
          <Row style={{backgroundColor:"#f1f1f1", padding:"4px"}}>
            <Col style={{textAlign:"right", paddingRight:"8px", fontWeight:"600", paddingTop:"4px", width:"100px"}}>OD</Col>
            <Col span={8} style={{textAlign:"left"}}>
            <div >
              <SelectCodigoVenta
                          idfamilias={[globals.familiaIDs.CRISTALES]}
                          buttonText={"Seleccionar..."}
                          callback={v=>{onchange_codigo("od_idcodigo","od_precio","od_descuento",v)}}
                        />
                        </div>
            </Col>
            <Col span={3}>
              <Input
                value={trabajoStock.od_eje}
                onChange={(e) => onChange("od_eje", e.target.value)}
              />
            </Col>
            <Col span={6}>
              <InputNumber
                addonBefore={trabajoStock.od_descuento && trabajoStock.od_descuento > 0 ? <span style={{color:"red"}}>-{trabajoStock.od_descuento}%</span> : <></>}
                style={{width:"100%"}}
                value={trabajoStock.od_precio}
                onChange={(v) => onChange("od_precio", v)}
              />
            </Col>
          </Row>
          <Row style={{backgroundColor:"#ffffff", padding:"4px"}}>
            <Col style={{textAlign:"right", paddingRight:"8px", fontWeight:"600", paddingTop:"4px", width:"100px"}}>OI</Col>
            <Col span={8} style={{textAlign:"left"}}>
              <SelectCodigoVenta
                          idfamilias={[globals.familiaIDs.CRISTALES]}
                          buttonText={"Seleccionar..."}
                          callback={v=>{onchange_codigo("oi_idcodigo","oi_precio","oi_descuento",v)}}
                        />
            </Col>
            <Col span={3}>
              <Input
                value={trabajoStock.oi_eje}
                onChange={(e) => onChange("oi_eje", e.target.value)}
              />
            </Col>
            <Col span={6}>
              <InputNumber
                addonBefore={trabajoStock.oi_descuento && trabajoStock.oi_descuento > 0 ? <span style={{color:"red"}}>-{trabajoStock.oi_descuento}%</span> : <></>}
                style={{width:"100%"}}
                value={trabajoStock.oi_precio}
                onChange={(v) => onChange("oi_precio", v)}
              />
            </Col>
          </Row>
          <Row style={{backgroundColor:"#f1f1f1", padding:"4px"}}>
            <Col style={{textAlign:"right", paddingRight:"8px", fontWeight:"600", paddingTop:"4px", width:"100px"}}>Tratamiento</Col>
            <Col span={8} style={{textAlign:"left"}}>
              <SelectCodigoVenta
                idfamilias={[globals.familiaIDs.TRATAMIENTO]}
                buttonText={"Seleccionar..."}
                callback={v => { onchange_codigo("idtratamiento","tratamiento_precio","tratamiento_descuento",v) }}
              />
            </Col>
            <Col span={3}></Col>
            <Col span={6}>
              <InputNumber
                addonBefore={trabajoStock.tratamiento_descuento && trabajoStock.tratamiento_descuento > 0 ? <span style={{color:"red"}}>-{trabajoStock.tratamiento_descuento}%</span> : <></>}
                style={{width:"100%"}}
                value={trabajoStock.tratamiento_precio}
                onChange={(v) => onChange("tratamiento_precio", v)}
              />
            </Col>
          </Row>
          <Divider />
          <Row style={{backgroundColor:"#f1f1f1", padding:"8px"}}>
            <Col span={24}>
              <Input style={{width:"100%"}} prefix={<span style={{fontWeight:"bold"}}>Armaz&oacute;n</span>} value={trabajoStock.armazon} onChange={e=>onChange("armazon",e.target.value)} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default VMCristalesStock;
