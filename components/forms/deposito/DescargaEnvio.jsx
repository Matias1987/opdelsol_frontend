import InformeEnvio from "@/components/informes/InformeEnvio"
import globals from "@/src/globals"
import { registrar_evento } from "@/src/helpers/evento_helper"
import { post_method } from "@/src/helpers/post_helper"
import { Button, Card, Col, Divider, Row } from "antd"
import SelectEnvio from "./SelectEnvio"
import { useState } from "react"
import { post } from "@/src/urls"




const DescargarEnvio = (props) => {
    const [idEnvio, setIdEnvio] = useState(-1)
    const importar_envio = () => {
        setIdEnvio(-1)

        post_method(post.cargar_envio,{idenvio: idEnvio,idsucursal: globals.obtenerSucursal()},(resp)=>{
            alert("OK")
            registrar_evento("DESCARGA_ENVIO", "Descarga Envio", idEnvio)
        })
    }
    return (
    <>
    <Card
        size="small"
        title="Descargar Envío"
        headStyle={{backgroundColor:"#F07427", color:"white"}}
        >
    { <Row>
            <Col>
                <SelectEnvio callback={(idenvio)=>{
                    setIdEnvio(idenvio)
                }} />
            </Col>
        </Row>}
        <Row style={{overflowY:"scroll", height:"300px"}}>
            <Col span={24}>
                <h5>Detalles:</h5>
                
        {
            idEnvio<1? <span className="text_1" style={{color:"blue"}}><i>Seleccione Env&iacute;o...</i></span> : <InformeEnvio idenvio={idEnvio} key={idEnvio}/>
        }
            </Col>
        </Row>
        {<Row>
            <Col span={24}>
                <Divider />
                <Button disabled={idEnvio<0} type="dashed" danger onClick={importar_envio}>Importar Env&iacute;o</Button>
                <Button disabled={idEnvio<0} type="dashed" danger onClick={()=>{setIdEnvio(-1)}}>Cancelar</Button>
            </Col>
        </Row>}
    </Card>
    </>
    )
}

export default DescargarEnvio;