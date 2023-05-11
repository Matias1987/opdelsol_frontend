const { useState } = require("react");
const { default: LoadSelect } = require("../LoadSelect");
const { Form, Input, Button } = require("antd");
const urls = require("../../src/urls")
const post_helper = require("../../src/helpers/post_helper")

const FacturaForm = (props) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        switch(props.action){
            case 'ADD': post_helper.post_method(urls.post.insert.factura,values,(res)=>{
              if(res.status == "OK"){
                alert("Datos Guardados")
                if(typeof props.callback !== 'undefined'){
                    props.callback()
                }
            }else{alert("Error.")}});
              break;
            case 'EDIT': post_helper.post_method(urls.post.update.factura,values,(res)=>{
              if(res.status == "OK"){alert("Cambios Guardados")}else{alert("Error.")}});
              break;
            };
        
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const setValue = (key,value) => {
        switch(key){
            case "proveedor_idproveedor":
                form.setFieldsValue({proveedor_idproveedor:value})
                break;
        }
    }

    return (
        <>
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form = {form}
        >
            <Form.Item name={"proveedor_idproveedor"} label="Proveedor" rules={[{required:true}]}>
                <LoadSelect 
                fetchurl={urls.get.lista_proveedores} 
                callback={(id)=>{setValue("proveedor_idproveedor",id)}} 
                parsefnt = {
                    (data) => {
                        return data.map((row)=>(
                            {
                                "value": row.idproveedor,
                                "label": row.nombre
                            }
                        ))
                    }
                }
                />
            </Form.Item>

            <Form.Item name={"numero"} label={"Número"} style={{width:400}} rules={[{required:true}]}>
                <Input />
            </Form.Item>
            
            <Form.Item name={"monto"} label={"Monto"} style={{width:200}} rules={[{required:true}]}>
                <Input type="number" value={0}/>
            </Form.Item>
            
            <Form.Item name={"cantidad"} label={"Cantidad"} style={{width:200}} rules={[{required:true}]}>
                <Input type="number" value={0} min={0}/>
            </Form.Item>
            
            <Form.Item>
                <Button type="primary" htmlType="submit">Guardar</Button>
            </Form.Item>

        </Form>
        </>
    );
}

export default FacturaForm;