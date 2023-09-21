import globals from "@/src/globals"
import { post_method } from "@/src/helpers/post_helper"
import { get, post } from "@/src/urls"

const { MessageOutlined, SendOutlined } = require("@ant-design/icons")
const { FloatButton, Modal, Input, Button, Row, Col, List, Avatar } = require("antd")
const { useState, useEffect } = require("react")

const Chat = (props) =>{
    const [open, setOpen] = useState(false)
    const [tick, setTick] = useState(0) 
    const [uid, setUID] = useState(-1)
    const [messageToSend, setMessageToSend] = useState({
        fkemisor: globals.obtenerUID(),
        mensaje: ""
    })
    const [messages, setMessages] = useState(
        [

        ]
    )

    useEffect(()=>{
        setUID(globals.obtenerUID())
        fetch(get.mensajes)
        .then(r=>r.json())
        .then((r)=>{
            setMessages(r.data.map(r=>({
                emisor: r.emisor,
                message: r.mensaje,
                fkemisor: r.fkemisor,
            })))
            setTimeout(() => {
                setTick(tick+1)
            }, 1000);
        })
       
    },[tick])

    const postMessage = () => {
        post_method(post.insert.mensajes, messageToSend,()=>{console.log("mensaje sent"); })
    }

    return <>
        <FloatButton icon={<MessageOutlined />} onClick={()=>{setOpen(true)}} />
        <Modal 
        onCancel={()=>{setOpen(false)}}
        footer={<>
        <Input 
        onChange={(e)=>{setMessageToSend(m=>({...m,mensaje:e.target.value}))}}
        style={{width:"100%"}} value={messageToSend.mensaje}  prefix={""} addonAfter={<><Button type="ghost" onClick={(e)=>{postMessage(); }}><SendOutlined /></Button></>} />
        </>}
        open={open}
        title={"Chat"}
        >
            <Row>
                <Col span={24} style={{height:"400px", overflow:"scroll"}}>
                <List
                    itemLayout="horizontal"
                    dataSource={messages}
                    renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                        style={{backgroundColor: item.fkemisor == uid ? "lightyellow" : "white"}}
                        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                        title={<a href="https://ant.design">{item.emisor}</a>}
                        description={item.message}
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