import ListaVentas from "@/components/informes/ventas/ListaVentas";
import { Button, Checkbox, Col, Input, Modal, Row, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import FiltroVentas from "./filtroVentas";
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import globals from "@/src/globals";
import CustomModal from "@/components/CustomModal";
import { HomeFilled, PrinterFilled, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import InformeVentaMinV3 from "@/components/informes/ventas/InformeVentasMinV3";
import InformeVentaV2 from "@/components/informes/ventas/InformeVentaV2";
import CambiarResponsableDestinatario from "./edicion/CambiarResponsableDestinatario";
import AnularVentasCobradas from "@/components/admin/anularVentasCobradas";
import InformeVenta from "@/components/informes/ventas/Base";
import PrinterWrapper from "@/components/PrinterWrapper";

const BuscarVentaV2 = (props)=>{
    const [open, setOpen] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [filtros, setFiltros] = useState({})
    const [reload, setReload] = useState(true)
    const [selectedVenta, setSelectedVenta] = useState({
        estado:'',
        id:0,
        en_deposito:-1,
        idsucursal:-1,
    })
    const [modalListaOpen, setModalListaOpen] = useState(false)

    const [detalleOpen, setDetalleOpen] = useState(false)
    const [idventaDetalle, setIdVentaDetalle] = useState(-1)
    const [modalImprimirOpen, setModalImprimirOpen] = useState(false)
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


    const onPopupClosed = () => {setFiltros({}); setReload(!reload)}

    useEffect(()=>{load()},[reload])

    const on_venta_click = (estado, id, en_deposito, idsucursal) => {
        setSelectedVenta(_=>({estado: estado, id:id, en_deposito:en_deposito, idsucursal:idsucursal}))
        setModalListaOpen(true)
    }


    const show_buttons = (estado, id, en_deposito, idsucursal) => {
        
        switch(estado)
        {
            case 'INGRESADO': 
            return <>
                <Button size="small" type="link" onClick={_=>{on_venta_click(estado, id, en_deposito, idsucursal)}}>Ventas Ingresadas</Button>
            </>
            break;
            case 'PENDIENTE': 
            return en_deposito != 0 ?  <>
            <Button size="small" type="link" onClick={_=>{on_venta_click(estado, id, en_deposito, idsucursal)}}>Ventas Pendientes en Taller</Button>
            </> : <>
            <Button size="small" type="link" onClick={_=>{on_venta_click(estado, id, en_deposito, idsucursal)}}>Ventas Pendientes</Button>
            </>
            break;
            case 'TERMINADO': 
            return <><Button size="small" type="link" onClick={_=>{on_venta_click(estado, id, en_deposito, idsucursal)}}>Ventas Terminadas</Button></>
            break;
            case 'ENTREGADO': 
            return <><Button size="small" type="link" onClick={_=>{on_venta_click(estado, id, en_deposito, idsucursal)}}>Ventas Entregadas</Button></>
            break;
        }
    }
    const modal_content = _ => {
        
        switch(selectedVenta.estado)
        {
            case 'INGRESADO': 
            return <>
                <ListaVentas ocultarFiltros imprimir anular cobrar accion="ingreso" titulo="Ventas Ingresadas" estado="INGRESADO" buttonText="Dar Ingreso"/>
            </>
            case 'PENDIENTE': 
            return selectedVenta.en_deposito != 0 ?  <>
                <ListaVentas ocultarFiltros ignoreSucursal id={selectedVenta.id} cobrar accion="resfuerzo" en_laboratorio={1} titulo="Ventas Pendientes en Laboratorio" estado="PENDIENTE" buttonText="Resfuerzo Seña"  />
            </> : <>
                <ListaVentas ocultarFiltros ignoreSucursal id={selectedVenta.id} enviarALaboratorio cobrar marcarTerminado en_laboratorio={0} accion="resfuerzo"  titulo="Ventas Pendientes" estado="PENDIENTE" buttonText="Resfuerzo Seña"  />
            </>
            case 'TERMINADO': 
            return <>
                <ListaVentas ocultarFiltros ignoreSucursal id={selectedVenta.id}  cobrar accion="entrega" titulo="Ventas Terminadas" estado="TERMINADO" buttonText="Entrega o Resfuerzo" />
            </>
            case 'ENTREGADO': 
            return <>
                <ListaVentas ocultarFiltros ignoreSucursal id={selectedVenta.id} titulo="Ventas Entregadas" estado={"ENTREGADO"} />
            </>
            default: return <></>;
        }
    }
    const onCancel = ()=>{setOpen(false)}
    const onOpen = ()=>{
        setOpen(true); 
        load()
    
    }
    return <>
    <Button 
    type="text" onClick={()=>{onOpen()}}><SearchOutlined /> {typeof props.textButton==='undefined' ? 'Buscar Venta' : props.textButton }
    </Button>
    <Modal 
    footer={null}
    destroyOnClose={true} 
    width={"95%"} 
    onCancel={onCancel} 
    open={open} 
    title={<>Buscar Venta &nbsp;&nbsp;<span style={{fontSize:".8em", color: "gray"}} ><i>(M&aacute;x. 200)</i> </span></>}> 
    <Row>
        <Col span={4}>
            <FiltroVentas callback={f=>{ setFiltros(_f=>f); setReload(!reload)}} />
        </Col>
        <Col span={4}>
            <Button type="link" onClick={(e)=>{setFiltros(_f=>({})); setReload(!reload)}}><ReloadOutlined /></Button>
        </Col>
        <Col span={5}>
            <Checkbox checked={verSoloSucursal} style={{fontSize:"1.2em", color:"#362056FF"}} onChange={()=>{setVerSoloSucursal(!verSoloSucursal); setReload(!reload)}}><HomeFilled /> Ver Solo Sucursal</Checkbox>
        </Col>
        <Col span={4}>
            <Input value={filtros.id} allowClear 
            type="number"
            onChange={(e)=>{ 
                
                let _id = isNaN(e.target.value) ? 0 : parseInt(e.target.value)
       
                setFiltros(_f=>({..._f,id:_id})); setReload(!reload)}} placeholder="Nro. Venta"/>
        </Col>
    </Row>
        
    <Row>
        <Col span={24}>
        <Table 
        size="small"
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
        {title:'Nro.:', dataIndex:'idventa', width:"60px"},
        {
            width:"200px",
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
        {title:'Fecha', dataIndex:'fecha', width:"80px"},
        {hidden: false, width:"80px", title: "Tipo", dataIndex: "tipo", render:(_,{tipo})=>(
            <span style={{fontSize:".75em", }}><b>{get_tipo(tipo)}</b></span>
        ) },
        { title: "Estado", width:"80px", dataIndex:"estado", render:(_,{estado})=>{
            switch(estado){
                case "INGRESADO": return <Tag color="red"><b>{estado}</b></Tag>
                case "PENDIENTE": return <Tag color="geekblue">{estado}</Tag>
                case "ENTREGADO": return <Tag color="volcano">{estado}</Tag>
                case "ANULADO": return <Tag color="#56051DFF">{estado}</Tag>
                case "TERMINADO": return <Tag color="green">{estado}</Tag>
            }
        }},
        {
            title:"Sucursal", width:"80px", dataIndex: "sucursal", render:(_,{sucursal})=>{
                return <>{sucursal}</>
            }
        },
        {
            title:'Acciones', 
            width:"200px", 
            fixed: 'right',
            dataIndex:'idventa', 
            render:(_,{idventa, estado, en_laboratorio, idsucursal})=>{
                return <div onClick={(e)=>{e.stopPropagation()}}>
            
            { globals.esUsuarioCaja1() ? show_buttons(estado,idventa,en_laboratorio, idsucursal) : <></>}

            <Button type="text" size="small" onClick={_=>{setSelectedVenta(_=>({estado: estado, id:idventa, en_deposito:en_laboratorio, idsucursal:idsucursal})); setModalImprimirOpen(true);}}><PrinterFilled size={"small"} /></Button>
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
        
        <Modal width={"1100px"} destroyOnClose open={detalleOpen} footer={null} onCancel={()=>{setDetalleOpen(false)}}>
            <InformeVentaMinV3 idventa={idventaDetalle} key={idventaDetalle} />
        </Modal>
        <Modal 
        title="Ventas"
        open={modalListaOpen} 
        destroyOnClose 
        footer={null} 
        onCancel={_=>{setModalListaOpen(false); setReload(!reload)}} 
        width="1280px" >
            {modal_content()}
        </Modal>
        <Modal
        destroyOnClose
        title="Detalle"
        onCancel={_=>{setModalImprimirOpen(false)}}
        width={"1000px"}
        footer={null}
        open={modalImprimirOpen}
        >
        <PrinterWrapper>
            <InformeVenta idventa={selectedVenta.id} />
        </PrinterWrapper>
    </Modal>
    </Modal>
    </>
}

export default BuscarVentaV2;