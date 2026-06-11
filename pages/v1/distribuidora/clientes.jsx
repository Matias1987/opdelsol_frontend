import LayoutDistribuidora from "@/components/layout/layout_distribuidora";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Table } from "antd";
import { useState } from "react";

export default function clientes() {
  const [data, setData] = useState(null);
  const columns = [
    { title: "Nombre" },
    { title: "Teléfono" },
    { title: "Saldo" },
    {
      title: "Acciones",
      render: (_, record) => (
        <>
          <Button type="link">Ficha</Button>
          <Button type="link">Detalle</Button>
        </>
      ),
    },
  ];
  return (
    <>
      <Card
        title={
          <>
            Clientes&nbsp;
            <Button type="link">
              <PlusOutlined />
            </Button>
          </>
        }
        size="small"
        style={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          borderRadius: "16px",
        }}
        styles={{
          header: {
            backgroundColor: "##ffffed",
            background:
              "linear-gradient(281deg, #ffebcd 32%, rgba(231,233,235, 1) 75%)",
            borderBottom: "1px solid #eee",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          },
        }}
        extra={
          <>
            <Button type="link">
              <ReloadOutlined />
            </Button>
          </>
        }
      >
        <Table dataSource={data} columns={columns} />
      </Card>
    </>
  );
}

clientes.PageLayout = LayoutDistribuidora;
