import {
  Button,
  Checkbox,
  Col,
  Divider,
  Flex,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import {
  CloseOutlined,
  PlusOutlined,
  RightCircleFilled,
} from "@ant-design/icons";
import { get } from "@/src/urls";
import { round_float } from "@/src/helpers/string_helper";
import { decimal_separator } from "@/src/config";
import { formatFloat } from "@/src/helpers/formatters";

/**
 *
 * @param total total ammount (required)
 * @param ctacteHidden
 * @param tarjetaHidden
 */
export default function ModoPagoV4(props) {
  const [efectivoChecked, setEfectivoChecked] = useState(false);
  const [tarjetaChecked, setTarjetaChecked] = useState(false);
  const [tarjeta1Checked, setTarjeta1Checked] = useState(false);
  const [ctacteChecked, setCtaCteChecked] = useState(false);
  const [chequeChecked, setChequeChecked] = useState(false);
  const [mutualChecked, setMutualChecked] = useState(false);
  const [transferenciaChecked, setTransferenciaChecked] = useState(false);
  const [mercadopagoChecked, setMercadoPagoChecked] = useState(false);
  const [tarjetas, setTarjetas] = useState(null);
  const [bancos, setBancos] = useState(null);
  const [mutuales, setMutuales] = useState(null);
  const [mpLoaded, setMPLoaded] = useState(false);
  const [dataCuotas, setDataCuotas] = useState([]);
  const [total, setTotal] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [modoPago, setModoPago] = useState({
    efectivo_monto: 0,
    tarjeta_monto: 0,
    tarjeta_tarjeta: 0,
    fk_tarjeta: null,
    tarjeta_nro: "0",
    fk_banco: null,
    ctacte_monto: 0,
    ctacte_cuotas: 0,
    ctacte_monto_cuotas: 0,
    ctacte_interes: 1,
    cheque_monto: 0,
    mutual_monto: 0,
    fk_mutual: null,
    total: 0,
    saldo: 0,
    mercadopago_monto: 0,
    transferencia_monto: 0,
    fk_banco_transferencia: null,
    tarjeta1_monto: 0,
    tarjeta1_tarjeta: 0,
    fk_tarjeta1: null,
    tarjeta1_nro: "0",
  });

  const fecth_data = (url, callback) => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        callback(response);
      });
  };

  const load = (_) => {
    fecth_data(get.lista_tarjetas, (response) => {
      ///
      setTarjetas(
        response.data.map((t) => ({ value: t.idtarjeta, label: t.nombre })),
      );

      fecth_data(get.lista_bancos, (response1) => {
        //
        setBancos(
          response1.data.map((r) => ({ value: r.idbanco, label: r.nombre })),
        );
        fecth_data(get.lista_mutuales, (response2) => {
          setMutuales(
            response2.data.map((r) => ({
              value: r.idmutual,
              label: (r.nombre ?? "").toUpperCase(),
            })),
          );

          fecth_data(get.obtener_interes_cuota, (response3) => {
            setDataCuotas(
              response3.data.map((r) => ({
                value: r.cantidad_cuotas,
                label: r.cantidad_cuotas,
                interes: r.interes,
                cantidad_cuotas: r.cantidad_cuotas,
              })),
            );
            //set intereses
            setDataLoaded(true);
          });
        });

        //
      });

      //
    });
  };

  const prepare_venta = () => {
    if (typeof props.idventa !== "undefined") {
      if (props.idventa > 0) {
        const _soloCtaCte =
          typeof props.mostrarSoloCtaCte === "undefined"
            ? false
            : props.mostrarSoloCtaCte;
        const __url = props.mostrarSoloCtaCte
          ? get.get_venta_mp_ctacte
          : get.get_venta_mp;
        fetch(__url + props.idventa)
          .then((response) => response.json())
          .then((response) => {
            setMPLoaded(true);
            var _temp = JSON.parse(JSON.stringify(modoPago));
            response.data.forEach((r) => {
              switch (r.modo_pago) {
                case "efectivo":
                  _temp = { ..._temp, efectivo_monto: r.monto };
                  setEfectivoChecked(true);
                  break;
                case "ctacte":
                  _temp = {
                    ..._temp,
                    ctacte_monto: r.monto,
                    ctacte_cuotas: r.cant_cuotas,
                    ctacte_monto_cuotas: r.monto_cuota,
                    ctacte_interes: 1,
                  };
                  setCtaCteChecked(true);
                  break;
                case "cheque":
                  _temp = {
                    ..._temp,
                    cheque_monto: r.monto,
                    fk_banco: r.banco_idbanco,
                  };
                  setChequeChecked(true);
                  break;
                case "mutual":
                  _temp = {
                    ..._temp,
                    mutual_monto: r.monto,
                    fk_mutual: r.mutual_idmutual,
                  };
                  setMutualChecked(true);
                  break;
                case "tarjeta":
                  _temp = {
                    ..._temp,
                    tarjeta_monto: r.monto,
                    fk_tarjeta: r.fk_tarjeta,
                    tarjeta_nro: r.tarjeta_nro,
                    tarjeta_tarjeta: r.cant_cuotas,
                  };
                  setTarjetaChecked(true);
                  break;
                case "tarjeta1":
                  _temp = {
                    ..._temp,
                    tarjeta1_monto: r.monto,
                    fk_tarjeta1: r.fk_tarjeta,
                    tarjeta1_nro: r.tarjeta_nro,
                    tarjeta1_tarjeta: r.cant_cuotas,
                  };
                  setTarjeta1Checked(true);
                  break;
                case "mercadopago":
                  _temp = { ..._temp, mercadopago_monto: r.monto };
                  setMercadoPagoChecked(true);
                  break;
                case "transferencia":
                  _temp = {
                    ..._temp,
                    transferencia_monto: r.monto,
                    fk_banco_transferencia: r.fk_banco_transferencia,
                  };
                  setTransferenciaChecked(true);
              }
            });
            setModoPago((t) => {
              _temp.total = calc_total(_temp);
              _temp.saldo = (props?.total || 0) - _temp.total;
              props?.callback?.(_temp);
              return _temp;
            });
          });
      }
    }
  };

  useEffect(() => {
    if (!dataLoaded) {
      load();
    } else {
      prepare_venta();
      if (typeof props === "undefined") {
        alert("props undefined");
      }
      if (typeof props.total === "undefined") {
        alert("total undefined");
      }
    }
  }, [dataLoaded]);

  const onChange = (index, value) => {
    setModoPago((modoPago) => {
      const _mp = { ...modoPago, [index]: value };

      _mp.total = calc_total(_mp);

      _mp.saldo = total - _mp.total;

      props?.callback?.(_mp);
      return _mp;
    });
  };

  const onChangeMontoCtaCte = (value) => {
    setModoPago((modoPago) => {
      let _total = calc_total({
        ...modoPago,
        ctacte_monto: value.length < 0 ? 0 : value,
        ctacte_cuotas: 0,
        ctacte_monto_cuotas: 0,
      });

      const _mp = {
        ...modoPago,
        ["ctacte_monto"]: value.length < 1 ? 0 : value,
        ["ctacte_cuotas"]: 0,
        ["ctacte_monto_cuotas"]: 0,
        ["total"]: _total,
        ["saldo"]: total - _total,
      };

      props?.callback?.(_mp);
      return _mp;
    });
  };

  const calc_total = (__mp) =>
    parseFloat(__mp.cheque_monto || 0) +
    parseFloat(__mp.ctacte_monto || 0) + //parseFloat(__mp.ctacte_cuotas||0) * parseFloat(__mp.ctacte_monto_cuotas||0)+
    parseFloat(__mp.tarjeta_monto || 0) +
    parseFloat(__mp.tarjeta1_monto || 0) +
    parseFloat(__mp.mutual_monto || 0) +
    parseFloat(__mp.efectivo_monto || 0) +
    parseFloat(__mp.mercadopago_monto || 0) +
    parseFloat(__mp.transferencia_monto || 0);

  const checkbox_style = {
    border: "1px dotted #d4d4d4",
    padding: "4px",
    borderRadius: "4px",
    backgroundColor: "#f5f3f3",
  };

  const mp_row_style = {
    padding: "6px",
    borderRadius: "4px",
    marginTop: "2px",
    marginBottom: "2px",
    border: "1px dotted #1C221c35",
    backgroundColor: "rgba(229, 229, 243, 0.5)",
  };

  return !dataLoaded ? (
    <Spin />
  ) : (
    <div
      style={{
        border: "1px solid #e4e4e4",
        padding: "6px",
        borderRadius: "6px",
      }}
    >
      <Row style={{ paddingBottom: "8px" }}>
        <Col span={24}>
          <span
            style={{ fontWeight: "600", color: "#0e0035", fontSize: "1.1em" }}
          >
            Seleccione Modo de Pago:
          </span>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col>
          <Checkbox
            style={checkbox_style}
            checked={efectivoChecked}
            onChange={(e) => {
              setEfectivoChecked(!efectivoChecked);

              if (false == e.target.checked) {
                //reset efectivo values
                onChange("efectivo_monto", 0);
              }
            }}
          >
            Efectivo
          </Checkbox>
        </Col>
        <Col>
          <Checkbox
            style={checkbox_style}
            disabled={props.tarjetaHidden}
            checked={tarjetaChecked}
            onChange={(e) => {
              setTarjetaChecked(!tarjetaChecked);
              if (false == e.target.checked) {
                onChange("tarjeta_monto", 0);
                onChange("tarjeta1_monto", 0);
                setTarjeta1Checked(false);
              }
            }}
          >
            Tarjeta
          </Checkbox>
        </Col>
        <Col>
          <Checkbox
            style={checkbox_style}
            disabled={props.ctacteHidden}
            checked={ctacteChecked}
            onChange={(e) => {
              setCtaCteChecked(!ctacteChecked);
              if (false == e.target.checked) {
                onChangeMontoCtaCte(0);
              }
            }}
          >
            CtaCte
          </Checkbox>
        </Col>
        <Col>
          <Checkbox
            style={checkbox_style}
            disabled={props.chequeHidden}
            checked={chequeChecked}
            onChange={(e) => {
              setChequeChecked(!chequeChecked);
              if (false == e.target.checked) {
                onChange("cheque_monto", 0);
              }
            }}
          >
            Cheque
          </Checkbox>
        </Col>
        <Col>
          <Checkbox
            style={checkbox_style}
            disabled={props.mutualHidden}
            checked={mutualChecked}
            onChange={(e) => {
              setMutualChecked(!mutualChecked);
              if (false == e.target.checked) {
                onChange("mutual_monto", 0);
              }
            }}
          >
            Mutual
          </Checkbox>
        </Col>
        <Col>
          <Checkbox
            style={checkbox_style}
            checked={mercadopagoChecked}
            onChange={(e) => {
              setMercadoPagoChecked(!mercadopagoChecked);
              if (false == e.target.checked) {
                onChange("mercadopago_monto", 0);
              }
            }}
          >
            MercadoPago
          </Checkbox>
        </Col>
        <Col>
          <Checkbox
            style={checkbox_style}
            checked={transferenciaChecked}
            onChange={(e) => {
              setTransferenciaChecked(!transferenciaChecked);
              if (false == e.target.checked) {
                onChange("transferencia_monto", 0);
              }
            }}
          >
            Transferencia
          </Checkbox>
        </Col>
      </Row>

      <>
        <Row
          gutter={[8, 8]}
          style={{
            ...mp_row_style,
            display: efectivoChecked ? "flex" : "none",
          }}
        >
          <Col>
            <InputNumber
              size="large"
              style={{ width: "250px" }}
              decimalSeparator={decimal_separator}
              onClick={(e) => {
                e.target.select();
              }}
              value={modoPago.efectivo_monto}
              prefix={
                <span style={{ fontWeight: "600" }}>Monto Efectivo: </span>
              }
              onChange={(value) => {
                onChange(
                  "efectivo_monto",
                  (value || "").toString().length < 1 ? "0" : value.toString(),
                );
              }}
            />
          </Col>
        </Row>

        <Row
          gutter={[8, 8]}
          style={{
            ...mp_row_style,
            display: tarjetaChecked ? "flex" : "none",
          }}
        >
          <Col>
            <InputNumber
              size="large"
              style={{ width: "250px" }}
              decimalSeparator={decimal_separator}
              onClick={(e) => {
                e.target.select();
              }}
              value={modoPago.tarjeta_monto}
              prefix={
                <span style={{ fontWeight: "600" }}>Monto Tarjeta: </span>
              }
              onChange={(value) => {
                onChange(
                  "tarjeta_monto",
                  (value || "").toString().length < 1 ? "0" : value.toString(),
                );
              }}
            />
          </Col>
          <Col>
            <Select
              size="large"
              prefix="Tarjeta"
              showSearch
              placeholder="Seleccione Tarjeta"
              value={modoPago.fk_tarjeta}
              options={tarjetas}
              style={{ width: "250px" }}
              onChange={(value) => {
                onChange("fk_tarjeta", value);
              }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toUpperCase() ?? "").includes(
                  input.toUpperCase(),
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
            />
          </Col>

          <Col>
            <Input
              value={modoPago.tarjeta_tarjeta}
              onClick={(e) => {
                e.target.select();
              }}
              prefix="C. Cuotas: "
              onChange={(e) => {
                onChange("tarjeta_tarjeta", e.target.value);
              }}
            ></Input>
          </Col>
          <Col>
            {tarjeta1Checked ? (
              <></>
            ) : (
              <Button
                danger
                onClick={(_) => {
                  setTarjeta1Checked(true);
                }}
              >
                <PlusOutlined />
              </Button>
            )}
          </Col>
        </Row>
        <Row
          gutter={[8, 8]}
          style={{
            ...mp_row_style,
            display: tarjeta1Checked ? "flex" : "none",
          }}
        >
          <Col>
            <InputNumber
              size="large"
              style={{ width: "250px" }}
              decimalSeparator={decimal_separator}
              onClick={(e) => {
                e.target.select();
              }}
              value={modoPago.tarjeta1_monto}
              onChange={(value) => {
                onChange(
                  "tarjeta1_monto",
                  (value || "").toString().length < 1 ? 0 : value,
                );
              }}
            />
          </Col>
          <Col>
            <Select
              size="large"
              prefix="Tarjeta"
              showSearch
              placeholder="Seleccione Tarjeta"
              value={modoPago.fk_tarjeta1}
              options={tarjetas}
              style={{ width: "250px" }}
              onChange={(value) => {
                onChange("fk_tarjeta1", value);
              }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toUpperCase() ?? "").includes(
                  input.toUpperCase(),
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
            />
          </Col>

          <Col>
            <Input
              value={modoPago.tarjeta1_tarjeta}
              onClick={(e) => {
                e.target.select();
              }}
              prefix="C. Cuotas: "
              onChange={(e) => {
                onChange("tarjeta1_tarjeta", e.target.value);
              }}
            ></Input>
          </Col>
          <Col>
            {!tarjeta1Checked ? (
              <></>
            ) : (
              <Button
                danger
                onClick={(_) => {
                  onChange("tarjeta1_monto", 0);
                  setTarjeta1Checked(false);
                }}
              >
                <CloseOutlined />
              </Button>
            )}
          </Col>
        </Row>

        <Row
          gutter={[8, 8]}
          style={{
            ...mp_row_style,
            display: ctacteChecked ? "flex" : "none",
          }}
        >
          <Col>
            <InputNumber
              size="large"
              style={{ width: "250px" }}
              decimalSeparator={decimal_separator}
              onClick={(e) => {
                e.target.select();
              }}
              value={modoPago.ctacte_monto}
              prefix={
                <span style={{ fontWeight: "600" }}>Monto Cta. Cte.:</span>
              }
              onChange={(value) => {
                onChangeMontoCtaCte(
                  (value || "").toString().length < 1 ? "0" : value.toString(),
                );
              }}
            />
          </Col>

          <Col>
            <Select
              size="large"
              prefix="Cuotas"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.label.toString() == input.toString()
              }
              options={dataCuotas}
              value={modoPago.ctacte_cuotas}
              onChange={(v) => {
                const _i = dataCuotas.find((r) => +r.cantidad_cuotas == +v);
                if (_i) {
                  setModoPago((modoPago) => {
                    const _monto_cuotas = parseFloat(
                      (
                        parseFloat(_i.interes) *
                        (parseFloat(modoPago.ctacte_monto) / parseFloat(v))
                      ).toFixed(2),
                    );

                    let _total = calc_total({
                      ...modoPago,
                      ctacte_monto_cuotas: _monto_cuotas,
                      ctacte_cuotas: v,
                    });

                    const _mp = {
                      ...modoPago,
                      ["ctacte_interes"]: _i.interes,
                      ["ctacte_cuotas"]: v,
                      ["ctacte_monto_cuotas"]: _monto_cuotas.toFixed(4),
                      ["total"]: _total,
                      ["saldo"]: total - _total,
                    };

                    props?.callback?.(_mp);
                    return _mp;
                  });
                }
              }}
            />
          </Col>
          <Col>
            {/*<Input onWheel={(e)=>{e.target.blur()}} type="number" readOnly={false} onClick={(e)=>{e.target.select()}} value={modoPago.ctacte_monto_cuotas}  prefix="Valor Cuota: " onChange={(e)=>{onChange("ctacte_monto_cuotas", (e.target.value))}}></Input>*/}
            <InputNumber
              size="large"
              style={{ width: "300px" }}
              decimalSeparator={decimal_separator}
              prefix="Valor Cuota: "
              onWheel={(e) => {
                e.target.blur();
              }}
              value={modoPago.ctacte_monto_cuotas}
              onChange={(value) => {
                onChange(
                  "ctacte_monto_cuotas",
                  (value || "").toString().length < 1 ? "0" : value.toString(),
                );
              }}
            />
          </Col>
        </Row>
        <Row
          gutter={[8, 8]}
          style={{
            ...mp_row_style,
            display: chequeChecked ? "flex" : "none",
          }}
        >
          <Col>
            <InputNumber
              size="large"
              style={{ width: "250px" }}
              decimalSeparator={decimal_separator}
              onClick={(e) => {
                e.target.select();
              }}
              value={modoPago.cheque_monto}
              prefix={<span style={{ fontWeight: "600" }}>Monto Cheque:</span>}
              onChange={(value) => {
                onChange(
                  "cheque_monto",
                  (value || "").toString().length < 1 ? "0" : value.toString(),
                );
              }}
            />
          </Col>
          <Col>
            <Select
              prefix={<span style={{ fontWeight: "600" }}>Banco:</span>}
              size="large"
              showSearch
              value={modoPago.fk_banco}
              placeholder="Seleccione Banco"
              style={{ width: "300px" }}
              options={bancos}
              onChange={(value) => {
                onChange("fk_banco", value);
              }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toUpperCase() ?? "").includes(
                  input.toUpperCase(),
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
            />
          </Col>
        </Row>

        <Row
          gutter={[8, 8]}
          style={{
            ...mp_row_style,
            display: mutualChecked ? "flex" : "none",
          }}
        >
          <Col>
            <InputNumber
              size="large"
              style={{ width: "250px" }}
              decimalSeparator={decimal_separator}
              onClick={(e) => {
                e.target.select();
              }}
              value={modoPago.mutual_monto}
              prefix={<span style={{ fontWeight: "600" }}>Monto Mutual: </span>}
              onChange={(value) => {
                onChange(
                  "mutual_monto",
                  (value || "").toString().length < 1 ? "0" : value.toString(),
                );
              }}
            />
          </Col>
          <Col>
            <Select
              showSearch
              placeholder="Seleccione Mutual"
              style={{ width: "300px" }}
              value={modoPago.fk_mutual}
              options={mutuales}
              size="large"
              prefix="Mutual: "
              onChange={(v) => {
                onChange("fk_mutual", v);
              }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toUpperCase() ?? "").includes(
                  input.toUpperCase(),
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
            />
          </Col>
        </Row>
        <Row
          gutter={[8, 8]}
          style={{
            ...mp_row_style,
            display: mercadopagoChecked ? "flex" : "none",
          }}
        >
          <Col>
            <InputNumber
              size="large"
              style={{ width: "250px" }}
              decimalSeparator={decimal_separator}
              onClick={(e) => {
                e.target.select();
              }}
              value={modoPago.mercadopago_monto}
              prefix={<span style={{ fontWeight: "600" }}>Monto M.P.: </span>}
              onChange={(value) => {
                onChange(
                  "mercadopago_monto",
                  (value || "").toString().length < 1 ? "0" : value.toString(),
                );
              }}
            />
          </Col>
        </Row>
        <Row
          gutter={[8, 8]}
          style={{
            ...mp_row_style,
            display: transferenciaChecked ? "flex" : "none",
          }}
        >
          <Col>
            <InputNumber
              size="large"
              style={{ width: "250px" }}
              decimalSeparator={decimal_separator}
              onClick={(e) => {
                e.target.select();
              }}
              value={modoPago.transferencia_monto}
              prefix={
                <span style={{ fontWeight: "600" }}>Monto Transf.: </span>
              }
              onChange={(value) => {
                onChange(
                  "transferencia_monto",
                  (value || "").toString().length < 1 ? "0" : value.toString(),
                );
              }}
            />
          </Col>
          <Col>
            <Select
              prefix={<span style={{ fontWeight: "600" }}>Banco:</span>}
              size="large"
              showSearch
              value={modoPago.fk_banco_transferencia}
              placeholder="Seleccione Banco"
              style={{ width: "300px" }}
              options={bancos}
              onChange={(value) => {
                onChange("fk_banco_transferencia", value);
              }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toUpperCase() ?? "").includes(
                  input.toUpperCase(),
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
            />
          </Col>
        </Row>

        {props.totalsHidden ? (
          <Row>
            <Col span={24}>
              <Flex align="flex-start" justify="end">
                <Input
                  variant="borderless"
                  style={{
                    color: "red",
                    fontSize: "1.5em",
                    fontWeight: "600",
                    width: "300px",
                  }}
                  readOnly
                  size="large"
                  prefix="Total: $"
                  value={formatFloat(parseFloat(modoPago.total || "0"))}
                />
              </Flex>
            </Col>
          </Row>
        ) : (
          <Row gutter={[16, 16]} style={{ paddingTop: "16px" }}>
            <Col>
              <Input
                readOnly
                prefix="Total a Pagar"
                style={{ color: "red", fontSize: "1.1em", fontWeight: "600" }}
                value={formatFloat(props.total)}
              />
            </Col>
            <Col>
              <Input
                readOnly
                prefix="Pago Total"
                style={{ color: "red", fontSize: "1.1em", fontWeight: "600" }}
                value={formatFloat(modoPago.total)}
              />
            </Col>
            <Col>
              <Input
                readOnly
                prefix="Saldo"
                style={{
                  color: "red",
                  fontWeight: "bold",
                  backgroundColor: "rgba(255, 99, 71, 0.2)",
                }}
                value={formatFloat(
                  (typeof props.total === "undefined" ? 0 : props.total) -
                    modoPago.total,
                )}
              />
            </Col>
          </Row>
        )}
      </>
    </div>
  );
}
