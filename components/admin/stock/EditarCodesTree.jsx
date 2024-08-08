import CodesTree from "@/components/CodesTree";
import CodeGrid from "@/components/etc/CodeGrid";
import EditarSubGrupo from"@/components/forms/deposito/EditarSubgrupo";
import EditarCodigo from "@/pages/v1/deposito/stock/editar_codigo";
import { EditFilled, GroupOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row } from "antd";

import { useState } from "react";

const EditarCodesTree = (props) => {

    const [seleccion, setSeleccion] = useState({tipo:"-1", id:0})
    const [open, setOpen] = useState(false)
    const [reload, setReload] = useState(false)
    
    const _subgrupo_options =_=> <>
    <Row>
        <Col span={6}><EditarSubGrupo readOnly={false} callback={()=>{setReload(!reload)}} idsubgrupo={seleccion.id} buttonText={<><EditFilled />&nbsp;&nbsp;Editar Subgrupo&nbsp;</> } title={seleccion.id} /></Col>
    </Row>
    </>
    const _codigo_options =_=> <Row>
        <Col span={6}><Button onClick={()=>{setOpen(true)}}><GroupOutlined /></Button></Col>
    </Row>
    
    return <>
    <Row>
        <Col span={24}>
            {seleccion.tipo=="subgrupo" ? _subgrupo_options() : <></>}
            {seleccion.tipo=="codigo" ? _codigo_options() : <></>}
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <CodesTree callback={(tipo,id)=>{setSeleccion(_=>({tipo:tipo, id:id}))}} key={reload} />
        </Col>
    </Row>
    <Modal open={open} onCancel={()=>{setOpen(false)}} footer={null} title="Editar Código" width={"100%"} destroyOnClose key={seleccion.id}>
        <EditarCodigo idcodigo={seleccion.id} />
    </Modal>
    </>
}

export default EditarCodesTree;