import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import SelectLocalidadV2 from "../SelectLocalidadV2";
import Edad from "./Edad";
import {
  convertInputToUpper,
  validate_only_numbers_and_letters,
} from "@/src/helpers/string_helper";
import { cliente_id_obl } from "@/src/config";
import ConnectedButton from "../etc/CntButton";

export default function ClienteFormV3({ callback, data }) {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [fechaNac, setFechaNac] = useState({
    dia: "",
    mes: "",
    anio: "",
  });
  const [clienteData, setClienteData] = useState({
    nombres: "",
    dni: "",
    apellidos: "",
    nacimiento: null,
    domicilio: "",
    telefono: "",
    destinatario: "0",
    idlocalidad: globals.obtenerOpticaLocalidad(),
  });

  const url = post.insert.cliente;

  const onFinish = () => {
    const validateStr = (field, message) => {
      var _val = true;
      if (typeof field === "undefined") {
        _val = false;
        alert(message);
      }
      if (field === null) {
        _val = false;
        alert(message);
      }
      try {
        if (field?.trim().length < 1) {
          _val = false;
          alert(message);
        }
      } catch (e) {
        console.log(e);
      }
      return _val;
    };
    if (cliente_id_obl) {
      clienteData.fechaNac = `${fechaNac.anio}-${fechaNac.mes}-${fechaNac.dia}`;

      if (!/^[0-9]+$/.test(clienteData.dni.trim())) {
        alert("Campo DNI no válido");
        return;
      }
      if (!validateStr(clienteData.dni, "DNI Vacío")) {
        return;
      }
      if (fechaNac.anio == "" || fechaNac.mes == "" || fechaNac.dia == "") {
        alert("Campo fecha de nacimiento vacío");
        return;
      }
      if (!validateStr(clienteData.domicilio, "Domicilio Vacío")) {
        return;
      }

      if (!validateStr(clienteData.telefono, "Teléfono Vacío")) {
        return;
      }
    } else {
      clienteData.dni =
        clienteData.dni.trim().length > 0
          ? clienteData.dni.trim()
          : "_d_" + globals.obtenerSucursal() + "_" + Date.now();
    }

    if (!validateStr(clienteData.nombres, "Nombres Vacío")) {
      return;
    }
    if (!validateStr(clienteData.apellidos, "Apellidos Vacío")) {
      return;
    }

    if (!confirm("Confirmar agregar cliente")) {
      return;
    }

    setBtnDisabled(true);

    post_method(post.obtener_cliente_dni, { dni: clienteData.dni }, (res) => {
      if (res.data.length > 0) {
        alert("El cliente ya existe");
        setBtnDisabled(false);
      } else {
        let _data = {
          ...clienteData,
          nombres: clienteData.nombres.toUpperCase(),
          apellidos: clienteData.apellidos.toUpperCase(),
          domicilio: clienteData.domicilio.toUpperCase(),
          tk: globals.getToken(),
          id_usuario: globals.obtenerUID(),
          id_sucursal: globals.obtenerSucursal(),
        };

        post_method(url, _data, (res) => {
          setBtnDisabled(false);

          callback?.(res.data, clienteData);
        });
      }
    });
  };

  const checkIfDNIExists = (value) => {
    post_method(post.obtener_cliente_dni, { dni: clienteData.dni }, (res) => {
      if (res.data.length > 0) {
        alert("El cliente ya existe");
        setBtnDisabled(true);
      } else {
        setBtnDisabled(false);
      }
    });
  };

  const onChange = (val, idx) => {
    if(!val)
    {
      return
    }
    if (!validate_only_numbers_and_letters(val) && val.length > 0) {
      return;
    }
    setClienteData((d) => ({ ...d, [idx]: val }));
  };

  const onChangeFechaNac = (day, daystr) => {
    if (typeof day === "undefined") {
      setFechaNac({
        dia: "",
        mes: "",
        anio: "",
      });
      return;
    }
    if (day == null) {
      setFechaNac({
        dia: "",
        mes: "",
        anio: "",
      });
      return;
    }

    setFechaNac((f) => ({
      dia: day.date(),
      mes: +day.month() + 1,
      anio: day.year(),
    }));
  };

  useEffect(() => {
    /**
     * demo:
     * {
            "tramite": "00482910452",
            "apellido": "GOMEZ",
            "nombre": "JUAN CARLOS",
            "sexo": "M",
            "dni": "34567890",
            "ejemplar": "A",
            "fechaNacimiento": "15/04/1989",
            "fechaEmision": "10/06/2021"
        }
     */
    if (data) {
      const fecha = dayjs(data.fechaNacimiento, "DD/MM/YYYY");

      const day = fecha.date();
      const month = fecha.month() + 1; // Months are 0-indexed
      const year = fecha.year();

      setFechaNac((_) => ({
        dia: day,
        mes: month,
        anio: year,
      }));

      setClienteData((cd) => ({
        ...cd,
        nombres: data.nombre,
        apellidos: data.apellido,
        dni: data.dni,
        nacimiento: fecha,
        domicilio: data.direccion,
      }));
    }
  }, [data]);

  return (
    <>
      <Row style={{ padding: ".5em" }}>
        <Col span={24}>
          <Input
            onInput={convertInputToUpper}
            allowClear
            maxLength={10}
            style={{ appearance: "textfield" }}
            prefix={"D.N.I.: "}
            value={clienteData.dni}
            onChange={(e) => {
              onChange(e.target.value, "dni");
            }}
            readOnly={false /*props.destinatario*/}
            onBlur={(e) => {
              checkIfDNIExists(e.target.value);
            }}
          />
        </Col>
      </Row>

      <Row style={{ padding: ".5em" }}>
        <Col span={24}>
          <Input
            onInput={convertInputToUpper}
            allowClear
            style={{ appearance: "textfield" }}
            maxLength={45}
            prefix={<span style={{ fontWeight: "600" }}>Apellido:</span>}
            value={clienteData.apellidos}
            onChange={(e) => {
              //setClienteData(v=>({...v,apellidos:e.target.value}))
              onChange(e.target.value, "apellidos");
            }}
            readOnly={false}
          />
        </Col>
      </Row>

      <Row style={{ padding: ".5em" }}>
        <Col span={24}>
          <Input
            onInput={convertInputToUpper}
            allowClear
            maxLength={45}
            prefix={<span style={{ fontWeight: "600" }}>Nombres:</span>}
            value={clienteData.nombres}
            onChange={(e) => {
              //setClienteData(v=>({...v,nombres:e.target.value}))
              onChange(e.target.value, "nombres");
            }}
          />
        </Col>
      </Row>

      <Row style={{ padding: ".5em" }} gutter={16}>
        <Col>
          <DatePicker
            prefix={"Fecha de Nacimiento: "}
            format={"DD-MM-YYYY"}
            onChange={onChangeFechaNac}
            value={clienteData.nacimiento}
          />
        </Col>
        <Col>
          <Edad
            dia={fechaNac.dia}
            mes={fechaNac.mes}
            anio={fechaNac.anio}
            key={fechaNac}
          />
        </Col>
      </Row>

      <Row style={{ padding: ".5em" }} gutter={16}>
        <Col>
          <SelectLocalidadV2
            fk_localidad={+globals.obtenerOpticaLocalidad()}
            fk_provincia={+globals.obtenerOpticaProvincia()}
            callback={(p) => {
              onChange(p.idlocalidad, "idlocalidad");
            }}
          />
        </Col>
      </Row>

      <Row style={{ padding: ".5em" }} gutter={16}>
        <Col span={24}>
          <Input
            onInput={convertInputToUpper}
            style={{ width: "100%" }}
            prefix={"Domicilio:"}
            onChange={(e) => {
              //setClienteData(d=>({...d,domicilio:e.target.value}))
              onChange(e.target.value, "domicilio");
            }}
            value={clienteData.domicilio}
          />
        </Col>
        <Col span={24}>
          <Input
            style={{ width: "100%" }}
            prefix={"Teléfono:"}
            onChange={(e) => {
              //setClienteData(d=>({...d,telefono:e.target.value}))
              onChange(e.target.value, "telefono");
            }}
            value={clienteData.telefono}
          />
        </Col>
      </Row>

      <Row style={{ padding: ".5em" }}>
        <Col span={24}>
          <ConnectedButton
            disabled={btnDisabled}
            block
            type="primary"
            onClick={onFinish}
          >
            Guardar
          </ConnectedButton>
        </Col>
      </Row>
    </>
  );
}
