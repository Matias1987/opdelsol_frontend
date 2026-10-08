import SelectCodigoVenta from "@/components/forms/ventas/SelectCodigoVenta";
import globals from "@/src/globals";
import { Card, Col, Divider, Input, InputNumber, Row, Table } from "antd";
import { useEffect, useState } from "react";

const TipoLCStock = ({ callback, path }) => {
  const [od_cant, setOdCant] = useState("");
  const [oi_cant, setOiCant] = useState("");
  const [od_precio, setOdPrecio] = useState("");
  const [oi_precio, setOiPrecio] = useState("");

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
    callback?.({ path: [...path, key], values: [value] });
  };

  const onchange_codigo = (key_idcodigo, key_precio, key_descuento, value) => {
    callback?.({
      path: [...path, key_idcodigo, key_precio, key_descuento],
      values: [value.idcodigo, value.precio_defecto_mayorista, 0],
    });
  };

  useEffect(() => {}, []);

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
          <Input
            value={record.key === "od" ? od_precio : oi_precio}
            onChange={(e) => {
              onChange(record.key + "_precio", e.target.value);
              if (record.key === "od") {
                setOdPrecio(e.target.value);
              } else {
                setOiPrecio(e.target.value);
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
      title: "Cant",
      dataIndex: "cant",
      key: "cant",
      render: (hasInput, record) =>
        hasInput ? (
          <Input
            type="number"
            placeholder="Input"
            value={record.key === "od" ? od_cant : oi_cant}
            onChange={(e) => {
              if (record.key === "od") {
                setOdCant(e.target.value);
              } else {
                setOiCant(e.target.value);
              }
              onChange(record.key + "_cant", e.target.value);
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
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: "120px",
      render: (hasInput, record) =>
        hasInput ? <Input style={{ width: "120px" }} value={0} /> : "-",
    },
  ];

  return (
    <Card
      size="small"
      title={<span style={{ color: "#262D42" }}>Lentes de Contacto Stock</span>}
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
