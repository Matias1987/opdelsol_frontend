import CustomModal from "@/components/CustomModal";
import ExportToCSV from "@/components/ExportToCSV";
import PrinterWrapper from "@/components/PrinterWrapper";
import SearchCodigo from "@/components/SearchCodigo";
import MyLayout from "@/components/layout/layout";
import { get_barcode_from_id2 } from "@/src/helpers/barcode_helper";
import { get } from "@/src/urls";
import { CloseCircleOutlined, PrinterTwoTone } from "@ant-design/icons";
import { Button, Card, Col, Row, Table } from "antd";
import { useState } from "react";
import Barcode from "react-barcode";

export default function ImprimirCodigos(){
    const [tableData,setTableData] = useState([])
    const [tableLoading,setTableLoading] = useState(false);
    const [ids , setIds] = useState(0);
    var _elements = [];
    const cols = 5;
    var prev = -1;

    for(let i=0;i<tableData.length;i++){
        var _t = parseInt(i/cols);
        if(prev != _t){
            _elements.push([]);
            prev = _t;
        }
        _elements[_t].push(tableData[i])
    }

    const ImprimirDialog = () => (
        <CustomModal 
                openButtonText={<><PrinterTwoTone />  Imprimir</>}
                title={<>Imprimir Códigos</>}
                
                onOk={()=>{}}
                style={{overflowY:"scroll"}}
                >   
                    <ExportToCSV parseFnt={()=>{
                        /* codigo;cantidad; */
                        let _csv = ""
                        _elements.forEach(e=>{
                            _csv += `${get_barcode_from_id2(e.codigo_ref)};${e.codigo};${1}`
                        })

                        return _csv;
                    }} />
                    <PrinterWrapper >
                        <div >
                        <table style={{width:"auto"}}>
                            <tbody>
                                {
                                    tableData.length <1 ? <h4>No hay c&oacute;digos</h4> : 
                                    _elements.map(e=>(<tr>{e.map(r=><td style={{textAlign:"center", fontSize:".85em"}}>{r.codigo}<br /><Barcode value={get_barcode_from_id2(r.codigo_ref)}  displayValue={false} width={1.5} height={20}/>&nbsp;</td>)}</tr>))
                                }
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
        setTableLoading(true);
        /* get stock data for the column */
        fetch(get.detalle_codigo + "/" + idcodigo)
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
            <Card
            size="small"
            title="Imprimir C&oacute;digos de Barras"
            headStyle={{backgroundColor:"#F07427", color:"white"}}
            >
                <Row >
                    
                    <Col span={8} style={{padding:"1em"}}>
                        <Card size="small" title={<>Agregar C&oacute;digos</>}>
                            <SearchCodigo callback={(idcodigo)=>{load_details_for_selected_id(idcodigo)}} />
                        </Card>
                    </Col>
                    <Col span={16} style={{padding:"1em", fontWeight:"bold"}}> 
                    
                        <Card
                        size="small"
                        title={<>Lista de c&oacute;digos a imprimir</>}
                        >
                            
                            <Table
                            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                            size="small"
                            scroll={{y:"400px"}}
                            pagination={false}
                            loading={tableLoading}
                            
                            columns = {[
                                {title:"codigo", dataIndex: "codigo", },
                                {
                                    title:"Acciones", 
                                    dataIndex: "ref_id",
                                    render: (_,{ref_id})=>(
                                        <Button  onClick={()=>{remove_row(ref_id)}} danger={true}><CloseCircleOutlined/></Button>)
                                    ,
                                },
                            ]}
                            dataSource={tableData}
                            summary={_=><Table.Summary fixed>
                                {ImprimirDialog()}
                            </Table.Summary>}
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>
            <br />
        </>
    )
}

ImprimirCodigos.PageLayout = MyLayout;