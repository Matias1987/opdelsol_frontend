import { public_urls } from "@/src/urls";
import { useState } from "react";
import globals from "@/src/globals";
import { submit_venta } from "@/src/helpers/ventas_helper";
import { Modal } from "antd";
import PrinterWrapper from "@/components/PrinterWrapper";
import dynamic from "next/dynamic";
import LayoutVentasV2 from "@/components/layout/layout_ventas_v2";

const VentaBaseV3 = dynamic(
  () => import("@/components/forms/ventas/VentaBaseV3"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);
const InformeX = dynamic(
  () => import("@/components/informes/caja/InformeX"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);
const VDItem = dynamic(
  () => import("@/components/forms/ventas/directa/Item"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);
const InformeVenta = dynamic(
  () => import("@/components/informes/ventas/Base"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);



export default function VentaDirecta() {
  const [venta, setVenta] = useState(null);
  const [productos, setProductos] = useState(null);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [idVenta, setIdVenta] = useState(-1);
  const [printOpen, setPrintOpen] = useState(false);
  const [printPopupXOpen, setPrintPoupXOpen] = useState(false);
  const [idCobro, setIdCobro] = useState(-1);

  const callback_venta_modif = (_venta) => {
    setVenta((v) => {
      var dto = _venta.descuento;
      setTotal((_total) => subTotal - dto);
      return _venta;
    });
  };
  const onClosePrintPopup = (_) => {
    setPrintOpen(false);
    if(idCobro>0){
      setPrintPoupXOpen(true);
    }
    else{
      window.location.replace(public_urls.dashboard_venta);
    }
  };
  return (
    <>
      <VentaBaseV3
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
            (responseData) => {
              const { idVenta, idCobro } = responseData;
              setIdVenta(idVenta);
              setPrintOpen(true);
              if (idCobro){
                setIdCobro(idCobro);
              }
            },
            { ignore_fecha_retiro: 1 },
            () => {
              onFailValidation();
            },
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
      </VentaBaseV3>
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
      <Modal
        open={printPopupXOpen}
        onCancel={() => {
          setPrintPoupXOpen(false);
          window.location.replace(public_urls.dashboard_venta);
        }}
        footer={null}
        width={"1200px"}
        title="Informe X"
        destroyOnClose
      >
        <InformeX idcobro={idCobro} />
      </Modal>
    </>
  );
}

VentaDirecta.PageLayout = LayoutVentasV2;
