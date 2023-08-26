import { post_method } from "@/src/helpers/post_helper"

const { default: SucursalSelect } = require("@/components/SucursalSelect")
const { default: globals } = require("@/src/globals")
const { Row, Col, Button, Input } = require("antd")
const { useState } = require("react")

const TransferenciaSucursalForm = (props) => {
    const [transferencia, setTransferencia] = useState({
        origen: globals.obtenerSucursal(),
        destino: null,
        monto: 0,
        comentarios: null,
    })

    onSubmit = () => {
        post_method("", transferencia,(response)=>{
            alert(JSON.stringify(response))
        })
    }

    return (<>
    <h3>Transferencia a Sucursal</h3>
    <Row>
        <Col>
            Sucursal:
        </Col>
        <Col>
            <SucursalSelect callback={(ids)=>{
                setTransferencia(t=>({...t,destino:ids}))
            }} />
        </Col>
    </Row>
    <Row>
        <Col>
            Monto:
        </Col>
        <Col>
            <Input value={transferencia.monto} onChange={(e)=>{setTransferencia(t=>({...t,monto:e.target.value}))}}/>
        </Col>
    </Row>
    <Row>
        <Col>
            Comentarios:
        </Col>
        <Col>
            <Input value={transferencia.comentarios} onChange={(e)=>{setTransferencia(t=>({...t,comentarios:e.target.value}))}} />
        </Col>
    </Row>
    <Row>
        <Col>
            <Button block onClick={onSubmit}>Aceptar</Button>
        </Col>
    </Row>
    </>)
}

export default TransferenciaSucursalForm