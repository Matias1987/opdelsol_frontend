import { Affix, Button, Card, Col, Divider, Form, Input, InputNumber, Menu, Row, Table } from "antd";
import LoadSelect from "../LoadSelect";
import { useEffect, useState } from "react";
import globals from "@/src/globals";
import SearchStockEnvio from "./deposito/SearchStockEnvio";
import { CloseCircleFilled, DownOutlined, UpOutlined } from "@ant-design/icons";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";

const EnvioForm = (props) => {
    const [tableData,setTableData] = useState([])
    const [tableLoading,setTableLoading] = useState(false);
    const [sucursalDestId, setSucursalDestId] = useState(-1);
    const [bottom,setBottom] = useState(10);
    const [form] = Form.useForm();
    const sucursal_id = globals.obtenerSucursal();
    const [total, setTotal] = useState(0);
    const [generarEnvioBtnEnabled,setGenerarEnvioBtnEnabled] = useState(true)
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
            __cantidad+=parseInt(__data[i].cantidad);
        }
        setTotal((_total_)=>__cantidad)
        
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

        setGenerarEnvioBtnEnabled(false)

        const __values = {
            sucursal_idsucursal: values.sucursal_idsucursal,
            usuario_idusuario: globals.obtenerUID(),
            cantidad_total:0,
            id_sucursal_origen: globals.obtenerSucursal(),
            tk: globals.getToken(),
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
            __cantidad+=parseInt(e.cantidad);
        })

        __values.cantidad_total=__cantidad;

        post_method(post.insert.envio,__values,(res)=>{
            if(res.status == "OK"){
                alert("Datos Guardados")
                window.location.replace(urls.informes.envio+res.data);
            }else{alert("Error.")}});
      };
      
      const onFinishFailed = (errorInfo) => {
        setGenerarEnvioBtnEnabled(false)
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


    const load_details_for_selected_id = (selectedCodigoId, callback=null) => {
        
        const found = tableData.find(e=>e.key == selectedCodigoId)
        if(found) {/*alert("Codigo ya cargado!");*/ callback(); return;}
        setTableLoading(true);
        /* get stock data for the column */
        console.log(get.detalle_stock+ sucursal_id + "/" + selectedCodigoId)
        fetch(get.detalle_stock+ sucursal_id + "/" + selectedCodigoId/*<-- TEMPORARY!! */)
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
        
        setTableData([...tableData,new_row])
    }

    const increment_all = () => {
        setTableData(d=>
            {
                const temp_ = tableData.map(r=>({...r,cantidad: r.cantidad<r.max_cantidad ? r.cantidad+1:r.cantidad }))
                var _tot = 0 
                temp_.forEach(r=>{
                    _tot+=parseInt(r.cantidad)
                })
                setTotal(_tot)
                return temp_
            }
        )
    }

    const decrement_all = () => {
        setTableData(d=>{
                const temp_ = tableData.map(r=>({...r,cantidad: r.cantidad>0 ? r.cantidad-1:r.cantidad }))
                var _tot = 0 
                temp_.forEach(r=>{
                    _tot+=parseInt(r.cantidad)
                })
                setTotal(_tot)
                return temp_
            })
    }

    
    return (
        <>
            <Card
                size="small"
                title="Nuevo Envío"
                style={{boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"}}
                >
                <Row>
                <Col span={14}>
                <Card style={{boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"}} title="Envío" size="small">
                <Form
                
                style={{color: "white"}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
                >
                    {/* sucursal destino */}
                    <Form.Item label={""} name={"sucursal_idsucursal"} required={true}>
                        <LoadSelect
                                disabled = {(tableData||[]).length>0}
                                width="440px"
                                prefix={<span style={{color:"#0C5AA9"}}><i>Sucursal:</i>&nbsp;</span> }
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
                                fetchurl={get.sucursales} 
                                callback={(id)=>{setValue("sucursal", id)}}      
                        />
                    </Form.Item>
                    <Divider />
                        <Form.Item name={"items"} label={""}>
                            <Table
                            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                            scroll={{y:"400px"}}
                            size="small"
                            pagination={false}
                            loading={tableLoading}
                            columns = {[
                                {width:"200px", title:"", dataIndex: "ruta", render:(_,{ruta})=>(<span style={{ fontSize:".75em"}}><i>{ruta}</i></span>)  },
                                {width:"200px", title:"codigo", dataIndex: "codigo", render: (codigo)=>(
                                    <span style={{color:"red"}}><b>{codigo}</b></span>
                                ) },
                                {width:"150px", title:"Precio", dataIndex: "precio", render:(_,{precio})=>(<span style={{ fontSize:".75em"}}><i>$&nbsp;{precio}</i></span>)  },
                                {
                                    width:"150px",
                                    title:<>
                                        <Button type="link" onClick={decrement_all} size="small">
                                            <DownOutlined />
                                        </Button>
                                        &nbsp;Cantidad&nbsp;
                                        <Button type="link" onClick={increment_all} size="small">
                                            <UpOutlined />
                                        </Button>
                                    </>, 
                                    dataIndex: "obj",  
                                    value: 1,
                                    render: (_,{obj, cantidad})=>(
                                        <>
                                        <Input type="number" style={{width:"50px"}} min={0} max={obj.max} defaultValue={0} value={cantidad} onChange={(e)=>{
                                            
                                            setTableData(talbeData=>{

                                                const _data = tableData.map(p=>{if(p.key==obj.key){p.cantidad=e.target.value} return p;})
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
                                    width:"50px",
                                    title:<><Button size="small" disabled={tableData.length<1} danger onClick={()=>{setTableData([])}}><CloseCircleFilled /></Button></>, 
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
                            <div>
                                <Input readOnly addonBefore="Total:" value={total} />
                                <Divider />
                                <Button disabled={tableLoading || tableData.length<1 || !generarEnvioBtnEnabled} block type="primary" htmlType="submit">Generar Env&iacute;o</Button>
                            </div>
                        </Affix>
                    </Form.Item>
                </Form>
                </Card>
                </Col>
                <Col span={10} style={{padding:"8px"}}>

                    <SearchStockEnvio 
                        idSucursalDestino={sucursalDestId}
                        
                        callback={(arr)=>{
                            //alert(JSON.stringify(arr))
                            setRowsToAdd(arr)
                        }} 
                        key={sucursalDestId}
                        />
                    
                </Col>
                </Row>
            </Card>
        </>
        
    )
}

export default EnvioForm;