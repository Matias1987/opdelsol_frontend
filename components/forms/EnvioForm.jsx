import { Affix, Button, Col, Divider, Form, Input, InputNumber, Menu, Row, Table } from "antd";
import CustomModal from "../CustomModal";
import FullPathStockSelect from "../FullPathStockSelect";
import LoadSelect from "../LoadSelect";
import { useEffect, useState } from "react";
import globals from "@/src/globals";
import SearchStockEnvio from "./deposito/SearchStockEnvio";
import { ClockCircleFilled, CloseCircleFilled } from "@ant-design/icons";
const urls = require("../../src/urls")
const post_helper = require("../../src/helpers/post_helper")

const EnvioForm = (props) => {
    const [tableData,setTableData] = useState([])
    const [tableLoading,setTableLoading] = useState(false);
    //const [stack, setStack] = useState([])
    //const [selectedCodigoId, setSelectedCodigoId] = useState(-1);
    const [sucursalDestId, setSucursalDestId] = useState(-1);
    const [bottom,setBottom] = useState(10);
    const [form] = Form.useForm();
    const sucursal_id = globals.obtenerSucursal();// 1; //THIS VALUE HAS TO BE DYNAMIC!!
    const [total, setTotal] = useState(0);

    //var rows_to_add = []
    const [rows_to_add, setRowsToAdd] = useState([])

    useEffect(()=>{
        
        if(rows_to_add.length>0){
            load_details_for_selected_id(
                rows_to_add[0], 
                _=>{
                    
                    rows_to_add.shift();
                    const _a = [...rows_to_add]
                    
                    
                    setRowsToAdd(r => { return _a;})
                }
            )
        }
        else{
            setTableLoading(false);
            actualizarTotal(tableData)
        }
        //setValue("items",tableData)
    },[rows_to_add])

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

    const actualizarTotal = __data => {
        var __cantidad = 0;
        for(let i=0;i<__data.length;i++){
            __cantidad+=__data[i].cantidad;
        }
        setTotal((total)=>__cantidad)
        
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
            usuario_idusuario: globals.obtenerUID(),
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
        setTableData((tableData)=>
            {
                const __data = tableData.filter((r)=>(r.codigo!=key));
                actualizarTotal(__data);
                return __data;
            }
        )
    }



    /*const start_process_stack = (_stack) => {
        rows_to_add=[]
        porcess_stack(_stack)
    }

    

    const process_stack = (_stack) => {

        alert(JSON.stringify(_stack))
        
        if(_stack.length<1)
        {
            setTableLoading(false)
            return
        }
        const c = _stack.shift()

        load_details_for_selected_id(c, ()=>{porcess_stack(_stack)})

    }*/

    const load_details_for_selected_id = (selectedCodigoId, callback=null) => {
        
        const found = tableData.find(e=>e.key == selectedCodigoId)
        if(found) {/*alert("Codigo ya cargado!");*/ callback(); return;}
        setTableLoading(true);
        /* get stock data for the column */
        console.log(urls.get.detalle_stock+ sucursal_id + "/" + selectedCodigoId)
        fetch(urls.get.detalle_stock+ sucursal_id + "/" + selectedCodigoId/*<-- TEMPORARY!! */)
        .then(response=>response.json())
        .then((response)=>{
            add_new_row(response.data)
            if(callback!=null)
            {
                callback()
            }
        })
        .catch((error)=>{
            console.error(error)
            callback()
        })
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
        
        //alert("add new row " + JSON.stringify(tableData))
        setTableData([...tableData,new_row])
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
                        pagination={false}
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
                                        
                                        setTableData(talbeData=>{

                                            const _data = tableData.map(p=>{if(p.key==obj.key){p.cantidad=val} return p;})
                                            actualizarTotal(_data)
                                            return _data;
                                        }
                                        )
                                    }} />
                                    <span style={{fontSize:".8em", color:"blue"}}>/{obj.max}</span>
                                    </>
                                )
                            },
                            {
                                title:<><Button disabled={tableData.length<1} danger onClick={()=>{setTableData([])}}><CloseCircleFilled /></Button></>, 
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
                        <Input readOnly addonBefore="Total:" value={total} />
                        <Button disabled={tableLoading || tableData.length<1} block type="primary" htmlType="submit">Generar Env&iacute;o</Button>
                        
                    </Affix>
                </Form.Item>
            </Form>
            </Col>
            <Col span={10} style={{padding:"2em", backgroundColor:"#E1EEFF"}}>
                <h3>Agregar C&oacute;digos</h3>
                <SearchStockEnvio 
                idSucursalDestino={sucursalDestId}
                
                callback={(arr)=>{setRowsToAdd(arr)}} 
                />
            </Col>
            </Row>
        </>
        
    )
}

export default EnvioForm;