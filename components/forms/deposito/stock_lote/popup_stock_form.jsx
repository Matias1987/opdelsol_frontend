import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Spin, Form, InputNumber, Button, Modal, Input } = require("antd")

const PopUpAgregarStockLoteForm = (props) => {
    const [open, setOpen] = useState(false);
    const onFinish = (values) => {
    if(typeof props.callback !== 'undefined'){
        props.callback(values);
        setOpen(false)
    }
   }
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
        <Form onFinish={onFinish}>
        <Form.Item label={"Codigo"} name={"codigo"}>
        {
            props.edit ? <><Input value={props.values.codigo} disabled /></> : <Input />
        }
        </Form.Item>
        <Form.Item label={"Canditad"} name={"cantidad"}>
            <InputNumber step={1} value={ props.edit ? props.values.cantidad : 0} />
        </Form.Item>
        <Form.Item label={"Costo"} name={"costo"}>
            <InputNumber step={.01} value={props.edit ? props.values.costo : 0} />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">OK</Button>
        </Form.Item>
        </Form>

        </Modal>
    </>)
}

export default PopUpAgregarStockLoteForm;