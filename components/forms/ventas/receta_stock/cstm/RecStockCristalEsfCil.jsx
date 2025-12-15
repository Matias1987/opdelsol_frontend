import { Button, Col, Input, Row } from "antd";

import { useState } from "react";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import globals from "@/src/globals";
import {
  parse_float_string,
  validate_esf_cil_eje,
  validate_only_numbers_and_letters,
} from "@/src/helpers/string_helper";
import SelectCodigoVenta from "../../SelectCodigoVenta";

const RecStockCristalEsfCil = (props) => {
  const [visible, setVisible] = useState(false);

  const [cristal, setCristal] = useState({
    idcodigo: -1,
    tipo: props.tipo,
    codigo: null,
    eje: "",
    precio: 0,
    cantidad: 1,
    esf: "",
    cil: "",
  });

  const onchange_codigo = (value) => {
    setCristal((cristal) => {
      const _cristal = {
        ...cristal,
        codigo: value.codigo,
        precio: value.precio,
        idcodigo: value.idcodigo,
      };
      props?.callback(_cristal);
      return _cristal;
    });
  };
  const onchange_eje = (v) => {
    if (!validate_esf_cil_eje(v)) {
      return;
    }
    setCristal((cristal) => {
      const _cristal = { ...cristal, eje: v };
      props?.callback(_cristal);
      return _cristal;
    });
  };

  const onchange_esf = (v) => {
    if (!validate_esf_cil_eje(v)) {
      return;
    }
    setCristal((_cristal_) => {
      const __cristal = { ..._cristal_, esf: (v || "") == "" ? "0" : v };
      props?.callback(__cristal);
      return __cristal;
    });
  };
  const onchange_cil = (v) => {
    if (!validate_esf_cil_eje(v)) {
      return;
    }
    setCristal((_cristal_) => {
      const __cristal = { ..._cristal_, cil: (v || "") == "" ? "0" : v };
      props?.callback(__cristal);
      return __cristal;
    });
  };
  const onchange_precio = (value) => {
    setCristal((cristal) => {
      const _cristal = { ...cristal, precio: value.precio };
      props?.callback(_cristal);
      return _cristal;
    });
  };

  const onRemove = () => {
    onchange_codigo({ precio: 0, codigo: null, idcodigo: -1 });
    setVisible((v) => {
      props?.onVisibleChange?.(false);
      return false;
    });
  };

  const _estilo_label = {
    /*padding: ".30em",*/
    textAlign: "right",
  };

  return !visible ? (
    <Button
      size="small"
      type="primary"
      onClick={() => {
        setVisible((v) => {
          props?.onVisibleChange?.(true);
          return true;
        });
      }}
    >
      {typeof props.buttonText === "undefined"
        ? "Establecer Cristal"
        : props.buttonText}
    </Button>
  ) : (
    <>
      <Row gutter={16}>
        <Col>
          <SelectCodigoVenta
            hideExtOpt={"0"}
            idfamilias={[globals.familiaIDs.CRISTALES]}
            buttonText={"Seleccionar Código Cristal"}
            callback={onchange_codigo}
          />
        </Col>

        <Col>
          <Input
            onClick={e=>{e.target.select()}}
            style={{ width: "100px" }}
            prefix="Esf.:"
            size="small"
            disabled={cristal.codigo == null}
            value={cristal.esf}
            step={".25"}
            onChange={(e) => {
              onchange_esf(e.target.value);
            }}
          />
        </Col>
        <Col>
          <Input
            onClick={e=>{e.target.select()}}
            style={{ width: "100px" }}
            prefix="Cil.:"
            size="small"
            disabled={cristal.codigo == null}
            value={cristal.cil}
            step={"0.25"}
            onChange={(e) => {
              onchange_cil(e.target.value);
            }}
          />
        </Col>
        <Col>
          <Input
            onClick={e=>{e.target.select()}}
            style={{ width: "100px" }}
            prefix="Eje:"
            disabled={cristal.codigo == null}
            size="small"
            value={cristal.eje}
            onChange={(e) => {
              onchange_eje(e.target.value);
            }}
          />
        </Col>
        <Col>
          <Input
            onClick={e=>{e.target.select()}}
            onWheel={(e) => {
              e.target.blur();
            }}
            style={{ width: "150px" }}
            disabled={cristal.codigo == null}
            type="number"
            value={cristal.precio}
            readOnly={false}
            onChange={(e) => {
              onchange_precio({
                precio: e.target.value.length < 1 ? "0" : e.target.value,
              });
            }}
            size="small"
            prefix="Precio: "
          />
        </Col>
        <Col>
          <Button
            danger
            size="small"
            onClick={() => {
              onRemove();
            }}
          >
            <CloseOutlined />
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default RecStockCristalEsfCil;
