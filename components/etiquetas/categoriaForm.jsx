import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row, Select } from "antd";
import { useState } from "react" 

const CategoriaForm = (props) => {
    const [categoria, setCategoria] = useState({
        nombre:"",
        fkparent:"-1",
    })

    const setValue = (idx, val) => {setCategoria(_cat=>({..._cat,[idx]:val}))}

    const guardar = _ => {
        post_method(post.insert.categoria_tag, categoria,(resp)=>{
            alert("OK")
        })
    }

    return <>
        <Row>
            <Col span={24}>
            </Col>
            <Col span={24}>
                <Select onChange={(value)=>{setValue("fkparent",value)}} />
            </Col>
            <Col span={24}>
                <Input prefix={<>Nombre Categor&iacute;a: </>} onChange={(e)=>{setValue("nombre",e.target.value)}} />
            </Col>
            <Col span={24}>
                <Button onClick={guardar}>Guardar</Button>
            </Col>
            <Col span={24}>
            </Col>
        </Row>
    </>
}

export default CategoriaForm;