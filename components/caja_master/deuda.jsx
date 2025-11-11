import { Card, Modal } from "antd"
import { useEffect, useState } from "react"
import Egreso from "./egreso"

const DeutaDetalle = props =>{
    const {iddeuda, callback} = props
    const [reload, setReload] = useState(false)
    const [modalAddEgresoOpen, setModalAddEgresoOpen] = useState(false)
    const load = () =>{

    }

    useEffect(()=>{
        load()
    },[reload])



    return <>
    <Card>

    </Card>
    <Modal
    open={modalAddEgresoOpen}
    destroyOnClose
    width={"900px"}
    title="Agregar Egreso"
    onCancel={_=>{setModalAddEgresoOpen(false)}}
    >
        <Egreso iddeuda={iddeuda} />
    </Modal>
    </>
}

export default DeutaDetalle;