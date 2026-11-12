import SelectCodigoVentaV2 from "@/components/forms/ventas/SelectCodigoVentaV2";
import globals from "@/src/globals";
import ScanOutlined from "@ant-design/icons/ScanOutlined";
import { Button, Card,  Input, InputNumber, Table } from "antd";
const TipoLCStock = ({
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
      total: true,
      cant: true,
      precio: true,
      id_familia: globals.familiaIDs.LC,
    },
    {
      key: "oi",
      codigo: "oi",
      total: true,
      cant: true,
      precio: true,
      id_familia: globals.familiaIDs.LC,
    },
    {
      key: "insumo",
      codigo: "insumo",
      total: true,
      cant: false,
      precio: true,
      id_familia: globals.familiaIDs.INSUMO,
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
          />
        </>
      ),
      onCell: (_, index) => {
        // Merge all 3 columns on the third row (index 2)
        if (index > 1) {
          return { colSpan: 3 };
        }
        return {};
      },
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
      render: (hasInput, record) =>
        hasInput ? (
          <InputNumber
            style={{ width: "120px" }}
            value={trabajoObject?.[record.key + "_precio"] ?? "0"}
            onChange={(v) => onChange(record.key + "_precio", v)}
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
      title: "Cant",
      dataIndex: "cant",
      key: "cant",
      render: (hasInput, record) =>
        hasInput ? (
          <Input
            type="number"
            placeholder="Input"
            value={trabajoObject?.[record.key + "_cantidad"] ?? "0"}
            onChange={(v) => onChange(record.key + "_cantidad", v)}
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
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: "120px",
      render: (hasInput, record) =>
        hasInput ? (
          <Input
            style={{ width: "120px" }}
            value={trabajoObject?.[record.key + "_total"] ?? "0"}
          />
        ) : (
          "-"
        ),
    },
  ];

  return (
    <Card
      size="small"
      title={
        <span style={{ color: "#262D42" }}>
          Lentes de Contacto Stock&nbsp;&nbsp;
          <Button
            type="primary"
            onClick={(_) => {
              onScanValues(null, localId, "lc_stock", false);
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

export default TipoLCStock;
