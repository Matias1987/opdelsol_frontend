import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Spin, Form, InputNumber, Button, Modal, Input, Select } = require("antd")

const PopUpAgregarStockLoteForm = (props) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const onFinish = (values) => {
    if(typeof props.callback !== 'undefined'){
        props.callback(values);
        setOpen(false)
    }
   }

   const setValue = (_index, val) => {
    switch(_index){
        case "codigo":
            form.setFieldsValue({codigo:val})
            break;
        case "costo":
            form.setFieldsValue({costo:val})
            break;
        case "cantidad":
            form.setFieldsValue({cantidad:val})
            break;
        case "descripcion":
            form.setFieldsValue({descripcion:val})
            break;
        case "genero":
            form.setFieldsValue({genero:val})
            break;
        case "edad":
            form.setFieldsValue({genero:val})
            break;
    }
}

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

useEffect(()=>{
    if(open)
    {
        if(typeof props !== 'undefined'){
            if(null !== props.values)
            {
                setValue("codigo",props.values.codigo);
                setValue("cantidad",props.values.cantidad);
                setValue("costo",props.values.costo);
                setValue("descripcion",props.values.descripcion);
            }
        }
        
    }
   },[open])

   const onChangeGenero = (value) =>{setValue("genero",value)}
   const onChangeEdad = (value) =>{ setValue("edad",value)}

   //alert(JSON.stringify(props))
   return (
   <>
    <Button type="primary"  size="small"  onClick={()=>{setOpen(true)}}>
        {props.edit ? <EditOutlined /> : <><PlusCircleOutlined />&nbsp;Agregar</>}
      </Button>
    <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{children:"CERRAR"}}
        
        width={"80%"}
        title={props.title}
        open={open}
        onOk={()=>{ 
          setOpen(false)}
        }
        onCancel={()=>{
            setOpen(false)
        }}
        okText="CANCELAR"
      >
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
            <Form.Item  rules={[{required:true}]} label={"Codigo"} name={"codigo"} style={{width: "400px"}}>
            {
                props.edit ? <><Input value={props.values.codigo} disabled /></> : <Input onInput={e => e.target.value = e.target.value.toUpperCase()} />
            }
            </Form.Item>
            <Form.Item rules={[{required:true}]} label={"Descripcion"} name={"descripcion"} style={{width: "600px"}} onInput={e => e.target.value = e.target.value.toUpperCase()} >
                
                <Input/>
            </Form.Item>
            <Form.Item rules={[{required:true}]} label={"Cantidad"} name={"cantidad"} style={{width: "200px"}}>
                
                <Input type="number" />
            </Form.Item>
            <Form.Item rules={[{required:true}]} label={"Costo"} name={"costo"} style={{width: "200px"}}>
                <Input type="number" step={".01"} />
            </Form.Item>
            <Form.Item rules={[{required:true}]} label={"Edad"} name={"edad"} style={{width: "200px"}}>
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
            <Form.Item rules={[{required:true}]} label={"Género"} name={"genero"} style={{width: "200px"}}>
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
                <Button type="primary" htmlType="submit">OK</Button>
            </Form.Item>
        </Form>

        </Modal>
    </>)
}

export default PopUpAgregarStockLoteForm;