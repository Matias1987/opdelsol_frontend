import React, { useMemo, useState } from "react";
import { Table, Tag, Button, Space, Input, Select, Card } from "antd";
import { SearchOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useOperationDraft } from "@/src/hooks/useOperationDraft";
const { Option } = Select;
export default function OperacionesMovilTable({ data = [], onContinuar }) {
  
    const { saveDraft, removeDraft, filterPending } = useOperationDraft();

  const [search, setSearch] = useState("");
  const [vendedor, setVendedor] = useState();
  const [sucursal, setSucursal] = useState();
  const vendedores = useMemo(() => {
    return [...new Set(data.map((x) => x.vendedorNombre))]
      .filter(Boolean)
      .sort();
  }, [data]);
  const sucursales = useMemo(() => {
    return [...new Set(data.map((x) => x.sucursalNombre))]
      .filter(Boolean)
      .sort();
  }, [data]);
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchSearch =
        !search ||
        row.codigo?.toLowerCase().includes(search.toLowerCase()) ||
        row.clienteNombre?.toLowerCase().includes(search.toLowerCase());
      const matchVendedor = !vendedor || row.vendedorNombre === vendedor;
      const matchSucursal = !sucursal || row.sucursalNombre === sucursal;
      return matchSearch && matchVendedor && matchSucursal;
    });
  }, [data, search, vendedor, sucursal]);
  const columns = [
    {
      title: "Código",
      dataIndex: "codigo",
      width: 120,
      render: (value) => <Tag color="blue">{value}</Tag>,
    },
    {
      title: "Cliente",
      dataIndex: "clienteNombre",
    },
    {
      title: "Vendedor",
      dataIndex: "vendedorNombre",
    },
    /*{
      title: "Sucursal",
      dataIndex: "sucursalNombre",
    },*/
    {
      title: "DNI",
      dataIndex: "datosDni",
      align: "center",
      width: 90,
      render: (value) => (value ? <Tag color="green">DNI</Tag> : <></>),
    },
    {
      title: "Receta",
      dataIndex: "datosReceta",
      align: "center",
      width: 90,
      render: (value) => (value ? <Tag color="green">RECETA</Tag> : <></>),
    },
    /*{
      title: "Estado",
      dataIndex: "estado",
      width: 120,
      render: (estado) => {
        const colors = {
          PENDIENTE: "orange",
          EN_PROCESO: "blue",
          FINALIZADA: "green",
          CANCELADA: "red",
        };
        return <Tag color={colors[estado]}>{estado}</Tag>;
      },
    },*/
    {
      title: "Fecha",
      dataIndex: "fechaCreacion",
      width: 180,
    },
    {
      title: "Acciones",
      width: 140,
      render: (_, record) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            removeDraft(record.id);
          }}
        ></Button>
      ),
    },
  ];
  return (
    <Card title="Operaciones generadas desde móvil">
      <Space
        wrap
        style={{
          marginBottom: 16,
          width: "100%",
        }}
      >
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="Buscar por código o cliente"
          style={{ width: 300 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          allowClear
          placeholder="Vendedor"
          style={{ width: 200 }}
          onChange={setVendedor}
        >
          {vendedores.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
        {/*<Select
          allowClear
          placeholder="Sucursal"
          style={{ width: 220 }}
          onChange={setSucursal}
        >
          {sucursales.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>*/}
      </Space>
      <Table
        title={(_) => (
          <span style={{ color: "black" }}>Operaciones Pendientes</span>
        )}
        rowKey="id"
        columns={columns}
        dataSource={filteredData}
        showHeader={false}
        pagination={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              console.log("Clicked row:", record, "at index:", rowIndex);
              saveDraft(record);
              onContinuar(record);
            },
            onDoubleClick: (event) => {},
            onContextMenu: (event) => {}, // Right-click
            onMouseEnter: (event) => {},
            onMouseLeave: (event) => {},
          };
        }}
      />
    </Card>
  );
}
