import CustomModal from "@/components/CustomModal";
import PrinterWrapper from "@/components/PrinterWrapper";
import SearchStock from "@/components/SearchStock";
import { Button, Col, Divider, Form, InputNumber, Row, Table } from "antd";
import { useEffect, useState } from "react";
import Barcode from "react-barcode";
const urls = require("../../../src/urls")

const ImprimirCodigos = () => {
    const [tableData,setTableData] = useState([])
    const [tableLoading,setTableLoading] = useState(false);
    const [ids , setIds] = useState(0);
    //const [selectedCodigoId, setSelectedCodigoId] = useState(-1);

    const ImprimirDialog = () => (
        <CustomModal 
                openButtonText="Imprimir"
                title="Imprimir Códigos"
                
                onOk={()=>{}}
                >
                    <PrinterWrapper>
                        <div style={{flexWrap:true}}>
                        <table style={{width:"auto"}}>
                            <tbody>
                                <tr>
                                    {   tableData.length <1 ? <h4>No hay c&oacute;digos</h4> : 
                                        tableData.map(r=>
                                            
                                            <td style={{textAlign:"center"}}>{r.codigo}<br /><Barcode value={"AR_ID_"+r.codigo_ref}  displayValue={false} width={1.5} height={20}/>&nbsp;</td>
                                        )
                                    }
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </PrinterWrapper>

            </CustomModal>
    )
    
    
    const remove_row = (key) => {
        setTableData(
            tableData.filter((r)=>(r.key!=key))
        )
    }

    const add_new_row = (data) => {
        const new_row = {
           ruta:"-",
           key:ids,
           codigo: data[0].codigo,
           codigo_ref: data[0].idcodigo,
           ref_id: ids,
        }
        setTableLoading(false);
        setTableData([...tableData,new_row])
        setIds(ids+1)
    }

    const load_details_for_selected_id = (idcodigo) => {
        /*const found = tableData.find(e=>e.key == idcodigo)
        if(found) {alert("Codigo ya cargado!"); return;}*/
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
            {<ImprimirDialog />}
            
            <Row >
                
                <Col span={8} style={{padding:"1em", height:"400px", overflowY:"scroll"}}>
                <h4>Buscar C&oacute;digo</h4>
                    <SearchStock callback={(idcodigo)=>{load_details_for_selected_id(idcodigo)}} />
                </Col>
                <Col span={16} style={{padding:"1em", height:"400px", overflowY:"scroll"}}> 
                    <Table
                    pagination={false}
                    loading={tableLoading}
                        columns = {[
                            {title:"ruta", dataIndex: "ruta",},
                            {title:"codigo", dataIndex: "codigo", },
                            
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
                </Col>
            </Row>
            
            <br />
            
                {<ImprimirDialog />}
        </>
    )
}

export default ImprimirCodigos;