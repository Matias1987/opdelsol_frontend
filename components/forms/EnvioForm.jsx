import { Affix, Button, Col, Divider, Form, Input, InputNumber, Menu, Row, Table } from "antd";
import CustomModal from "../CustomModal";
import FullPathStockSelect from "../FullPathStockSelect";
import LoadSelect from "../LoadSelect";
import { useEffect, useState } from "react";
import globals from "@/src/globals";
import SearchStockEnvio from "./deposito/SearchStockEnvio";
const urls = require("../../src/urls")
const post_helper = require("../../src/helpers/post_helper")

const EnvioForm = (props) => {
    const [tableData,setTableData] = useState([])
    const [tableLoading,setTableLoading] = useState(false);
    const [selectedCodigoId, setSelectedCodigoId] = useState(-1);
    const [sucursalDestId, setSucursalDestId] = useState(-1);
    const [bottom,setBottom] = useState(10);
    const [form] = Form.useForm();
    const sucursal_id = globals.obtenerSucursal();// 1; //THIS VALUE HAS TO BE DYNAMIC!!


    useEffect(()=>{
        setValue("items",tableData)
    },[tableData])

    const setValue = (key,value) => {
        switch(key){
            case "items":
                form.setFieldsValue({items:value});
                break;
            case "sucursal":
                form.setFieldsValue({sucursal_idsucursal:value});
                setSucursalDestId(value);
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
            id_sucursal_origen: globals.obtenerSucursal(),
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


        post_helper.post_method(urls.post.insert.envio,__values,(res)=>{
            if(res.status == "OK"){
                alert("Datos Guardados")
                //alert(JSON.stringify( res.data ))
                window.location.replace(urls.informes.envio+res.data);
            }else{alert("Error.")}});
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
           precio: data[0].precio,
        }
        setTableLoading(false);
        setTableData([...tableData,new_row])
    }

    const load_details_for_selected_id = (selectedCodigoId) => {
        const found = tableData.find(e=>e.key == selectedCodigoId)
        if(found) {alert("Codigo ya cargado!"); return;}
        setTableLoading(true);
        /* get stock data for the column */
        console.log(urls.get.detalle_stock+ sucursal_id + "/" + selectedCodigoId)
        fetch(urls.get.detalle_stock+ sucursal_id + "/" + selectedCodigoId/*<-- TEMPORARY!! */)
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
            {/*buttons()*/}
            <Row>
            <Col span={14} style={{padding:"1em"}}>
            &nbsp;
            <Form
            style={{color: "white"}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            >
                {/* sucursal destino */}
                <Form.Item label={"Sucursal Destino:"} name={"sucursal_idsucursal"} required={true}>
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
                    <Form.Item name={"items"} label={""} style={{height:"400px", overflowY:"scroll"}}>
                        <Table
                        loading={tableLoading}
                        columns = {[
                            {title:"", dataIndex: "ruta", render:(_,{ruta})=>(<span style={{color:"#536872", fontSize:".75em"}}><i>{ruta}</i></span>)  },
                            {title:"codigo", dataIndex: "codigo", render: (codigo)=>(
                                <span style={{color:"red"}}><b>{codigo}</b></span>
                            ) },
                            {title:"Precio", dataIndex: "precio", render:(_,{precio})=>(<span style={{color:"#536872", fontSize:".75em"}}><i>$&nbsp;{precio}</i></span>)  },
                            {
                                title:"cantidad", 
                                dataIndex: "obj",  
                                value: 1,
                                render: (_,{obj})=>(
                                    <>
                                    <InputNumber style={{width:"50px"}} min={1} max={obj.max} defaultValue={0} onChange={(val)=>{
                                        
                                        for(let i=0;i<tableData.length;i++){
                                            if(tableData[i].key==obj.key){
                                                tableData[i].cantidad = val;
                                                break;
                                            }
                                        }
                  
                                        setTableData(tableData)
                                    }} />
                                    <span style={{fontSize:".8em", color:"blue"}}>/{obj.max}</span>
                                    </>
                                )
                            },
                            {
                                title:"", 
                                dataIndex: "ref_id",
                                render: (_,{ref_id})=>(
                                    <Button size="small"  danger onClick={()=>{remove_row(ref_id)}}>X</Button>)
                                ,
                            },
                        ]}
                        dataSource={tableData}
                        />
                </Form.Item>
                <Form.Item>
                    <Affix offsetBottom={bottom}>
                        <Button type="primary" htmlType="submit">Generar Env&iacute;o</Button>
                    </Affix>
                </Form.Item>
            </Form>
            </Col>
            <Col span={10} style={{padding:"2em", backgroundColor:"#E1EEFF"}}>
                <h3>Agregar C&oacute;digos</h3>
                <SearchStockEnvio 
                idSucursalDestino={sucursalDestId}
                callback={(id)=>{load_details_for_selected_id(id)}} 
                />
            </Col>
            </Row>
        </>
        
    )
}

export default EnvioForm;