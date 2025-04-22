
import { regex_get_id_if_match } from "@/src/helpers/barcode_helper";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import { Form, Card, Button, Modal, Input, Select, Space, Row, Col, Radio, Checkbox } from "antd"

const PopUpAgregarStockLoteForm = (props) => {
    const {idsubgrupo}=props
    const [form] = Form.useForm();
    const [pattern, setPattern] = useState(0)
    const [part1, setPart1] = useState("")
    const [part2, setPart2] = useState("")
    const [part3, setPart3] = useState("")
    const [modoPrecio, setModoPrecio] = useState(2)
    const [precioSubgrupo, setPrecioSubgrupo] = useState(0)
    const [multiplicador, setMultiplicador] = useState(0)

    /** tags */
    const [tagsToAdd, setTagsToAdd] = useState([])
    const [tags, setTags] = useState([])

    const loadTags = _ => {
        post_method(post.lista_tag,{fkcategoria:"-1"},(resp)=>{
            setTags(_=>resp.data.map(t=>({value:t.etiqueta, label:t.etiqueta})))
        })
    }

    const onFinish = (values) => {
        //alert(JSON.stringify(values))
        if(+(values.modo_precio||"0")<1)
        {
            alert("Seleccionar modo de precio")
            return
        }
        //alert(values.codigo)
        if(regex_get_id_if_match(values.codigo.toUpperCase())>0){
            alert("Formato de Código no válido " + part1)
            return
        }
    if(typeof props.callback !== 'undefined'){
        props.callback({
            ...values, 
            p1: part1.toUpperCase(), 
            p2: part2.toUpperCase(), 
            p3: part3.toUpperCase(), 
            tags: tagsToAdd
        });
        
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
        case "precio":
            //alert(val)
            form.setFieldsValue({precio:val})
            break;
        case "modo_precio":
            form.setFieldsValue({modo_precio:val})
            break;
    }
}

const onCodigoChange = (e) => {
    const str = e.target.value;

    if(str.length<8){
        setPattern(0)
        return
    }

    const pattern1 = /^([A-Z_\.0-9\s]+)\[([\-0-9\.]+)\s([\-0-9\.]+)\s([\-0-9\.]+)\]([A-Z_\.0-9\s]+)$/gm

    const pattern2 = /^([A-Z_\.0-9\s]+)\[([\-0-9\.]+)\s([\-0-9\.]+)\s([\-0-9\.]+)\]([A-Z_\.0-9\s]+)\[([\-0-9\.]+)\s([\-0-9\.]+)\s([\-0-9\.]+)\]([A-Z_\.0-9\s]+)$/gm

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

    //setModoPrecio('1')
    //alert(JSON.stringify(props))
    if(typeof props !== 'undefined'){
        if('undefined' !== typeof props.values)
        {
            setValue("codigo",props.values.codigo);
            setValue("cantidad",props.values.cantidad);
            setValue("costo",props.values.costo);
            setValue("descripcion",props.values.descripcion);
            setValue("genero",props.values.genero);
            setValue("edad",props.values.edad);
        }
        else{
            setValue("costo",0);
            setValue("cantidad",0);
        }
        
        setValue("precio",0);
        setValue("modo_precio",0)
        setPrecioSubgrupo(+props.precioDefecto)
        setMultiplicador(props.multiplicador)

    }

        loadTags()
   },[])

  
   return (
   <>

    <br />
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed} form={form} title=" ">
        <Row>
            <Col span={12}>
                <Form.Item  rules={[{required:true}]} label={"Codigo"} name={"codigo"} style={{width: "90%"}}>
                {
                    props.edit ? <><Input value={props.values.codigo} disabled /></> : <Input  onChange={onCodigoChange} />
                }
                </Form.Item>
                <Form.Item  label={"Descripción"} name={"descripcion"} style={{width: "90%"}}  >
                    {descripcion_input()}
                </Form.Item>

                <Form.Item rules={[{required:true}]} label={"Cantidad"} name={"cantidad"} style={{width: "200px"}}>
                    
                    <Input type="number" />
                </Form.Item>
                
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={24}>
                        <Form.Item rules={[{required:true}]} label={"Costo"} name={"costo"} style={{width: "200px"}}>
                            <Input type="number" step={".01"}  style={{width:"100px"}} onChange={(e)=>{
                                if(modoPrecio==1){
                                    setValue('precio',parseFloat(form.getFieldValue('costo')) * multiplicador)
                                }
                            }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="Precio" name={"precio"}>
                            <Input type="number" disabled={modoPrecio!=2} style={{width:"100px"}}/>
                        </Form.Item>
                    </Col>
                </Row>
                
                <Row>
                    <Col span={24}>
                        <Form.Item label={"Modo Precio"} name={"modo_precio"}>
                            <Radio.Group 

                            value={modoPrecio}
                            onChange={(e)=>{
                                
                            setModoPrecio(v=>{
                                //alert(e.target.value)
                                switch(+e.target.value)
                                {
                                    case 0: 
                                    setValue(
                                        'precio',
                                        parseFloat(form.getFieldValue('costo')) * multiplicador
                                    ); 
                                    break; 
                                    case 1: 
                                    //alert(precioSubgrupo)
                                    setValue(
                                        'precio',
                                        parseFloat(precioSubgrupo)
                                        )
                                    break;
                                }
                                return e.target.value})
                            setValue("modo_precio",e.target.value)
                        }}
                        >
                                
                                <Radio value={1}>Precio Subgrupo </Radio>
                                <Radio value={2}>Precio Individual</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <h3>Etiquetas</h3>
            </Col>
        </Row>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Select 
                style={{width:"100%"}}
                mode="multiple" 
                allowClear 
                options={tags} 
                onChange={(v)=>{
                setTagsToAdd(v)
                }} 
                /> 
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Form.Item>
                    <Button block size="small" type="primary" htmlType="submit">AGREGAR</Button>
                </Form.Item>
            </Col>
        </Row>
        
    </Form>

    </>)
}

export default PopUpAgregarStockLoteForm;