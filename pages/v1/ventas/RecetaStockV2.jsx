import { useEffect, useState } from "react";
import { public_urls } from "@/src/urls";
import globals from "@/src/globals";
import { submit_venta } from "@/src/helpers/ventas_helper";
import { Modal } from "antd";
import PrinterWrapper from "@/components/PrinterWrapper";
import { usar_correcciones_recstock } from "@/src/config";
import dynamic from "next/dynamic";
import LayoutVentasV2 from "@/components/layout/layout_ventas_v2";

const RecetaStockItems = dynamic(
  () => import("@/components/forms/ventas/receta_stock/Items"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);
const RecetaStockItemsB = dynamic(
  () => import("@/components/forms/ventas/receta_stock/items_b"),
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
const InformeX = dynamic(() => import("@/components/informes/caja/InformeX"), {
  ssr: false,
  loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
});
const VentaBaseV3 = dynamic(
  () => import("@/components/forms/ventas/VentaBaseV3"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);

export default function VentaRecetaStock() {
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [venta, setVenta] = useState(null);
  const [productos, setProductos] = useState(null);
  const [idVenta, setIdVenta] = useState(-1);
  const [printOpen, setPrintOpen] = useState(false);
  const [printPopupXOpen, setPrintPoupXOpen] = useState(false);
  const [idCobro, setIdCobro] = useState(-1);
  const [usarCorreccionesRecstock, setUsarCorreccionesRecstock] =
    useState(false);

  useEffect(() => {
    setUsarCorreccionesRecstock(usar_correcciones_recstock);
  }, []);

  const callback = (productos) => {
    //alert("en la venta" + JSON.stringify(productos))
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
    if (idCobro > 0) {
      setPrintPoupXOpen(true);
    } else {
      window.location.replace(public_urls.dashboard_venta);
    }
  };

  return (
    <>
      <VentaBaseV3
        title={"Venta de Receta Stock"}
        medicoRequired={true}
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
              const { idVenta, idCobro } = responseData;
              setIdVenta(idVenta);
              setPrintOpen(true);
              if (idCobro) {
                setIdCobro(idCobro);
              }
            },
            {},
            (_) => {
              onFailValidation();
            },

            true, //medico required
          );
        }}
      >
        {usarCorreccionesRecstock ? (
          <RecetaStockItemsB callback={callback} />
        ) : (
          <RecetaStockItems callback={callback} />
        )}
      </VentaBaseV3>
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
VentaRecetaStock.PageLayout = LayoutVentasV2;
