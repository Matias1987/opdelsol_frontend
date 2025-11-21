import CustomModal from "@/components/CustomModal";
import VentaDetallePopup from "@/components/VentaDetalle";
import { Input } from "antd";
import { useState } from "react";

const VentaDetalleCobro = ({dataVenta}) => {
    const [descuento, setDescuento] = useState(0)
    return dataVenta == null ? (
      <></>
    ) : (
      <>
        <p>
          Nro. Venta: {dataVenta.idventa} &nbsp;&nbsp;&nbsp; Fecha:{" "}
          {dataVenta.fecha_formated}
        </p>
        <p>
          Monto: <b>{dataVenta.subtotal}</b> &nbsp;&nbsp;
          <Input
            type="number"
            prefix={"Descuento:"}
            value={descuento}
            onChange={(e) => {
              setDescuento(
                (e.target.value.length < 1 ? "0" : e.target.value)
              );
            }}
          />
          Haber: <b>{dataVenta.haber}</b> &nbsp;&nbsp;
          <span style={{ backgroundColor: "lightyellow", color: "red" }}>
            Saldo:{" "}
            <b>
              {(parseFloat(dataVenta.subtotal) -
                parseFloat(descuento) -
                parseFloat(dataVenta.haber || 0)).toFixed(2)}
            </b>
          </span>
          &nbsp;&nbsp;
          <VentaDetallePopup idventa={dataVenta.idventa} />
        </p>
        &nbsp;&nbsp;
        <CustomModal
          title={"Cobros Venta Nro.: " + dataVenta.idventa}
          openButtonText="Ver Cobros"
        >
          <ListaCobros idventa={dataVenta.idventa} readOnly={true} />
        </CustomModal>
      </>)
}

export default VentaDetalleCobro;