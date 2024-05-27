
import { Button, Col, Modal, Row, Table } from "antd"
import { useEffect, useState } from "react"
import AnotacionForm from "./anotacion_form"
import { get, post } from "@/src/urls"
import { PlusOutlined } from "@ant-design/icons"
import { post_method } from "@/src/helpers/post_helper"

/**
 * @param tipo
 * @param refid
 */
const Anotaciones = (props) => {
    const [popupAddOpen, setPopupAddOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [anotaciones, setAnotaciones] = useState([])
    
    const columns = [
        {dataIndex: 'fecha_f' ,title:<span style={{fontSize:".65em", fontWeight:"bold", color:"#000680"}}>Fecha</span>},
        {dataIndex: 'usuario',title:<span style={{fontSize:".65em", fontWeight:"bold", color:"#000680"}}>Autor</span>},
        {dataIndex: 'nota',title:<span style={{fontSize:".65em", fontWeight:"bold", color:"#000680"}}>Mensaje</span>},
    ]

    useEffect(()=>{load()},[update])

    const onPopupOpen =() => {}
    const onPopupCancel = () => {setPopupAddOpen(false)}

    const load = _ => {
        post_method(post.lista_anotaciones,{idref: props.idref||"-1", tipo:props.tipo||"-1"},
        (response)=>{
            //alert(JSON.stringify(response))
            setAnotaciones(response.data)
        }
        )
    }

    return <div style={{border:"1px solid #6E7F80"}}>

       <div style={{marginTop:"-12px", backgroundColor:"white", padding:".13em", width:"fit-content", fontWeight:"bold", color:"blue"}}><i>Anotaciones</i></div>
        <Row>
            <Col span={22}>
                <Table dataSource={anotaciones} columns={columns} scroll={{y:"200px"}} size="small" />
            </Col>
            <Col span={2}>
                <Button onClick={()=>{setPopupAddOpen(true)}} type="primary" style={{width:"100%", height:"100%", maxWidth:"50px"}} block><PlusOutlined /></Button>
            </Col>
        </Row>
        <Row>
           
        </Row>
        <Modal 
        title="Agregar Anotacion"
        open={popupAddOpen}
        onCancel={onPopupCancel}
        footer={null}
        >
            <AnotacionForm refId={props.idref} tipo={props?.tipo||""} callback={()=>{setPopupAddOpen(false); setUpdate(!update)}} />
        </Modal> 
    
    </div>
}

export default Anotaciones