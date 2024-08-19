import CodesTree from "@/components/CodesTree";
import CodeGrid from "@/components/etc/CodeGrid";
import EditarCodigoGrupo from "@/components/forms/deposito/EditarCodigoGrupo";
import EditarPreciosSubgruposForm from "@/components/forms/deposito/EditarPreciosSubgruposForm";
import EditarSubGrupo from"@/components/forms/deposito/EditarSubgrupo";
import EditarCodigo from "@/pages/v1/deposito/stock/editar_codigo";
import { EditFilled, GroupOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row } from "antd";

import { useState } from "react";

const EditarCodesTree = (props) => {

    const [seleccion, setSeleccion] = useState({tipo:"-1", id:0})
    const [open, setOpen] = useState(false)
    const [popupEditarPreciosOpen, setEditarPopupPreciosOpen] = useState(false)
    const [reload, setReload] = useState(false)
    const [selectedCodes, setSelectedCodes] = useState([])
    
    const _subgrupo_options =_=> <>
    <EditarCodigoGrupo 
            codigos={ selectedCodes.map(c=>({idcodigo: c.idcodigo, codigo: c.codigo}))}  
            callback={()=>{setReload(!reload)}}
            />
    </>
  
    
    return <>
    <Row>
        <Col span={24}>
        <Button onClick={()=>{setEditarPopupPreciosOpen(true)}}>Editar Precios</Button>
            {seleccion.tipo=="subgrupo" ? _subgrupo_options() : <></>}
           
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <CodesTree callback={(tipo,id)=>{setSeleccion(_=>({tipo:tipo, id:id}))}} key={reload} onCodeSelect={(codes)=>{setSelectedCodes(codes);}} />
        </Col>
    </Row>
    
    <Modal open={open} onCancel={()=>{setOpen(false)}} footer={null} title="Editar Código" width={"100%"} destroyOnClose key={seleccion.id}>
        <EditarCodigo idcodigo={seleccion.id} />
    </Modal>
    <Modal 
        width={"60%"} 
        title={<i style={{color:"#555555", fontSize:".9em"}} >Editar Precios Tipo:&nbsp;<b>{seleccion.tipo.toUpperCase()}</b>&nbsp;&nbsp;&nbsp;ID:&nbsp;<b>{seleccion.id}</b></i>   } 
        open={popupEditarPreciosOpen} 
        onCancel={()=>{setEditarPopupPreciosOpen(false)}} 
        footer={null} 
        destroyOnClose
    >
        <Row>
            <Col span={24}>
                <Row>
                    <Col span={24}>
                        <span style={{fontSize:".8em"}}>Modifica C&oacute;digos cuyos precios son por SUBGRUPO</span>
                    </Col>
                </Row>
                <br />
                <EditarPreciosSubgruposForm fkcategoria={seleccion.id} categoria={seleccion.tipo} />
            </Col>
        </Row>
    </Modal>
    </>
}

export default EditarCodesTree;