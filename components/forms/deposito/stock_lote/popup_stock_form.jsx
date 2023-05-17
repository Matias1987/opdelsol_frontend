import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Spin, Form, InputNumber, Button, Modal, Input } = require("antd")

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
    }
}

useEffect(()=>{
    if(open)
    {
        if(typeof props !== 'undefined'){
            if(null !== props.values)
            {
                setValue("codigo",props.values.codigo);
                setValue("cantidad",props.values.cantidad);
                setValue("costo",props.values.costo);
            }
        }
        
    }
   },[open])

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
        <Form onFinish={onFinish} form={form}>
            <Form.Item label={"Codigo"} name={"codigo"}>
            {
                props.edit ? <><Input value={props.values.codigo} disabled /></> : <Input />
            }
            </Form.Item>
            <Form.Item label={"Cantidad"} name={"cantidad"} >
                
                <Input type="number" />
            </Form.Item>
            <Form.Item label={"Costo"} name={"costo"} >
                <Input type="number" step={".01"} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">OK</Button>
            </Form.Item>
        </Form>

        </Modal>
    </>)
}

export default PopUpAgregarStockLoteForm;