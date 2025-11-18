import { CheckOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select } from "antd";
import { use, useEffect, useState } from "react";

const CodeGridV3 = (props) => {
  const [applyPending1, setApplyPending1] = useState(false);
  const [applyPending2, setApplyPending2] = useState(false);
  const [applyPending3, setApplyPending3] = useState(false);
  const [applyPending4, setApplyPending4] = useState(false);

  const [esfPositivo, setEsfPositivo] = useState(4);
  const [esfNegativo, setEsfNegativo] = useState(4);

  const [cilPositivo, setCilPositivo] = useState(-2);
  const [cilNegativo, setCilNegativo] = useState(-2);

  const row_style = { padding: "6px" };

  const parametros = (_) => ( 
    <>
      <Row style={row_style} gutter={16}>
        <Col>
          <Select
            prefix="Código: "
            options={[{ value: "cod", label: "cod" }]}
            style={{ width: "300px" }}
          />
        </Col>
      </Row>
      <Row style={row_style} gutter={16}>
        {/*<Col>Tipo de Grilla</Col>
        <Col>
          <Select options={[{ label: "Esf/Cil", value: "1" }]} />
        </Col>*/}
        <Col style={{paddingTop:"8px"}}>Rango Positivo:</Col>
        <Col>
          <Input
            value={esfPositivo}
            onChange={(e) => {
              setApplyPending1(true);
              setEsfPositivo(e.target.value);
            }}
            prefix="Esf.:"
            suffix={
              <>
                <Button
                  disabled={!applyPending1}
                  onClick={(_) => {
                    setApplyPending1(false);
                  }}
                  type="link"
                  style={{ fontWeight: "bolder" }}
                >
                  <CheckOutlined />
                </Button>
              </>
            }
          />{" "}
        </Col>
        <Col>
          <Input
            value={cilPositivo}
            onChange={(e) => {
              setApplyPending2(true);
              setCilPositivo(e.target.value);
            }}
            prefix="Cil.:"
            suffix={
              <>
                <Button
                  disabled={!applyPending2}
                  onClick={(_) => {
                    setApplyPending2(false);
                  }}
                  type="link"
                  style={{ fontWeight: "bolder" }}
                >
                  <CheckOutlined />
                </Button>
              </>
            }
          />{" "}
        </Col>
        <Col style={{paddingTop:"8px"}}>Rango Negativo:</Col>
        <Col>
          <Input
            value={esfNegativo}
            onChange={(e) => {
              setEsfNegativo(e.target.value);
              setApplyPending3(true);
            }}
            prefix="Esf.:"
            suffix={
              <>
                <Button
                  disabled={!applyPending3}
                  onClick={(_) => {
                    setApplyPending3(false);
                  }}
                  type="link"
                  style={{ fontWeight: "bolder" }}
                >
                  <CheckOutlined />
                </Button>
              </>
            }
          />{" "}
        </Col>
        <Col>
          <Input
            value={cilNegativo}
            onChange={(e) => {
              setCilNegativo(e.target.value);
              setApplyPending4(true);
            }}
            prefix="Cil.:"
            suffix={
              <>
                <Button
                  disabled={!applyPending4}
                  type="link"
                  style={{ fontWeight: "bolder" }}
                  onClick={(_) => {
                    setApplyPending4(false);
                  }}
                >
                  <CheckOutlined />
                </Button>
              </>
            }
          />{" "}
        </Col>
        <Col>
          <Button
            disabled={
              applyPending1 || applyPending2 || applyPending3 || applyPending4
            }
          >
            Aplicar
          </Button>
        </Col>
      </Row>
    </>
  );

  const prepare = ()=>{
    const positivo_arr = [];
    for(let i=0;i<+esfPositivo;i+=0.25)
    {
        for(let j=0;j<+cilNegativo;j+=0.25)
        {
            positivo_arr.push(0)
        }
    }
    const negativo_arr = [];
    for(let i=0;i<+esfNegativo;i+=0.25)
    {
        for(let j=0;j<+cilNegativo;j+=0.25)
        {
            negativo_arr.push(0)
        }
    }
  }

  useEffect(()=>{
    prepare();
  },[])


  return (
    <>
      <h3>Code Grid Ver. 3</h3>
      {parametros()}
    </>
  );
};

export default CodeGridV3;
