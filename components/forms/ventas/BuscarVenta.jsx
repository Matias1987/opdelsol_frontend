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
import ImprimirSobreVenta from "@/pages/v1/ventas/informes/sobre_venta";

const BuscarVenta = (props)=>{
    const [open, setOpen] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [filtros, setFiltros] = useState({})
    const [reload, setReload] = useState(true)

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
                }))
            ))
        })
    }


    const onPopupClosed = () => {setReload(!reload)}

    useEffect(()=>{load()},[reload])


    const show_buttons = (estado, id, en_deposito) => {
        
        switch(estado)
        {
            case 'INGRESADO': 
            return <>
                <CustomModal 
                onOk={onPopupClosed} 
                onCancel={onPopupClosed} 
                openButtonText ="Ventas Ingresadas">
                    <ListaVentas ignoreSucursal id={id} imprimir anular cobrar accion="ingreso" titulo="Ventas Ingresadas" estado="INGRESADO" buttonText="Dar Ingreso"/>
                </CustomModal>
            </>
            break;
            case 'PENDIENTE': 
            return en_deposito != 0 ?  <>
            <CustomModal 
            onOk={onPopupClosed} 
            onCancel={onPopupClosed} 
            openButtonText ="Ventas Pendientes en Taller">
                <ListaVentas ignoreSucursal id={id} cobrar accion="resfuerzo" en_laboratorio={1} titulo="Ventas Pendientes en Laboratorio" estado="PENDIENTE" buttonText="Resfuerzo Seña"  />
            </CustomModal>
            </> : <>
            <CustomModal 
            onOk={onPopupClosed} 
            onCancel={onPopupClosed} 
            openButtonText ="Ventas Pendientes">
                <ListaVentas ignoreSucursal id={id} enviarALaboratorio cobrar marcarTerminado en_laboratorio={0} accion="resfuerzo"  titulo="Ventas Pendientes" estado="PENDIENTE" buttonText="Resfuerzo Seña"  />
            </CustomModal>
            </>
            break;
            case 'TERMINADO': 
            return <><CustomModal 
            onOk={onPopupClosed} 
            onCancel={onPopupClosed} 
            openButtonText ="Ventas Terminadas"><ListaVentas ignoreSucursal id={id} mustCancel cobrar accion="entrega" titulo="Ventas Terminadas" estado="TERMINADO" buttonText="Entrega" /></CustomModal></>
            break;
            case 'ENTREGADO': 
            return <><CustomModal 
            onOk={onPopupClosed} 
            onCancel={onPopupClosed} 
            openButtonText ="Ventas Entregadas"><ListaVentas ignoreSucursal id={id} titulo="Ventas Entregadas" estado={"ENTREGADO"} /></CustomModal></>
            break;
        }
    }
    const onCancel = ()=>{setOpen(false)}
    const onOpen = ()=>{
        setOpen(true); 
        //load()
    
    }
    return <div >
    <Button 
    type="dashed" onClick={()=>{onOpen()}}>Buscar Venta</Button>
    <Modal 
    footer={null}
    destroyOnClose={true} 
    width={"80%"} 
    onCancel={onCancel} 
    open={open} 
    title="Buscar Venta"> 
        <FiltroVentas callback={f=>{ setFiltros(_f=>f); setReload(!reload)}} />
        <Button type="link" onClick={(e)=>{setFiltros(_f=>({})); setReload(!reload)}}><ReloadOutlined /></Button>
        <Table 
        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
        dataSource={dataSource} 
        columns={[
        {title:'Nro.:', dataIndex:'idventa'},
        {title:'Cliente', dataIndex:'cliente'},
        {title:'Fecha', dataIndex:'fecha'},
        {hidden: false, title: "Tipo", dataIndex: "tipo", render:(_,{tipo})=>(
            <span style={{fontSize:".75em", }}><b>{get_tipo(tipo)}</b></span>
        ) },
        { title: "Estado", dataIndex:"estado", render:(_,{estado})=>{
            switch(estado){
                case "INGRESADO": return <Tag color="magenta">{estado}</Tag>
                case "PENDIENTE": return <Tag color="geekblue">{estado}</Tag>
                case "ENTREGADO": return <Tag color="volcano">{estado}</Tag>
                case "ANULADO": return <Tag color="red">{estado}</Tag>
                case "TERMINADO": return <Tag color="green">{estado}</Tag>
            }
        }},
        {
            title:"Sucursal", dataIndex: "sucursal", render:(_,{sucursal})=>{
                return <>{sucursal}</>
            }
        },
        {title:'Acciones', dataIndex:'idventa', render:(_,{idventa, estado, en_laboratorio})=>{
            return <>
            <VentaDetallePopup idventa={idventa} />&nbsp;
            { globals.esUsuarioCaja1() ? show_buttons(estado,idventa,en_laboratorio) : <></>}
            <ImprimirSobreVenta idventa={idventa} />
            </>
        }},
    ]} />
    </Modal>
    </div>
}

export default BuscarVenta;