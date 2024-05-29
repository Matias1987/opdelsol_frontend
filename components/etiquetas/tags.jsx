import { post_method } from "@/src/helpers/post_helper"
import { Row, Tag, Col, Select } from "antd"
import { useEffect, useState } from "react"

const Tags = (props) => {
    const [codigo_tags, setCodigoTags] = useState([])
    const [tags, setTags] = useState([])
    //const loadTags

    useEffect(()=>{load()},[])

    const load = () => {
        post_method("",{},(resp)=>{})
    }

    return <>
        <Row>
            <Col span={24}>
                {codigo_tags.map(t=><Tag>{t}</Tag>)}
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Select 
                    mode="multiple" 
                    allowClear 
                    options={tags} 
                    onChange={(v)=>{alert(JSON.stringify(v))}} 
                /> 
            </Col>
        </Row>
    </>
}

export default Tags