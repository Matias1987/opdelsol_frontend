import InformeEnvio from "@/components/informes/InformeEnvio"
import globals from "@/src/globals"
import { post_method } from "@/src/helpers/post_helper"
import { Button, Col, Divider, Row, Table } from "antd"

const { get, post } = require("@/src/urls")
const { useState } = require("react")
const { default: SelectEnvioPopup } = require("./SelectEnvio")

const DescargarEnvio = (props) => {
    const [idEnvio, setIdEnvio] = useState(-1)
    const importar_envio = () => {
        setIdEnvio(-1)

        post_method(post.cargar_envio,{idenvio: idEnvio,idsucursal: globals.obtenerSucursal()},(resp)=>{
            alert("OK")
        })
    }
    return (
    <>
    <Row>
        <Col>
            <SelectEnvioPopup callback={(idenvio)=>{
                //alert(idenvio)
                setIdEnvio(idenvio)
            }} />
        </Col>
    </Row>
    <Row style={{overflowY:"scroll", height:"300px"}}>
        <Col span={24}>
            <h5>Detalles:</h5>
            
    {
        idEnvio<1? <span className="text_1">Seleccione Env&iacute;o</span> : <InformeEnvio idenvio={idEnvio} key={idEnvio}/>
    }
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Divider />
            <Button disabled={idEnvio<0} type="dashed" danger onClick={importar_envio}>Importar Env&iacute;o</Button>
            <Button disabled={idEnvio<0} type="dashed" danger onClick={()=>{setIdEnvio(-1)}}>Cancelar</Button>
        </Col>
    </Row>
    </>
    )
}

export default DescargarEnvio;