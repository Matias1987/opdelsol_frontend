import { Button, Form, Input, Modal } from "antd";
import { useForm } from "rc-field-form";
import SubFamiliaSelect from "../SubFamiliaSelect";
import { PlusCircleOutlined } from "@ant-design/icons";
import SubFamiliaForm from "./SubFamiliaForm";
import { useState } from "react";
const urls = require("../../src/urls")
const post_helper = require("../../src/helpers/post_helper")

const GrupoForm = (props) => {
    const [form] = Form.useForm();
    const [popup_open,setPopupOpen] = useState(false);
    const [reload, setReload] = useState(false) 

    const onFinish = (values) => {
        switch(props.action){
            case 'ADD': post_helper.post_method(urls.post.insert.grupo,values,(res)=>{
              if(res.status == "OK"){
                alert("Datos Guardados")
                props?.callback?.()
            }else{alert("Error: " + res.data)}});
              break;
            case 'EDIT': post_helper.post_method(urls.post.update.grupo,values,(res)=>{
              if(res.status == "OK"){alert("Cambios Guardados")}else{alert("Error.")}});
              break;
            };
      };
      
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    const setValue = (id)=>{
    form.setFieldsValue({subfamilia_idsubfamilia:id})
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

    const agregarSubFamiliaFormPopup = _=>
    (<>
        <Button type="primary"  size="small"  onClick={()=>{setPopupOpen(true)}}>
            <PlusCircleOutlined />&nbsp;Agregar Subfamilia
        </Button>
        <Modal
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{children:"CANCELAR"}}
            
            width={"80%"}
            title={"Agregar SubFamilia"}
            open={popup_open}
            onOk={closePopup}
            onCancel={closePopup}
            okText="CERRAR"
        >
            <SubFamiliaForm action="ADD" callback={onOkPopup} />
        </Modal>
    </>)


    return (
        <>
            <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
                
                <Form.Item
                name={"subfamilia_idsubfamilia"}
                label={"SubFamilia"}
                rules={[{required: true,}]}
                >
                    <>
                        <SubFamiliaSelect 
                        key={reload}
                        callback = {(id) =>{
                            setValue(id)
                        }}

                        reload={reload} 
                        
                        />
                        {agregarSubFamiliaFormPopup()}
                    </>
                </Form.Item>
                <Form.Item
                name={"nombre_corto"}
                label={"Nombre Corto"}
                rules={[{required: true,}]}
                >
                    <Input onInput={e => e.target.value = e.target.value.toUpperCase()}/>
                </Form.Item>
                <Form.Item
                name={"nombre_largo"}
                label={"Nombre Largo"}
                rules={[{required: true,}]}
                >
                    <Input onInput={e => e.target.value = e.target.value.toUpperCase()}/>
                </Form.Item>
                
                <Form.Item>
                    <Button type="primary" htmlType="submit">Guardar</Button>
                </Form.Item>
            </Form>
        </>
    )

}

export default GrupoForm;