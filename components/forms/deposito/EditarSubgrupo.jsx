import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"
import { Row, Col, Input, Button, Modal } from "antd"
import { useState } from "react"

const EditarSubgrupo = (props) => {
    const [open, setOpen] = useState(false)
    const [precio, setPrecio] = useState(0)
    const actualizar = () => {

        post_method(post.update.subgrupo_2,
            {
                idsubgrupo: props.idsubgrupo,
                precio_defecto: precio
            },
            (resp)=>{
                alert("Ok")
                
                props?.callback?.()
                setOpen(false)
            })
    }
    return <>
        <Button danger size="small" onClick={()=>{setOpen(true); setPrecio(0); }  }>{props.buttonText}</Button>
        <Modal destroyOnClose footer={null} title={`Editar Subgrupo ${props.buttonText}`} open={open} onCancel={()=>{setOpen(false)}}>
            <Row>
                <Col span={24}>
                    
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Input prefix="Precio Defecto" type="number" value={precio} onChange={(e)=>{
                        setPrecio(p=>parseFloat(e.target.value))
                    }} />
                </Col>
            </Row>
            <Row style={{padding:"1em"}}>
                <Col span={24}>
                    <Button type="primary" block onClick={actualizar}>Aplicar</Button>
                </Col>
            </Row>
        </Modal>
    </>
}

export default EditarSubgrupo