import { CloseCircleFilled } from "@ant-design/icons"

const { useState } = require("react")
const { default: FamiliaSelect } = require("./FamiliaSelect")
const { default: GrupoSelect } = require("./GrupoSelect")
const { default: SubFamiliaSelect } = require("./SubFamiliaSelect")
const { default: SubGroupSelect } = require("./SubGroupSelect")
const { Select, Col, Row, Button } = require("antd")

const CategoriaSelect = (props) => {
    
    const [categoria, setCategoria] = useState('-1')
    const [enabled, setEnabled] = useState(true)
    const disabled_style = {pointerEvents:"none", opacity:".7"}
    const enabled_style = {pointerEvents:"auto", opacity:"1"}

    const onidselected = (id) => {
        if(+id<0)
        {
            return 
        }
        setEnabled(false)
        props?.callback?.(categoria, id)
    }

   

    const _opt = _ => {
        switch(categoria)
        {
            case '-1': return <></>
            case 'familia': return <FamiliaSelect callback={onidselected} />
            case 'subfamilia': return <SubFamiliaSelect callback={onidselected} />
            case 'grupo': return <GrupoSelect callback={onidselected} />
            case 'subgrupo': return <SubGroupSelect callback={onidselected} />
        }
    }

    return <div style={{padding:".2em", backgroundColor:"rgba(100,250,250,.3)"}}> 
                <Row style={{padding:".7em"}}>
                    <Col span={4} style={{textAlign:"left", paddingTop:".3em"}}>
                        Categor&iacute;a:&nbsp;&nbsp;
                    </Col>
                    <Col span={20}>
                        <div  style={!enabled?disabled_style:enabled_style}>
                        <Select 
                        value={categoria}
                        defaultValue={"Seleccione"}
                        placeholder="Seleccione"
                        style={{width:"100%"}}
                        onChange={(v)=>{
                            setCategoria(v)
                            if(v=='-1'){
                                onidselected('-1')
                            }
                        }}
                        options={[
                            {label:"---", value:"-1"},
                            {label:"Familia", value:"familia"},
                            {label:"SubFamilia", value:"subfamilia"},
                            {label:"Grupo", value:"grupo"},
                            {label:"SubGrupo", value:"subgrupo"},
                        ]} />
                        </div>
                    </Col>
                    </Row>
                <Row style={{padding:"1em"}}>
                    <Col span={24}>
                        <div style={!enabled?disabled_style:enabled_style}>
                            {_opt()}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={1}>
                        <Button 
                        size="small" 
                        type="ghost"
                        style={{color:"red", textAlign:"center"}} 
                        block
                        onClick={()=>{
                            setEnabled(true)
                            setCategoria("-1")
                            props?.callback?.("-1","-1")
                            }}
                        >
                                <CloseCircleFilled />Limpiar
                        </Button>
                    </Col>
                </Row>
            </div>
}

export default CategoriaSelect