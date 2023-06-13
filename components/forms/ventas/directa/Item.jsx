import CustomModal from "@/components/CustomModal";
import { Table } from "antd";
import SelectCodigoVenta from "../SelectCodigoVenta";

const VDItem = (props) => {
    return (<>

    <SelectCodigoVenta />

    <Table columns={[
        {title:"Codigo", dataIndex:"codigo"},
        {title:"Desc.", dataIndex:"descripcion"},
        {title:"Cantidad", dataIndex:"cantidad"},
        {title:"Precio", dataIndex:"precio"},
    ]}

    dataSource={[]}

    />

    </>)
}

export default VDItem;