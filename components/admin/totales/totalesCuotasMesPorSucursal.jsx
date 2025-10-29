import { Table } from "antd";
import { useEffect, useState } from "react";

const TotalesCuotasMesPorSucursal = () => {
    const [data, setData] = useState(null);
    const columns = [
        {
            title: "Sucursal",
            dataIndex: "sucursal",
            key: "sucursal",
        },
        {
            title: "Total Cuotas",
            dataIndex: "total_cuotas",
            key: "total_cuotas",
        },
    ];

    const load = () => {}

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
}

export default TotalesCuotasMesPorSucursal;