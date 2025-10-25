import RecetaStockItems from "@/components/forms/ventas/receta_stock/Items"
import VentaBase from "../../../components/forms/ventas/VentaBase"
import { useState } from "react";
import LayoutVentas from "@/components/layout/layout_ventas";
import { public_urls } from "@/src/urls";
import globals from "@/src/globals";
import { submit_venta } from "@/src/helpers/ventas_helper";
import InformeVentaV2 from "@/components/informes/ventas/InformeVentaV2";
import { Divider } from "antd";


export default function VentaRecetaStock(){
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [venta, setVenta] = useState(null);
    const [productos, setProductos] = useState(null);
    const [idVenta, setIdVenta] = useState(-1)
    const [printOpen, setPrintOpen] = useState(false) 
    
    const callback = (productos)=>{
        //alert("en la venta" + JSON.stringify(productos))
        setProductos(_productos=>{
            calcular_total(productos)
            return productos
        })
    }

    const calcular_total = (_productos) => {
        var _t = 0;
        _t += parseFloat(_productos?.lejos_od?.precio||0);
        _t += parseFloat(_productos?.lejos_oi?.precio||0);
        _t += parseFloat(_productos?.lejos_armazon?.precio||0);
        _t += parseFloat(_productos?.lejos_tratamiento?.precio||0);
        _t += parseFloat(_productos?.cerca_od?.precio||0);
        _t += parseFloat(_productos?.cerca_oi?.precio||0);
        _t += parseFloat(_productos?.cerca_armazon?.precio||0);
        _t += parseFloat(_productos?.cerca_tratamiento?.precio||0);
        setSubTotal(_t);
        var dto = typeof venta === 'undefined' ? 0 : venta?.descuento||0 
        setTotal((_total)=>(_t - dto));
    }

    const onClosePrintPopup = _ => {
        setPrintOpen(false)
        window.location.replace(public_urls.dashboard_venta);
    }


    return (
    <>
        <VentaBase
          title={"Venta de Receta Stock"}
          medicoRequired={true}
          total={total}
          subTotal={subTotal}
          callback={(venta) => {
            setVenta((v) => {
                var dto = venta.descuento
                setTotal((_total) => (subTotal - dto));
                return venta;
            })
        }}
        
        onfinish={(data,onFailValidation)=>{
            
            submit_venta(data,productos,total,subTotal,globals.tiposVenta.RECSTOCK,true,(idventa)=>{
                setIdVenta(idventa)
                setPrintOpen(true)
            },
            {},
            _=>{onFailValidation()}
        
            ,true //medico required
            )
                
            }}>
            <RecetaStockItems callback={callback} />
        </VentaBase>
        {/*<Modal width={"80%"} open={idVenta!=-1 && printOpen} onOk={()=>{onClosePrintPopup()}} onCancel={()=>{onClosePrintPopup()}} footer={null} >
            <PrinterWrapper>
                <InformeVenta idventa={idVenta} />
            </PrinterWrapper>
        </Modal>*/}
        <InformeVentaV2 idventa={idVenta} open={idVenta!=-1 && printOpen} hidebutton={true} key={idVenta} onclose={onClosePrintPopup}/>
    </>
    )
}
VentaRecetaStock.PageLayout = LayoutVentas;  