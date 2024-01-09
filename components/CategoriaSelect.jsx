const { useState } = require("react")
const { default: FamiliaSelect } = require("./FamiliaSelect")
const { default: GrupoSelect } = require("./GrupoSelect")
const { default: SubFamiliaSelect } = require("./SubFamiliaSelect")
const { default: SubGroupSelect } = require("./SubGroupSelect")
const { Select, Col, Row } = require("antd")

const CategoriaSelect = (props) => {
    
    const [categoria, setCategoria] = useState(-1)

    const onidselected = (id) => {
        props.callback(categoria, id)
    }

    const _opt = _ => {
        switch(categoria)
        {
            case 'familia': return <FamiliaSelect callback={onidselected} />
            case 'subfamilia': return <SubFamiliaSelect callback={onidselected} />
            case 'grupo': return <GrupoSelect callback={onidselected} />
            case 'subgrupo': return <SubGroupSelect callback={onidselected} />
        }
    }

    return <div style={{padding:".75em", backgroundColor:"rgba(100,250,250,.3)"}}>
    <Row>
        <Col span={24} style={{padding:".7em"}}>
            <b>Selecci&oacute;n de Categor&iacute;a</b>
            
        </Col>
    </Row>
    <Row style={{padding:".7em"}}>
        <Col span={2}>
            Tipo de filtro:
        </Col>
        <Col span={20}>
            <Select 
            defaultValue={"Seleccione"}
            placeholder="Seleccione"
            style={{width:"200px"}}
            onChange={(v)=>{setCategoria(v)}}
            options={[
                {label:"Familia", value:"familia"},
                {label:"SubFamilia", value:"subfamilia"},
                {label:"Grupo", value:"grupo"},
                {label:"SubGrupo", value:"subgrupo"},
            ]} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            {_opt()}
        </Col>
    </Row>
    </div>
}

export default CategoriaSelect