import MultifLabItems from "@/components/forms/ventas/multif_lab/Items";
import VentaBase from "../../../components/forms/ventas/VentaBase";
import LayoutVentas from "@/components/layout/layout_ventas";
import { useState } from "react";
import { public_urls } from "@/src/urls";
import globals from "@/src/globals";
import { submit_venta } from "@/src/helpers/ventas_helper";
import InformeVentaV2 from "@/components/informes/ventas/InformeVentaV2";

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
        _total += parseFloat((_productos?.od?.precio)||0);
        _total += parseFloat(_productos?.oi?.precio||0);
        _total += parseFloat(_productos?.armazon?.precio||0);
        _total += parseFloat(_productos?.tratamiento?.precio||0);

        setSubTotal(st=>_total)

        var dto = typeof venta === 'undefined' ? 0 : venta?.descuento||0 

        setTotal(total=>(_total - dto))

        setProductos((___productos)=>_productos)

    }

    const callback_venta_modif = (_venta) => {
        setVenta((v)=>{
            setTotal((_total)=>(subTotal - _venta.descuento));
            return _venta;
        })
    }

    const onFinish = (v,onFailValidation) => {
        //alert(JSON.stringify(productos))
       
        submit_venta(v,productos,total,subTotal,globals.tiposVenta.MULTILAB,true,(idventa)=>{
            setIdVenta(idventa)
            setPrintOpen(true)
        },
        {},
        _=>{onFailValidation()})
    }

    const onClosePrintPopup = _ => {
        setPrintOpen(false)
        window.location.replace(public_urls.dashboard_venta);
    }

    return (<>
    <h3>Venta de Multifocales Laboratorio</h3>
    <VentaBase subTotal={subTotal} total={total} onfinish={onFinish} callback={callback_venta_modif}>
        <MultifLabItems callback={onProductosCallback} />
    </VentaBase>
    {/*<Modal width={"80%"} open={idVenta!=-1 && printOpen} onOk={()=>{onClosePrintPopup()}} onCancel={()=>{onClosePrintPopup()}}  footer={null}>
        <PrinterWrapper>
            <InformeVenta idventa={idVenta} />
        </PrinterWrapper>
    </Modal>*/}
    <InformeVentaV2 idventa={idVenta} open={idVenta!=-1 && printOpen} hidebutton={true} key={idVenta} onclose={onClosePrintPopup}/>
    </>)
}
VentaMultifocalesLab.PageLayout = LayoutVentas;  