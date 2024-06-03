import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row, Select } from "antd";
import { useEffect, useState } from "react" 

const CategoriaForm = (props) => {
    const [categorias, setCategorias] = useState([])
    const [categoria, setCategoria] = useState({
        nombre:"",
        fkparent:"-1",
    })

    const setValue = (idx, val) => {setCategoria(_cat=>({..._cat,[idx]:val}))}

    const guardar = _ => {
        post_method(post.insert.categoria_tag, categoria,(resp)=>{
            //alert("OK")
            props?.callback?.()
        })
    }

    const load = () => {
        fetch(post.lista_categoria_tag)
        .then(r=>r.json())
        .then((response)=>{
            setCategorias(
                [...[{value:"-1", label:"-"}],
                ...response.data.map(c=>({label:c.nombre, value:c.id}))]
            )
        })
    }


    useEffect(()=>{
       load()
    },[])

    return <>
        <Row>
            <Col span={24}>
            </Col>
            <Col span={24}>
                <Select options={categorias} onChange={(value)=>{setValue("fkparent",value)}} style={{width:"100%"}} />
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