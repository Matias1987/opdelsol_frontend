import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"
import { Col, Row, Select } from "antd"
import { useEffect, useState } from "react"

const SelectTag = (props) => {
    
    const [tags, setTags] = useState([])
    
    const load = () => {
        
        post_method(post.lista_tag,{fkcategoria:"-1"},(resp)=>{
            setTags(_=>resp.data.map(t=>({value:t.etiqueta, label:t.etiqueta})))
        })
    }

    useEffect(()=>{
        load()
    },[])

    return <>
            <Row>
                
                <Col span={24}>
                    
                    <Select 
                        prefix={<span style={{fontWeight:"bold"}}>Etiquetas: </span>}
                        style={{width:"100%"}}
                        mode="multiple" 
                        allowClear 
                        options={tags} 
                        onChange={(v)=>{
                           props?.callback?.(v)
                        }} 
                    /> 
                </Col>
            </Row>
    </>
}

export default SelectTag