import globals from "@/src/globals" 
import { post_method } from "@/src/helpers/post_helper"
import { get, post } from "@/src/urls"
import { Row, Col, Input, Button, Modal, Divider } from "antd"
import { useEffect, useState } from "react"

const SubGrupoFormV3 = (props) =>{
    const mostrarPrecioPar = typeof props.mostrarPrecioPar === 'undefined' ?  false : props.mostrarPrecioPar 
    const mostrarPrecioMayorista = typeof props.mostrarPrecioMayorista === 'undefined' ? false : props.mostrarPrecioMayorista
    const [precio, setPrecio] = useState(0)
    const [precioMayorista, setPrecioMayorista] = useState(0)
    const [comentarios, setComentarios] = useState("")
    const [nombreCorto, setNombreCorto] = useState("")
    const [nombreLargo, setNombreLargo] = useState("")

    useEffect(()=>{
        load()},[])

    const load = () => {
        fetch(get.obtener_detalle_subgrupo + props.idsubgrupo)
        .then(r=>r.json())
        .then((response)=>{
            
            setPrecio(response.data[0].precio_defecto)
            setPrecioMayorista(response.data[0].precio_defecto_mayorista)
            setComentarios(response.data[0].comentarios)
            setNombreCorto(response.data[0].nombre_corto)
            setNombreLargo(response.data[0].nombre_largo)
        })
        .catch(e=>{console.log("error")})
    }

    const actualizar = () => {
        post_method(post.update.subgrupo_2,
            {
                idsubgrupo: props.idsubgrupo,
                precio_defecto: precio,
                comentarios: comentarios,
                precio_defecto_mayorista: precioMayorista,
            },
            (resp)=>{
                alert("Ok")
                
                props?.callback?.()
                setOpen(false)
            })
    }


    return <>
            {/*<Row>
                <Col span={24}>
                    <Input readOnly prefix="Nombre Corto: " value={nombreCorto}/>
                </Col>
            </Row>*/}
            <Row>
                <Col span={24}>
                    <Input readOnly prefix="Nombre: " value={nombreLargo} style={{backgroundColor:"#E8EAF0"}}/>
                    
                </Col>
            </Row>
            <br />
            <Row>
                <Col span={24}>
                    <Input 
                    style={{backgroundColor:"#E8EAF0", }}
                    readOnly={(props.readOnly||"0")=="0" ? false : true} 
                    prefix="Precio (indvidual):  $" 
                    type="number" 
                    value={precio} 
                    onChange={(e)=>{
                        setPrecio(p=>parseFloat(e.target.value))
                    }} />
                </Col>
            </Row>
            {  !mostrarPrecioPar ? <></> :
                <Row>
                    <Col span={24}>
                        <Input  style={{  color:"red", backgroundColor:"lightgoldenrodyellow"}} readOnly value={+precio * 2} prefix="Precio Par: $" />
                    </Col>
                </Row>
            }
            <br />
            {
                !mostrarPrecioMayorista ? <></> : 
                <>
                    <Row>
                        <Col span={24}>
                            <Input style={{backgroundColor:"#E8EAF0"}} readOnly={props.readOnly} prefix="Precio Mayorista: $ " value={ parseFloat(precioMayorista) } type="number" onChange={(e)=>{setPrecioMayorista(e.target.value)}} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Input style={{backgroundColor:"#E8EAF0"}} readOnly prefix="Par: $ " value={parseFloat(precioMayorista * 2).toLocaleString(2)} />
                        </Col>
                    </Row>
                </>
            }
            <Row>
                <Col span={24}>
                    Comentarios:
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Input.TextArea style={{fontWeight:props.readOnly ? "bold" : "inherit"}} readOnly={(props.readOnly||"0")=="0" ? false : true} prefix="Comentarios" rows={4} value={comentarios} onChange={(e)=>{setComentarios(e.target.value)}} />
                </Col>
            </Row>
            { (props.readOnly||"0")=="0" ? 
                <Row style={{padding:"1em"}}>
                    <Col span={24}>
                        <Button type="primary" block onClick={actualizar}>Aplicar</Button>
                    </Col>
                </Row>
                : <></>
            }
           
        </>
}

export default SubGrupoFormV3;