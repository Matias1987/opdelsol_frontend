import globals from "@/src/globals";
import CodeSelect from "../CodeSelect";
import FacturaSelect from "../FacturaSelect";
import LoadSelect from "../LoadSelect";
import SubGroupSelect from "../SubGroupSelect";

const { Input, Button, Form, Select } = require("antd")

const urls = require("../../src/urls")
const post_helper = require("../../src/helpers/post_helper")

const StockForm = (props) => {
    const [form] = Form.useForm()

    const onFinish = (_values) => {

        if(typeof _values.codigo_idcodigo === 'undefined'){
            alert("completar campos obligatorios (*)");
            return;
        }
        if(typeof _values.cantidad === 'undefined'){
            alert("completar campos obligatorios (*)");
            return;
        }

        if(_values.cantidad == null || _values.cantidad == ""){
            alert("completar campos obligatorios (*)");
            return;
        }
        if(_values.codigo_idcodigo == null || _values.codigo_idcodigo == ""){
            alert("completar campos obligatorios (*)");
            return;
        }


        const values = {
            factura_idfactura: _values.factura_idfactura,
            codigo_idcodigo: _values.codigo_idcodigo,
            cantidad: _values.cantidad,
            sucursal_idsucursal: globals.obtenerSucursal(),
        }
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

    const setValue = (_index, val) => {
        switch(_index){
            case "factura_idfactura":
                form.setFieldsValue({factura_idfactura:val})
                break;
            case "codigo_idcodigo":
                form.setFieldsValue({codigo_idcodigo:val})
                break;
            case "genero":
                form.setFieldsValue({genero:val})
            break;
            case "edad":
                form.setFieldsValue({genero:val})
            break;
        }
    }

   const onChangeGenero = (value) =>{setValue("genero",value)}
   const onChangeEdad = (value) =>{ setValue("edad",value)}

    return (
        <>
        <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
            

            <Form.Item
            name={"factura_idfactura"}
            label={"Factura (Opcional)"}
            
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
                {/*  */}
                <LoadSelect
                    fetchurl={urls.get.cod_sin_stock_s + globals.obtenerSucursal()}
                    
                    parsefnt = {(data)=>(
                        data.map(r=>(
                            {
                                "value": r.idcodigo,
                                "label": r.codigo,
                            }
                        ))
                    )}

                    callback={(id)=>{
                        setValue("codigo_idcodigo",id)
                    }}
                />

            </Form.Item>
            <Form.Item
            name={"cantidad"}
            label={"Cantidad"}
            rules={[{required:true}]}
            style={{width: "200px"}}
            >
                <Input type="number" min={0} step={1}/>
            </Form.Item>
            <Form.Item rules={[{required:true}]} label={"Edad"} name={"edad"} style={{width: "200px"}} >
            <Select 
                    onChange={
                        onChangeEdad
                    }

                    options={
                        [
                            {
                                value: 'adulto',
                                label: 'Adulto',
                            },
                            {
                                value: 'ninio',
                                label: 'Niño',
                            },
                            {
                                value: 'joven',
                                label: 'Joven',
                            },
                        ]
                    } />
            </Form.Item>
            <Form.Item rules={[{required:true}]} label={"Género"} name={"genero"} style={{width: "200px"}} >
                <Select 

                onChange={
                    onChangeGenero
                }
                
                options={
                    [
                        {
                            value: 'femenino',
                            label: 'Femenino',
                        },
                        {
                            value: 'masculino',
                            label: 'Masculino',
                        },
                        {
                            value: 'unisex',
                            label: 'Unisex',
                        },
                    ]
                } />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Guardar</Button>
            </Form.Item>
        </Form>
        </>
    )
}

export default StockForm;