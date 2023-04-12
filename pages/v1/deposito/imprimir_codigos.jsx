import CustomModal from "@/components/CustomModal";
import PrinterWrapper from "@/components/PrinterWrapper";
import SearchStock from "@/components/SearchStock";
import { Button, Divider, Form, InputNumber, Table } from "antd";
import { useEffect, useState } from "react";
import Barcode from "react-barcode";
const urls = require("../../../src/urls")

const ImprimirCodigos = () => {
    const [tableData,setTableData] = useState([])
    const [tableLoading,setTableLoading] = useState(false);
    //const [selectedCodigoId, setSelectedCodigoId] = useState(-1);

    
    const remove_row = (key) => {
        setTableData(
            tableData.filter((r)=>(r.codigo!=key))
        )
    }

    const add_new_row = (data) => {
        const new_row = {
           ruta:"-",
           key:data[0].idcodigo,
           codigo: data[0].codigo,
           cantidad: 1,
           ref_id: data[0].codigo,
        }
        setTableLoading(false);
        setTableData([...tableData,new_row])
    }

    const load_details_for_selected_id = (idcodigo) => {
        const found = tableData.find(e=>e.key == idcodigo)
        if(found) {alert("Codigo ya cargado!"); return;}
        setTableLoading(true);
        /* get stock data for the column */
        fetch(urls.get.detalle_codigo + "/" + idcodigo)
        .then(response=>response.json())
        .then((response)=>{
            add_new_row(response.data)
        })
        .catch((error)=>{
            console.error(error)
        })
    }

    return (
        <>
            <h1>Imprimir C&oacute;digos de Barras</h1>
            <Divider />
            <CustomModal 
                openButtonText="Agregar Codigo"
                title="Agregar Producto"
                onOk={()=>{}}
                >
                    <SearchStock callback={(idcodigo)=>{load_details_for_selected_id(idcodigo)}
                } />
            </CustomModal>
            <br />
            <Table
                loading={tableLoading}
                    columns = {[
                        {title:"ruta", dataIndex: "ruta",},
                        {title:"codigo", dataIndex: "codigo", },
                        {
                            title:"cantidad", 
                            dataIndex: "cantidad",  
                            render: (_,{cantidad})=>(
                                <InputNumber min={1} max={20000} defaultValue={1} onChange={(val)=>{
                                    /*tableData.forEach((r)=>{
                                        if(r.idcodigo == idcodigo){
                                            r.cantidad = val;
                                            
                                        }
                                    }
                                    
                                    )
                                    setTableData(tableData)*/
                                }} />
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
                openButtonText="Imprimir"
                title="Imprimir Códigos"
                onOk={()=>{}}
                >
                    <PrinterWrapper>
                    <table style={{width:"auto"}}>
                        <tbody>
                        <tr>
                            {
                                tableData.map(r=>(
                                    <td style={{textAlign:"center"}}>{r.codigo}<br /><Barcode value={"AR_ID_"+r.key}  displayValue={false} width={1.5} height={20}/>&nbsp;</td>
                                ))
                            }
                        </tr></tbody></table>
                    </PrinterWrapper>

            </CustomModal>
        </>
    )
}

export default ImprimirCodigos;