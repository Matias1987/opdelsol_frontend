import { Button, Col, Divider, Input, Modal, Row, Spin, Switch } from "antd";
import ClienteDetalleCobro from "./common/cliente_detalle";
import VentaDetalleCobro from "./common/venta_detalle_cobro";
import ModoPagoV4 from "../../modo_pago/ModoPagoV4";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeX from "@/components/informes/caja/InformeX";
import { useEffect, useState } from "react";
import globals from "@/src/globals";
import { current_date_ymd } from "@/src/helpers/string_helper";

const Resfuerzo = (props) => {
  const { callback, idventa, idcliente, title } = props;
  const [mp, setMP] = useState(null);
  const [cobrarDisabled, setCobrarDisabled] = useState(false);
  const [dataVenta, setDataVenta] = useState(null);
  const [dataCliente, setDataCliente] = useState(null);
  const [idCobro, setIdCobro] = useState(-1);
  const [descuento, setDescuento] = useState(0);

  const load = (_) => {
    setCobrarDisabled(false);
    setMP(null);
    if (idventa) {
      //get venta details
      fetch(get.venta + props.idventa)
        .then((response) => response.json())
        .then((response) => {
          setDescuento(response.data[0].descuento);
          setDataVenta((d) => {
            return response.data[0];
          });
        });
    }
    if (idcliente) {
      //get cliente details
      fetch(get.cliente_por_id + props.idcliente)
        .then((response) => response.json())
        .then((response) => {
          setDataCliente({
            nombre: response.data[0].nombre_completo,
            dni: response.data[0].dni,
            telefono1: response.data[0].telefono1,
            direccion: response.data[0].direccion,
          });
        });
    }
  };

  const _validar_campos = (_) => {
    if (mp == null) {
      return false;
    }

    if (typeof props.tipo === "undefined") {
      alert("tipo undefined");
      return false;
    }

    if (mp.transferencia_monto != 0) {
      if (mp.fk_banco_transferencia == null) {
        //invalid bank
        alert("Seleccione Banco");
        return false;
      }
    }

    if (mp.cheque_monto != 0) {
      if (mp.fk_banco == null) {
        //invalid bank
        alert("Seleccione Banco");
        return false;
      }
    }

    if (mp.tarjeta_monto != 0) {
      if (mp.fk_tarjeta == null) {
        //invalid credit card
        alert("Seleccione Tarjeta");
        return false;
      }
      if (+mp.tarjeta_tarjeta < 1) {
        alert("Seleccione Cuotas Tarjeta 1");
        return false;
      }
    }
    if (mp.tarjeta1_monto != 0) {
      if (mp.fk_tarjeta1 == null) {
        //invalid credit card
        alert("Seleccione Tarjeta");
        return false;
      }
      if (+mp.tarjeta1_tarjeta < 1) {
        alert("Seleccione Cuotas Tarjeta 2");
        return false;
      }
    }

    return true;
  };

  const _validar_variables = (_) => {
    if (
      parseFloat(dataVenta.subtotal) -
        parseFloat(descuento) -
        parseFloat(dataVenta.haber || 0) <=
      0
    ) {
      alert("Saldo igual a 0");
      return false;
    }
    if (+mp.total == 0) {
      alert("Monto igual a 0");
      return false;
    }
    if (dataVenta != null) {
      const _sdo =
        parseFloat(dataVenta.subtotal) -
        parseFloat(descuento) -
        parseFloat(dataVenta.haber || 0) -
        parseFloat(mp.total);

      const _mc =
        typeof props.mustCancel !== "undefined" ? props.mustCancel : false;

      if (+mp.total == 0 && _sdo != 0) {
        alert("Monto igual a 0");
        return false;
      }

      if ((entrega || _mc) && _sdo != 0) {
        alert("Saldo distinto a 0");
        return false;
      }
      if (_sdo < 0) {
        alert("Saldo menor a cero");
        return false;
      }
    }
    return true;
  };

  const onCobrarClick = (e) => {

    setCobrarDisabled(true);

    if (!_validar_campos() || !_validar_variables()) {
      setCobrarDisabled(false);
      return;
    }

    var params = {
      mp: mp,
      monto: mp.total,
      caja_idcaja: globals.obtenerCajaID(),
      usuario_idusuario: globals.obtenerUID(),
      sucursal_idsucursal: globals.obtenerSucursal(),
      descuento: descuento,
      fecha: current_date_ymd(),
      tk: globals.getToken(),
      idventa: idventa,
      idcliente: idcliente,  
      tipo: "resfuerzo",
      accion: "resfuerzo", 
      removeCtaCteRow: 1
    };

    const _sdo = parseFloat(dataVenta.subtotal) -
        parseFloat(descuento) -
        parseFloat(dataVenta.haber || 0) -
        parseFloat(mp.total);

    globals.obtenerCajaAsync((response) => {
      if (response == null) {
        alert("Caja cerrada o desactualizada.");
        setCobrarDisabled(false);
        return;
      }

      if (!confirm("Confirmar Operación")) {
        setCobrarDisabled(false);
        return;
      }

      params.caja_idcaja = response.idcaja;

      on_get_caja(params);
    });

  }

  const onMPChange = (val) => {
    setMP((_mp) => val);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <>
        <h3>{typeof title === "undefined" ? "Cobro" : title}</h3>
        <Row>
          <Col span={24}>
            <ClienteDetalleCobro dataCliente={null} />{" "}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <VentaDetalleCobro dataVenta={null} />{" "}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ModoPagoV4
              idventa={typeof idventa === "undefined" ? -1 : idventa}
              mostrarSoloCtaCte={true}
              totalsHidden={false}
              callback={onMPChange}
              total={
                dataVenta == null
                  ? 0
                  : parseFloat(dataVenta.subtotal) -
                    parseFloat(descuento) -
                    parseFloat(dataVenta.haber || 0)
              }
              ctacteHidden={true}
              tarjetaHidden={true}
              chequeHidden={true}
              mutualHidden={true}
            />
          </Col>
        </Row>
        {dataVenta == null || mp == null ? (
          <></>
        ) : (
          <>
            <Row>
              <Col span={24}>
                <Divider />
                <Button
                  onClick={onCobrarClick}
                  disabled={cobrarDisabled}
                  danger
                >
                  Cobrar
                </Button>
              </Col>
            </Row>
          </>
        )}
      </>
      {/* informe x */}
      <Modal
        maskClosable={false}
        width={"800px"}
        title={"Recibo X"}
        open={informeOpen}
        onOk={() => {
          setInformeOpen(false);
        }}
        onCancel={onCloseInformePopup}
        destroyOnClose={true}
        footer={null}
      >
        <PrinterWrapper>
          <InformeX idcobro={idCobro} />
        </PrinterWrapper>
      </Modal>
    </>
  );
};

export default Resfuerzo;
