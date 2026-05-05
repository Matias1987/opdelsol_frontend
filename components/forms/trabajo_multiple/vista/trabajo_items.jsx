import { Table } from "antd";

const ItemsTMDetalle =  ({items}) => {
    const columns = [
        { dataIndex:"tipo", width:"80px",title:"idcodigo"},
        { dataIndex:"esf", width:"80px",title:"esf"},
        { dataIndex:"cil", width:"80px",title:"cil"},
        { dataIndex:"eje", width:"80px",title:"eje"},
        { dataIndex:"precio", width:"80px",title:"precio"},
        { dataIndex:"cantidad", width:"80px",title:"cantidad"},
        { dataIndex:"total", width:"80px",title:"total"},
    ];
    return <>
    <Table columns={columns} dataSource={items} pagination={false} />
    </>
}

export default ItemsTMDetalle;