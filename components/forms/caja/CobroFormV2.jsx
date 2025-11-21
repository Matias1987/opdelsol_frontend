import { Button, Col, Divider, Input, Modal, Row, Spin, Switch } from "antd";
import { useEffect, useState } from "react";
import { get, post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeX from "@/components/informes/caja/InformeX";
import globals from "@/src/globals";
import CustomModal from "@/components/CustomModal";
import ListaCobros from "./ListaCobros";
import VentaDetallePopup from "@/components/VentaDetalle";
import { current_date_ymd } from "@/src/helpers/string_helper";
import {
  registrarVentaEntregada,
  registrarVentaPendiente,
  registrar_evento,
} from "@/src/helpers/evento_helper";
import ModoPagoV4 from "../modo_pago/ModoPagoV4";

/**
 *
 * @param tipo: ingreso op, resfuerzo, entrega, cuota
 * @param idcliente: cliente
 * @param idventa: venta
 * @param monto: monto
 * @param title: window's title
 * @param mustCancel: saldo must be 0
 * @param totalsHidden: hide totals
 * @param  callback: callback...
 * @param  tarjetaHidden: ...
 * @param  ctacteHidden: callback...
 * @param buttonText
 */
const CobroOperacionV2 = (props) => {
  const { callback, idventa, idcliente } = props;
  const [mp, setMP] = useState(null);
  const [entrega, setEntrega] = useState(false);
  const [dataVenta, setDataVenta] = useState(null);
  const [dataCliente, setDataCliente] = useState(null);
  const [informeOpen, setInformeOpen] = useState(false);
  const [idCobro, setIdCobro] = useState(-1);
  const [cobrarDisabled, setCobrarDisabled] = useState(false);

  const [descuento, setDescuento] = useState(0);

  useEffect(() => {
    load();
  }, []);

  const load = (_) => {
    setCobrarDisabled(false);
    setEntrega(false);
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

  const onCobroSaved = (id) => {
    if (id < 1) {
      callback?.();
      return;
    }
    setIdCobro(id);
    setInformeOpen(true);
  };

  const onClose = (msg) => {
    if (msg) {
      alert(msg);
    }
    callback?.();
  };

  const onCloseInformePopup = () => {
    callback?.();
    setInformeOpen(false);
  };

  const onMPChange = (val) => {
    setMP((_mp) => val);
  };

  const _validar_campos = (_) => {
    if (mp == null) {
      return false;
    }

    if (typeof props.tipo === "undefined") {
      alert("tipo undefined");
      return false;
    }

    if (mp.ctacte_monto != 0) {
      if (mp.ctacte_cuotas < 1) {
        //invalid number for installments
        alert("Seleccione cantidad de cuotas");
        return false;
      }
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
      if(+mp.tarjeta_tarjeta<1)
      {
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
      if(+mp.tarjeta1_tarjeta<1)
      {
        alert("Seleccione Cuotas Tarjeta 2");
        return false;
      }
    }

    return true;
  };

  const _validar_variables = (_) => {
    if (typeof props.tipo != "undefined") {
      if (props.tipo == "cuota") {
        if (+mp.total == 0) {
          alert("Monto igual a 0");
          return false;
        }
      }
      if (props.tipo == "resfuerzo") {
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
      }
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

  const _on_venta_monto_zero = (_) => {
    if (typeof props.tipo !== "undefined") {
      if (props.tipo == "entrega") {
        post_method(
          post.cambiar_estado_venta,
          {
            tk: globals.getToken(),
            idventa: dataVenta.idventa,
            estado: "ENTREGADO",
            fecha_retiro: current_date_ymd(),
          },
          (resp) => {
            onClose(null);
          }
        );
        registrarVentaEntregada(dataVenta.idventa);
      } else {
        if (entrega) {
          post_method(
            post.cambiar_estado_venta,
            {
              tk: globals.getToken(),
              idventa: dataVenta.idventa,
              estado: "ENTREGADO",
              fecha_retiro: current_date_ymd(),
            },
            (resp) => {
              onClose(null);
            }
          );
          registrarVentaEntregada(dataVenta.idventa);
        } else {
          post_method(
            post.cambiar_estado_venta,
            {
              tk: globals.getToken(),
              idventa: dataVenta.idventa,
              estado: "PENDIENTE",
            },
            (resp) => {
              onClose(null);
            }
          );
          registrarVentaPendiente(dataVenta.idventa);
        }
      }
    }
  };

  const check_valid_ctacte = () =>{
    if(!mp)
    {
      return;
    }
    
    if(!dataVenta)
    {
      return;
    }

    const {ctacte_monto} = mp;

    if(ctacte_monto==0)
    {
      return
    }

    const saldo = parseFloat(dataVenta.subtotal) - parseFloat(descuento) - parseFloat(dataVenta.haber || 0)



  }
  const onCobrarClick = (e) => {

    setCobrarDisabled(true);

    if (!_validar_campos() || !_validar_variables()) {
      setCobrarDisabled(false);
      return;
    }

    /** si hay venta pero es de monto 0*/
    if (dataVenta != null && +mp.total == 0 && dataVenta.saldo == 0) {
      //alert("On venta monto 0")
      _on_venta_monto_zero();
      return;
    }

    var params = {
      mp: mp,
      tipo: props.tipo,
      monto: mp.total,
      caja_idcaja: globals.obtenerCajaID(),
      usuario_idusuario: globals.obtenerUID(),
      sucursal_idsucursal: globals.obtenerSucursal(),
      descuento: descuento,
      fecha: current_date_ymd(),
      tk: globals.getToken(),
    };

    params =
      typeof props.idventa === "undefined"
        ? params
        : { ...params, idventa: props.idventa };
    params =
      typeof props.idcliente === "undefined"
        ? params
        : { ...params, idcliente: props.idcliente };

    const _sdo =
      typeof props.idventa === "undefined"
        ? 0
        : parseFloat(dataVenta.subtotal) -
          parseFloat(descuento) -
          parseFloat(dataVenta.haber || 0) -
          parseFloat(mp.total);
    const __tipo =
      props.tipo !== "undefined"
        ? props.tipo == "entrega" && _sdo > 0
          ? "resfuerzo"
          : props.tipo
        : "";

    params.tipo = __tipo;

    if (typeof props.tipo !== "undefined") {
      switch (__tipo) {
        case "ingreso":
          params = {
            ...params,
            accion: "ingreso",
            estado: entrega ? "entrega" : "deposito",
            removeMPRows: 1,
          };
          break;
        case "entrega":
          params = { ...params, accion: "entrega", removeCtaCteRow: 1 };
          break;
        case "resfuerzo":
          params = { ...params, accion: "resfuerzo", removeCtaCteRow: 1 };
          break;
      }
    }

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

  const on_get_caja = (params) => {
    let _sdo = 0;

    if (dataVenta != null) {
      _sdo =
        parseFloat(dataVenta.subtotal) -
        parseFloat(descuento) -
        parseFloat(dataVenta.haber || 0) -
        parseFloat(mp.total);
    }

    const __tipo =
      props.tipo !== "undefined"
        ? props.tipo == "entrega" && _sdo > 0
          ? "resfuerzo"
          : props.tipo
        : "";
      //alert(__tipo);
      //alert(JSON.stringify(params));

    post_method(post.insert.cobro, params, (id) => {

      //alert(JSON.stringify(id))

      if (id.data == 0) {
        if (dataVenta != null && __tipo != "resfuerzo") {
          let est =
            __tipo == "entrega"
              ? "ENTREGADO"
              : entrega
              ? "ENTREGADO"
              : "PENDIENTE";

          post_method(
            post.cambiar_estado_venta,
            {
              idventa: dataVenta.idventa,

              estado:
                est /*estado at this point could be entrega or ingreso  */,

              fecha_retiro: current_date_ymd(),
            },
            (resp) => {
              onCobroSaved(0);
            }
          );
          registrar_evento(
            "VENTA",
            "Cambio estado a " + est,
            dataVenta.idventa
          );
        } else {
          onCobroSaved(0);
        }
      } else {
        if (dataVenta != null && __tipo != "resfuerzo") {
          //entrega
          let est =
            __tipo == "entrega"
              ? "ENTREGADO"
              : entrega
              ? "ENTREGADO"
              : "PENDIENTE";

          post_method(
            post.cambiar_estado_venta,
            {
              idventa: dataVenta.idventa,
              estado: est,
              fecha_retiro: current_date_ymd(),
            },
            (resp) => {
              /** actualizar balance de cta cte en recibo x */

              if(+(id.data||"0")>0)
              {
                fetch(get.actualizar_saldo_en_cobro + id.data)
                .then((___response) => ___response.json())
                .then((___response) => {
                  onCobroSaved(id.data);
                });
              }
              else{
                onCobroSaved(0);
              }
              


            }
          );
          registrar_evento(
            "VENTA",
            "Cambio estado a " + est,
            dataVenta.idventa
          );
        } else {
          /**actualizar balance de cta cte en recibo x */

            if(+(id.data||"0")>0)
            {
            fetch(get.actualizar_saldo_en_cobro + id.data)
              .then((_r) => _r.json())
              .then((___response) => {
                onCobroSaved(id.data);
              });
            }
            else{
              onCobroSaved(0);
            }

        }

        registrar_evento(
          "COBRO",
          "Registro Cobro $" + mp.total.toString(),
          id.data
        );
      }
    });
  };

  const cliente_detalle = (_) =>
    dataCliente == null ? (
      <Spin />
    ) : (
      <>
        <b>Cliente:&nbsp;{dataCliente.nombre} </b> &nbsp;&nbsp; DNI:{" "}
        <b>{dataCliente.dni}</b>&nbsp; Tel&eacute;fono: {dataCliente.telefono1}
        &nbsp; Direcci&oacute;n: {dataCliente.direccion}&nbsp;
      </>
    );

  const venta_detalle = () =>
    dataVenta == null ? (
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
      </>
    );
  const estado_switch = (_) =>
    props.tipo == "ingreso" ? (
      <Row>
        <Col span={24}>
          <Divider />
          <Switch
            style={{ backgroundColor: entrega ? "green" : "red" }}
            checkedChildren="Entrega"
            unCheckedChildren="Depósito"
            checked={entrega}
            onChange={(e) => {
              setEntrega(!entrega);
            }}
          />
        </Col>
      </Row>
    ) : (
      <></>
    );

  /**
   * Para enviar a deposito sin cobrar
   */

  const enviarADepositoClick = () => {
    if (mp.total != 0) {
      alert("Monto a pagar distinto a 0");
      return;
    }
    if (!confirm("Confirmar envio a depósito")) {
      return;
    }
    /**
     * Al marcarse como deposito sin cobrar, las filas de modo de pago deben ser eliminadas!!
     */
    post_method(
      post.cambiar_estado_venta,
      { idventa: props.idventa, estado: "PENDIENTE", removeMPRows: 1 },
      (resp) => {
        onClose(null);
      }
    );
  };

  return (
    <>
      <>
        <h3>{typeof props.title === "undefined" ? "Cobro" : props.title}</h3>
        <Row>
          <Col span={24}>{cliente_detalle()}</Col>
        </Row>
        <Row>
          <Col span={24}>{venta_detalle()}</Col>
        </Row>
        <Row>
          <Col span={24}>
            <ModoPagoV4
              idventa={
                typeof props.idventa === "undefined" ? -1 : props.idventa
              }
              mostrarSoloCtaCte={props.tipo != "ingreso"}
              totalsHidden={
                typeof props.totalsHidden === "undefined"
                  ? true
                  : props.totalsHidden
              }
              callback={onMPChange}
              total={
                dataVenta == null
                  ? 0
                  : parseFloat(dataVenta.subtotal) -
                    parseFloat(descuento) -
                    parseFloat(dataVenta.haber || 0)
              }
              ctacteHidden={
                typeof props.ctacteHidden !== undefined
                  ? props.ctacteHidden
                  : false
              }
              tarjetaHidden={
                typeof props.tarjetaHidden !== undefined
                  ? props.tarjetaHidden
                  : false
              }
              chequeHidden={
                typeof props.chequeHidden !== undefined
                  ? props.chequeHidden
                  : false
              }
              mutualHidden={
                typeof props.mutualHidden !== undefined
                  ? props.mutualHidden
                  : false
              }
            />
          </Col>
        </Row>

        {estado_switch()}

        {props.tipo == "cuota" && mp != null ? (
          <Button
            type="primary"
            onClick={onCobrarClick}
            disabled={cobrarDisabled || mp.total < 1}
          >
            Cobrar
          </Button>
        ) : (
          <></>
        )}

        {dataVenta == null || mp == null ? (
          <></>
        ) : (
          <>
            <Row>
              <Col span={24}>
                <Divider />

                {
                  //entrega para ventas sin deuda
                  parseFloat(dataVenta.subtotal) -
                    parseFloat(descuento) -
                    parseFloat(dataVenta.haber || 0) ==
                    0 &&
                  mp.total == 0 &&
                  (entrega || props.tipo == "entrega") ? (
                    <Button
                      onClick={onCobrarClick}
                      disabled={cobrarDisabled}
                      danger
                    >
                      Entrega
                    </Button>
                  ) : (
                    <></>
                  )
                }
                {
                  //resfuerzo con saldo 0 posterior
                  mp.total != 0 &&
                  (props.tipo == "resfuerzo" || props.tipo == "ingreso") ? (
                    <Button
                      onClick={onCobrarClick}
                      disabled={cobrarDisabled}
                      danger
                    >
                      Cobrar
                    </Button>
                  ) : (
                    <></>
                  )
                }
                {
                  //intento de entrega pero con saldo distinto a 0
                  props.tipo == "entrega" &&
                  parseFloat(dataVenta.subtotal) -
                    parseFloat(descuento) -
                    parseFloat(dataVenta.haber || 0) -
                    +mp.total !=
                    0 &&
                  mp.total != 0 ? (
                    <Button
                      onClick={onCobrarClick}
                      disabled={cobrarDisabled}
                      danger
                    >
                      Cobro Resfuerzo
                    </Button>
                  ) : (
                    <></>
                  )
                }
                {
                  //intento de entrega pero con saldo distinto a 0
                  props.tipo == "entrega" &&
                  parseFloat(dataVenta.subtotal) -
                    parseFloat(descuento) -
                    parseFloat(dataVenta.haber || 0) !=
                    0 &&
                  parseFloat(dataVenta.subtotal) -
                    parseFloat(descuento) -
                    parseFloat(dataVenta.haber || 0) -
                    +mp.total ==
                    0 ? (
                    <Button
                      onClick={onCobrarClick}
                      disabled={cobrarDisabled}
                      danger
                    >
                      Entrega
                    </Button>
                  ) : (
                    <></>
                  )
                }
                {props.tipo == "ingreso" && !entrega ? (
                  <>
                    &nbsp;
                    <Button
                      disabled={mp.total > 0 || cobrarDisabled}
                      type="primary"
                      onClick={enviarADepositoClick}
                    >
                      Enviar a dep&oacute;sito{" "}
                    </Button>
                  </>
                ) : (
                  <></>
                )}
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

export default CobroOperacionV2;
