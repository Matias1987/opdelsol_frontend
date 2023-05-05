import CodeSelect from "../CodeSelect";
import FacturaSelect from "../FacturaSelect";
import LoadSelect from "../LoadSelect";
import SubGroupSelect from "../SubGroupSelect";

const { Input, Button, Form } = require("antd")

const urls = require("../../src/urls")
const post_helper = require("../../src/helpers/post_helper")

const StockForm = (props) => {
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
        //form.setFieldsValue({_index:_id})
        switch(_index){
            case "sucursal_idsucursal":
                form.setFieldsValue({sucursal_idsucursal:_id})
                break;
            case "factura_idfactura":
                form.setFieldsValue({factura_idfactura:_id})
                break;
            case "codigo_idcodigo":
                form.setFieldsValue({codigo_idcodigo:_id})
                break;
        }
    }


    return (
        <>
        <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
            <Form.Item
            name={"sucursal_idsucursal"}
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
                fetchurl={urls.get.sucursales} callback={(id)=>{//"http://localhost:3000/api/v1/sucursales"
                    setValue("sucursal_idsucursal", id)

                }} />
            </Form.Item>

            <Form.Item
            name={"factura_idfactura"}
            label={"Factura"}
            
            >
                <FacturaSelect 

                    callback={(id)=>{
                    setValue("factura_idfactura", id)
                    }}
                />
            </Form.Item>
            
            <Form.Item
            name={"codigo_idcodigo"}
            label={"Codigo"}
            rules={[{required:true}]}
            >
                <CodeSelect
                callback={
                    (id)=>{
                        if(id>0){
                            setValue("codigo_idcodigo",id)
                        }
                        
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