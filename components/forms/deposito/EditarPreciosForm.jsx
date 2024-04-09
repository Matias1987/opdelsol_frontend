import { post_method } from "@/src/helpers/post_helper"
import { get, post } from "@/src/urls"

const { default: GrupoSelect } = require("@/components/GrupoSelect")
const { default: LoadSelect } = require("@/components/LoadSelect")
const { default: SubFamiliaSelect } = require("@/components/SubFamiliaSelect")
const { default: SubGroupSelect } = require("@/components/SubGroupSelect")
const { Row, Col, Select, Input, Button, Modal, Table } = require("antd")
const { useState } = require("react")

const EditarPreciosForm = (props) => {
    const [values, setValues] = useState({
        multiplicador: 1,
        fkcategoria: -1,
        categoria: '-1',
        porcentaje: 0,
        valor: 0,
    })
    const [vpOpen, setVPOpen] = useState(false)
    const [dataSourceVP, setDataSourceVP] = useState([])
    
    const setValue = (idx, value) => {

        setValues(v=>({...v,[idx]:value}))

    }


    const show_select = () => {
        switch (values.categoria){
            case "familia": return (<LoadSelect 
                fetchurl={get.lista_familia} 
                callback={(v)=>{
                    setValue("fkcategoria", v)
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

    const row_style = {padding:".5em"   }

  
    return (<>
    <h3>Editar Precios</h3>
    <h4><i>Editar Precios de SubGrupos</i></h4>

    
    <Row style={{...row_style,backgroundColor:"lightblue"}}>
        <Col  span={24}>
            <h5>Categor&iacute;a:&nbsp;</h5>
            <Select
                value={values.categoria}
                style={{width:200}}
                onChange={(val)=>{
                    setValue("categoria", val)
                }}
                options={[
                    {
                        label: "Seleccione...",
                        value: "-1"
                    },
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
        </Col>
    </Row>

    <Row style={row_style}>
        <Col  span={24}>
            <span className="text_1">Valor Categor&iacute;a:&nbsp;</span>{show_select()}
        </Col>
    </Row>

    <Row style={{...row_style,backgroundColor:"lightblue"}}>
        <Col span={24}>
                <Input 
                
                prefix={"Porcentaje a Aumentar:   "} 
                onChange={(e)=>{
                    setValue('porcentaje',e.target.value)
                    setValue('multiplicador', 1 + parseFloat(e.target.value) / 100)
                }} 
                type="number"
                value={values.porcentaje}
                />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col  span={24}>
                <Input 
                
                prefix={"Valor a Aumentar:   "} 
                onChange={(e)=>{
                    setValue('valor',e.target.value)
                }} 
                type="number"
                value={values.valor}
                />
        </Col>
    </Row>

    <Row style={row_style}>
        <Col  span={24}>
                <Button type="primary" block onClick={()=>
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


                    //alert(get.lista_codigos_categoria + `${idfamilia}/${idsubfamilia}/${idgrupo}/${idsubgrupo}/1`)
                    fetch(get.lista_codigos_categoria + `${idfamilia}/${idsubfamilia}/${idgrupo}/${idsubgrupo}/1`)///:idfamilia/:idsubfamilia/:idgrupo/:idsubgrupo/:modo_precio
                    .then(response=>response.json())
                    .then((response)=>{
                        setDataSourceVP(
                            response.data.map(
                                r=>(
                                    {
                                        codigo: r.codigo,
                                        precio_ant: r.precio_defecto,
                                        precio_n: (r.precio_defecto * values.multiplicador) + parseFloat(values.valor),
                                    }
                                )
                            )
                        )
                    })


                    /**
                     * load codes
                     */
                    setVPOpen(true)
                }}>Vista Previa </Button>
                <Modal width={"80%"} title={"Vista de Previa (lista de productos con modo de precio por subgrupo)"} open={vpOpen} onCancel={()=>{setVPOpen(false)}} footer={null}>
                    <Table 
                        dataSource={dataSourceVP}
                        columns={[
                            {dataIndex:"codigo", title:"Codigo"},
                            {dataIndex:"precio_ant", title:"Precio Ant."},
                            {dataIndex:"precio_n", title:`Precio Nuevo  + ${values.porcentaje}% | Valor: ${values.valor} ` },
                        ]}
                    />
                </Modal>
        </Col>
    </Row>
    <Row style={row_style}>
        <Col  span={24}>
                <Button danger block onClick={()=>{
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
                        }
                    )
                }}>Aplicar</Button>
        </Col>
    </Row>
        
    </>)
}

export default EditarPreciosForm;