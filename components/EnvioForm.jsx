import { Button, Divider, Form, InputNumber, Table } from "antd";
import CustomModal from "./CustomModal";
import FullPathStockSelect from "./FullPathStockSelect";
import LoadSelect from "./LoadSelect";
import { useEffect, useState } from "react";
import SearchStock from "./SearchStock";

const EnvioForm = () => {
    const [tableData,setTableData] = useState([])
    const [tableLoading,setTableLoading] = useState(false);
    const [selectedCodigoId, setSelectedCodigoId] = useState(-1);
    const [form] = Form.useForm();
    const url_for_stock_details = "http://localhost:3000/api/v1/stock/detalle/";
    const sucursal_id = 1; //THIS VALUE HAS TO BE DYNAMIC!!

    useEffect(()=>{
        setValue("items",tableData)
    },[tableData])

    const setValue = (key,value) => {
        switch(key){
            case "items":
                form.setFieldsValue({items:value})
                break;
            case "sucursal":
                form.setFieldsValue({sucursal:value})
                break;
        }
        
    }

    const onFinish = (values) => {
        console.log('Success:', values);
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    const remove_row = (key) => {
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

    const load_details_for_selected_id = (selectedCodigoId) => {

        const found = tableData.find(e=>e.key == selectedCodigoId)
        if(found) {alert("Codigo ya cargado!"); return;}
        setTableLoading(true);
        /* get stock data for the column */
        fetch(url_for_stock_details+ sucursal_id + "/" + selectedCodigoId/*<-- TEMPORARY!! */)
        .then(response=>response.json())
        .then((response)=>{
            add_new_row(response.data)
        })
        .catch((error)=>{
            console.error(error)
        })
    }

    const buttons = () => {
        return (
        <>
        
            <CustomModal 
            openButtonText="Agregar Producto"
            title="Agregar Producto"
            onOk={
                ()=>{}
            }
            >
                <SearchStock callback={(id)=>
                    {
                        load_details_for_selected_id(id)
                    }
            } />
            </CustomModal>
            &nbsp;
            <CustomModal 
            openButtonText="Agregar Producto Por Subgrupo" 
            title="Agregar Producto"
            onOk={
                ()=>{
                    
                    if(selectedCodigoId!=-1){
                        load_details_for_selected_id(selectedCodigoId)
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
            <Divider />
        </>)
    }

    return (
        <>
            {buttons()}
            <Form
            style={{color: "white"}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            >
                {/* sucursal destino */}
                <Form.Item label={"Sucursal"} name={"sucursal"}>
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
                </Form.Item>
                <Divider />
                    <Form.Item name={"items"} label={"Items"}>
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
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Guardar</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default EnvioForm;