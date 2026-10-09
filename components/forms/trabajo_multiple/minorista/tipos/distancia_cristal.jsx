import SelectCodigoVenta from "@/components/forms/ventas/SelectCodigoVenta";
import globals from "@/src/globals";
import { Input, InputNumber, Table } from "antd";
import { useState } from "react";
import HelperToolTip from "@/components/forms/ventas/common/HelperToolTip";

const DistanciaCristal = ({ callback, tipo, path }) => {
  const [od_eje, setOdEje] = useState("");
  const [oi_eje, setOiEje] = useState("");
  const [od_precio, setOdPrecio] = useState("");
  const [oi_precio, setOiPrecio] = useState("");
  const [armazon_precio, setArmazonPrecio] = useState("");
  const [tratamiento_precio, setTratamientoPrecio] = useState("");

  const onChange = (key, value) => {
    callback?.({ path: path, keys: [key], values: [value] });
  };

  const onchange_codigo = (key_idcodigo, key_precio, key_descuento, value) => {
    callback?.({
      path: path,
      keys: [key_idcodigo, key_precio, key_descuento],
      values: [value.idcodigo, value.precio, 0],
    });
  };

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
            value={record.key === "od" ? od_eje : oi_eje}
            onChange={(e) => {
              onChange(record.key + "_" + "eje", e.target.value);
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
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
      width: "120px",
      render: (hasInput, record) =>
        hasInput ? (
          <InputNumber
            style={{ width: "120px" }}
            value={0}
            onChange={(v) => onChange(record.key + "_" + "precio", v)}
          />
        ) : (
          "-"
        ),
    },
  ];
  /*
  useEffect(() => {
   
  }, [trabajoObject]);
*/
  return (
    <Table
      size="small"
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      scroll={{ y: 240, x: 100 }}
    />
  );
};

export default DistanciaCristal;
