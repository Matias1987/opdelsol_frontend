import { Button, Col, Modal, Row } from "antd"
import { useEffect, useState } from "react"
import ResponsableInf from "../informes/ventas/common/Responsable"
import { get, post } from "@/src/urls"
import AnularCobros from "./AnularCobros"
import ListaCobros from "../forms/caja/ListaCobros"
import { post_method } from "@/src/helpers/post_helper"
import InformeVentaV2 from "../informes/ventas/InformeVentaV2"

const AnularVentasCobradas = (props) => {
    const [count, setCount] = useState(0)
    const [venta, setVenta] = useState(null)
    const [open, setOpen] = useState(false)
    const [cobrosNoAnulados, setCobrosNoAnulados] = useState([])
    const url=get.venta
    const load =()=> {
        fetch(url+props.idventa)
		.then(response=>response.json())
		.then((response)=>{
            //alert(JSON.stringify(response.data[0]))
			setVenta(response.data[0])	
		})
    }

    const load_cobros_no_anulados = () =>{
        post_method(post.obtener_lista_cobros,{
           
            idventa:props.idventa
        },
        (response)=>{
            setCobrosNoAnulados(response.data)
        }
        )
    }

    useEffect(()=>{

        load()
        load_cobros_no_anulados()

    },[count])

    const AnularVenta = () => {
        if(!confirm("Anular Venta?")){
            return
        }
        if(cobrosNoAnulados.length>0){
            if(!confirm("Se anularan cobros. Continuar?")){
                return
            }
        }
        //anular ventas
        post_method(post.cambiar_estado_venta,{idventa: props.idventa, estado: 'ANULADO'},(resp)=>{
            
            //anular cobros
            if(cobrosNoAnulados.length>0)
            {
            cobrosNoAnulados.forEach(c=>{
                post_method(post.update.anular_cobros, {idcobro:c.idcobro},(resp)=>{
                    alert(`Cobro ${c.idcobro} anulado.`)
                    setCount(count+1)
                })
            })
            }
            else{
                setCount(count+1)
            }
        })
    }

    const _venta_details = _ => <>
       
       <Row>
            <Col span={24}>
                Nro: {venta.idventa} &nbsp;<InformeVentaV2 hidebutton={false} idventa={venta.idventa} key={venta.idventa} /> &nbsp;&nbsp;&nbsp; <b>{venta.estado}</b>
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
            <ListaCobros idventa={props.idventa} readOnly key={count}  />
            <Button disabled={venta.estado=='ANULADO'} block danger onClick={AnularVenta}>Anular Venta</Button>
            </Col>
            
        </Row>

    </>



    return <>
    {venta == null ? <></> : _venta_details()}
    {/*
        <Button size="small" onClick={()=>{setOpen(true); load(); load_cobros_no_anulados();}} danger><b>Anular Venta y Cobros</b></Button>
        <Modal destroyOnClose={true} width={"60%"} open={open} onCancel={()=>{setOpen(false); props?.callback?.()}} title="Anular Ventas y Cobros" footer={null}>
            
        </Modal>
*/}
    </>

}

export default AnularVentasCobradas