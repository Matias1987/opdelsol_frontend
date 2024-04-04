import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"

const { default: SubGroupSelect } = require("@/components/SubGroupSelect")
const { Row, Col, Checkbox, Modal, Button, Input, Radio } = require("antd")
const { useState, useEffect } = require("react")

const EditarCodigoGrupo = (props) => {
    const [open, setOpen] = useState(false)
    const [codigos, setCodigos] = useState([])
    const [editarSubgrupo, setEditarSubgrupo] = useState(false)
    const [editarModoPrecio, setEditarModoPrecio] = useState(false)
    const [modoPrecio, setModoPrecio] = useState(0)
    const [idsubgrupo, setIdSubgrupo] = useState(-1)
    
    const onOpen = _ => {
        setEditarModoPrecio(false)
        setEditarSubgrupo(false)
        setOpen(true)
    }

    const onSave = _ => {
        
        const params = {
            idsubgrupo: editarSubgrupo ? idsubgrupo : -1,
            modoPrecio: !editarModoPrecio ? -1 : modoPrecio,
            idcodigos: (props.codigos||[]).map(c=>c.idcodigo)
        }

        alert(JSON.stringify(params))

        if(!confirm("Confirmar cambios")){
            return
        }

        post_method(post.update.editar_lote_codigos, params, (response)=>{
            alert("OK")
            props?.callback?.()
        })
    }

    return <>
    <Button danger type="primary" onClick={()=>{onOpen()}}>Editar Lote</Button>
    <Modal width={"80%"} open={open} onCancel={()=>{setOpen(false)}} footer={null} title="Editar Codigos Lote" destroyOnClose>
        
        
        <Row>
            <Col span={24}>
                <Input.TextArea value={((props.codigos||[]).map(c=>c.codigo)).toString()} readOnly></Input.TextArea>
            </Col>
        </Row>
        
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Row>
                    <Col span={12}>
                        <Checkbox onChange={()=>{setEditarSubgrupo(!editarSubgrupo)}} value={editarSubgrupo}>Cambiar Subgrupo</Checkbox>
                    </Col>
                    <Col span={12}>
                        <SubGroupSelect callback={(id)=>{setIdSubgrupo(id)}} disabled={!editarSubgrupo} />
                    </Col>
                </Row> 
            </Col>
        </Row>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Row >
                    <Col span={12}>
                        <Checkbox onChange={()=>{setEditarModoPrecio(!editarModoPrecio)}} value={editarModoPrecio}>Cambiar Modo Precio</Checkbox>
                    </Col>
                    <Col span={12}>
                        <Radio.Group 
                                disabled={!editarModoPrecio}
                                value={modoPrecio}
                                onChange={(e)=>{
                                    setModoPrecio(v=>{
                                            switch(e.target.value)
                                            {
                                                case 0: 
                                                
                                                break; 
                                                case 1: 
                                               
                                                break;
                                            }
                                            return e.target.value})
                                        
                                    }}>
                                   
                            <Radio value={1}>Precio Subgrupo</Radio>
                            <Radio value={2}>Precio Individual</Radio>
                        </Radio.Group>
                    </Col>
                </Row> 
                
            </Col>
        </Row>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Button type="primary" block onClick={onSave}>Aplicar</Button>
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
    </Modal>
    </>
}

export default EditarCodigoGrupo