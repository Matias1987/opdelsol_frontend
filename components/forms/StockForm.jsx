import CodeSelect from "../CodeSelect";
import FacturaSelect from "../FacturaSelect";
import LoadSelect from "../LoadSelect";
import SubGroupSelect from "../SubGroupSelect";

const { Input, Button, Form } = require("antd")

const urls = require("../../../src/urls")
const post_helper = require("../../../src/helpers/post_helper")

const StockForm = () => {
    const [form] = Form.useForm()

    const onFinish = (values) => {
        switch(props.action){
            case 'ADD': post_helper.post_method(urls.post.insert.stock,values,(res)=>{
              if(res.status == "OK"){alert("Datos Guardados")}else{alert("Error.")}});
              break;
            case 'EDIT': post_helper.post_method(urls.post.update.stock,values,(res)=>{
              if(res.status == "OK"){alert("Cambios Guardados")}else{alert("Error.")}});
              break;
            };
      };
      
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    const setValue = (_index, _id) => {
        form.setFieldsValue({_index:_id})
    }


    return (
        <>
        <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
            <Form.Item
            name={"sucursal"}
            label={"Sucursal"}
            rules={[{required:true}]}
            
            >
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
                fetchurl={"http://localhost:3000/api/v1/sucursales"} callback={(id)=>{
                    setValue("sucursal", id)

                }} />
            </Form.Item>

            <Form.Item
            name={"factura"}
            label={"Factura"}
            rules={[{required:true}]}
            >
                <FacturaSelect 

                    callback={(id)=>{
                    setValue("factura", id)
                    }}
                />
            </Form.Item>
            
            <Form.Item
            name={"codigo"}
            label={"Codigo"}
            rules={[{required:true}]}
            >
                <CodeSelect
                callback={
                    (id)=>{
                        setValue("codigo",id)
                    }
                }
                />
            </Form.Item>
            <Form.Item
            name={"cantidad"}
            label={"Cantidad"}
            rules={[{required:true}]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Guardar</Button>
            </Form.Item>
        </Form>
        </>
    )
}

export default StockForm;