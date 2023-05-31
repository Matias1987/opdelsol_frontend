import CustomModal from "@/components/CustomModal";
import CustomTable from "@/components/forms/CustomTable";
import DetalleStock from "@/components/forms/deposito/DetalleStock";
import ModificarCantidadForm from "@/components/forms/deposito/modificarCantidadForm";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, Row, Select, Space, Table, Tag } from "antd";
import { useEffect, useRef, useState } from "react";

export default function ListaStock(){
    const [popupOpen, setPopupOpen] = useState(false)
    const [tipoOrden, setTipoOrden] = useState("");
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [valueChanged, setValueChanged] = useState(false)
    const [tags, setTags] = useState([])
    const searchRef = useRef(null)
    const idsucursal = globals.obtenerSucursal();//temporary
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const tipos_filtro_dic = {
        "codigo_contenga_a":{tipo: "codigo", descripcion: "Codigo"},
        "codigo_igual_a":{tipo: "codigo", descripcion: "Codigo"},
        "precio_mayor_a":{tipo: "precio", descripcion: "Precio"},
        "precio_menor_a":{tipo: "precio", descripcion: "Precio"},
        "precio_igual_a":{tipo: "precio", descripcion: "Precio"},
        "cantidad_igual_a":{tipo: "cantidad", descripcion:"Cantidad"},
        "cantidad_mayor_a":{tipo: "cantidad", descripcion:"Cantidad"},
        "cantidad_menor_a":{tipo: "cantidad", descripcion:"Cantidad"},
        "sexo":{tipo: "sexo", descripcion:"Genero"},
        "edad":{tipo: "edad", descripcion:"Edad"},
    }
    //#region ONSEARCH
    const onSearch = (value) => {
        setLoading(true)
        fetch(get.buscar_stock + idsucursal + "/" + value)
        .then((response)=>response.json())
        .then((response)=>{
            /*
            this returns rows results from search
            */
            setData(
                response.data.map(
                    (row) => ({
                        key: row.idcodigo,
                        codigo: row.codigo,
                        ruta: row.ruta,
                        //descripcion: row.descripcion,
                        cantidad: row.cantidad,
                        idcodigo: row.idcodigo,
                        })
                )
            )
            setLoading(false)
        })
        .catch((error)=>{console.error(error)})
    }
    //#endregion
    
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
                    }
                )
            ))
    setLoading(false)
        })
    },[valueChanged])

    const columns = [
        {title: 'Codigo',dataIndex: 'codigo',key: 'codigo'},
        {title: 'Descripción',dataIndex: 'descripcion',key: 'descripcion'},
        {title: 'Ruta',dataIndex: 'ruta',key: 'ruta'},
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

    const onReset = ()=>{
        setValueChanged(!valueChanged); 
        searchRef.current.value = ""; 
        console.log(searchRef.current.value)
    }

    const setValue = (idx,value)=>{
        switch(idx){
            case "tipo_filtro": form.setFieldsValue({tipo_filtro:value}); break;
        }
    }

    const setValue1 = (idx,value)=>{
        switch(idx){
            case "orden": form1.setFieldsValue({orden:value}); break;
        }
    }

    const onFinishFiltro = (values) =>{
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
            order: tipoOrden,
        }
    }
    
    const onFinish = (values) => {
        setValueChanged(!valueChanged);
    }

    const removeTag = (tag) =>{
        
        setTags(tags.filter(t1=>tag.tipo !== t1.tipo))
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
                        ]} 
                        onChange={(value)=>{
                            setValue("tipo_filtro",value)
                        }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={"Valor"} name={"valor"}>
                        <Input />
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
            <h1>Lista de Stock</h1>
            {/*<Input.Search onSearch={onSearch} ref={searchRef} />
            <Button onClick={onReset}><ReloadOutlined /></Button>*/}
            <Table columns={columns} dataSource={data} loading={loading} ></Table>
        </Row>
        </>
    )
}