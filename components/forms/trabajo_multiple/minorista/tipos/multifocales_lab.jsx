import HelperToolTipV2 from "@/components/forms/ventas/common/HelperToolTipV2";
import SelectCodigoVentaV2 from "@/components/forms/ventas/SelectCodigoVentaV2";
import globals from "@/src/globals";
import ScanOutlined from "@ant-design/icons/ScanOutlined";
import { Button, Card, Input, InputNumber, Table } from "antd";

const TipoMultifocalesLab = ({
  callback,
  path,
  trabajoObject,
  onScanValues,
  localId,
}) => {
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
      render: (_, { codigo }) => (
        <div
          style={{ fontSize: ".8em", textAlign: "center", color: "#bb3810" }}
        >
          {codigo}
        </div>
      ),
    },
    {
      title: "Código",
      dataIndex: "codigo",
      key: "codigo",
      render: (_, record) => (
        <>
          <SelectCodigoVentaV2
            defIdCodigo={trabajoObject?.[record.key + "_" + "idcodigo"] ?? null}
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
          <HelperToolTipV2
            defValue={trabajoObject?.[record.key + "_" + "esf"] ?? "0"}
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
          <HelperToolTipV2
            defValue={trabajoObject?.[record.key + "_" + "cil"] ?? "0"}
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
            value={trabajoObject?.[record.key + "_" + "eje"] ?? "0"}
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
            value={trabajoObject?.[record.key + "_" + "precio"] ?? "0"}
            onChange={(v) => onChange(record.key + "_precio", v)}
          />
        ) : (
          "-"
        ),
    },
  ];

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

  return (
    <Card
      size="small"
      title={
        <span style={{ color: "#262D42" }}>
          Multifocales Laboratorio&nbsp;&nbsp;
          <Button
            type="primary"
            onClick={(_) => {
              onScanValues(null, localId, "multifocales_lab", false);
            }}
          >
            <ScanOutlined />
          </Button>
        </span>
      }
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
