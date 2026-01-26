import VentaBase from "@/components/forms/ventas/VentaBase";
import VDItem from "@/components/forms/ventas/directa/Item";
import LayoutVentas from "@/components/layout/layout_ventas";
import { public_urls } from "@/src/urls";
import { useState } from "react";
import globals from "@/src/globals";
import { submit_venta } from "@/src/helpers/ventas_helper";
import { Modal } from "antd";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeVenta from "@/components/informes/ventas/Base";
import { useLeavePageConfirm } from "@/src/hooks/useLeavePageConfirm";

export default function VentaDirecta() {
  const [venta, setVenta] = useState(null);
  const [productos, setProductos] = useState(null);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [idVenta, setIdVenta] = useState(-1);
  const [printOpen, setPrintOpen] = useState(false);

/*  const [isFormDirty, setIsFormDirty] = useState(true);
  
  useLeavePageConfirm(isFormDirty);*/

  const callback_venta_modif = (_venta) => {
    setVenta((v) => {
      var dto = _venta.descuento;
      setTotal((_total) => subTotal - dto);
      return _venta;
    });
  };
  const onClosePrintPopup = (_) => {
    setPrintOpen(false);
    window.location.replace(public_urls.dashboard_venta);
  };
  return (
    <>
      <VentaBase
        title={"Venta Directa"}
        medicoRequired={false}
        subTotal={subTotal}
        total={total}
        ignore_fecha_retiro={true}
        callback={callback_venta_modif}
        onfinish={(v, onFailValidation) => {
          submit_venta(
            v,
            productos,
            total,
            subTotal,
            globals.tiposVenta.DIRECTA,
            false,
            (idventa) => {
              console.log(JSON.stringify(productos));
              setIdVenta(idventa);
              setPrintOpen(true);
            },
            { ignore_fecha_retiro: 1 },
            () => {
              onFailValidation();
            }
          );
        }}
      >
        <VDItem
          callback={(prod) => {
            setProductos((productos) => prod);
            var t = 0;
            prod.forEach((p) => {
              t += p.total;
            });
            setSubTotal(t);
            var dto = typeof venta === "undefined" ? 0 : venta?.descuento || 0;
            setTotal((_total) => t - dto);
          }}
        />
      </VentaBase>
      {
        <Modal
          width={"100%"}
          open={idVenta != -1 && printOpen}
          onOk={() => {
            onClosePrintPopup();
          }}
          onCancel={() => {
            onClosePrintPopup();
          }}
          footer={null}
        >
          <PrinterWrapper>
            <InformeVenta idventa={idVenta} />
          </PrinterWrapper>
        </Modal>
      }
      {/*<InformeVentaV2 idventa={idVenta} open={idVenta!=-1 && printOpen} hidebutton={true} key={idVenta} onclose={onClosePrintPopup}/>*/}
    </>
  );
}

VentaDirecta.PageLayout = LayoutVentas;
