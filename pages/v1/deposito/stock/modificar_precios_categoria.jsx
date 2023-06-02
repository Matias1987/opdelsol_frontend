import CustomModal from "@/components/CustomModal";
import GrupoSelect from "@/components/GrupoSelect";
import LoadSelect from "@/components/LoadSelect";
import SubFamiliaSelect from "@/components/SubFamiliaSelect";
import SubGroupSelect from "@/components/SubGroupSelect";
import VistaPreviaPrecios from "@/components/forms/deposito/vista_previa_precios";
import { get, post, public_urls } from "@/src/urls";
import { Button, Divider, Form, Input, InputNumber, Select, Switch } from "antd";
import { useEffect, useState } from "react";
const post_helper = require("../../../../src/helpers/post_helper")

export default function ModificarPreciosCategoria(props){
    const [categoria, setCategoria] = useState(-1);
    const [idCategoria, setIdCategoria] = useState(-1);
    const [multiplicador, setMultiplicador] = useState(1);
    const [incrementar, setIncrementar] = useState(true);
    const [form] = Form.useForm();
    
    const onFinish = (values) => {
        if(values.fkcategoria === typeof 'undefined'){
            alert('No seleccionó categoria')
            return;
        }
        if(values.fkcategoria == null){
            alert('No seleccionó categoria')
            return;
        }
        //alert(JSON.stringify(values))
        const data = {
            categoria:values.categoria,
            id: values.fkcategoria,
            value: values.multiplicador,
            incrementar: incrementar ? '1' : '0',
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
                setIdCategoria(value);
                break;
            case "multiplicador":
                form.setFieldsValue({multiplicador:value})
                break;
            case "porcentaje":
                form.setFieldsValue({porcentaje:value})
                break;
        }
        
    }

    useEffect(()=>{setValue("multiplicador", '1.00')},[])

    const show_select = () => {

        switch (categoria){
            case "familia": return (<LoadSelect 
                fetchurl={get.lista_familia} 
                callback={(v)=>{
                    setValue("fkcategoria", v)
                    //set current counter
                }} 
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

    const OnIncrementarCheckedChanged = () =>{
        setIncrementar(!incrementar)
    }

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
            <Form.Item>
                <Switch checkedChildren="Incrementar" unCheckedChildren="Sobreescribir" defaultChecked onChange={OnIncrementarCheckedChanged} />
            </Form.Item>
            <Form.Item
            label={"Multiplicador"}
            name={"multiplicador"}
            required={true}
            >
                <InputNumber disabled
                
                style={{width:100}} 
                step={.01} 
                min={1} 
                value={1.00}
                max={999999}
                onChange={(val)=>{
                    setValue("multiplicador", val)
                    const _m = (parseFloat(val) - 1) * 100;
                    setValue("porcentaje", _m);
                    setMultiplicador(_m)
                }}
                />
            </Form.Item>
            <Form.Item label={"Porcentaje"} name={"porcentaje"}>
                <InputNumber
                    addonAfter={"%"}    
                    onChange={(val)=>{
                        const _m  =  parseFloat(val) * .01 + 1;
                        setValue("porcentaje", val)
                        setValue("multiplicador",_m)
                        //alert(_m)
                        setMultiplicador(_m);
                    }}
                />
            </Form.Item>
            <Form.Item>
                <CustomModal openButtonText={"Vista Previa"} title={"Vista Previa"}> 
                    <VistaPreviaPrecios tipo={categoria} idcategoria={idCategoria} multiplicador={multiplicador} incrementar={incrementar}  />
                </CustomModal>
            </Form.Item>
            <Form.Item>
                <>
                    <Button type="primary" htmlType="submit" danger >Aplicar Cambios</Button>
                </>
                
            </Form.Item>
        </Form>

      
        </>
    )

}