import MonofLabItems from "@/components/forms/ventas/monof_lab/items";
import { useState } from "react";
import { public_urls } from "@/src/urls";
import globals from "@/src/globals";
import { submit_venta } from "@/src/helpers/ventas_helper";
import { Modal } from "antd";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeVenta from "@/components/informes/ventas/Base";
import Trabajo from "./Trabajo";

export default function TrabajoMonofLab() {
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [venta, setVenta] = useState(null);
  const [productos, setProductos] = useState(null);
  const [idVenta, setIdVenta] = useState(-1);
  const [printOpen, setPrintOpen] = useState(false);
  const callback = (productos) => {
    setProductos((_productos) => {
      calcular_total(productos);
      return productos;
    });
  };

  const calcular_total = (_productos) => {
    var _t = 0;
    _t += parseFloat(_productos?.lejos_od?.precio || 0);
    _t += parseFloat(_productos?.lejos_oi?.precio || 0);
    _t += parseFloat(_productos?.lejos_armazon?.precio || 0);
    _t += parseFloat(_productos?.lejos_tratamiento?.precio || 0);
    _t += parseFloat(_productos?.cerca_od?.precio || 0);
    _t += parseFloat(_productos?.cerca_oi?.precio || 0);
    _t += parseFloat(_productos?.cerca_armazon?.precio || 0);
    _t += parseFloat(_productos?.cerca_tratamiento?.precio || 0);
    setSubTotal(_t);
    var dto = typeof venta === "undefined" ? 0 : venta?.descuento || 0;
    setTotal((_total) => _t - dto);
  };

  const onClosePrintPopup = (_) => {
    setPrintOpen(false);
    window.location.replace(public_urls.dashboard_venta);
  };

  return (
    <>
      <Trabajo
        title={"Trabajo de Receta Stock"}
        total={total}
        subTotal={subTotal}
        callback={(venta) => {
          setVenta((v) => {
            var dto = venta.descuento;
            setTotal((_total) => subTotal - dto);
            return venta;
          });
        }}
        onfinish={(data, onFailValidation) => {
          submit_venta(
            data,
            productos,
            total,
            subTotal,
            globals.tiposVenta.RECSTOCK,
            true,
            (responseData) => {
              const { idVenta } = responseData;
              setIdVenta(idVenta);
              setPrintOpen(true);
            },
            {},
            (_) => {
              onFailValidation();
            },

            false, 
          );
        }}
      >
        <MonofLabItems callback={onProductosCallback} />
      </Trabajo>
      {
        <Modal
          width={"80%"}
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
    </>
  );
}