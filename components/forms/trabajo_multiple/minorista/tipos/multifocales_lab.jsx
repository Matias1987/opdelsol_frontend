import HelperToolTip from "@/components/forms/ventas/common/HelperToolTip";
import SelectCodigoVenta from "@/components/forms/ventas/SelectCodigoVenta";
import globals from "@/src/globals";
import { Card, Col, Divider, Input, InputNumber, Row, Table } from "antd";
import { useEffect, useState } from "react";

const TipoMultifocalesLab = ({ callback, onComentariosChange }) => {
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
      esf: true,
      cil: false,
      eje: false,
      precio: true,
      id_familia: globals.familiaIDs.ARMAZON,
    },
    {
      key: "tratamiento",
      codigo: "tratamiento",
      esf: true,
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

  return (
    <Card
      size="small"
      title={<span style={{ color: "#262D42" }}>Multifocales Laboratorio</span>}
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

export default TipoMultifocalesLab;
