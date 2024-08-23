import { PlusCircleOutlined } from "@ant-design/icons"
import GrupoForm from "./GrupoForm"
import { useState } from "react"
import GrupoSelect from "../GrupoSelect"

import { Form, Input, Button, Modal, Row, Col, Checkbox } from "antd"
import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"

const SubGrupoFormV2 = (props) => {
    const [form] = Form.useForm();

    const [popup_open,setPopupOpen] = useState(false);

    const [reload, setReload] = useState(false) 

    
    const [subgrupo, setSubgrupo] = useState({
        grupo_idgrupo: null,
        multiplicador: 1,
        precio_defecto: 0,
        nombre_corto: "",
        nombre_largo: "",
        control_stock: 1,
    })

    const onFinish = () => {
        if(subgrupo.grupo_idgrupo==null)
        {
            alert("Grupo no seleccionado")
            return
        }
        if(subgrupo.grupo_idgrupo<1)
        {
            alert("Grupo no seleccionado")
            return
        }
        switch(props.action){
            case 'ADD': post_method(post.insert.subgrupo,subgrupo,(res)=>{
              if(res.status == "OK"){
                alert("Datos Guardados")
                props?.callback?.()
            }else{
                alert("Error: " + res.data)
            }});
              break;
            case 'EDIT': post_method(post.update.subgrupo,subgrupo,(res)=>{
              if(res.status == "OK"){alert("Cambios Guardados")}else{alert("Error.")}});
              break;
            }
      };
    


    const closePopup = () => {
        setPopupOpen(false);
        location.reload();
    }

    const onOkPopup = () => {
        setPopupOpen(false);
        //location.reload();
        setReload(!reload)
    }

    const agregarGrupoFormPopup = _=>
    (<>
        <Button type="primary"  size="small"  onClick={()=>{setPopupOpen(true)}}>
            <PlusCircleOutlined />&nbsp;Agregar Grupo
        </Button>
        <Modal
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{children:"CANCELAR"}}
            
            width={"80%"}
            title={"Agregar Grupo"}
            open={popup_open}
            onOk={closePopup}
            onCancel={closePopup}
            okText="CERRAR"
        >
            <GrupoForm action="ADD" callback={onOkPopup} />
        </Modal>
    </>)

    const _row_style = {padding:"1em"}
    const _input_style = {backgroundColor: "#78ACAC"}

    return (
    <>
         <Row style={_row_style}>
            <Col span={24}>
                Grupo:&nbsp;
                <GrupoSelect 
                key={reload}
                callback = {(id)=>{
                    setSubgrupo((sg)=>({...sg,grupo_idgrupo:id}))
                }} reload={reload} />
                {agregarGrupoFormPopup()}
            </Col>
         </Row>
         <Row style={_row_style}>
            <Col span={24}>
                <Input style={_input_style} prefix={"Nombre Corto"} value={subgrupo.nombre_corto} onChange={(e)=>{setSubgrupo((sg)=>({...sg,nombre_corto:e.target.value.toUpperCase()}))}}/>
            </Col>
         </Row>
         <Row style={_row_style}>
            <Col span={24}>
            <Input style={_input_style} prefix={"Nombre Largo"} value={subgrupo.nombre_largo} onChange={(e)=>{setSubgrupo((sg)=>({...sg,nombre_largo:e.target.value.toUpperCase()}))}}/>
            </Col>
         </Row>
         <Row style={_row_style}>
            <Col span={24}>
            <Input style={{..._input_style,width:'310px',textAlign:'right'}} prefix={"Multiplicador"} type="number" step={".1"} min="0" value={subgrupo.multiplicador} onChange={(e)=>{setSubgrupo((sg)=>({...sg,multiplicador:e.target.value}))}}/>
            </Col>
         </Row>
         <Row style={_row_style}>
            <Col span={24}>
            <Input prefix={"Precio por Defecto"} style={{..._input_style,width:'310px', textAlign:'right'}} type="number" step={".1"} value={subgrupo.precio_defecto} min="0" onChange={(e)=>{setSubgrupo((sg)=>({...sg,precio_defecto:e.target.value}))}}/>
            </Col>
         </Row>
         <Row style={_row_style}>
            <Col span={24}>
                <Checkbox checked={subgrupo.control_stock==0} onChange={(e)=>{
                    setSubgrupo((sg)=>({...sg,control_stock:e.target.checked ? 0 : 1}))
                }} > Laboratorio </Checkbox>
            </Col>
         </Row>
         <Row style={_row_style}>
            <Col span={24}>
                <Button onClick={onFinish} type="primary">Agregar Subgrupo</Button>
            </Col>
         </Row>
    </>
    )
}

export default SubGrupoFormV2;