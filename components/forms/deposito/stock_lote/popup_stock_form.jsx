import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Spin, Form, InputNumber, Button, Modal, Input, Select, Space } = require("antd")

const PopUpAgregarStockLoteForm = (props) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [pattern, setPattern] = useState(0)
    const [part1, setPart1] = useState("")
    const [part2, setPart2] = useState("")
    const [part3, setPart3] = useState("")

    const onFinish = (values) => {
    if(typeof props.callback !== 'undefined'){
        props.callback({...values, p1: part1, p2: part2, p3: part3});
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
            form.setFieldsValue({edad:val})
            break;
    }
}

const onCodigoChange = (e) => {
    const str = e.target.value;

    if(str.length<8){
        setPattern(0)
        return
    }

    const pattern1 = /^([A-Z\s]+)\[([\-0-9\.]+)\s([0-9\.]+)\s([0-9\.]+)\]([A-Z\s]+)$/gm

    const pattern2 = /^([A-Z\s]+)\[([\-0-9\.]+)\s([0-9\.]+)\s([0-9\.]+)\]([A-Z\s]+)\[([\-0-9\.]+)\s([0-9\.]+)\s([0-9\.]+)\]([A-Z\s]+)$/gm

    if(pattern1.exec(str)!=null){
        setPattern(1)
    }
    else{
        if(pattern2.exec(str)!=null){
            setPattern(2)
        }
        else{
            setPattern(0)
        }
    }

}

    const descripcion_input = () => {
        switch(pattern){
            case 0: return <>
                <Input value={part1} onChange={(e)=>{setPart1(e.target.value)}}/>
            </>
            case 1: return <><Space>
            <Space.Compact size="large">
                <Input addonAfter={"[...]"} placeholder="large size" value={part1} onChange={(e)=>{setPart1(e.target.value)}}/>
                <Input value={part2} onChange={(e)=>{setPart2(e.target.value)}}/>
            </Space.Compact>
        </Space></>
            case 2: return <>
            <Space>
                <Space.Compact size="large">
                    <Input addonAfter={"[...]"} placeholder="large size" value={part1} onChange={(e)=>{setPart1(e.target.value)}}/>
                    <Input addonAfter={"[...]"} placeholder="another input" value={part3} onChange={(e)=>{setPart3(e.target.value)}}/>
                    <Input value={part2} onChange={(e)=>{setPart2(e.target.value)}}/>
                </Space.Compact>
            </Space>
            </>
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
                setValue("genero",props.values.genero);
                setValue("edad",props.values.edad);
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
        {`${part1}  ,  ${part2}  ,  ${part3}`}
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
            <Form.Item  rules={[{required:true}]} label={"Codigo"} name={"codigo"} style={{width: "400px"}}>
            {
                props.edit ? <><Input value={props.values.codigo} disabled /></> : <Input onInput={e => e.target.value = e.target.value.toUpperCase()} onChange={onCodigoChange} />
            }
            </Form.Item>
            <Form.Item  label={"Descripcion"} name={"descripcion"} style={{width: "600px"}} onInput={e => e.target.value = e.target.value.toUpperCase()} >
                {descripcion_input()}
            </Form.Item>

            <Form.Item rules={[{required:true}]} label={"Cantidad"} name={"cantidad"} style={{width: "200px"}}>
                
                <Input type="number" />
            </Form.Item>
            <Form.Item rules={[{required:true}]} label={"Costo"} name={"costo"} style={{width: "200px"}}>
                <Input type="number" step={".01"} />
            </Form.Item>
            <Form.Item  label={"Edad"} name={"edad"} style={{width: "200px"}}>
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
                                value: 'niño',
                                label: 'Niño',
                            },
                            {
                                value: 'joven',
                                label: 'Joven',
                            },
                        ]
                    } />
            </Form.Item>
            <Form.Item  label={"Género"} name={"genero"} style={{width: "200px"}}>
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