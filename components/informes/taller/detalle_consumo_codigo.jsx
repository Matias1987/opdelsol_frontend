import { Table } from "antd";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { useEffect } from "react";

const DetalleConsumoCodigo = ({ idcodigo, codigo }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    { title: "Nro Venta", dataIndex: "fk_venta", key: "fk_venta" },
    { title: "Fecha Retiro", dataIndex: "fecha", key: "fecha" },
    { title: "Código", dataIndex: "codigo" },
  ];
  const load = () => {
    setLoading(true);
    post_method(
      post.detalle_consumo_codigo,
      { fk_codigo: idcodigo },
      (response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    load();
  }, [idcodigo]);

  return (
    <>
      <Table
        title={(_) => <>Operaciones con: {codigo}</>}
        dataSource={data}
        columns={columns}
        loading={loading}
        scroll={{ y: "400px" }}
        pagination={false}
      />
    </>
  );
};

export default DetalleConsumoCodigo;
