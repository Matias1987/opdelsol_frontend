import { InfoCircleFilled } from "@ant-design/icons"
import { Button, Col, Divider, Input, Modal, Row, Table } from "antd"
import { useState } from "react"

const PopupDetalleControl = (props) => {
    const [open, setOpen] = useState(false)
    const [totalConteo, setTotalConteo] = useState(0)
    const [totalSistema, setTotalSistema] = useState(0)

    const onOpen = () => {
       let tc = 0
       let ts = 0
       props.codigos.forEach((c)=>{
            tc+=parseInt(c.cantidad)
            ts+=parseInt(c.cantidad_actual)
       })
       setTotalConteo(tc)
       setTotalSistema(ts)
    }


    return <>
        <Button onClick={()=>{ onOpen();  setOpen(true);}}><InfoCircleFilled /></Button>
        <Modal 
        width={"80%"}
        destroyOnClose={true}
        footer={null}
        open={open}
        onCancel={()=>{setOpen(false)}}>
            <Row>
                <Col span={12}>
                    Tipo de Tarea: <b>Control  </b>
                </Col>
                <Col span={12}>
                    Fecha: <b>{props.fecha}</b>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    Sucursal: <b>{props.sucursal}</b>
                </Col>
                <Col span={12}>
                    Usuario: <b>{props.usuario}</b>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Divider />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table 
                    pagination={false}
                    scroll={{y:"700px"}}
                    dataSource={props.codigos}
                    columns={[
                        {dataIndex:"codigo", title:"Codigo"},
                        {dataIndex:"cantidad", title:"Cantidad"},
                        {dataIndex:"cantidad_actual", title: "Cantidad Sist."},
                        {dataIndex:"mensaje", title: "Msg"}
                    ]}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Divider />
                </Col>
            </Row>
            <Row>
                <Col span={10}>
                    <Row>
                        <Col span={24}>
                            Cantidad Total Contada:<b> {totalConteo}</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            Cantidad Total Sistema:<b> {totalSistema}</b>
                        </Col>
                    </Row>
         
                </Col>
                <Col span={14}>
                            Comentarios:
                                <Input.TextArea rows={5} readOnly value={props.comentarios}></Input.TextArea>
                </Col>
            </Row>
            
        </Modal>
    </>
}

export default PopupDetalleControl;