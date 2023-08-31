import { get } from "@/src/urls"

const { default: GrupoSelect } = require("@/components/GrupoSelect")
const { default: LoadSelect } = require("@/components/LoadSelect")
const { default: SubFamiliaSelect } = require("@/components/SubFamiliaSelect")
const { default: SubGroupSelect } = require("@/components/SubGroupSelect")
const { Row, Col, Select, Input, Button } = require("antd")
const { useState } = require("react")

const EditarPreciosForm = (props) => {
    const [values, setValues] = useState({
        multiplicador: 1,
        fkcategoria: -1,
        categoria: '-1',
        porcentaje: 0,
    })

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

    const row_style = {padding:"1em"}

    const col_style = {}


    return (<>
    <h3>Editar Precios</h3>
    <p style={{fontSize:".9em"}}><i>Si el precio del producto es por subgrupo, se modificar&aacute; el precio en el subgrupo,
        si el precio del producto es Individual, se modificara el precio en el c&oacute;digo</i></p>
    <Row style={row_style}>
        <Col style={col_style} span={24}>
            Categor&iacute;a:&nbsp;
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
        <Col style={col_style} span={24}>
            Valor Categor&iacute;a:&nbsp;{show_select()}
        </Col>
    </Row>

    <Row style={row_style}>
        <Col style={col_style} span={24}>
                <Input 
                style={{backgroundColor:"lightblue"}}
                prefix={"Porcentaje a incrementar"} 
                onChange={(e)=>{setValue('porcentaje',e.target.value)}} 
                type="number"
                value={values.porcentaje}
                />
        </Col>
    </Row>

    <Row style={row_style}>
        <Col style={col_style} span={24}>
                <Button type="primary" block onClick={()=>{}}>Vista Previa</Button>
        </Col>
    </Row>
    <Row style={row_style}>
        <Col style={col_style} span={24}>
                <Button danger block onClick={()=>{}}>Aplicar</Button>
        </Col>
    </Row>
        
    </>)
}

export default EditarPreciosForm;