import HelperToolTip from "@/components/forms/ventas/common/HelperToolTip";
import SelectCodigoVenta from "@/components/forms/ventas/SelectCodigoVenta";
import globals from "@/src/globals";
import { Card, Input, InputNumber,Table } from "antd";

const TipoMultifocalesLab = ({ callback, path }) => {

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
            value={0}
            onChange={(e) => onChange(record.key + "_eje", e.target.value)}
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
            onChange={(e) =>
              onChange(record.key + "_precio", e.target.value)
            }
          />
        ) : (
          "-"
        ),
    },
  ];

  const onChange = (key, value) => {
    callback?.({path:[...path, key], values: [value]});
  };

  const onchange_codigo = (key_idcodigo, key_precio, key_descuento, value) => {
    //callback?.(path, [key_idcodigo, key_precio, key_descuento], value);
    callback?.(path, [key_idcodigo, key_precio, key_descuento], [value.idcodigo, value.precio_defecto_mayorista,0 ]);
  };

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
