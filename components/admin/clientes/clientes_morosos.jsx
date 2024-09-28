import FichaCliente from "@/components/FichaCliente";
import FichaClienteV2 from "@/components/FichaClienteV2";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Card, Col, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";

const ClientesMorosos = (props) => {
    const [popupFichaOpen, setPopupFichaOpen] = useState(false)
    const [selectedCliente, setSelectedCliente] = useState(-1)
    const [dataSource, setdataSource] = useState([])
    const columns  = [
        {title:"dni", dataIndex:"dni"},
        {title:"Apellido y Nombre", dataIndex:"cliente"},
        {title:"Telefono",dataIndex:"telefono"},
        {title:<div style={{textAlign:"right"}}>Saldo</div>, dataIndex:"saldo", render:(_,{saldo})=><div style={{textAlign:"right"}}>$&nbsp;{saldo}</div>},
        {render:(_,{idcliente})=><>
            <Button onClick={()=>{setSelectedCliente(idcliente); setPopupFichaOpen(true)}}>Ficha</Button>
        
        </>}
    ]

    const load = _ => {
        alert(post.o_c_m)
        post_method(post.o_c_m,{},(rows)=>{
            alert(JSON.stringify(rows))
            setdataSource(rows.data)
        })
    }

    useEffect(()=>{
        load()
    },[])

    const row_style = {
        padding:"1em"
    }
    return <>
    <Card title="Clientes Morosos">
        <>
            <Row style={row_style}>
                <Col span={24}>
                
                </Col>
            </Row>
            <Row style={row_style}>
                <Col span={24}>
                
                </Col>
            </Row>
            <Row style={row_style}>
                <Col span={24}>
                    <Table 
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{y:"600px"}}
                    /> 
                </Col>
            </Row>
            <Row style={row_style}>
                <Col span={24}>
                
                </Col>
            </Row>
        </>
        </Card>
        <Modal width={"1200px"} open={popupFichaOpen} onCancel={()=>{setPopupFichaOpen(false)}} footer={null} destroyOnClose key={selectedCliente}>
            <FichaClienteV2 idcliente={selectedCliente} />
        </Modal>
    </>
}

export default ClientesMorosos;