import { Button, Col, Input, InputNumber, Row, Segmented } from "antd";

import { useState } from "react";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import globals from "@/src/globals";
import {
  parse_float_string,
  validate_esf_cil_eje,
  validate_only_numbers_and_letters,
} from "@/src/helpers/string_helper";
import SelectCodigoVenta from "../../SelectCodigoVenta";
import HelperToolTip from "../../common/HelperToolTip";
import { decimal_separator } from "@/src/config";

const RecStockCristalEsfCil = (props) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("List");
  const [cristal, setCristal] = useState({
    idcodigo: -1,
    tipo: props.tipo,
    codigo: null,
    eje: "0",
    precio: 0,
    cantidad: 1,
    esf: "",
    cil: "",
  });
  

  /*useEffect(() => {
    if (props.data  && props.data?.codigo) {
      setCristal(props.data);
    }
  }, [props.data]);*/

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
    if (!validate_esf_cil_eje(v.toString())) {
      return;
    }
    setCristal((cristal) => {
      const _cristal = { ...cristal, eje: v };
      props?.callback(_cristal);
      return _cristal;
    });
  };

  const onchange_esf = (v) => {
    //alert(v);
    /* if (!validate_esf_cil_eje(v)) {
      return;
    }*/
    setCristal((_cristal_) => {
      const __cristal = { ..._cristal_, esf: (v || "") == "" ? "0" : v };
      props?.callback(__cristal);
      return __cristal;
    });
  };
  const onchange_cil = (v) => {
    /*if (!validate_esf_cil_eje(v)) {
      return;
    }*/
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
          <HelperToolTip
            disabled={cristal.codigo == null}
            onChange={(e) => onchange_esf(e)}
            prefix={"Esf."}
          />
        </Col>
        <Col>
          {
            <HelperToolTip
              disabled={cristal.codigo == null}
              onChange={(e) => onchange_cil(e)}
              prefix={"Cil."}
            />
          }
        </Col>
        <Col>
          <InputNumber
            decimalSeparator={decimal_separator}
            onClick={(e) => {
              e.target.select();
            }}
            style={{ width: "100px" }}
            prefix="Eje:"
            disabled={cristal.codigo == null}
            size="middle"
            value={cristal.eje}
            onChange={(v) => {
              onchange_eje(v || "0");
            }}
            changeOnWheel={false}
          />
        </Col>
        <Col>
          <InputNumber
            changeOnWheel={false}
            decimalSeparator={decimal_separator}
            disabled={cristal.codigo == null}
            style={{ width: "150px" }}
            onClick={(e) => {
              e.target.select();
            }}
            prefix={"Precio: $"}
            onChange={(v) => {
              onchange_precio({
                precio: v || "0",
              });
            }}
            value={cristal.precio}
            size="middle"
          />
        </Col>
        <Col>
          <Button
            danger
            size="middle"
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
