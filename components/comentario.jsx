import globals from "@/src/globals";

const { Row, Col, Button, Input, Divider } = require("antd")
const { TextArea } = Input;
const { useState, useEffect } = require("react")

const Comentario = (props) =>{
    const [comentario, setComentario] = useState({})

    useEffect(()=>{
        setComentario({
            idusuario: globals.obtenerUID(),
            tipo: props.tipo,
            comentario: "",
            idsucursal: globals.obtenerSucursal()
        })
    })

    const onChange = (idx, val) => {
        setComentario(c=>{
            const _c = {...c,[idx]:val}
            props?.callback?.(_c)
            return _c
        })
    }

    const _row_style = {
        padding: ".5em",
    }

    return <>
        <Row style={_row_style}>
            <Col span={24}>
                <h3>Comentario</h3>
            </Col>
        </Row>
        
        <Row style={_row_style}>
            <Col span={24}>
                <TextArea rows={4} placeholder="Max Length is 6" maxLength={6} value={comentario.comentario} onChange={(e)=>{onChange("comentario",e.target.value)}} />
            </Col>
        </Row>
        
    </>
}

export default Comentario;