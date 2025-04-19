
import { Button, Card, Col, Modal, Row, Table } from "antd"
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
        {width:"80px", dataIndex: 'fecha_f' ,title:<span style={{fontSize:".65em", fontWeight:"bold", color:"#000680"}}>Fecha</span>},
        {width:"90px", dataIndex: 'usuario',title:<span style={{fontSize:".65em", fontWeight:"bold", color:"#000680"}}>Autor</span>},
        {width:"300px", dataIndex: 'nota',title:<span style={{fontSize:".65em", fontWeight:"bold", color:"#000680"}}>Mensaje</span>},
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

    return <>
       {/*<div style={{marginTop:"-12px", backgroundColor:"white", padding:".13em", width:"fit-content", fontWeight:"bold", color:"blue"}}><i>Anotaciones</i></div>*/}
       <Card
       size="small"
       title={<>Anotaciones&nbsp;<Button onClick={()=>{setPopupAddOpen(true)}} type="link" size="small"  ><PlusOutlined size={"small"} /></Button></>}
       >
            <Row>
                <Col span={24}>
                    <Table 
                    dataSource={anotaciones} 
                    columns={columns} 
                    scroll={{y:"200px"}} 
                    size="small" />
                </Col>
                
            </Row>
        </Card>
        <Modal 
        title="Agregar Anotación"
        open={popupAddOpen}
        onCancel={onPopupCancel}
        footer={null}
        width={"450px"}
        >
            <AnotacionForm refId={props.idref} tipo={props?.tipo||""} callback={()=>{setPopupAddOpen(false); setUpdate(!update)}} />
        </Modal> 
    
        </>
}

export default Anotaciones