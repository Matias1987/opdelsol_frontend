import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";

const { default: FacturaSelect } = require("@/components/FacturaSelect");
const { default: SubGroupSelect } = require("@/components/SubGroupSelect");
const { default: PopUpAgregarStockLoteForm } = require("@/components/forms/deposito/stock_lote/popup_stock_form");
const { DeleteOutlined } = require("@ant-design/icons");
const { Button, Table, Form } = require("antd");
const { useState } = require("react")

const AgregarStockLote = (props) => {
    const [form] = Form.useForm();
    const [tableData, setTableData] = useState([]);


    const setValue = (key,value) => {
        switch(key){
            case "factura":
                form.setFieldsValue({factura:value})
                break;
            case "subgrupo":
                form.setFieldsValue({subgrupo:value})
                break;
        }
    }

    
    const agregarRow = (values) => {
        setTableData([...tableData,{
            codigo: values.codigo,
            cantidad: values.cantidad,
            costo: values.costo, 
        }])
    }

    const remove_row = (key) => {
        setTableData(
            tableData.filter((r)=>(r.codigo!=key))
        )
    }

    const columns = [
        {title:"Codigo", dataIndex: "codigo"},
        {title:"Cantidad", dataIndex: "cantidad"},
        {title:"Costo", dataIndex: "costo"},
        {title:"Acciones", dataIndex: "codigo", render: (codigo)=>{
            let temp = null;
            for(let i=0;i<tableData.length;i++){
                if(tableData[i].codigo == codigo){
                    temp = tableData[i];
                    break;
                }
            }
            return(
                <>
                    <PopUpAgregarStockLoteForm title={"Editar"} edit={true} values={temp} callback={(_data)=>{}} />
                    <Button onClick={()=>{remove_row(codigo)}}><DeleteOutlined /></Button>
                </>
            )
        }}
    ];

    const onFinish = (_values)=>{

        var values = {
            codigos: Array(),
            factura: _values.factura,
            subgrupo: _values.subgrupo,
            sucursal: globals.obtenerSucursal(),
        }

        tableData.forEach(r=>{
            values.codigos.push(
                {
                    codigo: r.codigo,
                    cantidad: r.cantidad,
                    costo: r.costo
                }
            )
        })

        alert(JSON.stringify(values))
        
        post_method(post.insert.stock_lote,values,(res)=>{
            alert(res)
        })

    }

    return(
        <>
        <h1>Agregar Stock por Lote</h1>
            <Form onFinish={onFinish} form={form}>
                    <Form.Item label={"Factura"} name={"factura"}>
                        <FacturaSelect callback={(id)=>{setValue("factura", id)}} />
                    </Form.Item>
                    <Form.Item style={{ backgroundColor: "#E1EEFF", padding:"3.5em", fontSize:".25em"}} label={"Subgrupo"} name={"subgrupo"} required={true}>
                        <SubGroupSelect callback={(id)=>{setValue("subgrupo", id)}} />
                    </Form.Item>
                <Form.Item label={"Codigos"} name={"codigos"}>
                    <>
                    <PopUpAgregarStockLoteForm title={"Agregar"} edit={false} values={null} callback={(_data)=>{
                                agregarRow(_data)
                            }} />
                    <Table dataSource={tableData} columns={columns} />
                    </>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Confirmar</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AgregarStockLote;