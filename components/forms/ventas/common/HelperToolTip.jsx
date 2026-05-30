import {
  Tooltip,
  Button,
  Switch,
  Input,
  InputNumber,
  AutoComplete,
} from "antd";
import { useState } from "react";
import PosNegPicker from "./PosNegPicker";

const HelperToolTip = ({ disabled, callback, value, onChange, prefix }) => {
  const [enabled, setEnabled] = useState(true);
  const [internalValue, setInternalValue] = useState("");
  const options = [
    { value: "0.00" },
    { value: "0.25" },
    { value: "0.50" },
    { value: "0.75" },
    { value: "1.00" },
    { value: "1.25" },
    { value: "1.50" },
    { value: "1.75" },
    { value: "2.00" },
    { value: "2.25" },
    { value: "2.50" },
    { value: "2.75" },
    { value: "3.00" },
    { value: "3.25" },
    { value: "3.50" },
    { value: "3.75" },
    { value: "4.00" },
    { value: "4.25" },
    { value: "4.50" },
    { value: "4.75" },
    { value: "5.00" },
    { value: "5.25" },
    { value: "5.50" },
    { value: "5.75" },
    { value: "6.00" },
    { value: "6.25" },
    { value: "6.50" },
    { value: "6.75" },
    { value: "7.00" },
    { value: "7.25" },
    { value: "7.50" },
    { value: "7.75" },
    { value: "8.00" },
    { value: "8.25" },
    { value: "8.50" },
    { value: "8.75" },
    { value: "9.00" },
    { value: "9.25" },
    { value: "9.50" },
    { value: "9.75" },
    { value: "10.00" },
    { value: "10.25" },
    { value: "10.50" },
    { value: "10.75" },
    { value: "11.00" },
    { value: "11.25" },
    { value: "11.50" },
    { value: "11.75" },
    { value: "12.00" },
  ];

  function normalizarYValidar(valor) {
    let mensajeError = null;

    // Detecta si tiene solo un decimal y lo normaliza
    const regexUnDecimal = /^(\+|\-)[0-9]{1,2}\.[0-9]$/;
    if (regexUnDecimal.test(valor)) {
      valor = valor + "0"; // convierte +5.6 → +5.60
    }

    // Validación estricta
    const regexEstricto = /^(\+|\-)[0-9]{1,2}\.[0-9]{2}$/;
    const esValido = regexEstricto.test(valor);

    if (!esValido) {
      if (!/^(\+|\-)/.test(valor)) {
        mensajeError = "El valor debe comenzar con + o -.";
      } else if (!/\.[0-9]{2}$/.test(valor)) {
        mensajeError = "El valor debe tener exactamente dos decimales.";
      } else if (!/^(\+|\-)[0-9]{1,2}/.test(valor)) {
        mensajeError = "El valor debe tener uno o dos dígitos antes del punto.";
      } else {
        mensajeError = "Formato inválido.";
      }
    }

    return {
      valorNormalizado: valor,
      valido: esValido,
      error: mensajeError,
    };
  }

  return (
    <Tooltip
      placement="top"
      title={
        <>
          {/*<Switch
            size="large"
            checked={enabled}
            onChange={(_) => setEnabled(!enabled)}
            checkedChildren={<span style={{fontSize:"1.5em", fontWeight:"bolder", marginTop:"-32px"}}>-</span>}
            unCheckedChildren={<span style={{fontSize:"1.5em", fontWeight:"bolder", marginTop:"-12px"}}>+</span>}
            defaultChecked
            style={{
              backgroundColor: enabled ? "green" : "orange", padding: "0" // Set colors dynamically
            }}
          />*/}
          <PosNegPicker
            onChange={(v) => {
              let e = true;
              if (/\+/.test(v)) {
                e=false;
              } 
              const v1 = (e ? "-" : "+") + internalValue;
              setEnabled(e);
              onChange?.(v1);
            }}
          />
        </>
      }
      color="cyan"
    >
      {/*<InputNumber
        onClick={(e) => {
          e.target.select();
        }}
        style={{ width: "130px",  }}
        prefix={<span style={{fontWeight:"500"}}>{`${enabled ? '-' : '+'}`}</span>}
        size="small"
        addonBefore={`${prefix}:`}
        disabled={disabled}
        value={value}
        defaultValue={0}
        step={"0.25"}
        min={0}
        onChange={(e) => {
          onChange?.(e);
        }}
      />*/}
      <AutoComplete
        options={options}
        value={internalValue}
        disabled={disabled}
        prefix={
          <span style={{ fontWeight: "500" }}>{`${enabled ? "-" : "+"}`}</span>
        }
        style={{ width: 100 }}
        placeholder="Ingrese valor"
        allowClear
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onChange={(e) => {
          let _value = e;
          if (/\+|\-/.test(_value)) {
            if (/\+/.test(_value)) {
              setEnabled(false);
            } else {
              setEnabled(true);
            }
            //remove + or - for validation
            _value = _value.replace(/\+|\-/, "");
          }
          setInternalValue(_value);
          const v1 = (enabled ? "-" : "+") + _value;
          onChange?.(v1);
        }}
        onFocus={(e)=>e.target.select()}
      />
    </Tooltip>
  );
};

export default HelperToolTip;
