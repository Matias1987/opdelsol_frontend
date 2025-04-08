import FichaClienteV2 from "@/components/FichaClienteV2";
import SelectTarea from "@/components/tarea/selectTarea";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Card, Checkbox, Col, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";

const ClientesMorosos = (props) => {
    const [popupFichaOpen, setPopupFichaOpen] = useState(false)
    const [selectedCliente, setSelectedCliente] = useState(-1)
    const [dataSource, setdataSource] = useState([])
    const [selectedTarea, setSelectedTarea] = useState(null)
    const [reload, setReload] = useState(false)
    const [tableEnabled, setTableEnabled] = useState(false)
    const [ocultarMarcados, setOcultarMarcados] = useState(false)
    const columns  = [
        {title:"DNI", dataIndex:"dni"},
        {title:"Apellido y Nombre", dataIndex:"cliente"},
        {title:"Telefono",dataIndex:"telefono"},
        {title:<div style={{textAlign:"right"}}>Saldo</div>, dataIndex:"saldo", render:(_,{saldo})=><div style={{textAlign:"right"}}>$&nbsp;{saldo}</div>},
        {width:"100px",  render:(_,{idcliente})=><>
            <Button onClick={()=>{setSelectedCliente(idcliente); setPopupFichaOpen(true)}}>Ficha</Button>
        
        </>},
        {
            render:(_,{idcliente, checked})=><><Checkbox checked={+checked==1} onChange={()=>{add_cliente_tarea(idcliente)}} /></>, width:"80px", title:"Marcar"
        }
    ]

    const load = _ => {
       // alert(post.o_c_m)
       setTableEnabled(false)
        post_method(post.o_c_m,{fk_parent:selectedTarea},(rows)=>{
            //alert(JSON.stringify(rows))
            setdataSource(rows.data)
            setTableEnabled(true)
            //setOcultarMarcados(false)
        })
    }

    
    const add_cliente_tarea = (idcliente) => {
        setTableEnabled(false)
        post_method(post.insert.tarea_,
            {nombre:"Control", fk_parent:selectedTarea, ref_id:idcliente},
            ()=>{
                setReload(!reload)
            }
        )
    }

    useEffect(()=>{
        load()
    },[reload])

    const row_style = {
        padding:"1em"
    }
    return <>
    <Card title="Clientes Morosos Sin Bloquear (2 meses)">
        <>
            <Row style={row_style}>
                <Col span={12}>
                    <SelectTarea title="Control: " callback={idtarea=>{setSelectedTarea(idtarea); setReload(!reload)}} />
                </Col>
                <Col span={12}>
                    <Checkbox value={ocultarMarcados} onChange={(e)=>{setOcultarMarcados(e.target.checked)}}>Ocultar marcados</Checkbox>
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
                    dataSource={ocultarMarcados ? dataSource.filter(c=>(+c.checked)!=1) : dataSource}
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