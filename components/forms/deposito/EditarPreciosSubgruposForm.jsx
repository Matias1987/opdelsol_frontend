import GrupoSelect from "@/components/GrupoSelect";
import LoadSelect from "@/components/LoadSelect";
import SubFamiliaSelect from "@/components/SubFamiliaSelect";
import SubGroupSelect from "@/components/SubGroupSelect";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Row, Col, Select, Input, Button, Modal, Table, Checkbox } from "antd";
import { useState } from "react";
/**
 * 
 * @param fkcategoria
 * @param categoria
 * 
 */
const EditarPreciosSubgruposForm = (props) => {
    const [values, setValues] = useState({
        multiplicador: 1,
        fkcategoria: -1,
        categoria: '-1',
        porcentaje: 0,
        valor: 0,
    })
    const [vpOpen, setVPOpen] = useState(false)
    const [dataSourceVP, setDataSourceVP] = useState([])
    const [subgrupos, setSubgrupos] = useState([])
    const [selectedSubgrupo, setSelectedSubgrupo] = useState(-1)
    
    const setValue = (idx, value) => {

        setValues(v=>({...v,[idx]:value}))

    }

    useState(()=>{
        setValues(v=>({...v,fkcategoria:props.fkcategoria, categoria:props.categoria}))
    },[props])


   

    const row_style = {padding:".5em"   }

    const box_style = {
        border: "1px dotted #6E7F80",
        borderRadius: "8px",
        padding:"12px"
    }
  
    return (<div style={box_style}>
    <div style={{
        fontWeight:"bold", 
        marginTop:"-18px", 
        width:"40px", 
        paddingLeft:"12px", 
        backgroundColor:"white",
        border:"1px dotted #6E7F80",
        borderRadius:"6px",
        fontSize:".7em",
        color: "#6E7F80"
        }}>Precio</div>


    <Row style={{...row_style}}>
        <Col span={24}>
                <Input 
                allowClear
                prefix={"Porcentaje a Aumentar:   "} 
                onChange={(e)=>{
                    setValue('porcentaje',parseFloat(e.target.value||"0"))
                    setValue('multiplicador', 1 + parseFloat(e.target.value||"0") / 100)
                }} 
                type="number"
                value={parseFloat(values.porcentaje||"0")}
                />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col  span={24}>
                <Input 
                allowClear
                prefix={"Valor a Aumentar:   "} 
                onChange={(e)=>{
                    setValue('valor',parseFloat(e.target.value||"0"))
                }} 
                type="number"
                value={parseFloat(values.valor||"0")}
                />
        </Col>
    </Row>

    <Row style={row_style}>
        <Col  span={24}>
                <Button 
                size="large"
                type="primary" 
                block onClick={()=>
                {
                    var idsubgrupo=-1;
                    var idgrupo=-1;
                    var idsubfamilia=-1;
                    var idfamilia= -1;

                    switch(values.categoria)
                    {
                        case "familia": idfamilia=values.fkcategoria; break;
                        case "subfamilia": idsubfamilia=values.fkcategoria; break;
                        case "grupo": idgrupo=values.fkcategoria; break;
                        case "subgrupo": idsubgrupo=values.fkcategoria; break;
                    }

                    
                    fetch(get.lista_codigos_categoria + `${idfamilia}/${idsubfamilia}/${idgrupo}/${idsubgrupo}/1`)///:idfamilia/:idsubfamilia/:idgrupo/:idsubgrupo/:modo_precio
                    .then(response=>response.json())
                    .then((response)=>{
                        setDataSourceVP(
                            response.data.map(
                                r=>(
                                    {
                                        idsubgrupo: r.subgrupo_idsubgrupo,
                                        codigo: r.codigo,
                                        precio_ant: r.precio_defecto,
                                        precio_n: (r.precio_defecto * values.multiplicador) + parseFloat(values.valor),
                                    }
                                )
                            )
                        )
                    })

                    fetch(get.listado_subgrupos_filtros + `${idsubgrupo}/${idgrupo}/${idsubfamilia}/${idfamilia}`)
                    .then(r=>r.json())
                    .then(response=>{
                        setSubgrupos(response.data.map(sg=>({
                            idsubgrupo:sg.idsubgrupo,
                            nombre_largo: sg.nombre_largo,
                            precio_ant: sg.precio_defecto,
                            precio_n: (parseFloat(sg.precio_defecto) * values.multiplicador) + parseFloat(values.valor),
                            checked:false
                        })))
                    })


                    /**
                     * load codes
                     */
                    setVPOpen(true)
                }}>Vista Previa </Button>
                <Modal 
                destroyOnClose
                width={"80%"} 
                title={"Vista de Previa (lista de productos con modo de precio por subgrupo)"} 
                open={vpOpen} 
                onCancel={()=>{setVPOpen(false)}} 
                footer={null}>
                    <Row>
                        <Col span={12}>
                            <h4>Subgrupos Afectados</h4>
                            <Table 
                            scroll={{y:"600px"}}
                            dataSource={subgrupos} 
                            columns={[
                                {title:"Subgrupo", render:(_,obj)=><>{obj.nombre_largo}</>},
                                {title:"Precio Ant.", render:(_,obj)=><>{obj.precio_ant}</>},
                                {title:"Precio Nuevo", render:(_,obj)=><>{obj.precio_n}</>},
                                {
                                    render:(_,{idsubgrupo, checked})=><>
                                       <Checkbox 
                                       checked={checked}
                                       onChange={(e)=>{
                                            
                                            setSubgrupos(_sgs=>subgrupos.map(_sg=>(_sg.idsubgrupo==idsubgrupo ? {..._sg,checked:e.target.checked} : {..._sg,checked:false})))
                                            
                                            setSelectedSubgrupo( e.target.checked ? idsubgrupo : -1 )

                                       }}></Checkbox>
                                    </>
                                }
                                ]} />
                        </Col>
                        <Col span={12}>
                            <h4>C&oacute;digos Afectados</h4>
                            <Table 
                            scroll={{y:"600px"}}
                            dataSource={dataSourceVP.filter(sg=>selectedSubgrupo<0 ? true : selectedSubgrupo == sg.idsubgrupo )}
                            columns={[
                                {dataIndex:"codigo", title:"Codigo"},
                                {dataIndex:"precio_ant", title:<div style={{fontWeight:"bold", color:"red", textAlign:"right"}}>Precio Ant.</div>, render:(_,{precio_ant})=><div style={{textAlign:"right", color:"red"}}>$&nbsp;{precio_ant}</div>},
                                {dataIndex:"precio_n", title:`Precio Nuevo  + ${values.porcentaje}% | Valor: ${values.valor} `, render:(_,{precio_n})=><div style={{textAlign:"right", color:"blue"}}>$&nbsp;{precio_n}</div> },
                            ]}
                            />
                        </Col>
                    </Row>
                    <Row style={row_style}>
                        <Col  span={24}>
                            <Button 
                       
                            danger 
                            block 
                            onClick={()=>{
                                if(!confirm("Aplicar Cambios?"))
                                {
                                    return;
                                }
                                post_method(post.update.modificar_precios_defecto_subgrupo,
                                    {
                                        idfamilia:values.categoria=="familia"? values.fkcategoria:"-1",
                                        idsubfamilia:values.categoria=="subfamilia"? values.fkcategoria:"-1",
                                        idgrupo:values.categoria=="grupo"? values.fkcategoria:"-1",
                                        idsubgrupo:values.categoria=="subgrupo"? values.fkcategoria:"-1",
                                        multiplicador: values.multiplicador,
                                        valor: values.valor,
                                    }
                                    ,
                                    (response)=>{
                                        alert("OK")
                                        props?.callback?.()
                                    }
                                )
                            }}>Aplicar Cambios</Button>
                        </Col>
                    </Row>
                    
                </Modal>
        </Col>
    </Row>
    
        
    </div>)
}

export default EditarPreciosSubgruposForm;