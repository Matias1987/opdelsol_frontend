import { get, post } from "@/src/urls"
import { Button, Checkbox, Col, Input, Row, Spin, Table, Tag } from "antd"
import { useEffect, useRef, useState } from "react"
import CustomModal from "./CustomModal"
import CobroOperacion from "./forms/caja/CobroForm"
import CargaManual from "./forms/caja/CargaManual"
import { InfoCircleFilled, InfoCircleOutlined } from "@ant-design/icons"
import PrinterWrapper from "./PrinterWrapper"
import InformeX from "./informes/caja/InformeX"
import VentaDetallePopup from "./VentaDetalle"
import CargaBloqueo from "./forms/caja/CargaBloqueo"
import globals from "@/src/globals"
import { post_method } from "@/src/helpers/post_helper"
import EditarCargaManualPopup from "./forms/caja/EditarCargaManualPopup"

export default function FichaCliente(props){
    const [operaciones, setOperaciones] = useState([])
    const [dataCliente, setDataCliente] = useState(null)
    const [dataChange, setDataChange] = useState(true)
    const [scrollChange, setScrollChange] = useState(false)
    const [saldo, setSaldo] = useState(0)
    const [filtrarSucursal, setFiltrarSucursal] = useState(false)
    
    const dummyref = useRef(null)

    const bloquear = _ => {
        if(!confirm("Bloquear Cuenta?"))
        {
            return
        }
        fetch(get.bloquear_cliente + dataCliente.idcliente)
        .then(resp=>resp.json())
        .then((resp)=>{ setDataChange(!dataChange)})
    }
    const anular_carga_manual = (id) => {
        if(!confirm("Anular Carga Manual?"))
        {
            return
        }
        post_method(post.update.anular_carga_manual,{id:id},(response)=>{
            setDataChange(!dataChange)
        })
    }
    const desBloquear = _ => {
        if(!confirm("Desbloquear Cuenta?"))
        {
            return
        }
        fetch(get.desbloquear_cliente + dataCliente.idcliente)
        .then(resp=>resp.json())
        .then((resp)=>{ setDataChange(!dataChange)})
    }
    

    const columns = [
        {dataIndex: 'id',  title: 'Nro.'},
        {dataIndex: 'fecha_f',  title: 'Fecha'},
        //{dataIndex: 'tipo',  title: 'Tipo'},
        {dataIndex: 'detalle',  title: 'Detalle', render:(_,{detalle,id,tipo})=>{
            {switch(tipo){
                    case 'VENTA': return <>{detalle}<VentaDetallePopup idventa={id} /></>; break;
                    case 'PAGO CUOTA': 
                    return <>
                        {detalle}
                        <CustomModal openButtonText="Imprimir">
                            <PrinterWrapper>
                                <InformeX idcobro={id} />
                            </PrinterWrapper>
                        </CustomModal>
                    </>
                    break;
                    case 'ENTREGA': 
                    return <>
                        {detalle}
                        <CustomModal openButtonText="Imprimir">
                            <PrinterWrapper>
                                <InformeX idcobro={id} />
                            </PrinterWrapper>
                        </CustomModal>
                    </>
                    break;
                    case 'CARGA MANUAL':
                        return <>
                        {detalle}&nbsp;<Button danger size="small" onClick={(e)=>{anular_carga_manual(id)}}>Anular</Button>
                       &nbsp;<EditarCargaManualPopup idcargamanual={id} callback={()=>{setDataChange(!dataChange)}} />
                        </>
                    default: return {detalle}
                }
            }
          
        }},
        {dataIndex: 'debe',  title: 'Debe', align: 'right', render:(_,{debe})=>(<>{parseFloat(debe||0).toFixed(2)}</>)},
        {dataIndex: 'haber',  title: 'Haber', align: 'right', render:(_,{haber})=>(<>{parseFloat(haber||0).toFixed(2)}</>)},
        { title: 'Saldo', align: 'right'},
    ]

    const detalles_cliente =_ => dataCliente === null ? <Spin /> : <>
        <p>Nro.: <b>{dataCliente.idcliente}</b>&nbsp;&nbsp;Apellido y Nombre: <b>{dataCliente.apellido + ",  "+ dataCliente.nombre}</b> &nbsp;&nbsp;&nbsp;&nbsp; DNI: <b>{dataCliente.dni}</b></p>
        <p>Tel.: <b>{dataCliente.telefono1}</b> &nbsp;&nbsp;&nbsp;&nbsp; Dir.: <b>{dataCliente.direccion}</b></p>
        <p>{dataCliente.bloqueado == 1 ? <><Tag color="red">BLOQUEADO</Tag></>:<></>}</p>
    </>

    useEffect(()=>{
        if(dataChange){
            setDataChange(false)
            //detalles
            fetch(get.cliente_por_id + props.idcliente)
            .then(response=>response.json())
            .then((response)=>{
                setDataCliente(response.data[0])
            })
            //operaciones
            
            /*fetch(get.operaciones_cliente + props.idcliente)
            .then(response=>response.json())
            .then((response)=>{
                //alert(JSON.stringify(response.data))
                setOperaciones(response.data)
                setScrollChange(true)
            })*/
            post_method(get.operaciones_cliente,
                {
                idcliente: props.idcliente,
                idsucursal: filtrarSucursal ? globals.obtenerSucursal() : -1
            },(response)=>{
                setOperaciones(response.data)
                setScrollChange(true)
            })
        }
        if(scrollChange){
            dummyref.current?.scrollIntoView({ behavior: "smooth" })
            setScrollChange(false)
            //alert("scroll?")
        }

    },[dataChange, scrollChange])

    return (<>
    <h3>Ficha Cliente</h3>
    <Row>
        <Col span={20}>
            {detalles_cliente()}
        </Col>
        <Col span={4} >
            <Checkbox
            style={{fontSize:"1.2em"}}
            checked={filtrarSucursal}
            onChange={(e)=>{
                setFiltrarSucursal(!filtrarSucursal)
                setDataChange(!dataChange)
            }}>
                <span style={{color:"darkred"}}>Ver S&oacute;lo Sucursal</span>
                </Checkbox>
        </Col>
    </Row>
    <Row>
        <Col span={24} style={{height:'350px', overflowY:'scroll', width:'100%'}}>
            
                {<Table columns={columns} dataSource={operaciones} pagination={false}
                    summary={data=>{
                        var total_debe=0;
                        var total_haber=0;
                        data.forEach(r=>{
                            total_debe+=parseFloat(r.debe);
                            total_haber+=parseFloat(r.haber);
                        })
                        setSaldo(total_debe-total_haber)
                        return<>
                        <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={3}>
                                <b>Totales</b>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align="right">
                                <b>{total_debe.toFixed(2)}</b>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align="right">
                                <b>{(total_haber).toFixed(2)}</b>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align="right">
                                <b>{(total_debe-total_haber).toFixed(2)}</b>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                        </>
                    }}
                />}
                <div ref={dummyref}></div>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input prefix={"Saldo: $ "} style={{backgroundColor:"lightblue"}} readOnly={true} value={parseFloat(saldo).toFixed(2)}/>
        </Col>
    </Row>
    <Row>
        <Col span={12}>
            <CobroOperacion 
            tarjetaHidden={false}
            ctacteHidden={true}
            chequeHidden={false}
            mutualHidden={false}
            buttonText="Cargar Cuota" 
            totalsHidden={true} 
            tipo="cuota" 
            idcliente={props.idcliente}  
            callback={()=>{setDataChange(true)}} 
            />
            <CargaManual idcliente={props.idcliente} callback={()=>{setDataChange(true)}} />
        </Col>
        <Col span={12}>
            {dataCliente==null ? <></> :
            <>
                {dataCliente.bloqueado == 1 ? 
                <><Button block onClick={desBloquear} type="primary" size="small" danger>Desbloquear</Button></> : 
                <>
                {/*<Button onClick={bloquear} type="primary" size="small" danger>Bloquear</Button>*/}
                <><CargaBloqueo idcliente={dataCliente.idcliente} callback={()=>{setDataChange(!dataChange)}} /></>
                </>}
            </>
            }
            
        </Col>
    </Row>
   
    
    </>)
}