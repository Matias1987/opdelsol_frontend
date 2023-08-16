import MultifLabItems from "@/components/forms/ventas/multif_lab/Items";
import VentaBase from "../../../components/forms/ventas/VentaBase";
import LayoutVentas from "@/components/layout/layout_ventas";
import { useState } from "react";
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import { Modal } from "antd";
import ImprimirSobreVenta from "./informes/sobre_venta";
import globals from "@/src/globals";
import { validar_items_venta } from "@/src/helpers/ventas_helper";
import { validar_modo_pago } from "@/src/helpers/pago_helper";

export default function VentaMultifocalesLab(){
    const [total, setTotal] = useState(0)
    const [productos, setProductos] = useState(null)
    const [subTotal, setSubTotal] = useState(0);
    const [venta, setVenta] = useState(null);
    const [idVenta, setIdVenta] = useState(-1)
    const [printOpen, setPrintOpen] = useState(false) 

    const onProductosCallback = (_productos) => {
        setProductos((productos)=>_productos)
        //calculate total

        var _total=0;
        _total += _productos?.od?.precio||0;
        _total += _productos?.oi?.precio||0;
        _total += _productos?.armazon?.precio||0;
        _total += _productos?.tratamiento?.precio||0;

        setSubTotal(st=>_total)

        var dto = typeof venta === 'undefined' ? 0 : venta?.descuento||0 

        setTotal(total=>(_total - dto))

        setProductos((productos)=>_productos)

    }

    const callback_venta_modif = (_venta) => {
        setVenta((v)=>{
            setTotal((_total)=>(subTotal - _venta.descuento));
            return _venta;
        })
    }

    const onFinish = (v) => {

        if(v.fkcliente==null)
        {
            alert("Cliente no seleccionado")
            return;
        }

        if(v.fechaRetiro==null)
        {
            alert("Fecha retiro no establecida")
            return
        }


        globals.obtenerCajaAsync((result)=>{
            if(result==null){
                alert("Caja Cerrada")
                return;
            }

            const venta = {
                ...v,
                productos: productos,
                tipo:"5",
                total: total,
                subtotal: subTotal,
                fkcaja: result.idcaja,
            }

            const _res = validar_items_venta(venta)

            if(_res.length>0){
                alert(_res[0].msg)
                return
            }

            const _res1 = validar_modo_pago(venta.mp)

            if(_res1.length>0){
                alert(_res1[0].msg)
                return 
            }

            console.log(JSON.stringify(venta))

            post_method(post.insert.venta,venta,(response)=>{
                alert("OK")
                setIdVenta(response.data)
                setPrintOpen(true)
            })
        })
    }

    return (<>
    <h3>Venta de Multifocales Laboratorio</h3>
    <VentaBase subTotal={subTotal} total={total} onfinish={onFinish} callback={callback_venta_modif}>
        <MultifLabItems callback={onProductosCallback} />
    </VentaBase>
    <Modal open={idVenta!=-1 && printOpen} onOk={()=>{setPrintOpen(false)}} onCancel={()=>{setPrintOpen(false)}} >
            <ImprimirSobreVenta idventa={idVenta} />
    </Modal>
    </>)
}
VentaMultifocalesLab.PageLayout = LayoutVentas;  