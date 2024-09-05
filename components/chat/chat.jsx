import globals from "@/src/globals"
import { post_method } from "@/src/helpers/post_helper"
import { get, post } from "@/src/urls"

const { MessageOutlined, SendOutlined } = require("@ant-design/icons")
const { FloatButton, Modal, Input, Button, Row, Col, List, Avatar } = require("antd")
const { useState, useEffect, useRef } = require("react")

const Chat = (props) =>{
    const [open, setOpen] = useState(false)
    const [tick, setTick] = useState(0) 
    const [uid, setUID] = useState(-1)
    const [inputDisabled, setInputDisabled] = useState(true)

    const [scrollChange, setScrollChange] = useState(true)

    const [dataChange, setDataChange] = useState(true)

    //const [scrollPos, setScrollPos] = useState(false)
    
    const [messageToSend, setMessageToSend] = useState({
        fkemisor: globals.obtenerUID(),
        mensaje: ""
    })
    const [messages, setMessages] = useState(
        [

        ]
    )
    const dummyref = useRef(null)
    const containerRef = useRef(null)

    useEffect(()=>{
        setUID(globals.obtenerUID())

        
        fetch(get.mensajes)
        .then(r=>r.json())
        .then((r)=>{

            setMessages(r.data.map(r=>({
                emisor: r.emisor,
                message: r.mensaje,
                fkemisor: r.fkemisor,
                fecha: r.fecha_f,
            })))

            

            setInputDisabled(false)
        
            setTimeout(() => {
                setTick(tick+1)
            }, 1000);

            /*if(dataChange){
                setDataChange(false)
                setScrollChange(true)
                dummyref.current?.scrollIntoView({ behavior: "smooth" })
            }*/
    
        })

        dummyref.current?.scrollIntoView({ behavior: "smooth" })

        /*if(scrollChange){
            dummyref.current?.scrollIntoView({ behavior: "smooth" })
            setScrollChange(false)
        }*/

       
    },[tick]) 

    const postMessage = () => {
        
        post_method(post.insert.mensajes, messageToSend,()=>{
           //alert("datachange")
           setDataChange(true);
        })
        setMessageToSend(m=>({...m, mensaje:""}))
    }

    return <>
        <FloatButton icon={<MessageOutlined />} badge onClick={()=>{setOpen(true)}} />
        <Modal 
        width={"450px"}
        onCancel={()=>{setOpen(false)}}
        footer={<>
        <Input 
        allowClear={true}
        showCount={true}
        disabled={inputDisabled}
        onChange={(e)=>{setMessageToSend(m=>({...m,mensaje:e.target.value}))}}
        onKeyDown={(e)=>{if(e.key==='Enter'){
            if(messageToSend.mensaje.trim().length<1)
            {
                return 
            }
            setInputDisabled(true); 
            postMessage(); 
        }}}

        style={{ backgroundColor:"#CAFF7A", width:"100%", padding:"1em"}} value={messageToSend.mensaje}  prefix={""} addonAfter={<>

        <Button disabled={inputDisabled} type="ghost" onClick={(e)=>{
            if(messageToSend.mensaje.trim().length<1)
            {
                return 
            }
            setInputDisabled(true); 
            postMessage(); 
            }} style={{backgroundColor:"greenyellow", width:"100%"}}><SendOutlined /></Button></>} />
        </>}
        open={open}
        title={"Chat"}
        >
            {/*<Row><Col span={24}>{ parseInt(scrollPos)}</Col></Row>*/}
            <Row>
                <Col ref={containerRef} span={24} style={{height:"400px", overflow:"scroll"}} onScroll={(e)=>{
                }}>
                <List
                    pagination={false}
                    footer={<div ref={dummyref}></div>}
                    itemLayout="horizontal"
                    dataSource={messages}
                    renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                        style={{backgroundColor: item.fkemisor == uid ? "lightyellow" : "white", textAlign: item.fkemisor==uid ? "right" : "left"}}
                        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.fkemisor}`} />}
                        title={item.emisor.toUpperCase()}
                        description={<><span style={{fontSize:"1.1em", color:"blue" , fontWeight:"bold"}}>{item.message}</span>&nbsp;&nbsp;<i style={{fontSize:".7em"}}>{item.fecha}</i></>}
                        />
                    </List.Item>
                    )}
                />
                </Col>
            </Row>
        </Modal>
    </>
}

export default Chat;