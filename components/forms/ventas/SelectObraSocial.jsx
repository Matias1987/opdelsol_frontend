import CustomModal from "@/components/CustomModal";
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import { useState } from "react";
import ObraSocialForm from "../ObraSocialForm";

const SelectObraSocial = (props) => {
    const [idOS , setIdOS] = useState(-1);
    const [obrasociales, setObraSociales] = useState([
        //this is temporary data
        {idos: '1', nombre: "obra social 1"},
        {idos: '2', nombre: "obra social 2"},
        {idos: '3', nombre: "obra social 3"},
        {idos: '4', nombre: "obra social 4"},
        {idos: '5', nombre: "obra social 5"},

    ]);
    const columns = [
        {title: 'Nombre', dataIndex: 'nombre'},
        {title: '', dataIndex: 'idos', render: (idos)=>(
        <>
            <Button onClick={()=>{setIdOS(idos)}}><CheckCircleOutlined /></Button>
        </>
        )}
    ]

    return (
        idOS === -1 ?
        <>
        <CustomModal openButtonText="Seleccione Obra Social" title="" >
            Obra Social
            <Input.Search />
            <CustomModal openButtonText="+ Agregar" title="Agregar" >
                <ObraSocialForm />
            </CustomModal>
            <Table columns={columns} dataSource={obrasociales} />
        </CustomModal>
        </> 
        : 
        <>
        OS: <b>lalalla</b> &nbsp;
        <Button danger onClick={()=>{setIdOS(-1)}}><CloseOutlined /></Button>
        </>
    )
}

export default SelectObraSocial;