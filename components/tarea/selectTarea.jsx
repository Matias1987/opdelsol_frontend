import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"
import { Col, Modal, Row, Select } from "antd"

import { useEffect, useState } from "react"
import AddTarea from "./addTarea"

const SelectTarea =(props) => {
    const {callback, title} = props
    const [tareas, setTareas] = useState([])
    const [open, setOpen] = useState(false)
    const [reload, setReload] = useState(false)
    const [selection, setSelection] = useState("-1")
    useEffect(()=>{
        post_method(post.tarea_g,{nombre:"Control"},(resp)=>{
            
            //
            const _rr = [...resp.data.map(t=>({label: t.desc, value: t.idtarea})), ...[{label: "AGREGAR", value:"-2"}]];
            //alert(JSON.stringify(_rr))
            setTareas(_rr)

        })
    },[reload])

    const onChange = (v) => {
        if(+v<-1){
            setOpen(true)
            return
        }

        callback?.(v)
        setSelection(v)
    }
    return <>
        <Row>
            <Col span={24}>
                {title||""}
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Select value={selection} style={{width:"300px"}} onChange={onChange} options={tareas} />
            </Col>
        </Row>
        <Modal open={open} onCancel={()=>{setOpen(false)}} footer={null} title="Nueva Tarea" width={"500px"} destroyOnClose>
           <AddTarea callback={()=>{setReload(!reload); setOpen(false)}} />
        </Modal>
    </>
}

export default SelectTarea