import ListaVentas from "@/components/informes/ventas/ListaVentas";
import { Button, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import FiltroVentas from "./filtroVentas";
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import globals from "@/src/globals";
import VentaDetallePopup from "@/components/VentaDetalle";

const BuscarVenta = (props)=>{
    const [open, setOpen] = useState(false)
    const [dataSource, setDataSource] = useState([])
    useEffect(()=>{
        const url = post.venta_estado_sucursal;
        var params = {idsucursal: globals.obtenerSucursal()}
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
                }))
            ))
        })
    })
    const onCancel = ()=>{setOpen(false)}
    return <>
    <Button type="dashed" onClick={()=>{setOpen(true)}}>Buscar Venta</Button>
    <Modal width={"80%"} onCancel={onCancel} open={open} title="Buscar Venta"> 
        <FiltroVentas alreadyOpen />
        <Table dataSource={dataSource} columns={[
        {title:'Nro.:', dataIndex:'idventa'},
        {title:'Cliente', dataIndex:'cliente'},
        {title:'Fecha', dataIndex:'fecha'},
        {title:'Acciones', dataIndex:'idventa', render:()=>{
            <>
            <VentaDetallePopup idventa={1} />
            <Button>Ver en operaciones Ingresadas</Button>
            <Button>Ver en operaciones Pendientes</Button>
            <Button>Ver en operaciones Terminadas</Button>
            </>
        }},
    ]} />
    </Modal>
    

    </>
}

export default BuscarVenta;