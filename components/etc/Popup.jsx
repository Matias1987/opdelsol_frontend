import { Modal,  Row, Col, Button } from "antd"
import { useEffect } from "react"

/**
 * 
 * @param {*} content content 
 * @param {*} open  
 * @param {*} onOK  
 * @param {*} onCancel  
 * @param {*} maskClosable  
 */
const ConfirmPopup = (props) => {
    const {message, open, onOK, onCancel, maskClosable, onLoad } = props
    
    const onOKClick = _ =>{
        onOK?.()
    }

    const onCancelClick = _ => {
        onCancel?.()
    }

    useEffect(()=>{
        onLoad?.()
    },[])

    return <Modal 
    open={open}
    maskClosable={maskClosable? false : maskClosable} 
    onCancel={_=>{onCancel?.()}}
    footer={null}
    width={"400px"}
    >
        <Row><Col>{message}</Col></Row>
        <Row>
            <Col>
                <Button onClick={onOKClick}>Aceptar</Button>
                <Button onClick={onCancelClick}>Cancelar</Button>
            </Col>
        </Row>
    </Modal>
}

export default ConfirmPopup