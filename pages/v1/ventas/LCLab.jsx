import LCLabItems from "@/components/forms/ventas/lc_laboratorio/items";
import VentaBase from "../../../components/forms/ventas/VentaBase";
import LayoutVentas from "@/components/layout/layout_ventas";
import { useState } from "react";
import { public_urls } from "@/src/urls";
import globals from "@/src/globals";
import { submit_venta } from "@/src/helpers/ventas_helper";
import { Modal } from "antd";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeVenta from "@/components/informes/ventas/Base";

export default function VentaLCLab() {
  const [productos, setProductos] = useState(null);
  const [subTotal, setSubTotal] = useState(0);
  const [venta, setVenta] = useState(null);
  const [total, setTotal] = useState(0);
  const [idVenta, setIdVenta] = useState(-1);
  const [printOpen, setPrintOpen] = useState(false);

  const products_callback = (products) => {
    var _total = 0;
    _total += parseFloat(products?.od?.precio || 0);
    _total += parseFloat(products?.oi?.precio || 0);
    _total += parseFloat(products?.insumo?.precio || 0);

    setSubTotal((st) => _total);

    var dto = typeof venta === "undefined" ? 0 : venta?.descuento || 0;

    setTotal((total) => _total - dto);

    setProductos((productos) => products);
  };

  const callback_venta_modif = (_venta) => {
    setVenta((v) => {
      var dto = _venta.descuento;
      setTotal((_total) => subTotal - dto);
      return _venta;
    });
  };

  const onFinish = (v, onFailValidation) => {
    // alert(JSON.stringify(productos))
    //return
    console.log(JSON.stringify(productos));
    submit_venta(
      v,
      productos,
      total,
      subTotal,
      globals.tiposVenta.LCLAB,
      true,
      (idventa) => {
        setIdVenta(idventa);
        setPrintOpen(true);
      },
      {},
      () => {
        onFailValidation();
      },
      true //medico required
    );
  };

  const onClosePrintPopup = (_) => {
    setPrintOpen(false);
    window.location.replace(public_urls.dashboard_venta);
  };

  return (
    <>
      <VentaBase
        title={"Venta de Lentes de Contacto Laboratorio"}
        medicoRequired={true}
        subTotal={subTotal}
        total={total}
        onfinish={onFinish}
        callback={callback_venta_modif}
      >
        <LCLabItems callback={products_callback} />
      </VentaBase>
      {<Modal width={"100%"} open={idVenta!=-1 && printOpen} onOk={()=>{onClosePrintPopup()}} onCancel={()=>{onClosePrintPopup()}} footer={null} >
        <PrinterWrapper>
            <InformeVenta idventa={idVenta} />
        </PrinterWrapper>
    </Modal>}
      {/*<InformeVentaV2
        idventa={idVenta}
        open={idVenta != -1 && printOpen}
        hidebutton={true}
        key={idVenta}
        onclose={onClosePrintPopup}
      />*/}
    </>
  );
}

VentaLCLab.PageLayout = LayoutVentas;
