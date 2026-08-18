import HelperToolTip from "@/components/forms/ventas/common/HelperToolTip";
import SelectCodigoVenta from "@/components/forms/ventas/SelectCodigoVenta";
import globals from "@/src/globals";
import {
  Card,
  Col,
  Divider,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
} from "antd";
import { useEffect, useState } from "react";

const TipoMonofocalesLab = ({ callback, onComentariosChange }) => {
  const [trabajoStock, setTrabajoStock] = useState({
    od_idcodigo: "",
    od_esf: "",
    od_cil: "",
    od_eje: "",
    od_precio: "0",
    oi_idcodigo: "",
    oi_esf: "",
    oi_cil: "",
    oi_eje: "",
    oi_precio: "",
    armazon_idcodigo: "",
    armazon_precio: "0",
    tratamiento_idcodigo: "",
    tratamiento_precio: "0",
  });

  const onChange = (key, value) => {
    setTrabajoStock((t) => {
      const modif = { ...t, [key]: value };
      callback?.(
        modif,
        parseFloat(modif.od_precio) +
          parseFloat(modif.oi_precio) +
          parseFloat(modif.tratamiento_precio) +
          parseFloat(modif.armazon_precio),
      );
      return modif;
    });
  };

  const onchange_codigo = (key_idcodigo, key_precio, key_descuento, value) => {
    if (value === null || value?.codigo === null) {
      setTrabajoStock((p) => {
        const mod = {
          ...p,
          [key_idcodigo]: value.idcodigo,
          [key_precio]: value.precio_defecto_mayorista,
          [key_descuento]: 0,
        };
        callback?.(
          mod,
          parseFloat(mod.od_precio) +
            parseFloat(mod.oi_precio) +
            parseFloat(mod.tratamiento_precio) +
            parseFloat(mod.armazon_precio),
        );
        return mod;
      });
      return;
    }
    setTrabajoStock((p) => {
      const mod = {
        ...p,
        [key_idcodigo]: value.idcodigo,
        [key_precio]:
          parseFloat(value.precio_defecto_mayorista) -
          parseFloat(value.precio_defecto_mayorista) *
            parseFloat(value.descuento || "0") *
            0.01,
        [key_descuento]: value.descuento || "0",
      };

      callback?.(
        mod,
        parseFloat(mod.od_precio) +
          parseFloat(mod.oi_precio) +
          parseFloat(mod.tratamiento_precio) +
          parseFloat(mod.armazon_precio),
      );
      return mod;
    });
  };

  useEffect(() => {
    callback?.(
      trabajoStock,
      parseFloat(trabajoStock.od_precio) +
        parseFloat(trabajoStock.oi_precio) +
        parseFloat(trabajoStock.tratamiento_precio) +
        parseFloat(trabajoStock.armazon_precio),
    );
  }, []);

  const [formValues, setFormValues] = useState({
    od: { esf: "", cil: "", eje: "", precio: "" },
    oi: { esf: "", cil: "", eje: "", precio: "" },
    armazon: { esf: "", cil: "", eje: "", precio: "" },
    tratamiento: { esf: "", cil: "", eje: "", precio: "" },
  });

  const dataSource = [
    {
      key: "od",
      codigo: "od",
      esf: true,
      cil: true,
      eje: true,
      precio: true,
      id_familia: globals.familiaIDs.CRISTALES,
    },
    {
      key: "oi",
      codigo: "oi",
      esf: true,
      cil: true,
      eje: true,
      precio: true,
      id_familia: globals.familiaIDs.CRISTALES,
    },
    {
      key: "armazon",
      codigo: "armazon",
      esf: false,
      cil: false,
      eje: false,
      precio: true,
      id_familia: globals.familiaIDs.ARMAZON,
    },
    {
      key: "tratamiento",
      codigo: "tratamiento",
      esf: false,
      cil: false,
      eje: false,
      precio: true,
      id_familia: globals.familiaIDs.TRATAMIENTO,
    },
  ];

  const columns = [
    {
      title: "",
      dataIndex: "key",
      render: (_, { codigo }) => <span>{codigo}</span>,
    },
    {
      title: "Código",
      dataIndex: "codigo",
      key: "codigo",
      render: (_, record) => (
        <>
          <SelectCodigoVenta
            hideExtOpt={"1"}
            idfamilias={[record.id_familia]}
            buttonText={"Seleccionar..."}
            callback={(v) => {
              onchange_codigo(
                record.key + "_" + "idcodigo",
                record.key + "_" + "precio",
                record.key + "_" + "descuento",
                v,
              );
            }}
          />{" "}
        </>
      ),
      onCell: (_, index) => {
        // Merge all 3 columns on the third row (index 2)
        if (index > 1) {
          return { colSpan: 4 };
        }
        return {};
      },
    },
    {
      title: "Esf",
      dataIndex: "esf",
      key: "esf",
      render: (hasInput, record) =>
        hasInput ? (
          <HelperToolTip
            onChange={(v) => {
              onChange(record.key + "_" + "esf", v);
            }}
          />
        ) : (
          "-"
        ),
      onCell: (_, index) => {
        // Merge all 3 columns on the third row (index 2)
        if (index > 1) {
          return { colSpan: 0 };
        }
        return {};
      },
    },
    {
      title: "Cil",
      dataIndex: "cil",
      key: "cil",
      render: (hasInput, record) =>
        hasInput ? (
          <HelperToolTip
            onChange={(v) => {
              onChange(record.key + "_" + "cil", v);
            }}
          />
        ) : (
          "-"
        ),
      onCell: (_, index) => {
        // Merge all 3 columns on the third row (index 2)
        if (index > 1) {
          return { colSpan: 0 };
        }
        return {};
      },
    },
    {
      width: "100px",
      title: "Eje",
      dataIndex: "eje",
      key: "eje",
      render: (hasInput, record) =>
        hasInput ? (
          <Input
            type="number"
            placeholder="Input"
            value={formValues[record.key].eje}
            onChange={(e) => onChange(record.key + "_" + "eje", e.target.value)}
          />
        ) : (
          "-"
        ),
      onCell: (_, index) => {
        // Merge all 3 columns on the third row (index 2)
        if (index > 1) {
          return { colSpan: 0 };
        }
        return {};
      },
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
      width: "120px",
      render: (hasInput, record) =>
        hasInput ? (
          <InputNumber
            style={{ width: "120px" }}
            value={formValues[record.key].precio}
            onChange={(e) =>
              onChange(record.key + "_" + "precio", e.target.value)
            }
          />
        ) : (
          "-"
        ),
    },
  ];

  return (
    <Card
      size="small"
      title={<span style={{ color: "#262D42" }}>Monofocales Laboratorio</span>}
      style={{ boxShadow: "-1px 1px 1px 1px #9e9c9c" }}
    >
      <Table
        size="small"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </Card>
  );
};

export default TipoMonofocalesLab;
