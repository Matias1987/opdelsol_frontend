import CustomModal from "@/components/CustomModal";
import ExportToCSV from "@/components/ExportToCSV";
import FamiliaSelect from "@/components/FamiliaSelect";
import GrupoSelect from "@/components/GrupoSelect";
import SubFamiliaSelect from "@/components/SubFamiliaSelect";
import SubGroupSelect from "@/components/SubGroupSelect";
import CodeGrid from "@/components/etc/CodeGrid";
//import DetalleStockPopup from "@/components/forms/deposito/detalle/DetalleStockPopup";
import EditarCodigoIndiv from "@/components/forms/deposito/EditarCodigoIndiv";
import EditarStockIndiv from "@/components/forms/deposito/EditarStockIndiv";
import ModificarCantidadForm from "@/components/forms/deposito/modificarCantidadForm";
import MyLayout from "@/components/layout/layout";
import InformeStock from "@/pages/v1/informes/informe_stock";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { EditFilled, PlusOutlined, SearchOutlined, TableOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col,  Form, Input, InputNumber, Modal, Row, Select, Space, Switch, Table, Tabs, Tag } from "antd";
import { useEffect,  useState } from "react";

import EditarSubgrupo from "@/components/forms/deposito/EditarSubgrupo";
import ImpresionCodigosPopup from "../impresion_codigos_popup";

import LayoutVentas from "@/components/layout/layout_ventas";
import SelectTag from "@/components/etiquetas/selectTag";
import TagsLote from "@/components/etiquetas/TagsLote";
import SucursalSelect from "@/components/SucursalSelect";
import DetalleStock from "@/components/forms/deposito/detalle/DetalleStock";

export default function ListaStock(){
    const [usuarioDep, setUsuarioDep] = useState(false)
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
    const [etiquetas, setEtiquetas] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [popupTagsOpen, setPopupTagsOpen] = useState(false)
    const [popupDetalleOpen, setPopupDetalleOpen] = useState(false)
    const [popupEditarStockIndvOpen, setPopupEditarStockIndvOpen] = useState(false)
    const [total, setTotal] = useState(0)
    const [selectedSucursal, setSelectedSucursal] = useState(-2)
    const [selectedIdCodigo, setSelectedIdCodigo] = useState(-1)
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
        "sucursal":{tipo:"sucursal", descripcion:"Sucursal"},
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
        setUsuarioDep(globals.esUsuarioDeposito())
        setLoading(true)
       
        const data = procesar_tags();
        //alert(JSON.stringify(data))
        post_method(post.search.filtro_stock,data,(response)=>{
            //alert(JSON.stringify(response))
            let _t =0
            response.data.forEach(r=>{
                _t+=parseInt(r.cantidad)
            })
            setTotal(_t)
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
                        etiquetas: row.etiquetas,

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
            <span style={{fontSize:"1em"}}>
                <Tag color="success" style={{fontSize:".65em", margin:"0", padding:"1px"}}>{familia}</Tag>
                <Tag color="processing" style={{fontSize:".65em", margin:"0", padding:"1px"}}>{subfamilia}</Tag>
                <Tag color="error" style={{fontSize:".65em", margin:"0", padding:"1px"}}><b>{grupo}</b></Tag>
                <EditarSubgrupo idsubgrupo={idsubgrupo} buttonText={subgrupo} callback={()=>{setValueChanged(!valueChanged)}} />
            </span>
        </Space>},
        {title: 'Codigo',dataIndex: 'codigo',key: 'codigo', render:(_,{codigo})=>
            <>
            <span style={{fontSize:".85em"}}><b>{codigo}</b></span>
            </>},
      /*  {title: 'Descripción',dataIndex: 'descripcion',key: 'descripcion'},*/
        
        {title: 'Edad',dataIndex: 'edad',key: 'edad', hidden: true},
        {title: 'Género',dataIndex: 'genero',key: 'genero', hidden: true},
        {title: 'Precio',dataIndex: 'idcodigo',key: 'precio', width:"100px", render:(_,{precio,modo_precio})=>{
            
            switch(modo_precio)
            {
                case 0: return <div style={{width:"100%", textAlign:"right"}}>$&nbsp;{precio}&nbsp;&nbsp;<Tag color="blue">M</Tag></div>;
                case 1: return <div style={{width:"100%", textAlign:"right"}}>$&nbsp;{precio}&nbsp;&nbsp;<Tag color="orange">SG</Tag></div>;
                case 2: return <div style={{width:"100%", textAlign:"right"}}>$&nbsp;{precio}&nbsp;&nbsp;<Tag color="red">P</Tag></div>;
            }
        }},
        {title: 'Cantidad',dataIndex: 'cantidad',key: 'cantidad', width:"90px", render:(_,{cantidad})=><div style={{width:"90%", textAlign:"right"}}>{cantidad}</div>},
        {title:'Etiquetas',render:(_,{etiquetas})=><span style={{fontWeight:"bold", color:"darkgreen"}}>{etiquetas}</span>},
        {
            title: 'Acciones', dataIndex: 'idstock', key: 'idstock',  width:"120px",
            render: 
                (_,{idcodigo})=><>
                <Button size="small" onClick={()=>{setSelectedIdCodigo(idcodigo); setPopupDetalleOpen(true);}}>Detalle</Button>
             
                {
                    globals.esUsuarioDeposito() && (selectedSucursal==globals.obtenerSucursal() || selectedSucursal<-1) ?
                    <Button size="small" onClick={()=>{setSelectedIdCodigo(idcodigo); setPopupEditarStockIndvOpen(true);}}>Editar Stock</Button> : <></>
                }
             
                {globals.esUsuarioDeposito() ? <EditarCodigoIndiv  idcodigo={idcodigo} buttonText={<>Editar C&oacute;digo</>} callback={()=>{setValueChanged(!valueChanged)}} /> : <></>}
                </>                
        },
        {
            title: (<>
            <Checkbox 
                onChange={(e)=>{
                    setData(_data=>_data.map(d=>({...d,checked:e.target.checked})))
            }} /></>), 
            width:"50px",
            render:(_,{checked, idcodigo})=>(
                <>
                    <Checkbox checked={checked} onChange={(e)=>{
                        setData(_data=>_data.map(d=>(d.idcodigo==idcodigo?{...d,checked:e.target.checked}:d)))
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

        let _sucursal = selectedSucursal < -1 ? globals.obtenerSucursal() : selectedSucursal



        return {
            sucursal: _sucursal,
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
            etiquetas: etiquetas,
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
            <h3>Stock</h3>
            <Tabs
            onChange={(v)=>{setActiveTab(v)}}
            defaultActiveKey="1"
            activeKey={activeTab}
            type="card"
            items={[
                {
                    label:'Búsqueda',
                    key:"1",
                    children: <div style={{backgroundColor:"rgba(173,216,230,.2)", border:"1px solid rgba(173,216,230,1)" }}>
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
                    label: 'Búsqueda Av.',
                    key: '2',
                    children: <div style={{backgroundColor:"rgba(173,216,230,.2)", padding:".3em", border:"1px solid rgba(173,216,230,1)"}}>
                    <Form {...{labelCol:{span:5}, wrapperCol:{span:18}}} onFinish={onFinishFiltro} form={form}>
                        <Row >
                            <Col span={8}>
                                <Form.Item label={"Filtar Por"} name={"tipo_filtro"}>
                                    <Select 
                                        
                                        placeholder="Seleccione..."
                                    options={[
                                        {label: 'Codigo Contenga a', value: 'codigo_contenga_a'},
                                        {label: 'Codigo Igual a ', value: 'codigo_igual_a'},
                                        {label: 'Precio - Mayor a', value: 'precio_mayor_a'},
                                        {label: 'Precio - Menor a', value: 'precio_menor_a'},
                                        {label: 'Precio - Igual a', value: 'precio_igual_a'},
                                        {label: 'Cantidad - Igual a', value: 'cantidad_igual_a'},
                                        {label: 'Cantidad - Mayor a', value: 'cantidad_mayor_a'},
                                        {label: 'Cantidad - Menor a', value: 'cantidad_menor_a'},
                                        /*{label: 'Género', value: 'sexo'},
                                        {label: 'Edad', value: 'edad'},*/
                                        {label: 'Descripción', value: 'detalles'},
                                        {label: 'SubGrupo', value: 'subgrupo'},
                                        {label: 'Grupo', value: 'grupo'},
                                        {label: 'SubFamilia', value: 'subfamilia'},
                                        {label: 'Familia', value: 'familia'},
                                        {label: 'Grupo Contenga a', value: 'grupo_contenga_a'},
                                    ]} 
                                    style={{width:"100%"}}
                                    onChange={(value)=>{
                                        setValue("tipo_filtro",value)
                                        setTipoFitro(value)
                                    }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={"Valor"} name={"valor"} key={valueChanged}>
                                    {FiltroValor()}
                                </Form.Item>
                            </Col>
                            <Col span={1}>
                            <Form.Item>
                                    <Button type="primary" htmlType="submit" size="small"><PlusOutlined /> Agregar</Button>
                                </Form.Item>
                            </Col>
                            
                        </Row>
                        
                        </Form>
                        <Form form={form1} onFinish={onFinish}>
                            <Row>
                                <Col span={12} >
                                    <Form.Item label={"Filtros:"} style={{backgroundColor:"#D8DFE6"}}>
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
                                <Col span={6}>
                                <Form.Item label={<span style={{fontSize:".8em"}}>Orden</span>} name={"orden"}>
                                    <Select options={[
                                        {label: 'Alfabetico - Ascendiente', value: 'alf_asc'},
                                        {label: 'Alfabetico - Descendiente', value: 'alf_desc'},
                                        {label: 'Precio - Descendiente', value: 'precio_desc'},
                                        {label: 'Precio - Ascendiente', value: 'precio_asc'},
                                        {label: 'Cantidad - Ascendiente', value: 'cantidad_asc'},
                                        {label: 'Cantidad - Descendiente', value: 'cantidad_desc'},
                                    ]} 
                                    style={{width:"150px"}}
                                    onChange={(value)=>{
                                        setValue1("orden",value)
                                        setTipoOrden(value);
                                    }}
                                    />
                                </Form.Item>
                                </Col>
                                { globals.esUsuarioDeposito() ?
                                <Col span={6}>
                                    <Form.Item>
                                        <SucursalSelect callback={(id)=>{setSelectedSucursal(id); setValueChanged(!valueChanged)}} />
                                    </Form.Item>    
                                </Col>
                                :
                                <></>
                                }
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <SelectTag callback={(v=>{
                                        setEtiquetas(v)
                                        })} />
                                </Col>
                                <Col span={6} style={{paddingLeft:"25px"}}>
                                    <Form.Item>
                                            <Button  type="primary" htmlType="submit" size="small" block>Aplicar Filtros</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                            
                        </Form>
                        
                    </div>
                }
            ]}
            />
            <Row style={{backgroundColor:"#D3E1E6"}}>
                {usuarioDep && (selectedSucursal==globals.obtenerSucursal() || selectedSucursal<-1) ?
                <Col span={4} style={{padding:".5em"}}>
                    <Button onClick={()=>{setOpen(true)}} ><TableOutlined />  Grilla de C&oacute;digos</Button>
                    <Modal 
                        footer={null} 
                        width={"1100px"} 
                        open={open} 
                        key={idsubgrupo} 
                        destroyOnClose={true} 
                        onCancel={()=>{setOpen(false); setValueChanged(!valueChanged)} }>
                            <CodeGrid idsubgrupo={idsubgrupo} width={640} height={480} idsucursal={selectedSucursal} />
                    </Modal>
                </Col>:<></>}
                {usuarioDep  && (selectedSucursal==globals.obtenerSucursal() || selectedSucursal<-1)?<Col span={4} style={{padding:".5em"}}>{edit_popup()}</Col>:<></>}
                <Col span={4} style={{padding:".5em"}}>
                    <ExportToCSV parseFnt={()=>{
                        let str = "Familia, SubFamilia, Grupo, Subgrupo, Codigo, Descripcion, Cantidad, Precio,\r\n"
                        data.forEach(r=>{
                            str+=`${r.familia},${r.subfamilia},${r.grupo},${r.subgrupo},${r.codigo},${r.descripcion},${r.cantidad},${r.precio},\r\n`
                        })
                        return str
                    }} 
                    />
                </Col>
                <Col span={4} style={{padding:".5em"}}>
                    <ImpresionCodigosPopup codigos={(data.filter(d=>d.checked)).map(c=>({codigo:c.codigo, idcodigo: c.idcodigo , cantidad:  c.cantidad}))} />
                </Col>
                <Col span={4} style={{padding:".5em"}}>
                    <Button disabled={(data.filter(d=>d.checked)).length<1} type="primary" onClick={()=>{setPopupTagsOpen(true)}}>Editar Etiquetas</Button>
                </Col>
                {/*<Col span={4} style={{padding:".3em"}}>
                    <Checkbox >Ver Todo</Checkbox>
                </Col>*/}
            </Row>
        <Row>
            <Col span={24}>
                <Table 
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'} 
                columns={columns.filter(item=>!item.hidden)} 
                dataSource={data} 
                loading={loading} 
                scroll={{y:400}}  />
            </Col>
        </Row>
        <Row>
            <Col span={24} style={{color:"blue", padding:"1em", fontWeight:"bold", fontSize:"1.3em"}}>
                Cantidad Total: {total}
            </Col>
        </Row>
        <Row>
            <Col span={24} key={listId} >
                <InformeStock data={data} />
            </Col>
        </Row>
        <Modal 
            footer={null}
            width={"80%"}
            title="Editar Etiquetas"
            open={popupTagsOpen} 
            destroyOnClose 
            onCancel={()=>{
                setPopupTagsOpen(false)
            }}
        >
            <TagsLote 
                codigos={(data.filter(d=>d.checked)).map(c=>({codigo:c.codigo, idcodigo: c.idcodigo }))}
                callback={()=>{setPopupTagsOpen(false); setValueChanged(!valueChanged)}}
            />
        </Modal>
        {/** DETALLE POPUP */}
        <Modal 
        destroyOnClose
        open={popupDetalleOpen} 
        footer={null} 
        onCancel={()=>{setPopupDetalleOpen(false)}} 
        width={"80%"}
        >
            <DetalleStock 
            idcodigo={selectedIdCodigo} 
            idsucursal={selectedSucursal < 0 ? idsucursal : selectedSucursal} 
            callback={()=>{setPopupDetalleOpen(false); setValueChanged(!valueChanged);}}
            />
        </Modal>
        {/** EDITAR STOCK INDV. */}
        <Modal 
        destroyOnClose
        open={popupEditarStockIndvOpen} 
        footer={null} 
        onCancel={()=>{setPopupEditarStockIndvOpen(false); setValueChanged(!valueChanged)}}  
        width={"80%"}
        >
            <EditarStockIndiv 
            idcodigo={selectedIdCodigo} 
            idsucursal={globals.obtenerSucursal()} 
            callback={()=>{
                setPopupEditarStockIndvOpen(false);
                setValueChanged(!valueChanged)
            }}
            />
        </Modal>
        </>
    )
}

ListaStock.PageLayout = globals.esUsuarioDepositoMin() ? LayoutVentas : MyLayout;

