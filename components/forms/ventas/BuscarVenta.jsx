import ListaVentas from "@/components/informes/ventas/ListaVentas";
import { Button, Checkbox, Col, Input, Modal, Row, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import FiltroVentas from "./filtroVentas";
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import globals from "@/src/globals";
import VentaDetallePopup from "@/components/VentaDetalle";
import CustomModal from "@/components/CustomModal";
import { HomeFilled, PrinterFilled, ReloadOutlined } from "@ant-design/icons";
import ImprimirSobreVenta from "@/pages/v1/ventas/informes/sobre_venta";
import InformeVentaMinV3 from "@/components/informes/ventas/InformeVentasMinV3";
import InformeVentaV2 from "@/components/informes/ventas/InformeVentaV2";
import CambiarResponsableDestinatario from "./edicion/CambiarResponsableDestinatario";
import AnularVentasCobradas from "@/components/admin/anularVentasCobradas";

const BuscarVenta = (props)=>{
    const [open, setOpen] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [filtros, setFiltros] = useState({})
    const [reload, setReload] = useState(true)

    const [detalleOpen, setDetalleOpen] = useState(false)
    const [idventaDetalle, setIdVentaDetalle] = useState(-1)

    const [verSoloSucursal, setVerSoloSucursal] = useState(true)

    const add = (obj,value,key) => typeof value === 'undefined' ? obj : {...obj, [key]:value}

    const get_tipo = (tipo)=>{
        switch(+tipo)
        {
            case 1: return "Vta. Dir."; 
            case 2: return "Rec. Stock"; 
            case 3: return "L.C. Stock"; 
            case 4: return "Monof. Lab."; 
            case 5: return "Multif. Lab."; 
            case 6: return "L.C. Lab."; 
        }
    }

 
    const load = () => {
        const url = post.venta_estado_sucursal;
        var params = {};//{idsucursal: globals.obtenerSucursal()}
        params
        params = add(params, filtros.idcliente, 'idcliente')
        params = add(params, filtros.idmedico, 'idmedico')
        params = add(params, filtros.id, 'id')
        params = add(params, filtros.iddestinatario, 'iddestinatario')
        params = add(params, filtros.fecha, 'fecha')
        params = add(params, filtros.estado, 'estado')
        params = add(params, filtros.tipo, 'tipo')
        params = add(params, verSoloSucursal ? globals.obtenerSucursal() : '', 'idsucursal')

        post_method(url, params,(response)=>{

            if(response==null)
            {
                return
            }

            if(response.data==null)
            {
                return
            }
            //alert(JSON.stringify(response))
            setDataSource(src=>(
                 response.data.map(v=>({
                    idventa: v.idventa,
                    idcliente: v.cliente_idcliente,
                    fecha: v.fecha,
                    cliente: v.cliente,
                    vendedor: v.vendedor,
                    estado: v.estado,
                    monto: v.monto,
                    tipo: v.tipo,
                    idsucursal: v.sucursal_idsucursal,
                    sucursal: v.sucursal,
                    en_laboratorio: v.en_laboratorio,
                    iddestinatario: v.fk_destinatario,
                }))
            ))
        })
    }


    const onPopupClosed = () => {setReload(!reload)}

    useEffect(()=>{load()},[reload])


    const show_buttons = (estado, id, en_deposito, idsucursal) => {
        
        switch(estado)
        {
            case 'INGRESADO': 
            return <>
                <CustomModal 
                validateOpen={()=>{
                    if(idsucursal!=globals.obtenerSucursal()){
                        alert("<!> Venta de Otra Sucursal")
                        return false
                    }
                    return true
                }}
                onOk={onPopupClosed} 
                onCancel={onPopupClosed} 
                openButtonText ={<span style={{color:"red", fontSize:".9em"}}>Ventas<br />Ingresadas</span>}>
                    <ListaVentas imprimir anular cobrar accion="ingreso" titulo="Ventas Ingresadas" estado="INGRESADO" buttonText="Dar Ingreso"/>
                </CustomModal>
            </>
            break;
            case 'PENDIENTE': 
            return en_deposito != 0 ?  <>
            <CustomModal 
            onOk={onPopupClosed} 
            onCancel={onPopupClosed} 
            openButtonText ={<span style={{color:"blue", fontSize:".9em"}}>Ventas Pendientes en Taller</span>}>
                <ListaVentas ignoreSucursal id={id} cobrar accion="resfuerzo" en_laboratorio={1} titulo="Ventas Pendientes en Laboratorio" estado="PENDIENTE" buttonText="Resfuerzo Seña"  />
            </CustomModal>
            </> : <>
            <CustomModal 
            onOk={onPopupClosed} 
            onCancel={onPopupClosed} 
            openButtonText ={<span style={{color:"blue", fontSize:".9em"}}>Ventas<br />Pendientes</span>}>
                <ListaVentas ignoreSucursal id={id} enviarALaboratorio cobrar marcarTerminado en_laboratorio={0} accion="resfuerzo"  titulo="Ventas Pendientes" estado="PENDIENTE" buttonText="Resfuerzo Seña"  />
            </CustomModal>
            </>
            break;
            case 'TERMINADO': 
            return <><CustomModal 
            onOk={onPopupClosed} 
            onCancel={onPopupClosed} 
            openButtonText ={<span style={{color:"green", fontSize:".9em"}}>Ventas<br />Terminadas</span>}><ListaVentas ignoreSucursal id={id} mustCancel cobrar accion="entrega" titulo="Ventas Terminadas" estado="TERMINADO" buttonText="Entrega" /></CustomModal></>
            break;
            case 'ENTREGADO': 
            return <><CustomModal 
            onOk={onPopupClosed} 
            onCancel={onPopupClosed} 
            openButtonText ={<span style={{color:"orange", fontSize:".9em"}}>Ventas<br />Entregadas</span>}><ListaVentas ignoreSucursal id={id} titulo="Ventas Entregadas" estado={"ENTREGADO"} /></CustomModal></>
            break;
        }
    }
    const onCancel = ()=>{setOpen(false)}
    const onOpen = ()=>{
        setOpen(true); 
        load()
    
    }
    return <div >
    <Button 
    type="dashed" onClick={()=>{onOpen()}}>Buscar Venta</Button>
    <Modal 
    footer={null}
    destroyOnClose={true} 
    width={"90%"} 
    onCancel={onCancel} 
    open={open} 
    title={<>Buscar Venta &nbsp;&nbsp;<span style={{fontSize:".8em", color: "gray"}} ><i>(M&aacute;x. 200)</i> </span></>}> 
    <Row>
        <Col span={3}>
        <FiltroVentas callback={f=>{ setFiltros(_f=>f); setReload(!reload)}} />
        </Col>
        <Col span={2}>
        <Button type="link" onClick={(e)=>{setFiltros(_f=>({})); setReload(!reload)}}><ReloadOutlined /></Button>
        </Col>
        <Col span={8}>
        <Checkbox checked={verSoloSucursal} style={{fontSize:"1.2em", color:"#362056FF"}} onChange={()=>{setVerSoloSucursal(!verSoloSucursal); setReload(!reload)}}><HomeFilled /> Ver Solo Sucursal</Checkbox>
        </Col>
    </Row>
        
    <Row>
        <Col span={24}>
        <Table 
        scroll={{
            y: 400,
          }}
        onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                //alert(JSON.stringify(event.currentTarget.tagName))
                event.stopPropagation()
                setIdVentaDetalle(record.idventa)
                setDetalleOpen(true)
            }, // click row
            };
          }}
        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
        dataSource={dataSource} 
        columns={[
        {title:'Nro.:', dataIndex:'idventa'},
        {
            title:'Cliente', 
            dataIndex:'cliente', 
            render:(_,{cliente,idventa,estado,idsucursal})=>{
            return <>{cliente}
                    {estado=="INGRESADO" && idsucursal==globals.obtenerSucursal()? <span onClick={(e)=>{e.stopPropagation()}}>
                        <CambiarResponsableDestinatario 
                            idventa={idventa} 
                            callback={load}
                            />
            </span> : <></>}
                </>
            }
        },
        {title:'Fecha', dataIndex:'fecha'},
        {hidden: false, title: "Tipo", dataIndex: "tipo", render:(_,{tipo})=>(
            <span style={{fontSize:".75em", }}><b>{get_tipo(tipo)}</b></span>
        ) },
        { title: "Estado", dataIndex:"estado", render:(_,{estado})=>{
            switch(estado){
                case "INGRESADO": return <Tag color="red"><b>{estado}</b></Tag>
                case "PENDIENTE": return <Tag color="geekblue">{estado}</Tag>
                case "ENTREGADO": return <Tag color="volcano">{estado}</Tag>
                case "ANULADO": return <Tag color="#56051DFF">{estado}</Tag>
                case "TERMINADO": return <Tag color="green">{estado}</Tag>
            }
        }},
        {
            title:"Sucursal", dataIndex: "sucursal", render:(_,{sucursal})=>{
                return <>{sucursal}</>
            }
        },
        {
            title:'Acciones', 
            fixed: 'right',
            dataIndex:'idventa', 
            render:(_,{idventa, estado, en_laboratorio, idsucursal})=>{
                return <div onClick={(e)=>{e.stopPropagation()}}>
            
            { globals.esUsuarioCaja1() ? show_buttons(estado,idventa,en_laboratorio, idsucursal) : <></>}
            {/*<VentaDetallePopup idventa={idventa} key={idventa} />&nbsp;*/}
            {/*<ImprimirSobreVenta  idventa={idventa}  key={idventa}/>*/}
            <InformeVentaV2 hidebutton={false} idventa={idventa} key={idventa} />
            { (globals.esUsuarioAdmin() || globals.esUsuarioAdminMin()) && estado!='ANULADO' ?
            <AnularVentasCobradas idventa={idventa} callback={load}/>
            :
            <></>
            }
            </div>
        }},
    ]} />
        </Col>
    </Row>
        
    <Modal width={"80%"} open={detalleOpen} footer={null} onCancel={()=>{setDetalleOpen(false)}}>
        <InformeVentaMinV3 idventa={idventaDetalle} key={idventaDetalle} />
    </Modal>
    
    </Modal>
    </div>
}

export default BuscarVenta;