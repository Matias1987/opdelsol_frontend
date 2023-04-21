import GrupoSelect from "@/components/GrupoSelect";
import LoadSelect from "@/components/LoadSelect";
import SubFamiliaSelect from "@/components/SubFamiliaSelect";
import SubGroupSelect from "@/components/SubGroupSelect";
import { get, post, public_urls } from "@/src/urls";
import { Button, Divider, Form, Input, InputNumber, Select } from "antd";
import { useState } from "react";
const post_helper = require("../../../../src/helpers/post_helper")

export default function ModificarPreciosCategoria(props){
    const [categoria, setCategoria] = useState("");
    const [form] = Form.useForm();
    
    const onFinish = (values) => {
        alert(JSON.stringify(values))
        const data = {
            categoria:values.categoria,
            id: values.fkcategoria,
            value: values.multiplicador,
        }
        post_helper.post_method(post.update.modificar_multiplicador,
        data,
        (res)=>{
            if(res.status == "OK"){
                alert("Datos Guardados")
                window.location.replace(public_urls.lista_subgrupos)
            }else{
                alert("Error.")
            }}
            );
    }

    const setValue = (field, value)=>{
        switch(field){
            case "categoria":
                form.setFieldsValue({categoria:value})
                break;
            case "fkcategoria":
                form.setFieldsValue({fkcategoria:value})
                break;
            case "multiplicador":
                form.setFieldsValue({multiplicador:value})
                break;
        }
        
    }

    const show_select = () => {

        switch (categoria){
            case "familia": return (<LoadSelect 
                fetchurl={get.lista_familia} 
                callback={(v)=>{setValue("fkcategoria", v)}} 
                parsefnt={(data)=>(
                    data.map((r)=>(
                        {
                            value: r.idfamilia,
                            label: r.nombre_corto
                        }
                    ))
                )}
                />)
            case "subfamilia": return (<SubFamiliaSelect callback={(v)=>{setValue("fkcategoria", v)}} />)
            case "grupo": return (<GrupoSelect callback={(v)=>{setValue("fkcategoria", v)}} />)
            case "subgrupo": return (<SubGroupSelect callback={(v)=>{setValue("fkcategoria", v)}} />)
            default: return (<><i>Seleccione Categor&iacute;a</i></>)
        }

    }

    const onFinishFailed = () => {}


    return (
        <>
        <h1>Cambiar Multiplicador Categor&iacute;a</h1>
        <Divider />
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
        >
            <Form.Item
            name={"categoria"}
            label={"Categoría"}
            required={true}
            >
                <Select
                style={{width:200}}
                onChange={(val)=>{
                    setValue("categoria", val)
                    setCategoria(val)
                }}
                options={[
                    {
                        label: "Familia",
                        value: "familia"
                    },
                    {
                        label: "SubFamilia",
                        value: "subfamilia"
                    },
                    {
                        label: "Grupo",
                        value: "grupo"
                    },
                    {
                        label: "SubGrupo",
                        value: "subgrupo"
                    },
                ]}
                />
            </Form.Item>

            <Form.Item
            name={"fkcategoria"}
            label={"Seleccione Valor Categoria:"}
            required={true}
            >
                {show_select()}
            </Form.Item>
            <Form.Item
            label={"Multiplicador"}
            name={"multiplicador"}
            required={true}
            >
                <InputNumber 
                style={{width:100}} 
                step={.01} 
                min={1} 
                value={1}
                max={999999}
                onChange={(val)=>{
                    setValue("multiplicador", val)
                }}
                />
            </Form.Item>
            <Form.Item>
                <>
                    <Divider />
                    <Button type="primary" htmlType="submit">Aceptar</Button>
                </>
                
            </Form.Item>
        </Form>

      
        </>
    )

}