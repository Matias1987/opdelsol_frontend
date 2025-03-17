import { CloseCircleFilled, CloseOutlined } from "@ant-design/icons"
import { Button, Col, Row, Select } from "antd"
import { useState } from "react"
import FamiliaSelect from "./FamiliaSelect"
import SubFamiliaSelect from "./SubFamiliaSelect"
import GrupoSelect from "./GrupoSelect"
import SubGroupSelect from "./SubGroupSelect"


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

    return <div> 
                
                <Row style={{padding:"4px"}}>
                    <Col span={24}>
                        <div  style={!enabled?disabled_style:enabled_style}>
                        <Select 
                        prefix={<span style={{fontWeight:"bold", color:"#0C5AA9"}}>Categor&iacute;a: </span>}
                        size="small"
                        
                        value={categoria}
                        defaultValue={"Seleccione..."}
                        placeholder="Seleccione"
                        style={{width:"100%", overflow:"hidden"}}
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
                <Row style={{padding:"4px"}}>
                    <Col span={23}>
                        <div style={!enabled?disabled_style:enabled_style}>
                            {_opt()}
                        </div>
                    </Col>
                    <Col span={1}>
                        {categoria=="-1" ? <></> : <Button 
                        disabled = {categoria=="-1"}
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
                                <CloseOutlined />
                        </Button>}
                    </Col>
                </Row>
                <Row>
                    
                </Row>
            </div>
}

export default CategoriaSelect