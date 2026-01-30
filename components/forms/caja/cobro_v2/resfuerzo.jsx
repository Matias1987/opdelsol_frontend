import {
  Button,
  Col,
  Divider,
  Input,
  InputNumber,
  Modal,
  Row,
  Spin,
  Switch,
} from "antd";
import ClienteDetalleCobro from "./common/cliente_detalle";
import ModoPagoV4 from "../../modo_pago/ModoPagoV4";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeX from "@/components/informes/caja/InformeX";
import { useEffect, useState } from "react";
import globals from "@/src/globals";
import { current_date_ymd } from "@/src/helpers/string_helper";
import { get, post } from "@/src/urls";
import VentaDetallePopup from "@/components/VentaDetalle";
import CustomModal from "@/components/CustomModal";
import ListaCobros from "../ListaCobros";
import { post_method } from "@/src/helpers/post_helper";
import { registrar_evento } from "@/src/helpers/evento_helper";
import { decimal_separator } from "@/src/config";
import { formatFloat } from "@/src/helpers/formatters";
const Resfuerzo = (props) => {
  const { callback, idventa, idcliente, title } = props;
  const [mp, setMP] = useState(null);
  const [cobrarDisabled, setCobrarDisabled] = useState(false);
  const [dataVenta, setDataVenta] = useState(null);
  const [dataCliente, setDataCliente] = useState(null);
  const [idCobro, setIdCobro] = useState(-1);
  const [descuento, setDescuento] = useState(0);
  const [informeOpen, setInformeOpen] = useState(false);

  const onCobroSaved = (id) => {
    if (id < 1) {
      callback?.();
      return;
    }
    setIdCobro(id);
    setInformeOpen(true);
  };

  const onCloseInformePopup = () => {
    callback?.();
    setInformeOpen(false);
  };

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

    //if (typeof props.tipo === "undefined") {
    //  alert("tipo undefined");
    //  return false;
    //}

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

      if (+mp.total == 0 && _sdo != 0) {
        alert("Monto igual a 0");
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
      removeCtaCteRow: 1,
    };

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
  };

  const onMPChange = (val) => {
    setMP((_mp) => val);
  };

  const row_style = {paddingTop: "5px", paddingBottom: "5px"};

  const venta_detalle = () =>
    dataVenta == null ? (
      <></>
    ) : (
      <>
        <Row style={row_style} gutter={16}>
          <Col>
            Nro. Venta: {dataVenta.idventa}{" "}
            <VentaDetallePopup idventa={dataVenta.idventa} /> &nbsp;&nbsp;&nbsp;
            Fecha: {dataVenta.fecha_formated}
          </Col>
        </Row>
        <Row style={row_style} gutter={16}>
          <Col>
            Monto: <b>{formatFloat(dataVenta.subtotal)}</b> &nbsp;&nbsp;
          </Col>
        </Row>
        <Row style={row_style} gutter={16}>
          <Col>
            <InputNumber
              onClick={(e) => {
                e.target.select();
              }}
              style={{ width: "300px" }}
              decimalSeparator={decimal_separator}
              prefix={"Descuento:"}
              value={descuento}
              onChange={(value) => {
                setDescuento(
                  (value || "").toString().length < 1 ? "0" : value.toString()
                );
              }}
            />
          </Col>
        </Row>
        <Row style={row_style} gutter={16}>
          <Col>
            Haber: <b>{formatFloat(dataVenta.haber)}</b> &nbsp;&nbsp;
          </Col>
          <Col>
            <span style={{ backgroundColor: "lightyellow", color: "red" }}>
              Saldo:{" "}
              <b>
                {formatFloat(
                  parseFloat(dataVenta.subtotal) -
                    parseFloat(descuento) -
                    parseFloat(dataVenta.haber || 0)
                )}
              </b>
            </span>
          </Col>
        </Row>

        <CustomModal
          title={"Cobros Venta Nro.: " + dataVenta.idventa}
          openButtonText="Ver Cobros"
        >
          <ListaCobros idventa={dataVenta.idventa} readOnly={true} />
        </CustomModal>
      </>
    );

  useEffect(() => {
    load();
  }, []);

  const on_get_caja = (params) => {
    post_method(post.insert.cobro, params, (id) => {
      if (+(id.data || "0") > 0) {
        fetch(get.actualizar_saldo_en_cobro + id.data)
          .then((_r) => _r.json())
          .then((___response) => {
            onCobroSaved(id.data);
          });

        registrar_evento(
          "COBRO",
          "Registro Cobro $" + mp.total.toString(),
          id.data
        );
      } else {
        onCobroSaved(0);
      }
    });
  };

  return (
    <>
      <>
        <h3>{typeof title === "undefined" ? "Cobro" : title}</h3>
        <Row>
          <Col span={24}>
            <ClienteDetalleCobro dataCliente={dataCliente} />
            &nbsp;
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {venta_detalle()}
            &nbsp;
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
              tarjetaHidden={false}
              chequeHidden={false}
              mutualHidden={false}
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
