import CustomModal from "@/components/CustomModal";
import ExportToCSV from "@/components/ExportToCSV";
import FamiliaSelect from "@/components/FamiliaSelect";
import GrupoSelect from "@/components/GrupoSelect";
import SubFamiliaSelect from "@/components/SubFamiliaSelect";
import SubGroupSelect from "@/components/SubGroupSelect";
import CodeGrid from "@/components/etc/CodeGrid";
import DetalleStock from "@/components/forms/deposito/DetalleStock";
import EditarCodigoIndiv from "@/components/forms/deposito/EditarCodigoIndiv";
import EditarStockIndiv from "@/components/forms/deposito/EditarStockIndiv";
import ModificarCantidadForm from "@/components/forms/deposito/modificarCantidadForm";
import MyLayout from "@/components/layout/layout";
import InformeStock from "@/pages/v1/informes/informe_stock";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { CheckCircleOutlined, EditFilled, SearchOutlined, TableOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Space, Switch, Table, Tabs, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import EditarSubGrupo from "../editar_subgrupo";
import EditarSubgrupo from "@/components/forms/deposito/EditarSubgrupo";
import ImpresionCodigosPopup from "../impresion_codigos_popup";

export default function ListaStock(){
    const [open, setOpen] = useState(false)
    const [popupOpen, setPopupOpen] = useState(false)
    const [tipoOrden, setTipoOrden] = useState("");
    const [tipoFiltro, setTipoFitro] = useState(-1);
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [valueChanged, setValueChanged] = useState(false)
    const [tags, setTags] = useState([])
    const idsucursal = globals.obtenerSucursal();//temporary
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const [listId, setListId] = useState(0);
    const [idsubgrupo, setIdSubgrupo] = useState(-1)
    const [activeTab, setActiveTab] = useState("1")
    const [quickSearchValue, setQuickSearchValue] = useState("")
    const [codigoSearch, setCodigoSearch] = useState(true)
    const [selectAll, setSelectAll] = useState(false)
    const tipos_filtro_dic = {
        "grupo_contenga_a":{tipo: "grupo", descripcion: "Grupo Cont."},
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
    
    const edit_popup = () => <>
        <CustomModal
            type="default"
            size="normal"
            block
            openButtonText={"Modificar Selección"}
            title={""}
            _open = {popupOpen}
            onOk={()=>{
            setPopupOpen(false)
            setValueChanged(!valueChanged)
            }}
            onCancel={()=>{
            setValueChanged(!valueChanged)
            }}

            validateOpen={
            ()=>{
                
                if((data.filter((r)=> r.checked)).length<1){
                    alert("No hay códigos seleccionados.")
                    return false;
                }
                return true;
            }
            }
            > 
            <ModificarCantidadForm                                       
            codigos={data.filter((r)=> r.checked)}
            idsucursal={idsucursal} 
            />
        </CustomModal>
    </>
    
    //THIS IS NEW
    useEffect(()=>{
        setLoading(true)
       
        const data = procesar_tags();
        post_method(post.search.filtro_stock,data,(response)=>{
            //alert(JSON.stringify(response))
            setData(response.data.map(
                (row)=>(
                    {
                        key: row.idcodigo,
                        codigo: row.codigo,
                        ruta: row.ruta,
                        cantidad: row.cantidad,
                        idcodigo: row.idcodigo,
                        precio: row.precio,
                        sexo: row.sexo,
                        genero: row.genero,
                        edad: row.edad,
                        descripcion: row.descripcion,
                        checked: false,
                        familia: row.familia,
                        subfamilia: row.subfamilia,
                        grupo: row.grupo,
                        subgrupo: row.subgrupo,
                        modo_precio: row.modo_precio,
                        idsubgrupo: row.idsubgrupo,

                    }
                )
            ))
    setLoading(false)
    setListId(listId+1)
        })
    },[valueChanged])

    const columns = [
        {title: 'Ruta',dataIndex: 'idcodigo',key: 'ruta', render:(_,{familia,subfamilia,grupo,subgrupo, idsubgrupo}) => 
        <Space size={[0, 'small']} wrap>
            <span style={{fontSize:".25em"}}>
                <Tag color="success">{familia}</Tag>
                <Tag color="processing">{subfamilia}</Tag>
                <Tag color="error"><b>{grupo}</b></Tag>
                <EditarSubgrupo idsubgrupo={idsubgrupo} buttonText={subgrupo} callback={()=>{setValueChanged(!valueChanged)}} />
            </span>
        </Space>},
        {title: 'Codigo',dataIndex: 'codigo',key: 'codigo', render:(_,{codigo})=>
            <>
            <span style={{fontSize:"1.2em"}}><b>{codigo}</b></span>
            </>},
        {title: 'Descripción',dataIndex: 'descripcion',key: 'descripcion'},
        
        {title: 'Edad',dataIndex: 'edad',key: 'edad', hidden: true},
        {title: 'Género',dataIndex: 'genero',key: 'genero', hidden: true},
        {title: 'Precio',dataIndex: 'idcodigo',key: 'precio', render:(_,{precio,modo_precio})=>{
            
            switch(modo_precio)
            {
                case 0: return <div style={{width:"100%", textAlign:"right"}}>$&nbsp;{precio}&nbsp;&nbsp;<Tag color="blue">M</Tag></div>;
                case 1: return <div style={{width:"100%", textAlign:"right"}}>$&nbsp;{precio}&nbsp;&nbsp;<Tag color="orange">SG</Tag></div>;
                case 2: return <div style={{width:"100%", textAlign:"right"}}>$&nbsp;{precio}&nbsp;&nbsp;<Tag color="red">P</Tag></div>;
            }
        }},
        {title: 'Cantidad',dataIndex: 'cantidad',key: 'cantidad', width:"100px", render:(_,{cantidad})=><div style={{width:"100%", textAlign:"right"}}>{cantidad}</div>},
        {
            title: 'Acciones', dataIndex: 'idstock', key: 'idstock',  width:"350px",
            render: 
                (_,{idcodigo})=><>
                <DetalleStock idcodigo={idcodigo} />
                &nbsp;&nbsp;
                <EditarStockIndiv callback={()=>{setValueChanged(!valueChanged)}} buttonText={"Edit. Stock"} idcodigo={idcodigo} idsucursal={globals.obtenerSucursal()} />
                &nbsp;&nbsp;
                <EditarCodigoIndiv idcodigo={idcodigo} buttonText="Editar Código" callback={()=>{setValueChanged(!valueChanged)}} />
                </>                
        },
        {
            title: (<><Checkbox 
                checked={selectAll}
                onChange={(e)=>{
                setSelectAll(!selectAll)
                setData(
                    data.map(r=>{
                        r.checked=!selectAll;
                        return r;
                    })
                )
            }} /></>), dataIndex: 'checked', key: 'check', width:"50px",
            render:(_,{checked, idcodigo})=>(
                <>
                    <Checkbox checked={checked} onChange={(e)=>{
                        let _data = data.map(r=>{
                            if(r.idcodigo == idcodigo){
                                r.checked = e.target.checked;
                            }
                            return r;
                        })
                        setData(_data)
                    }} />
                </>
            )
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
        
        if(typeof values === 'undefined'){
            return;
        }
        if(values === null){
            return;
        }

        if(typeof values.valor === 'undefined'){
            return;
        }

        if(values.valor === null){
            return;
        }
        
        var found = null;
        try{
            found = tags.find(i => tipos_filtro_dic[i.tipo].tipo == tipos_filtro_dic[values.tipo_filtro].tipo)
        }catch(e){
            console.log("error adding tag")
        }
        
        if(typeof found === 'undefined')
        {    
            setTags((tags)=>[...tags,{tipo: values.tipo_filtro, valor: values.valor}])
        }
        else{
            alert("Tipo de Filtro ya Cargado")
        }
        
        setValue('valor',null)
        setValue('tipo_filtro',null)

        setTipoFitro(null)
        
    }

    const procesar_tags =(values)=>{
        var _tags = {};

        tags.forEach(t=>{
            _tags[t.tipo] = t.valor
        })
        return {
            sucursal: globals.obtenerSucursal(),
            codigo_contenga_a: typeof _tags["codigo_contenga_a"] === 'undefined' ? "" : _tags["codigo_contenga_a"],
            grupo_contenga_a: typeof _tags["grupo_contenga_a"] === 'undefined' ? "" : _tags["grupo_contenga_a"],
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
            case 'grupo_contenga_a': return <Input type="text" onChange={(e)=>{setValue("valor",e.target.value)}}/>;
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
            case 'subgrupo': return <SubGroupSelect callback={(id)=>{setValue("valor",id); setIdSubgrupo(id);}} />;
            case 'grupo': return <GrupoSelect callback={(id)=>{setValue("valor",id)}} />;
            case 'subfamilia': return <SubFamiliaSelect callback={(id)=>{setValue("valor",id)}} />;
            case 'familia': return <><FamiliaSelect callback={(id)=>{setValue("valor",id)}}/></>;
            default: return <b>Seleccione tipo filtro...</b>
        }
    }

    const onQuickSearchClick =()=>
    {
        if(codigoSearch)
        {
            setTags([{tipo:"codigo_contenga_a", valor:quickSearchValue}])
        }
        else
        {
            setTags([{tipo:"grupo_contenga_a", valor:quickSearchValue}])
        }
        
        setValueChanged(!valueChanged)
    }

    return(
        <>
            <h2>Lista Stock</h2>
            <Tabs
            onChange={(v)=>{setActiveTab(v)}}
            defaultActiveKey="1"
            activeKey={activeTab}
            type="card"
            items={[
                {
                    label:'Búsqueda',
                    key:"1",
                    children: <div style={{backgroundColor:"lightblue", }}>
                        <Row style={{padding:"1em", }}>
                            <Col span={24}>
                                <Input style={{fontSize:"2.5em", backgroundColor:"#D8E3E6"}} prefix={<><Switch checked={codigoSearch} onChange={(c)=>{setCodigoSearch(!codigoSearch)}} checkedChildren="Código" unCheckedChildren="Grupo" /></>} onChange={e=>{
                                    setQuickSearchValue(e.target.value)
                                    }} addonAfter={<><Button type="text" onClick={(e)=>{onQuickSearchClick(e.target.value)}}><SearchOutlined /></Button></>} />
                            </Col>
                        </Row>
                    </div>
                },
                {
                    label: 'Adv.',
                    key: '2',
                    children: <div style={{backgroundColor:"lightblue", padding:"1em"}}>
                    <Form {...{labelCol:{span:5}, wrapperCol:{span:18}}} onFinish={onFinishFiltro} form={form}>
                        <Row >
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
                                        {label: 'Grupo Contenga a', value: 'grupo_contenga_a'},
                                    ]} 
                                    onChange={(value)=>{
                                        setValue("tipo_filtro",value)
                                        setTipoFitro(value)
                                    }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={"Valor"} name={"valor"} key={valueChanged}>
                                    {FiltroValor()}
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
                            <Row>
                                <Col span={8} >
                                <Form.Item label={"Filtros:"}>
                                    {
                                        tags.map(t=>(
                                            (typeof tipos_filtro_dic[t.tipo] === 'undefined' || tipos_filtro_dic[t.tipo] === null) ? <></> :

                                            <Tag color="red" closable  onClose={(e)=>{
                                                e.preventDefault();
                                                removeTag(t);
                                            }}>{tipos_filtro_dic[t?.tipo]?.descripcion + ": " +t?.valor}</Tag>
                                        ))
                                    }
                                    </Form.Item>
                                </Col>
                                <Col span={9}>
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
                                <Col span={3}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" size="small">Aplicar Filtros</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                }
            ]}
            />
            <Row style={{backgroundColor:"#D3E1E6"}}>
                <Col span={4}>
                    <Button onClick={()=>{setOpen(true)}} ><TableOutlined />  Grilla de C&oacute;digos</Button>
                    <Modal 
                        footer={null} 
                        width={"900px"} 
                        open={open} 
                        key={idsubgrupo} 
                        destroyOnClose={true} 
                        onCancel={()=>{setOpen(false); setValueChanged(!valueChanged)} }>
                            <CodeGrid idsubgrupo={idsubgrupo} width={500} height={480}/>
                    </Modal>
                </Col>
                <Col span={4}>{edit_popup()}</Col>
                {/*<Col span={4}>
                    <Button block onClick={(e)=>{
                    setData(
                        data.map(r=>{
                            r.checked=e.target.checked;
                            return r;
                        })
                    )
                    }}><CheckCircleOutlined />Seleccionar / Deseleccionar Todo</Button>
                </Col>*/}
                <Col span={4}>
                    <ExportToCSV parseFnt={()=>{
                        let str = "Familia, SubFamilia, Grupo, Subgrupo, Codigo, Descripcion, Cantidad, Precio,\r\n"
                        data.forEach(r=>{
                            str+=`${r.familia},${r.subfamilia},${r.grupo},${r.subgrupo},${r.codigo},${r.descripcion},${r.cantidad},${r.precio},\r\n`
                        })
                        return str
                    }} 
                    />
                </Col>
                <Col span={4}>
                    <ImpresionCodigosPopup codigos={(data.filter(d=>d.checked)).map(c=>({codigo:c.codigo, idcodigo: c.idcodigo , cantidad:  c.cantidad}))} />
                </Col>
                {/*<Col span={4} style={{padding:".3em"}}>
                    <Checkbox >Ver Todo</Checkbox>
                </Col>*/}
            </Row>
        <Row>
            <Col span={24}>
            <Table rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'} columns={columns.filter(item=>!item.hidden)} dataSource={data} loading={loading} scroll={{y:400}}  />
            </Col>
        </Row>
        <Row>
            <Col span={24} key={listId} >
                <InformeStock data={data} />
            </Col>
        </Row>
        </>
    )
}

ListaStock.PageLayout = MyLayout;