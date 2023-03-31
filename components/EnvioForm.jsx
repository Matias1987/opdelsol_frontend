import { Divider, Table } from "antd";
import CustomModal from "./CustomModal";
import FullPathStockSelect from "./FullPathStockSelect";
import LoadSelect from "./LoadSelect";
import { useState } from "react";

const { default: SucursalSelect } = require("./SucursalSelect")

const EnvioForm = () => {
    const [tableData,setTableData] = useState([])
    const url_for_stock_details = "http://localhost:3000/api/v1/stock/detalle/";
    const sucursal_id = 1; //THIS VALUE HAS TO BE DYNAMIC
    const setValue = (key,value) => {

    }

    const add_new_row = (data) => {
        let new_row = {
           ruta: data[0].ruta,
           codigo: data[0].codigo,
           cantidad: 0 
        }

        //setTableData({tableData:[...tableData,new_row]})
        setTableData([new_row])

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
                fetchurl={"http://localhost:3000/api/v1/sucursales"} callback={(id)=>{
                    setValue("sucursal", id)

        }} />
        <Divider />
        <Table
            loading={true}
            columns = {[
                {title:"ruta", dataindex: "ruta", key:"ruta"},
                {title:"codigo", dataindex: "codigo", key:"codigo"},
                {title:"cantidad", dataindex: "cantidad", key:"cantidad"},
            ]}
            dataSource={tableData}
        />
        <CustomModal 
        openButtonText="Agregar Producto" 
        title="Agregar Producto"
        onOk={
            (id)=>{
                /* get stock data for the column */
                fetch(url_for_stock_details+ sucursal_id + "/" + "1"/*<-- TEMPORARY!! */)
                .then(response=>response.json())
                .then((response)=>{
                    add_new_row(response.data)
                })
                .catch((error)=>{
                    console.error(error)
                })
            }
        }
        >
            <h3>Seleccione C&oacute;digo</h3>
            <FullPathStockSelect
                    callback={
                        (id)=>{alert(id)}
                    }
                />
        </CustomModal>
        </>
    )
}

export default EnvioForm;