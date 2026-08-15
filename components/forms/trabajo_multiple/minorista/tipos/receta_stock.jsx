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
import PrescriptionTable from "./prescription_table";
import HelperToolTip from "@/components/forms/ventas/common/HelperToolTip";

const TipoRecetaStock = ({ callback, onComentariosChange }) => {
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
      callback?.(
        modif,
        modif.od_precio + modif.oi_precio + modif.tratamiento_precio,
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
        callback?.(mod, mod.od_precio + mod.oi_precio + mod.tratamiento_precio);
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

      callback?.(mod, mod.od_precio + mod.oi_precio + mod.tratamiento_precio);
      return mod;
    });
  };

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
      span_codigo_col: 1,
    },
    {
      key: "oi",
      codigo: "oi",
      esf: true,
      cil: true,
      eje: true,
      precio: true,
      id_familia: globals.familiaIDs.CRISTALES,
      span_codigo_col: 1,
    },
    {
      key: "armazon",
      codigo: "armazon",
      esf: false,
      cil: false,
      eje: false,
      precio: true,
      id_familia: globals.familiaIDs.ARMAZON,
      span_codigo_col: 3,
    },
    {
      key: "tratamiento",
      codigo: "tratamiento",
      esf: false,
      cil: false,
      eje: false,
      precio: true,
      id_familia: globals.familiaIDs.TRATAMIENTO,
      span_codigo_col: 3,
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
            callback={(v) => {}}
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
        hasInput ? <HelperToolTip onChange={(_) => {}} /> : "-",
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
        hasInput ? <HelperToolTip onChange={(_) => {}} /> : "-",
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
            onChange={(e) => handleChange(record.key, "eje", e.target.value)}
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
            onChange={(e) => handleChange(record.key, "precio", e.target.value)}
          />
        ) : (
          "-"
        ),
    },
  ];

  useEffect(() => {
    callback?.(
      trabajoStock,
      trabajoStock.od_precio +
        trabajoStock.oi_precio +
        trabajoStock.tratamiento_precio,
    );
  }, []);

  return (
    <Card
      size="small"
      title={<span style={{ color: "#262D42" }}>Receta Stock</span>}
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

export default TipoRecetaStock;
