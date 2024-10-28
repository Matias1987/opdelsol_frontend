import { post_method } from "@/src/helpers/post_helper"
import {Col, Row} from "antd"
import { useState } from "react"

const EdicionCristales = (props) => {
    const {idventa} = props
    const [rows, setRows] = useState([])



    const load = () => {
        post_method("", {idventa:idventa}, (resp)=>{

            if(null == resp?.rows||null)
            {
                alert("Error")
                return
            }
            


        })
    }

    return <>
        <Row>
            <Col span={24}>
            
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            
            </Col>
        </Row>
    </>
}

export default EdicionCristales