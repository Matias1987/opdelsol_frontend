import { post_method } from "@/src/helpers/post_helper"
import { get, post } from "@/src/urls"
import { EditFilled } from "@ant-design/icons"
import { Button, Col, Input, Modal, Row } from "antd"
import { useState } from "react"
/**
 * 
 * @param idcargamanual
 */
const EditarCargaManualPopup = (props) => {
    const [open, setOpen] = useState(false)
    const [cargaManual ,setCargaManual] = useState({
        monto:0,
        id:-1
    })
    const load=()=>{
        fetch(get.carga_manual + props.idcargamanual)
        .then(r=>r.json())
        .then((response)=>{
            const resp = (response?.data)||null
            if(resp==null)
            {
                alert("Error null response")
                return
            }

            setCargaManual({
                monto:resp[0].monto,
                id:resp[0].idcarga_manual
            })
        })
    }
    const guardarCambios = () => {
        post_method(post.update.modificar_carga_manual,cargaManual,(response)=>{
            alert("OK")
            props?.callback?.()
            setOpen(false)

        })
    }
    return <>
        <Button onClick={()=>{setOpen(true), load()}} size="small"><EditFilled /></Button>
        <Modal open={open} onCancel={()=>{setOpen(false)}} onOk={guardarCambios}>
            <Row>
                <Col span={24}>
                    Editar Monto
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Input prefix="Monto" value={cargaManual.monto} onChange={(e)=>{setCargaManual(c=>({...c,monto: parseFloat((e.target.value||0))}))}} style={{backgroundColor:"rgba(49,140,231,.3)"}} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                </Col>
            </Row>
        </Modal>
    </>

}

export default EditarCargaManualPopup