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

const HelperToolTip = ({ disabled, callback, value, onChange, prefix, pWidth, positiveZero }) => {
  const [enabled, setEnabled] = useState(true);
  const [internalValue, setInternalValue] = useState("");
  const [error, setError] = useState(false);
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

  // Función de formateo y validación simplificada
  const procesarFormato = (texto) => {
    let valor = texto.trim();

    // Permite opcionalmente enteros y decimales, sin signos
    const esNumeroValido = /^\d+(\.\d+)?$/.test(valor);
    if (!esNumeroValido) {
      return { valido: false, valorProcesado: valor };
    }

    const numero = parseFloat(valor);

    // Caso especial del cero o cualquier número: forzar siempre dos decimales
    const valorFormateado = numero.toFixed(2);

    return {
      valido: true,
      valorProcesado: valorFormateado
    };
  };

  // Se ejecuta al salir del input
  const handleBlur = () => {
    if (!internalValue) return; // No validar si está vacío

    const resultado = procesarFormato(internalValue);

    if (resultado.valido) {

      setInternalValue(resultado.valorProcesado);
      let _enabled = enabled;
      //alert(_enabled)
      if(parseFloat(resultado.valorProcesado)==0){
        _enabled=false;
      }
      const v1 = (_enabled ? "-" : "+") + resultado.valorProcesado;
      //alert(v1)
      onChange?.(v1);
      setError(false);
    } else {
      setInternalValue("0.00")
      onChange?.("+0.00");
      setError(true); // Muestra error si ingresó letras o signos inválidos
    }
  };

  return (
    <Tooltip
      placement="top"
      title={
        <>
          <PosNegPicker
            onChange={(v) => {
              let e = true;
              if (/\+/.test(v)) {
                e = false;
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
      <AutoComplete
        onBlur={handleBlur}
        options={options}
        value={internalValue}
        disabled={disabled}
        prefix={
          <span style={{ fontWeight: "500", whiteSpace: "nowrap" }}>{prefix} {`${enabled ? "-" : "+"}`}</span>
        }
        style={{ width: pWidth || "80px" }}
        placeholder=""
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onChange={(e) => {
          let _value = e || "";

          if (_value.length < 1) {
            onChange?.("");
          }

          let _enabled = enabled
          if (/\+|\-/.test(_value)) {
            if (/\+/.test(_value)) {
              //setEnabled(false);
              _enabled = false;
            } else {
              //setEnabled(true);
              _enabled = true;
            }
            //remove + or - for validation
            _value = _value.replace(/\+|\-/, "");
          }

          if (_value.toString() == "0.00") {
            //alert(positiveZero ? "El valor 0.00 se interpretará como positivo." : "El valor 0.00 se interpretará como negativo.");
            _enabled = positiveZero ? false : true;
          }
          setEnabled(_enabled)
          setInternalValue(_value);
          const v1 = (_enabled ? "-" : "+") + _value;

          onChange?.(v1);
        }}
        onFocus={(e) => e.target.select()}


      />
    </Tooltip>
  );
};

export default HelperToolTip;
