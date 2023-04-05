const { useState } = require("react");
const { default: LoadSelect } = require("../LoadSelect");
const { Form, Input, Button } = require("antd");

const FacturaForm = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
        /**
         * send post to server
         */
        
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const setValue = (key,value) => {
        switch(key){
            case "idproveedor":
                form.setFieldsValue({idproveedor:value})
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
            <Form.Item name={"idproveedor"} label="Proveedor" rules={[{required:true}]}>
                <LoadSelect 
                fetchurl="http://localhost:3000/api/v1/proveedores" 
                callback={(id)=>{setValue("idproveedor",id)}} 
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