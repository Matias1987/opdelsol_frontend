import { Table } from "antd";
import { useState } from "react";

const ListaVentasMedicos = (props) => {
    const [dataSource, setDataSource] = useState([])
    const columns = {}

    return <>
    <Table 
        columns={columns}
        dataSource={dataSource}
        
    />
    </>
}

export default ListaVentasMedicos;