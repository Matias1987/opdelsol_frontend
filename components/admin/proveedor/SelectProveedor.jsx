import { get } from "@/src/urls";
import { Table } from "antd";
import { useEffect, useState } from "react";

const SelectProveedor = ({ callback }) => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      width: "100%",
      dataIndex: "idproveedor",
      key: "idproveedor",
      title: "Proveedor",
      render: (_, { nombre }) => <div>{nombre}</div>,
    },
  ];

  const load_proveedores = (on_finish) => {
    fetch(get.lista_proveedores)
      .then((r) => r.json())
      .then((response) => {
        setProveedores(
          response.data.map((r) => ({
            idproveedor: r.idproveedor,
            nombre: r.nombre,
          })),
        );
        on_finish?.();
      });
  };

  useEffect(() => {
    setLoading(true);
    load_proveedores((_) => setLoading(false));
  }, []);
  const header = () => {
    
  }
  return (
    <>
      <Table
        style={{ width: "100%" }}
        loading={loading}
        size="small"
        pagination={false}
        scroll={{ y: 300 }}
        columns={columns}
        dataSource={proveedores}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              callback?.(record);
            },
          };
        }}
      />
    </>
  );
};

export default SelectProveedor;
