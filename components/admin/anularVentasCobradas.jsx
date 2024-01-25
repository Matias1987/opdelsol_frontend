import { Button, Col, Modal, Row } from "antd"
import { useEffect, useState } from "react"
import ResponsableInf from "../informes/ventas/common/Responsable"
import { get } from "@/src/urls"
import AnularCobros from "./AnularCobros"
import ListaCobros from "../forms/caja/ListaCobros"

const AnularVentasCobradas = (props) => {

    const [venta, setVenta] = useState(null)
    const [open, setOpen] = useState(false)
    const url=get.venta
    const load =()=> {
        fetch(url+props.idventa)
		.then(response=>response.json())
		.then((response)=>{
            //alert(JSON.stringify(response.data[0]))
			setVenta(response.data[0])	
		})
    }

    const _venta_details = _ => <>
       
       <Row>
            <Col span={24}>
                Nro: {venta.idventa}
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <ResponsableInf id={venta.cliente_idcliente}/>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                Monto: {venta.monto_total}
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                Vendedor: {venta.usuario_nombre}
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            <ListaCobros idventa={props.idventa} anular readOnly key={props.idventa} />
            <Button block danger>Anular Venta</Button>
            </Col>
            
        </Row>

    </>
   // useEffect(()=>{alert(venta)})


    return <>
        <Button disabled size="small" onClick={()=>{setOpen(true); load()}} danger><b>Anular Venta y Cobros</b></Button>
        <Modal width={"60%"} open={open} onCancel={()=>{setOpen(false)}} title="Anular Ventas y Cobros" footer={null}>
            {venta == null ? <></> : _venta_details()}
        </Modal>
        
    </>

}

export default AnularVentasCobradas