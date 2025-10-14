import FacturaSelect from "@/components/FacturaSelect";
import FacturaSelect2 from "@/components/FacturaSelect2";
import { post_method } from "@/src/helpers/post_helper";
import { parse_int_string } from "@/src/helpers/string_helper";
import { get, post } from "@/src/urls";
import { Button, Checkbox, Col, Input, Modal, Row, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import EditarCodigoIndiv from "./EditarCodigoIndiv";
import { EditOutlined } from "@ant-design/icons";
/**
 *
 * @param nrofactura
 * @param idfactura
 *
 */
const EditarStockIndiv = (props) => {
  const [stock, setStock] = useState(null);
  const [open, setOpen] = useState(false);
  const [codigo, setCodigo] = useState(null);
  const [selFactura, setSelFactura] = useState(null);
  const [editarCosto, setEditarCosto] = useState(false);
  const [incrementarCantidad, setIncrementarCantidad] = useState(false);
  const [cantInput, setCantInput] = useState(0);
  const [costo, setCosto] = useState(0);
  const [modalEditarCodigoOpen, setModalEditarCodigoOpen] = useState(false);

  const onOpen = () => {
    //alert(JSON.stringify(props.factura))
    setCantInput(0);
    setOpen(true);
    setEditarCosto(false);
    setSelFactura(
      typeof props.factura === "undefined" || props.factura === null
        ? -1
        : props.factura
    );
    fetch(get.obtener_stock_sucursal + `${props.idsucursal}/${props.idcodigo}`)
      .then((r) => r.json())
      .then((response) => {
        setStock({
          ...response.data[0],
          cant_ant: response.data[0].cantidad,
          cant_modif: 0,
          cantidad: 0,
        });
      });

    fetch(get.detalle_codigo + props.idcodigo)
      .then((r) => r.json())
      .then((response) => {
        setCodigo({
          idcodigo: response.data[0].idcodigo,
          codigo: response.data[0].codigo,
          //costo: response.data[0].costo,

          precio: response.data[0].precio,
          descripcion: response.data[0].descripcion,
        });
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const guardarCambios = () => {
    if (stock.cantidad < 0) {
      return alert("La cantidad no puede ser negativa");
    }

    if (stock.cantidad < 1) {
      if (!window.confirm("La cantidad quedará en 0. Desea continuar?")) {
        return;
      }
    }

    let _idfactura =
      props.factura != null
        ? props.factura.idfactura
        : selFactura == null
        ? -1
        : selFactura.idfactura;

    post_method(
      post.update.modificar_cantidad_stock,
      {
        idfactura: _idfactura,
        cantidad: stock.cantidad,
        fksucursal: props.idsucursal,
        idcodigo: props.idcodigo,
        costo: editarCosto ? (isNaN(costo) ? 0 : parseFloat(costo)) : -1,
        cant_modif: stock.cant_modif,
      },
      (response) => {
        alert("Cambios guardados");
        props?.callback?.();
        setOpen(false);
      }
    );
  };

  const actualizar_cantidad = (v, inc) => {
    setStock((s) => ({
      ...s,
      cant_modif: +parse_int_string((v.toString() || "").toString()),
      cantidad:
        (inc ? parseInt(stock.cant_ant) : 0) +
        parse_int_string((v.toString() || "").toString()),
    }));
  };

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <>
      {stock == null || codigo == null ? (
        <Spin />
      ) : (
        <>
          <Row style={{ padding: "1em" }}>
            <Col span={24}>
              <Input
                style={{ backgroundColor: "lightyellow" }}
                readOnly
                prefix="Código: "
                value={codigo.codigo}
                suffix={<><span style={{fontWeight:"bold", color:"red", fontSize:"1.5em"}}><EditOutlined onClick={() => setModalEditarCodigoOpen(true)} /></span></>}
              />
            </Col>
          </Row>

          {props.factura == null ? (
            <Row style={{ padding: "1em" }}>
              <Col span={24}>
                Factura: (Opcional)&nbsp;
                <FacturaSelect2
                  callback={(_factura) => {
                    setSelFactura(_factura);
                  }}
                />
              </Col>
            </Row>
          ) : (
            <Row style={{ padding: "1em" }}>
              <Col span={24}>
                <Tag color="geekblue-inverse" style={{ fontSize: "1.25em" }}>
                  {" "}
                  Factura: {props.factura.nro}{" "}
                </Tag>
              </Col>
            </Row>
          )}
          <Row style={{ padding: "1em" }} gutter={16}>
            <Col>
              <Input
                prefix={
                  <Checkbox
                    onChange={() => {
                      setEditarCosto(!editarCosto);
                    }}
                    checked={editarCosto}
                  >
                    Costo
                  </Checkbox>
                }
                type="number"
                disabled={!editarCosto}
                value={costo}
                onChange={(e) => {
                  setCosto(e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row style={{ padding: "1em" }}>
            <Col span={24}>
              <Input
                style={{ backgroundColor: "#f1f1f1ff" }}
                readOnly
                prefix={<b>Cantidad Actual: </b>}
                value={stock.cant_ant}
              />
            </Col>
          </Row>
          <Row style={{ padding: "1em" }} gutter={16}>
            <Col>
              <Input
                style={{ backgroundColor: "#ffffff" }}
                prefix={
                  <>
                    <Checkbox
                      checked={incrementarCantidad}
                      onChange={() => {
                        setIncrementarCantidad(!incrementarCantidad);
                        actualizar_cantidad(cantInput, !incrementarCantidad);
                      }}
                    >
                      Sumar
                    </Checkbox>
                    <b>Cantidad: </b>
                  </>
                }
                value={cantInput}
                onChange={(e) => {
                  //alert(((e.target.value.toString())||"").toString())
                  setCantInput(
                    parse_int_string(e.target.value.toString() || "").toString()
                  );
                  actualizar_cantidad(
                    parse_int_string(
                      (e.target.value.toString() || "").toString()
                    ),
                    incrementarCantidad
                  );
                }}
              />
            </Col>
          </Row>
          <Row style={{ padding: "1em" }}>
            <Col span={24}>
              <Input
                style={{ backgroundColor: "#f1f1f1ff" }}
                readOnly
                prefix={<b>Nueva Cantidad: </b>}
                value={stock.cantidad}
              />
            </Col>
          </Row>
          <Row style={{ padding: "1em" }}>
            <Col span={24}>
              <Button block type="primary" onClick={guardarCambios}>
                Guardar Cambios
              </Button>
            </Col>
          </Row>
        </>
      )}
      <Modal
        width={"900px"}
        destroyOnClose
        onCancel={(_) => setModalEditarCodigoOpen(false)}
        footer={null}
        open={modalEditarCodigoOpen}
        title="Editar C&oacute;digo"
      >
        <EditarCodigoIndiv
          idcodigo={props.idcodigo}
          buttonText="Editar C&oacute;digo"
          callback={() => {
            setModalEditarCodigoOpen(false);
            onOpen();
          }}
        />
      </Modal>

    </>
  );
};

export default EditarStockIndiv;
