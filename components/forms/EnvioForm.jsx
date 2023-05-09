import { Button, Divider, Form, Input, InputNumber, Menu, Table } from "antd";
import CustomModal from "../CustomModal";
import FullPathStockSelect from "../FullPathStockSelect";
import LoadSelect from "../LoadSelect";
import { useEffect, useState } from "react";
import SearchStock from "../SearchStock";
import { MailOutlined } from "@ant-design/icons";
import globals from "@/src/globals";
const urls = require("../../src/urls")
const post_helper = require("../../src/helpers/post_helper")

const EnvioForm = (props) => {
    const [tableData,setTableData] = useState([])
    const [tableLoading,setTableLoading] = useState(false);
    const [selectedCodigoId, setSelectedCodigoId] = useState(-1);
    const [form] = Form.useForm();
    const sucursal_id = globals.obtenerSucursal();// 1; //THIS VALUE HAS TO BE DYNAMIC!!


    useEffect(()=>{
        setValue("items",tableData)
    },[tableData])

    const setValue = (key,value) => {
        switch(key){
            case "items":
                form.setFieldsValue({items:value})
                break;
            case "sucursal":
                form.setFieldsValue({sucursal_idsucursal:value})
                break;
        }
    }

    const onFinish = (values) => {

        if(values.sucursal_idsucursal === typeof 'undefined'){
            alert('Sucursal no seleccionada')
            return
        }

        if(values.sucursal_idsucursal == null){
            alert('Sucursal no seleccionada')
            return
        }

        if(tableData.length<1){
            alert("No ha cargado elementos");
            return;
        }

        const __values = {
            sucursal_idsucursal: values.sucursal_idsucursal,
            usuario_idusuario: 1,
            cantidad_total:0,
            items: [
            ]
        }
        let __cantidad = 0;
        tableData.forEach((e)=>{
            __values.items.push(
                {
                    key: e.key,
                    cantidad: e.cantidad
                }
            )
            __cantidad+=e.cantidad;
        })

        __values.cantidad_total=__cantidad;

        console.log("testing values: " , __values)

        alert("sending testing values " + JSON.stringify(__values))
        alert(urls.post.insert.envio)
        post_helper.post_method(urls.post.insert.envio,__values,(res)=>{
            if(res.status == "OK"){
                alert("Datos Guardados")
                alert(JSON.stringify( res.data ))
                window.location.replace(urls.informes.envio+res.data);
            }else{alert("Error.")}});
            /*
        switch(props.action){
            case 'ADD': post_helper.post_method(urls.post.insert.envio,testing_values,(res)=>{
              if(res.status == "OK"){alert("Datos Guardados")}else{alert("Error.")}});
              break;
            case 'EDIT': post_helper.post_method(urls.post.update.envio,values,(res)=>{
              if(res.status == "OK"){alert("Cambios Guardados")}else{alert("Error.")}});
              break;
            };*/
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
           obj: {key: data[0].idcodigo, max: data[0].cantidad},
           ref_id: data[0].codigo,
           max_cantidad: data[0].cantidad,
           cantidad: 0,
        }
        setTableLoading(false);
        setTableData([...tableData,new_row])
    }

    const load_details_for_selected_id = (selectedCodigoId) => {
        const found = tableData.find(e=>e.key == selectedCodigoId)
        if(found) {alert("Codigo ya cargado!"); return;}
        setTableLoading(true);
        /* get stock data for the column */
        fetch(urls.get.detalle_stock+ sucursal_id + "/" + selectedCodigoId/*<-- TEMPORARY!! */)
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
            onOk={()=>{}}
            >
                <SearchStock callback={(id)=>{load_details_for_selected_id(id)}} />
            </CustomModal>
            &nbsp;
            <CustomModal 
            openButtonText="Agregar Producto Por Subgrupo" 
            title="Agregar Producto"
            onOk={()=>{if(selectedCodigoId!=-1){load_details_for_selected_id(selectedCodigoId)}}}
            >
                <h3>Seleccione C&oacute;digo</h3>
                <FullPathStockSelect
                        callback={
                            (id)=>{
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
                <Form.Item label={"Sucursal"} name={"sucursal_idsucursal"} required={true}>
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
                            fetchurl={urls.get.sucursales} 
                            callback={(id)=>{setValue("sucursal", id)}}      
                    />
                </Form.Item>
                <Divider />
                    <Form.Item name={"items"} label={"Items"}>
                        <Table
                        loading={tableLoading}
                            columns = {[
                                {title:"ruta", dataIndex: "ruta",},
                                {title:"codigo", dataIndex: "codigo", render: (codigo)=>(
                                    <span style={{color:"red"}}>{codigo}</span>
                                ) },
                                {
                                    title:"cantidad", 
                                    dataIndex: "obj",  
                                    value: 1,
                                    render: (_,{obj})=>(
                                        <InputNumber min={1} max={obj.max} defaultValue={0} onChange={(val)=>{
                                            //alert(JSON.stringify(tableData))
                                            /*tableData.forEach((e)=>{
                                                if(e.key == obj.key){
                                                    alert(val)
                                                    e.cantidad = val;
                                                }
                                            })*/
                                            for(let i=0;i<tableData.length;i++){
                                                if(tableData[i].key==obj.key){
                                                    tableData[i].cantidad = val;
                                                    break;
                                                }
                                            }
                                            //alert(JSON.stringify(tableData))

                                            setTableData(tableData)
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
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Guardar</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default EnvioForm;