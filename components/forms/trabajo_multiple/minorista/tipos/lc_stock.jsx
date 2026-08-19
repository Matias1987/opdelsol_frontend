import HelperToolTip from "@/components/forms/ventas/common/HelperToolTip";
import SelectCodigoVenta from "@/components/forms/ventas/SelectCodigoVenta";
import globals from "@/src/globals";
import { Card, Col, Divider, Input, InputNumber, Row, Table } from "antd";
import { useEffect, useState } from "react";

const TipoLCStock = ({ callback, onComentariosChange }) => {
  const [trabajoStock, setTrabajoStock] = useState({
    od_idcodigo: "",
    od_esf: "",
    od_cil: "",
    od_eje: "",
    od_cantidad: "",
    od_total: "0",
    od_precio: "",
    oi_idcodigo: "",
    oi_esf: "",
    oi_cil: "",
    oi_eje: "",
    oi_cantidad: "",
    oi_total: "0",
    oi_precio: "",
    insumo_idcodigo: "",
    insumo_precio: "",
    insumo_total: "0",
  });

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
            value={trabajoStock[record.key + "_precio"]}
            onChange={(e) => {
              onChange(record.key + "_precio", e.target.value);
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
            value={trabajoStock[record.key + "_cant"]}
            onChange={(e) =>
              onChange(record.key + "_cant", e.target.value)
            }
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
        hasInput ? <Input style={{ width: "120px" }} value={trabajoStock[record.key + "_total"]} /> : "-",
    },
  ];

  const onChange = (key, value) => {
    setTrabajoStock((t) => {
      const modif = { ...t, [key]: value };
      callback?.(
        modif,
        parseFloat(trabajoStock.od_total) +
          parseFloat(trabajoStock.oi_total) +
          parseFloat(trabajoStock.insumo_total),
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
          parseFloat(trabajoStock.od_total) +
            parseFloat(trabajoStock.oi_total) +
            parseFloat(trabajoStock.insumo_total),
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
        parseFloat(trabajoStock.od_total) +
          parseFloat(trabajoStock.oi_total) +
          parseFloat(trabajoStock.insumo_total),
      );
      return mod;
    });
  };

  useEffect(() => {
    callback?.(
      trabajoStock,
      parseFloat(trabajoStock.od_total) +
        parseFloat(trabajoStock.oi_total) +
        parseFloat(trabajoStock.insumo_total),
    );
  }, []);

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
