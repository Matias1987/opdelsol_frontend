const { Row, Input } = require("antd")
const { useState } = require("react")

const ModoPagoV2 = (props) => {
    const [mp, setMP] = useState([])
    const [tarjetas, setTarjetas] = useState([])
    const _mp_efectivo = <><Input type="number" /></>
    const _mp_tarjeta = <><Input type="number" /></>
    const _mp_cheque = <><Input type="number" /></>
    const _mp_mutual = <><Input type="number" /></>
    const _mp_ctacte = <><Input type="number" /></>
    const _mp_transferencia = <><Input type="number" /></>
    return mp.map((r)=>(<>
            <Row>

            </Row>
            </>))
}