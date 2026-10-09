import HelperToolTip from "@/components/forms/ventas/common/HelperToolTip";
import SelectCodigoVenta from "@/components/forms/ventas/SelectCodigoVenta";
import globals from "@/src/globals";
import { Card, Input, InputNumber, Table } from "antd";
import { useEffect, useState } from "react";
const TipoLCLab = ({ callback, path }) => {
  const [od_eje, setOdEje] = useState("");
  const [oi_eje, setOiEje] = useState("");
  const [od_precio, setOdPrecio] = useState("");
  const [oi_precio, setOiPrecio] = useState("");
  const [od_cb, setOdCB] = useState("");
  const [oi_cb, setOiCB] = useState("");
  const [od_diam, setOdDiam] = useState("");
  const [oi_diam, setOiDiam] = useState("");

  const dataSource = [
    {
      key: "od",
      codigo: "od",
      esf: true,
      cil: true,
      eje: true,
      cb: true,
      diam: true,
      precio: true,
      id_familia: globals.familiaIDs.LC,
    },
    {
      key: "oi",
      codigo: "oi",
      esf: true,
      cil: true,
      eje: true,
      cb: true,
      diam: true,
      precio: true,
      id_familia: globals.familiaIDs.LC,
    },
    {
      key: "insumo",
      codigo: "insumo",
      esf: true,
      cil: false,
      eje: false,
      cb: false,
      diam: false,
      precio: true,
      id_familia: globals.familiaIDs.INSUMO,
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
          return { colSpan: 6 };
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
              onChange(record.key + "_esf", v);
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
              onChange(record.key + "_cil", v);
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
            value={record.key === "od" ? od_eje : oi_eje}
            onChange={(e) => {
              onChange(record.key + "_eje", e.target.value);
              if (record.key === "od") {
                setOdEje(e.target.value);
              } else {
                setOiEje(e.target.value);
              }
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
      title: "CB",
      dataIndex: "cb",
      key: "cb",
      render: (hasInput, record) =>
        hasInput ? (
          <Input
            type="number"
            placeholder="Input"
            value={record.key === "od" ? od_cb : oi_cb}
            onChange={(e) => {
              onChange(record.key + "_cb", e.target.value);
              if (record.key === "od") {
                setOdCB(e.target.value);
              } else {
                setOiCB(e.target.value);
              }
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
      title: "Diam",
      dataIndex: "diam",
      key: "diam",
      render: (hasInput, record) =>
        hasInput ? (
          <Input
            type="number"
            placeholder="Input"
            value={record.key === "od" ? od_diam : oi_diam}
            onChange={(e) => {
              onChange(record.key + "_diam", e.target.value);
              if (record.key === "od") {
                setOdDiam(e.target.value);
              } else {
                setOiDiam(e.target.value);
              }
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
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
      width: "120px",
      render: (hasInput, record) => (
        <InputNumber
          style={{ width: "120px" }}
          value={record.key === "od" ? od_precio : oi_precio}
          onChange={(v) => {
            onChange(record.key + "_precio", v);
            if (record.key === "od") {
              setOdPrecio(v);
            } else {
              setOiPrecio(v);
            }
          }}
        />
      ),
    },
  ];

  const onChange = (key, value) => {
    callback?.({ path: [...path], keys: [key], values: [value] });
  };

  const onchange_codigo = (key_idcodigo, key_precio, key_descuento, value) => {
    callback?.({
      path: path,
      keys: [key_idcodigo, key_precio, key_descuento],
      values: [value.idcodigo, value.precio, 0],
    });
  };

  useEffect(() => {
  }, []);

  return (
    <Card
      size="small"
      title={<span style={{ color: "#262D42" }}>L.C. Laboratorio</span>}
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

export default TipoLCLab;
