import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Card, Table } from "antd";
import { useEffect, useState } from "react";

const DetalleFondoFijo = (props) => {
  const { idcaja, nombre } = props;
  const [data, setData] = useState(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Detalle",
      dataIndex: "detalle",
      render: (_, record) => <>{record.tipo}</>,
    },
    {
      title: "Fecha",
      dataIndex: "fecha_fmt",
      key: "fecha",
    },
    {
      title: (
        <>
          <div style={{ textAlign: "right" }}>Monto</div>
        </>
      ),
      dataIndex: "monto",
      key: "monto",
      render: (_, { monto, tipo }) => (
        <>
          <div
            style={{
              textAlign: "right",
              color: tipo === "ingreso" ? "green" : "red",
            }}
          >
            {tipo === "ingreso" ? `+${monto}` : `-${monto}`}
          </div>
        </>
      ),
    },
  ];

  const load = () => {
    post_method(
      post.get_operaciones_fondo_fijo,
      { idcaja: 3253 },
      (response) => {
        setData(response);
      }
    );
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Card title={`Detalle de Fondo Fijo - ${nombre}`} size="small">
        <Table
          scroll={{ y: '300px' }}
          size="small"
          pagination={false}
          dataSource={data}
          columns={columns}
          summary={(data) => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={3}>
                  Total
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} colSpan={2}>
                  <div style={{ textAlign: "right" }}>
                    {data
                      .reduce(
                        (acc, item) =>
                          acc +
                          (item.tipo === "ingreso"
                            ? parseFloat(item.monto)
                            : -parseFloat(item.monto)),
                        0
                      )
                      .toFixed(2)}
                  </div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>
    </>
  );
};

export default DetalleFondoFijo;
