import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Space,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import SelectLocalidadV2 from "../SelectLocalidadV2";
import Edad from "./Edad";
import {
  convertInputToUpper,
  validate_only_numbers_and_letters,
} from "@/src/helpers/string_helper";
import { cliente_id_obl } from "@/src/config";

export default function ClienteFormDistrib({callback}) {
  const [btnDisabled, setBtnDisabled] = useState(false);
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

    clienteData.dni =
      clienteData.dni.trim().length > 0
        ? clienteData.dni.trim()
        : "_d_" + globals.obtenerSucursal() + "_" + Date.now();

    if (!validateStr(clienteData.nombres, "Nombres Vacío")) {
      return;
    }
    if (!confirm("Confirmar agregar cliente")) {
      return;
    }

    setBtnDisabled(true);

    let _data = {
      ...clienteData,
      nombres: clienteData.nombres.toUpperCase(),
      apellidos: clienteData.apellidos.toUpperCase(),
      domicilio: clienteData.domicilio.toUpperCase(),
      tk: globals.getToken(),
      id_usuario: globals.obtenerUID(),
      id_sucursal: globals.obtenerSucursal(),
      cliente_mayorista: 1
    };

    post_method(url, _data, (res) => {
      setBtnDisabled(false);
      callback(res.data, clienteData);
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

  return (
    <>
      {/*<Row style={{ padding: ".5em" }}>
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
            onBlur={(e) => {
              checkIfDNIExists(e.target.value);
            }}
          />
        </Col>
      </Row>*/}

      <Row style={{ padding: "4px" }}>
        <Col span={24}><span style={{fontWeight:"600"}}>Nombre:</span></Col>
        <Col span={24}>
          <Input
            onInput={convertInputToUpper}
            allowClear
            maxLength={45}
            value={clienteData.nombres}
            onChange={(e) => {
              //setClienteData(v=>({...v,nombres:e.target.value}))
              onChange(e.target.value, "nombres");
            }}
          />
        </Col>
      </Row>

      <Row style={{ padding: "4px" }}>
        <Col span={24}><span style={{fontWeight:"600"}}>Direcci&oacute;n:</span></Col>
        <Col span={24}>
          <Input
            allowClear
            onInput={convertInputToUpper}
            maxLength={45}
            onChange={(e) => {
              //setClienteData(d=>({...d,domicilio:e.target.value}))
              onChange(e.target.value, "domicilio");
            }}
            value={clienteData.domicilio}
          />
        </Col>
        {/*<Col style={{padding:".5em"}} span={12}>
                <SelectLocalidadV2 callback={(p)=>{
                    onChange(p.idlocalidad,"idlocalidad")
                    }} />
            </Col>*/}
      </Row>
      <Row style={{ padding: "4px" }}>
        <Col span={24}><span style={{fontWeight:"600"}}>Localidad:</span></Col>
        <Col span={18}>
          {<SelectLocalidadV2
            fk_localidad={+globals.obtenerOpticaLocalidad()}
            fk_provincia={+globals.obtenerOpticaProvincia()}
            callback={(p) => {
              // alert(JSON.stringify(p))
              onChange(p.idlocalidad, "idlocalidad");
            }}
          />}
        </Col>
      </Row>

      <Row style={{ padding: "4px" }}>
        <Col span={24}><span style={{fontWeight:"600"}}>Tel&eacute;fono:</span></Col>
        <Col span={24}>
          <Input
            allowClear
            width={"150px"}
            maxLength={20}
            onChange={(e) => {
              //setClienteData(d=>({...d,telefono:e.target.value}))
              onChange(e.target.value, "telefono");
            }}
            value={clienteData.telefono}
          />
        </Col>
      </Row>
      <Divider />
      <Row style={{ padding: ".5em" }}>
        <Col span={24}>
          <Button
            disabled={btnDisabled}
            block
            type="primary"
            onClick={onFinish}
          >
            Guardar
          </Button>
        </Col>
      </Row>
    </>
  );
}
