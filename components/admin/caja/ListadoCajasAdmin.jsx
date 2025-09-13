import { EditOutlined, InfoOutlined } from "@ant-design/icons"
import { Button, Col, Row, Table, Card, Modal, Select } from "antd"
import { useEffect, useState } from "react"

const ListadoCajasAdmin = props => {
    const [reload, setReload] = useState(false)
    const [popupOpen, setPopupOpen] = useState(false)
    const [selectedCaja, setSelectedCaja] = useState(null)
    const columns = [
        { title: "Sucursal", dataIndex:"sucursal" },
        { title: "Fecha", dataIndex:"fecha" },
        { title: "Estado", dataIndex: "estado" },
        {
            title: "Acciones", render: (_, record) => <>
                <Button type="link"><InfoOutlined /> Detalle</Button>
                <Button type="link" onClick={_=>setPopupOpen(true)}><EditOutlined /> Cambiar Estado</Button>
            </>
        }
    ]
    const [cajas, setCajas] = useState([{sucursal:"ALBERDI", fecha: "hoy", estado:"ABIERTA"}])

    const load = () => {

    }

    useEffect(() => {
        load()
    }, [reload])

    return <>
        <Card
            title="Listado de Caja"
        >
            <Row>
                <Col span={24}>
                    <Table dataSource={cajas} columns={columns} scroll={{ y: "500px" }} pagination={false} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>

                </Col>
            </Row>
        </Card>
        <Modal open={popupOpen} title="Cambiar Estado" footer={null} onCancel={_ => { setPopupOpen(false) }} width={"900px"}>
            <>
                <Row style={{padding:"6px"}}>
                    <Col span={24}>
                        Caja: {selectedCaja?.sucursal}  {selectedCaja?.fecha}
                    </Col>
                </Row>
                <Row style={{padding:"6px"}}>
                    <Col span={24}>
                        <Select prefix="Estado: " style={{width:"300px"}} options={[
                            {value:"CERRADO", label:"CERRADO"},
                            {value:"ABIERTA", label:"ABIERTA"},
                        ]}/>
                    </Col>
                </Row>
                <Row style={{padding:"6px"}}>
                    <Col span={24}>
                        <Button size="small" block type="primary">Aplicar</Button>
                    </Col>
                </Row>
            </>
        </Modal>
    </>
}

export default ListadoCajasAdmin