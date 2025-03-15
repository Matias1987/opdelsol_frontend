import  { Row, Col, Input, Radio, Button, Select } from "antd";
import { useEffect, useState } from "react";


const PopupStockFormV3 = (props) => {
    //#region variables

    const [tagsToAdd, setTagsToAdd] = useState([])
    const [tags, setTags] = useState([])
    const [pattern, setPattern] = useState(0)
    const [part1, setPart1] = useState("")
    const [part2, setPart2] = useState("")
    const [part3, setPart3] = useState("")

    const pattern1 = /^([A-Z_\.0-9\s]+)\[([\-0-9\.]+)\s([\-0-9\.]+)\s([\-0-9\.]+)\]([A-Z_\.0-9\s]+)$/gm

    const pattern2 = /^([A-Z_\.0-9\s]+)\[([\-0-9\.]+)\s([\-0-9\.]+)\s([\-0-9\.]+)\]([A-Z_\.0-9\s]+)\[([\-0-9\.]+)\s([\-0-9\.]+)\s([\-0-9\.]+)\]([A-Z_\.0-9\s]+)$/gm

    

    const rows_style = {
        padding:"4px",
    }
    const [stock, setStock] = useState({
        codigo:"",
        descripcion:"",
        cantidad:0,
        costo:0,
        modoPrecio:1,
    })

    //#endregion
    
    //#region functions
    const onSave = _=>{}

    const load = () => {}

    const loadTags = _ => {
        post_method(post.lista_tag,{fkcategoria:"-1"},(resp)=>{
            setTags(_=>resp.data.map(t=>({value:t.etiqueta, label:t.etiqueta})))
        })
    }

    useEffect(()=>{load()},[])
    
    const setValue = (idx, value) => {
        setStock(_s=>({..._s,[idx]:value}))
    }

    const input_row = (label, idx, type='text') => 
        <Row style={rows_style}>
            <Col span={24} xs={{  flex: '100%',  }}  sm={{  flex: '100%',  }}  md={{  flex: '50%',  }}  lg={{  flex: '50%',  }}  xl={{  flex: '20%',  }}>
                    <Input prefix={label} value={stock[idx]} allowClear type={type} onChange={(e)=>{setValue(idx,e.target.value)}} />        
            </Col>
        </Row>
    

    const row = (content) => <Row style={rows_style}>
        <Col span={24} xs={{  flex: '100%',  }}  sm={{  flex: '100%',  }}  md={{  flex: '50%',  }}  lg={{  flex: '50%',  }}  xl={{  flex: '20%',  }}>
                {content}
            </Col>
            </Row>
    

    const onCodigoChange = (e) => {
        const str = e.target.value;
    
        if(str.length<8){
            setPattern(0)
            return
        }
    
        if(pattern1.exec(str)!=null){
            setPattern(1)
        }
        else{
            if(pattern2.exec(str)!=null){
                setPattern(2)
            }
            else{
                setPattern(0)
            }
        }
    
    }

    const descripcion_input = () => {
        switch(pattern){
            case 0: return <>
                <Input value={part1} onChange={(e)=>{setPart1(e.target.value)}}/>
            </>
            case 1: return <><Space>
            <Space.Compact size="large">
                <Input addonAfter={"[...]"} placeholder="large size" value={part1} onChange={(e)=>{setPart1(e.target.value)}}/>
                <Input value={part2} onChange={(e)=>{setPart2(e.target.value)}}/>
            </Space.Compact>
        </Space></>
            case 2: return <>
            <Space>
                <Space.Compact size="large">
                    <Input addonAfter={"[...]"} placeholder="large size" value={part1} onChange={(e)=>{setPart1(e.target.value)}}/>
                    <Input addonAfter={"[...]"} placeholder="another input" value={part3} onChange={(e)=>{setPart3(e.target.value)}}/>
                    <Input value={part2} onChange={(e)=>{setPart2(e.target.value)}}/>
                </Space.Compact>
            </Space>
            </>
        }
    }
    //#endregion
    
    return <>
        <Row>
            <Col span={24}>
                {input_row(<>C&oacute;digo</>,'codigo')}
                {input_row(<>Descripci&oacute;n</>,'descripcion')}
                {input_row(<>Cantidad</>,'Cantidad', 'number')}
                {input_row(<>Costo</>,'Costo', 'costo')}
            </Col>
        </Row>
        {
            row(
                <>
                <b>Modo de Precio</b>&nbsp;
                <Radio.Group value={stock.modoPrecio}>
                    <Radio value={1}></Radio>
                    <Radio value={2}></Radio>
                </Radio.Group>
                </>
            )
        }
        {
            row(
                <>
                    <b>Etiquetas</b>&nbsp;
                    <Select 
                    style={{width:"100%"}}
                    mode="multiple" 
                    allowClear 
                    options={tags} 
                    onChange={(v)=>{
                    setTagsToAdd(v)
                    }} 
                    />
                </> 
            )
        }
        {
            row(
                <Button onClick={onSave} type="primary" block size="small">Guardar</Button>
            )
        }
        
    </>
}

export default PopupStockFormV3;