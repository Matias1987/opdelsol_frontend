import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"
import { SaveOutlined } from "@ant-design/icons"
import { Row, Col, Input, Button } from "antd"
import { useState } from "react"


const AddEditSetting = props => {
    const {settingName, settingValue,  callback} = props

    const [setting, setSetting] = useState({
        key: settingName||null,
        value: settingValue||null
    })

    const onSave = _=>{
        if(!setting.key)
        {
            return
        }

        if(!setting.value)
        {
            return
        }

        post_method(post.insert.settings, setting,response=>{
            callback?.()
        })
    }

    const onChange =  (key,value)=>{
        setSetting(stt=>({...stt,[key]:value}))
    }

    return <>
        <Row>
            <Col span={24}>
                <Input value={setting.key} onChange={e=>{onChange("key",e.target.value)}} prefix="Key: " />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Input value={setting.value} onChange={e=>{onChange("value",e.target.value)}} prefix="Valor: " />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button onClick={onSave} type="primary"><SaveOutlined /> Guardar</Button>
            </Col>
        </Row>
    </>

}

export default AddEditSetting