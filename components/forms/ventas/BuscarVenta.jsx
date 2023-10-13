import ListaVentas from "@/components/informes/ventas/ListaVentas";
import { Button, Input, Modal, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import FiltroVentas from "./filtroVentas";
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import globals from "@/src/globals";
import VentaDetallePopup from "@/components/VentaDetalle";
import CustomModal from "@/components/CustomModal";
import { ReloadOutlined } from "@ant-design/icons";

const BuscarVenta = (props)=>{
    const [open, setOpen] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [filtros, setFiltros] = useState({})
    const [reload, setReload] = useState(true)

    const add = (obj,value,key) => typeof value === 'undefined' ? obj : {...obj, [key]:value}


    useEffect(()=>{
        const url = post.venta_estado_sucursal;
        var params = {idsucursal: globals.obtenerSucursal()}
        
        params = add(params, filtros.idcliente, 'idcliente')
        params = add(params, filtros.idmedico, 'idmedico')
        params = add(params, filtros.id, 'id')
        params = add(params, filtros.iddestinatario, 'iddestinatario')
        params = add(params, filtros.fecha, 'fecha')

        post_method(url, params,(response)=>{

            if(response==null)
            {
                return
            }

            if(response.data==null)
            {
                return
            }

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
                    en_laboratorio: v.en_laboratorio,
                }))
            ))
        })
    },[reload])


    const onPopupClosed = () => {setReload(!reload)}


    const show_buttons = (estado, id, en_deposito) => {
        
        switch(estado)
        {
            case 'INGRESADO': 
            return <>
                <CustomModal 
                onOk={onPopupClosed} 
                onCancel={onPopupClosed} 
                openButtonText ="Ventas Ingresadas">
                    <ListaVentas id={id} imprimir anular cobrar accion="ingreso" titulo="Ventas Ingresadas" estado="INGRESADO" buttonText="Dar Ingreso"/>
                </CustomModal>
            </>
            break;
            case 'PENDIENTE': 
            return en_deposito != 0 ?  <>
            <CustomModal 
            onOk={onPopupClosed} 
            onCancel={onPopupClosed} 
            openButtonText ="Ventas Pendientes en Taller">
                <ListaVentas id={id} cobrar accion="resfuerzo" en_laboratorio={1} titulo="Ventas Pendientes en Laboratorio" estado="PENDIENTE" buttonText="Resfuerzo Seña"  />
            </CustomModal>
            </> : <>
            <CustomModal 
            onOk={onPopupClosed} 
            onCancel={onPopupClosed} 
            openButtonText ="Ventas Pendientes">
                <ListaVentas id={id} enviarALaboratorio cobrar marcarTerminado en_laboratorio={0} accion="resfuerzo"  titulo="Ventas Pendientes" estado="PENDIENTE" buttonText="Resfuerzo Seña"  />
            </CustomModal>
            </>
            break;
            case 'TERMINADO': 
            return <><CustomModal 
            onOk={onPopupClosed} 
            onCancel={onPopupClosed} 
            openButtonText ="Ventas Terminadas"><ListaVentas id={id} mustCancel cobrar accion="entrega" titulo="Ventas Terminadas" estado="TERMINADO" buttonText="Entrega" /></CustomModal></>
            break;
            case 'ENTREGADO': 
            return <><CustomModal 
            onOk={onPopupClosed} 
            onCancel={onPopupClosed} 
            openButtonText ="Ventas Entregadas"><ListaVentas id={id} titulo="Ventas Entregadas" estado={"ENTREGADO"} /></CustomModal></>
            break;
        }
    }
    const onCancel = ()=>{setOpen(false)}
    const onOpen = ()=>{setOpen(true); setReload(true) }
    return <div >
    <Button type="dashed" onClick={()=>{onOpen()}}>Buscar Venta</Button>
    <Modal 
    destroyOnClose={true} 
    width={"80%"} 
    onCancel={onCancel} 
    open={open} 
    title="Buscar Venta"> 
        <FiltroVentas callback={f=>{ setFiltros(_f=>f); setReload(!reload)}} />
        <Button type="link" onClick={(e)=>{setFiltros(_f=>({})); setReload(!reload)}}><ReloadOutlined /></Button>
        <Table dataSource={dataSource} columns={[
        {title:'Nro.:', dataIndex:'idventa'},
        {title:'Cliente', dataIndex:'cliente'},
        {title:'Fecha', dataIndex:'fecha'},
        { title: "Estado", dataIndex:"estado", render:(_,{estado})=>{
            switch(estado){
                case "INGRESADO": return <Tag color="magenta">{estado}</Tag>
                case "PENDIENTE": return <Tag color="geekblue">{estado}</Tag>
                case "ENTREGADO": return <Tag color="volcano">{estado}</Tag>
                case "ANULADO": return <Tag color="red">{estado}</Tag>
                case "TERMINADO": return <Tag color="green">{estado}</Tag>
            }
        }},
        {title:'Acciones', dataIndex:'idventa', render:(_,{idventa, estado, en_laboratorio})=>{
            return <>
            <VentaDetallePopup idventa={idventa} />&nbsp;
            {show_buttons(estado,idventa,en_laboratorio)}
            </>
        }},
    ]} />
    </Modal>
    </div>
}

export default BuscarVenta;