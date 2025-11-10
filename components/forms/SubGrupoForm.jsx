import { PlusCircleOutlined } from "@ant-design/icons"
import GrupoForm from "./GrupoForm"
import { useState } from "react"
import { post } from "@/src/urls"
import { post_method } from "@/src/helpers/post_helper"
import GrupoSelect from "../GrupoSelect"

import { Form, Input, Button,   Modal } from "antd"
//const { default: GrupoSelect } = require("../GrupoSelect")
//const urls = require("../../src/urls")
//const post_helper = require("../../src/helpers/post_helper")
const SubGrupoForm = (props) => {
    const [form] = Form.useForm();
    const [popup_open,setPopupOpen] = useState(false);
    const [reload, setReload] = useState(false) 

    const onFinish = (values) => {
        switch(props.action){
            case 'ADD': post_method(post.insert.subgrupo,values,(res)=>{
              if(res.status == "OK"){
                alert("Datos Guardados ");
                props?.callback?.(res.data);

              }else{alert("Error: " + res.data)}});
              break;
            case 'EDIT': post_method(post.update.subgrupo,values,(res)=>{
              if(res.status == "OK"){alert("Cambios Guardados")}else{alert("Error.")}});
              break;
            };
      };
      
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    const setValue = (idx,value)=>{
        form.setFieldsValue({[idx]:value}); 
        /*switch(idx){
            case "grupo_idgrupo": 
            case "multiplicador": form.setFieldsValue({multiplicador:value}); break;
        }*/
    

    }

    const closePopup = () => {
        setPopupOpen(false);
        
        //location.reload();
    }

    const onOkPopup = () => {
        setPopupOpen(false);
        setReload(!reload)
        
        //location.reload();
    }

    const agregarGrupoFormPopup = _=>
    (<>
        <Button type="primary"  size="small"  onClick={()=>{setPopupOpen(true)}}>
            <PlusCircleOutlined />&nbsp;Agregar
        </Button>
        <Modal
            footer={null}
            okButtonProps={{children:"CANCELAR"}}
            
            width={"500px"}
            title={"Agregar Grupo"}
            open={popup_open}
          
            onCancel={closePopup}
            
        >
            <GrupoForm action="ADD" callback={onOkPopup} />
        </Modal>
    </>)


    return (
    <>
        <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        >
            <Form.Item
            label={"Grupo"}
            name={"grupo_idgrupo"}
            rules={[{required: true,}]}
            >
                <>
                    <GrupoSelect 
                    key={reload}
                    
                    callback = {(id)=>{
                        setValue("grupo_idgrupo",id)
                    }} reload={reload} />
                    {agregarGrupoFormPopup()}
                </>
            </Form.Item>
            <Form.Item
            label={"Nombre Corto"}
            name={"nombre_corto"}
            rules={[{required: true,}]}
            style={{width:"100%"}}
            >
                <Input onInput={e => e.target.value = e.target.value.toUpperCase()}/>
            </Form.Item>
            <Form.Item
            label={"Nombre Largo"}
            name={"nombre_largo"}
            rules={[{required: true,}]}
            style={{width:"100%"}}
            >
                <Input onInput={e => e.target.value = e.target.value.toUpperCase()}/>
            </Form.Item>
            {/*<Form.Item
            label={"Multiplicador"}
            name={"multiplicador"}
            rules={[{required: true,}]}
            >
                <InputNumber step={".1"} value={"1"} min="0" onChange={(v)=>{
                    setValue("multiplicador",v)
                }}/>
            </Form.Item>*/}
            <Form.Item
            label={"Precio por defecto"}
            name={"precio_defecto"}
            rules={[{required: true,}]}
            
            >
                <Input style={{width:'310px'}} type="number" step={".1"} value={"1"} min="0" onChange={(e)=>{
                    setValue("precio_defecto",parseFloat(e.target.value))
                }}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>Guardar</Button>
            </Form.Item>
        </Form>    
    </>
    )
}

export default SubGrupoForm;