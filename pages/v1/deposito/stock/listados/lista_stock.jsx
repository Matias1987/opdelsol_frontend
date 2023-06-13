import CustomModal from "@/components/CustomModal";
import GrupoSelect from "@/components/GrupoSelect";
import SubFamiliaSelect from "@/components/SubFamiliaSelect";
import SubGroupSelect from "@/components/SubGroupSelect";
import CustomTable from "@/components/forms/CustomTable";
import DetalleStock from "@/components/forms/deposito/DetalleStock";
import ModificarCantidadForm from "@/components/forms/deposito/modificarCantidadForm";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, InputNumber, Row, Select, Space, Table, Tag } from "antd";
import { useEffect, useRef, useState } from "react";

export default function ListaStock(){
    const [popupOpen, setPopupOpen] = useState(false)
    const [tipoOrden, setTipoOrden] = useState("");
    const [tipoFiltro, setTipoFitro] = useState(-1);
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [valueChanged, setValueChanged] = useState(false)
    const [tags, setTags] = useState([])
    const searchRef = useRef(null)
    const idsucursal = globals.obtenerSucursal();//temporary
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const tipos_filtro_dic = {
        "codigo_contenga_a":{tipo: "codigo", descripcion: "Codigo Cont."},
        "codigo_igual_a":{tipo: "codigo", descripcion: "Codigo Igual a"},
        "precio_mayor_a":{tipo: "precio", descripcion: "Precio Mayor a"},
        "precio_menor_a":{tipo: "precio", descripcion: "Precio Menor a"},
        "precio_igual_a":{tipo: "precio", descripcion: "Precio Igual a"},
        "cantidad_igual_a":{tipo: "cantidad", descripcion:"Cantidad Igual a"},
        "cantidad_mayor_a":{tipo: "cantidad", descripcion:"Cantidad Mayor a"},
        "cantidad_menor_a":{tipo: "cantidad", descripcion:"Cantidad Menor a"},
        "sexo":{tipo: "sexo", descripcion:"Genero"},
        "edad":{tipo: "edad", descripcion:"Edad"},
        "detalles":{tipo: "detalles", descripcion:"Descripción"},
        "subgrupo":{tipo: "subgrupo", descripcion:"Subgrupo"},
        "grupo":{tipo: "grupo", descripcion:"Grupo"},
        "subfamilia":{tipo: "subfamilia", descripcion:"Subfamilia"},
        "familia":{tipo: "familia", descripcion:"Familia"},
    }
    
    
    //THIS IS NEW
    useEffect(()=>{
        
        //searchRef.current.value = ""; 
        setLoading(true)
        
        const data = procesar_tags();
        //alert(JSON.stringify(data))
        post_method(post.search.filtro_stock,data,(response)=>{
            setData(response.data.map(
                (row)=>(
                    {
                        key: row.idcodigo,
                        codigo: row.codigo,
                        //ruta: row.ruta,
                        cantidad: row.cantidad,
                        idcodigo: row.idcodigo,
                        precio: row.precio,
                        sexo: row.sexo,
                        genero: row.genero,
                        edad: row.edad,
                        descripcion: row.descripcion,
                    }
                )
            ))
    setLoading(false)
        })
    },[valueChanged])

    const columns = [
        {title: 'Codigo',dataIndex: 'codigo',key: 'codigo'},
        {title: 'Descripción',dataIndex: 'descripcion',key: 'descripcion'},
        /*{/*title: 'Ruta',dataIndex: 'ruta',key: 'ruta'},*/
        {title: 'Edad',dataIndex: 'edad',key: 'edad'},
        {title: 'Género',dataIndex: 'genero',key: 'genero'},
        {title: 'Precio',dataIndex: 'precio',key: 'precio'},
        {title: 'Cantidad',dataIndex: 'cantidad',key: 'cantidad'},
        {
            title: 'Acciones', dataIndex: 'idstock', key: 'idstock',
            render: 
                (_,{idcodigo})=>{
                    return (<>

                         <CustomModal
                         openButtonText={"Modificar"}
                         title={""}
                         _open = {popupOpen}
                         onOk={()=>{
                            setPopupOpen(false)
                            setValueChanged(!valueChanged)
                         }}
                         onCancel={()=>{
                            setValueChanged(!valueChanged)
                         }}
                         > 
                         

                         <ModificarCantidadForm                                       
                         idcodigo={idcodigo}
                         idsucursal={idsucursal} 
                        
                         />
                         
                         </CustomModal>
                         &nbsp;
                         <DetalleStock idcodigo={idcodigo} />
                    </>    )                
                }
        }
    ]

  
    const setValue = (idx,value)=>{
        
        switch(idx){
            case "tipo_filtro": form.setFieldsValue({tipo_filtro:value}); break;
            case "valor": form.setFieldsValue({valor:value}); break;
        }
    }

    const setValue1 = (idx,value)=>{
        switch(idx){
            case "orden": form1.setFieldsValue({orden:value}); break;
            case "valor": form1.setFieldsValue({valor:value}); break;
        }
    }
    

    const onFinishFiltro = (values) =>{
        //alert(values.valor)
        const found = tags.find(i => tipos_filtro_dic[i.tipo].tipo == tipos_filtro_dic[values.tipo_filtro].tipo)
        
        if(typeof found === 'undefined')
        {    
            setTags((tags)=>[...tags,{tipo: values.tipo_filtro, valor: values.valor}])
        }
        else{
            alert("Tipo de Filtro ya Cargado")
        }
        
    }

    const procesar_tags =(values)=>{
        var _tags = {};

        tags.forEach(t=>{
            _tags[t.tipo] = t.valor
        })
        return {
            sucursal: globals.obtenerSucursal(),
            codigo_contenga_a: typeof _tags["codigo_contenga_a"] === 'undefined' ? "" : _tags["codigo_contenga_a"],
            codigo_igual_a: typeof _tags["codigo_igual_a"] === 'undefined' ? "" : _tags["codigo_igual_a"],
            precio_mayor_a: typeof _tags["precio_mayor_a"] === 'undefined' ? "" : _tags["precio_mayor_a"],
            precio_menor_a: typeof _tags["precio_menor_a"] === 'undefined' ? "" : _tags["precio_menor_a"],
            precio_igual_a: typeof _tags["precio_igual_a"] === 'undefined' ? "" : _tags["precio_igual_a"],
            cantidad_igual_a: typeof _tags["cantidad_igual_a"] === 'undefined' ? "" : _tags["cantidad_igual_a"],
            cantidad_mayor_a: typeof _tags["cantidad_mayor_a"] === 'undefined' ? "" : _tags["cantidad_mayor_a"],
            cantidad_menor_a: typeof _tags["cantidad_menor_a"] === 'undefined' ? "" : _tags["cantidad_menor_a"],
            sexo: typeof _tags["sexo"] === 'undefined' ? "" : _tags["sexo"],
            edad: typeof _tags["edad"] === 'undefined' ? "" : _tags["edad"],
            descripcion: typeof _tags["detalles"] === 'undefined' ? "" : _tags["detalles"],
            
            subgrupo: typeof _tags["subgrupo"] === 'undefined' ? "" : _tags["subgrupo"],
            grupo: typeof _tags["grupo"] === 'undefined' ? "" : _tags["grupo"],
            subfamilia: typeof _tags["subfamilia"] === 'undefined' ? "" : _tags["subfamilia"],
            familia: typeof _tags["familia"] === 'undefined' ? "" : _tags["familia"],
            order: tipoOrden,
        }
    }
    
    const onFinish = (values) => {
        setValueChanged(!valueChanged);
    }

    const removeTag = (tag) =>{
       
        setTags(tags.filter(t1=>tag.tipo !== t1.tipo))
    }

    const FiltroValor = () => {
        switch(tipoFiltro){
            case 'codigo_contenga_a': return <Input type="text" onChange={(e)=>{setValue("valor",e.target.value)}}/>;
            case 'codigo_igual_a': return <Input type="text" onChange={(e)=>{setValue("valor",e.target.value)}}/>;
            case 'precio_mayor_a': return <InputNumber onChange={(val)=>{setValue("valor",val)}}/>;
            case 'precio_menor_a': return <InputNumber onChange={(val)=>{setValue("valor",val)}}/>;
            case 'precio_igual_a': return <InputNumber onChange={(val)=>{setValue("valor",val)}}/>;
            case 'cantidad_igual_a': return <InputNumber onChange={(val)=>{setValue("valor",val)}}/>;
            case 'cantidad_mayor_a': return <InputNumber onChange={(val)=>{setValue("valor",val)}}/>;
            case 'cantidad_menor_a': return <InputNumber onChange={(val)=>{setValue("valor",val)}}/>;
            case 'sexo': return <Select options={[
                {label: 'Masculino', value: 'masculino'},
                {label: 'Femenino', value: 'femenino'},
                {label: 'Unisex', value: 'unisex'},
            ]} onChange={(val)=>{setValue("valor",val)}}/>;
            case 'edad': return <Select options={[
                {label: 'Adulto', value: 'adulto'},
                {label: 'Niños', value: 'niño'},
                {label: 'Joven', value: 'joven'},
            ]} onChange={(val)=>{setValue("valor",val)}}/>;
            case 'detalles': return <Input type="text" onChange={(e)=>{setValue("valor",e.target.value)}}/>;
            case 'subgrupo': return <SubGroupSelect callback={(id)=>{setValue("valor",id)}} />;
            case 'grupo': return <GrupoSelect callback={(id)=>{setValue("valor",id)}} />;
            case 'subfamilia': return <SubFamiliaSelect callback={(id)=>{setValue("valor",id)}} />;
            case 'familia': return <>Familia</>;
            default: return <b>Seleccione tipo filtro...</b>
        }
    }

    return(
        <>
            <Form {...{labelCol:{span:5}, wrapperCol:{span:18}}} onFinish={onFinishFiltro} form={form}>
            <Row style={{backgroundColor:"#FFE4D3", paddingTop:"1em", paddingLeft:"1em"}}>
                <Col span={8}>
                    <Form.Item label={"Filtar Por"} name={"tipo_filtro"}>
                        <Select  options={[
                            {label: 'Codigo Contenga a', value: 'codigo_contenga_a'},
                            {label: 'Codigo Igual a ', value: 'codigo_igual_a'},
                            
                            {label: 'Precio - Mayor a', value: 'precio_mayor_a'},
                            {label: 'Precio - Menor a', value: 'precio_menor_a'},
                            {label: 'Precio - Igual a', value: 'precio_igual_a'},

                            {label: 'Cantidad - Igual a', value: 'cantidad_igual_a'},
                            {label: 'Cantidad - Mayor a', value: 'cantidad_mayor_a'},
                            {label: 'Cantidad - Menor a', value: 'cantidad_menor_a'},
                            
                            {label: 'Género', value: 'sexo'},
                            {label: 'Edad', value: 'edad'},
                            
                            {label: 'Descripción', value: 'detalles'},
                            
                            {label: 'SubGrupo', value: 'subgrupo'},
                            {label: 'Grupo', value: 'grupo'},
                            {label: 'SubFamilia', value: 'subfamilia'},
                            {label: 'Familia', value: 'familia'},


                        ]} 
                        onChange={(value)=>{
                            setValue("tipo_filtro",value)
                            setTipoFitro(value)
                        }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={"Valor"} name={"valor"}>
                        <FiltroValor />
                    </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item>
                        <Button type="primary" htmlType="submit" size="small">Agregar</Button>
                    </Form.Item>
                </Col>
            </Row>
            
            </Form>

            <Form form={form1} onFinish={onFinish}>
                <Row style={{paddingTop:"1em", paddingLeft:"1em"}}>
                    
                    <Col span={8} >
                    <Form.Item label={"Filtros:"}>
                        {
                            tags.map(t=>(
                                <Tag color="red" closable  onClose={(e)=>{
                                    e.preventDefault();
                                    removeTag(t);
                                }}>{tipos_filtro_dic[t.tipo].descripcion + ": " +t.valor}</Tag>
                            ))
                        }
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"Orden"} name={"orden"}>
                            <Select options={[
                                {label: 'Alfabetico - Ascendiente', value: 'alf_asc'},
                                {label: 'Alfabetico - Descendiente', value: 'alf_desc'},
                                {label: 'Precio - Descendiente', value: 'precio_desc'},
                                {label: 'Precio - Ascendiente', value: 'precio_asc'},
                                {label: 'Cantidad - Ascendiente', value: 'cantidad_asc'},
                                {label: 'Cantidad - Descendiente', value: 'cantidad_desc'},
                            ]} 
                            onChange={(value)=>{
                                setValue1("orden",value)
                                setTipoOrden(value);
                            }}
                            />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="small">Aplicar Filtros</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        <Row>
            
            {/*<Input.Search onSearch={onSearch} ref={searchRef} />
            <Button onClick={onReset}><ReloadOutlined /></Button>*/}
            <Table columns={columns} dataSource={data} loading={loading} />
        </Row>
        </>
    )
}