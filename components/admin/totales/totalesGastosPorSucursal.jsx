import { Table } from "antd";
import { useEffect } from "react";

const TotalesGastospORSucursal = () => {
  const [data, setData] = useState(null);
  const columns = [
    {
      title: "Sucursal",
      dataIndex: "sucursal",
      key: "sucursal",
    },
    {
      title: "Total Gastos",
      dataIndex: "total_gastos",
      key: "total_gastos",
    },
  ];
  const load = () => {};

  useEffect(() => {
    load();
  }, []);
  return (
    <>
      <Table
        scroll={{ y: "500px" }}
        pagination={false}
        dataSource={data}
        columns={columns}
      />
    </>
  );
};

export default TotalesGastospORSucursal;
