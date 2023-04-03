import { Button, Divider, InputNumber, Table } from "antd";
import CustomModal from "./CustomModal";
import FullPathStockSelect from "./FullPathStockSelect";
import LoadSelect from "./LoadSelect";
import { useState } from "react";

const EnvioForm = () => {
    const [tableData,setTableData] = useState([])
    const [tableLoading,setTableLoading] = useState(false);
    const [selectedCodigoId, setSelectedCodigoId] = useState(-1);
    const url_for_stock_details = "http://localhost:3000/api/v1/stock/detalle/";
    const sucursal_id = 1; //THIS VALUE HAS TO BE DYNAMIC
    const setValue = (key,value) => {

    }

    const remove_row = (key) => {
        alert(key)
        setTableData(
            tableData.filter((r)=>(r.codigo!=key))
        )
    }

    const add_new_row = (data) => {
        const new_row = {
           key:data[0].idcodigo,
           ruta: data[0].ruta,
           codigo: data[0].codigo,
           cantidad: data[0].cantidad,
           ref_id: data[0].codigo
        }

        setTableLoading(false);

        setTableData([...tableData,new_row])
    }
    return (
        <>
        {/* sucursal destino */}
        <label>Sucursal:&nbsp;</label>
        <LoadSelect
                parsefnt = {
                    (data) =>(
                        data.map((row)=>(
                            {
                                "value": row.idsucursal,
                                "label": row.nombre
                            }
                        ))
                    )
                }
                fetchurl={"http://localhost:3000/api/v1/sucursales"} 
                callback={(id)=>{setValue("sucursal", id)}}      
        />
        <Divider />
        <Table
        loading={tableLoading}
            columns = {[
                {title:"ruta", dataIndex: "ruta",},
                {title:"codigo", dataIndex: "codigo", },
                {
                    title:"cantidad", 
                    dataIndex: "cantidad",  
                    render: (_,{cantidad})=>(
                        <InputNumber min={1} max={cantidad} defaultValue={1} />
                    )
                },
                {
                    title:"Acciones", 
                    dataIndex: "ref_id",
                    render: (_,{ref_id})=>(
                        <Button  onClick={()=>{remove_row(ref_id)}}>X</Button>)
                    ,
                },
            ]}
            dataSource={tableData}
        />
        <CustomModal 
        openButtonText="Agregar Producto" 
        title="Agregar Producto"
        onOk={
            ()=>{
                const found = tableData.find(e=>e.key == selectedCodigoId)
                alert(found)
                if(found) {alert("code already added!")}
                if(selectedCodigoId!=-1 && !found){
                    setTableLoading(true);
                    /* get stock data for the column */
                    alert(url_for_stock_details+ sucursal_id + "/" + selectedCodigoId)
                    fetch(url_for_stock_details+ sucursal_id + "/" + selectedCodigoId/*<-- TEMPORARY!! */)
                    .then(response=>response.json())
                    .then((response)=>{
                        add_new_row(response.data)
                    })
                    
                    .catch((error)=>{
                        console.error(error)
                    })
                }
            }
        }
        >
            <h3>Seleccione C&oacute;digo</h3>
            <FullPathStockSelect
                    callback={
                        (id)=>{
                            //alert(id)
                            setSelectedCodigoId(id);
                        }
                    }
                />
        </CustomModal>
        </>
    )
}

export default EnvioForm;